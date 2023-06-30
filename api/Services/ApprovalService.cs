using api.Context;
using api.Entities;
using api.Enums;
using api.NotificationDataClasses;
using api.Requests;
using api.Utils;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace api.Services
{
    public class ApprovalService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        private readonly ITopicEventSender _eventSender;
        private readonly ApprovalServiceInputValidation _customInputValidation;
        private readonly NotificationService _notificationService;
        private readonly bool APPROVED = true;
        private readonly bool DISAPPROVED = false;

        public ApprovalService(IDbContextFactory<HrisContext> contextFactory, ITopicEventSender eventSender, NotificationService notificationService)
        {
            _contextFactory = contextFactory;
            _eventSender = eventSender;
            _customInputValidation = new ApprovalServiceInputValidation(_contextFactory);
            _notificationService = notificationService;
        }

        public async Task<bool> ApproveDisapproveOvertime(ApproveOvertimeRequest overtimeRequest)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var errors = new List<IError>();
                errors = _customInputValidation.checkApproveOvertimeRequestInput(overtimeRequest);
                if (errors.Count > 0) throw new GraphQLException(errors);

                // check if approving/disapproving is manager
                if (_customInputValidation.CheckManagerUser(overtimeRequest.UserId).Result)
                {
                    // validate input for manager case
                    errors = _customInputValidation.checkManagerApproveOvertimeRequestInput(overtimeRequest);
                    if (errors.Count > 0) throw new GraphQLException(errors);

                    // approve/disapprove operation
                    var headManager = await context.Users.Where(x => x.PositionId == PositionEnum.MANAGER || (x.PositionId == PositionEnum.ASSISTANT_MANAGER && x.Id == overtimeRequest.UserId)).ToListAsync();
                    var notification = await context.OvertimeNotifications.Where(x => x.OvertimeId == overtimeRequest.OvertimeId && x.RecipientId == overtimeRequest.UserId && x.Type == NotificationTypeEnum.OVERTIME).FirstOrDefaultAsync();
                    var overtime = await context.Overtimes
                        .Include(x => x.TimeEntry.TimeIn)
                        .Include(x => x.TimeEntry.TimeOut)
                        .FirstOrDefaultAsync(x => x.Id == overtimeRequest.OvertimeId);
                    var notificationData = notification != null ? JsonConvert.DeserializeObject<dynamic>(notification.Data) : null;

                    if ((overtime != null && notificationData != null) || headManager.Count > 0)
                    {
                        overtime!.IsManagerApproved = overtimeRequest.IsApproved;

                        if (overtimeRequest.IsApproved)
                        {
                            if (notificationData != null)
                                notificationData!.Status = RequestStatus.APPROVED;
                            overtime.ApprovedMinutes = overtimeRequest.ApprovedMinutes;
                        }
                        if (!overtimeRequest.IsApproved)
                        {
                            if (notificationData != null)
                                notificationData!.Status = RequestStatus.DISAPPROVED;
                            overtime.ApprovedMinutes = 0;
                        }

                        overtime.ManagerRemarks = overtimeRequest.ManagerRemarks;
                    }

                    if (notification != null) notification.Data = JsonConvert.SerializeObject(notificationData);

                    // create notification
                    if (overtime != null && overtime.IsManagerApproved == true && overtime.IsLeaderApproved == true)
                        await _notificationService.createOvertimeApproveDisapproveNotification(overtime!, overtimeRequest.UserId, APPROVED);

                    if (overtime != null && (overtime.IsLeaderApproved == null && overtime.IsManagerApproved == false))
                        await _notificationService.createOvertimeApproveDisapproveNotification(overtime!, overtimeRequest.UserId, DISAPPROVED);
                    else if (overtime != null && (overtime.IsLeaderApproved == true && overtime.IsManagerApproved == false))
                        await _notificationService.createOvertimeApproveDisapproveNotification(overtime!, overtimeRequest.UserId, DISAPPROVED);
                    else if (overtime != null && (overtime.IsLeaderApproved == false && overtime.IsManagerApproved == false))
                        await _notificationService.createOvertimeApproveDisapproveNotification(overtime!, overtimeRequest.UserId, DISAPPROVED);

                    await context.SaveChangesAsync();
                    return true;
                }

                // check if approving/disapproving is projectleader (from notifications)
                if (_customInputValidation.checkProjectLeaderUser(overtimeRequest.UserId).Result)
                {
                    // validate input for project leader case
                    errors = _customInputValidation.checkLeaderApproveOvertimeRequestInput(overtimeRequest);
                    if (errors.Count > 0) throw new GraphQLException(errors);

                    // approve/disapprove operation
                    var notification = await context.OvertimeNotifications.FindAsync(overtimeRequest.NotificationId);
                    var overtime = await context.Overtimes.FindAsync(notification?.OvertimeId);
                    var notificationData = notification != null ? JsonConvert.DeserializeObject<dynamic>(notification.Data) : null;

                    // if approving project leader doesn't match
                    var isProjectLeader = _customInputValidation.checkApprovingProjectLeader(overtimeRequest.UserId, overtime!.Id, MultiProjectTypeEnum.OVERTIME).Result;
                    if (!isProjectLeader) throw new GraphQLException(ErrorBuilder.New().SetMessage(InputValidationMessageEnum.MISMATCH_PROJECT_LEADER).Build());

                    if (overtime != null && isProjectLeader)
                        overtime.IsLeaderApproved = overtimeRequest.IsApproved;

                    // Update notification data
                    if (overtimeRequest.IsApproved && notificationData != null) notificationData!.Status = RequestStatus.APPROVED;
                    if (!overtimeRequest.IsApproved && notificationData != null) notificationData!.Status = RequestStatus.DISAPPROVED;

                    if (notification != null) notification.Data = JsonConvert.SerializeObject(notificationData);

                    // create notification
                    if (overtime != null && overtime.IsManagerApproved == true && overtime.IsLeaderApproved == true)
                        await _notificationService.createOvertimeApproveDisapproveNotification(overtime!, overtimeRequest.UserId, APPROVED);
                    else if (overtime != null && overtime.IsManagerApproved == null && overtime.IsLeaderApproved == true)
                        await _notificationService.createOvertimeApproveDisapproveNotification(overtime!, overtimeRequest.UserId, APPROVED);
                    if (overtime != null && (overtime.IsLeaderApproved == false && overtime.IsManagerApproved == null))
                        await _notificationService.createOvertimeApproveDisapproveNotification(overtime!, overtimeRequest.UserId, DISAPPROVED);
                    else if (overtime != null && (overtime.IsLeaderApproved == null && overtime.IsManagerApproved == false))
                        await _notificationService.createOvertimeApproveDisapproveNotification(overtime!, overtimeRequest.UserId, DISAPPROVED);
                    else if (overtime != null && (overtime.IsLeaderApproved == false && overtime.IsManagerApproved == false))
                        await _notificationService.createOvertimeApproveDisapproveNotification(overtime!, overtimeRequest.UserId, DISAPPROVED);
                    else if (overtime != null && (overtime.IsLeaderApproved == true && overtime.IsManagerApproved == false))
                        await _notificationService.createOvertimeApproveDisapproveNotification(overtime!, overtimeRequest.UserId, DISAPPROVED);

                    // end
                    await context.SaveChangesAsync();
                    return true;
                }
            }
            return false;
        }

        public async Task<bool> ApproveDisapproveSummaryOvertime(ApproveOvertimeRequest overtimeRequest, HrisContext context)
        {
            var errors = new List<IError>();
            errors = _customInputValidation.checkApproveOvertimeRequestInput(overtimeRequest);
            if (errors.Count > 0) throw new GraphQLException(errors);

            // check if approving/disapproving is manager
            if (_customInputValidation.CheckManagerUser(overtimeRequest.UserId).Result)
            {
                // validate input for manager case
                errors = _customInputValidation.checkManagerApproveOvertimeRequestInput(overtimeRequest);
                if (errors.Count > 0) throw new GraphQLException(errors);

                // approve/disapprove operation
                var headManager = await context.Users.Where(x => x.PositionId == PositionEnum.MANAGER || (x.PositionId == PositionEnum.ASSISTANT_MANAGER && x.Id == overtimeRequest.UserId)).ToListAsync();
                var notification = await context.OvertimeNotifications.Where(x => x.OvertimeId == overtimeRequest.OvertimeId && x.RecipientId == overtimeRequest.UserId && x.Type == NotificationTypeEnum.OVERTIME).FirstOrDefaultAsync();
                var overtime = await context.Overtimes
                        .Include(x => x.TimeEntry.TimeIn)
                        .Include(x => x.TimeEntry.TimeOut)
                        .FirstOrDefaultAsync(x => x.Id == overtimeRequest.OvertimeId);
                var notificationData = notification != null ? JsonConvert.DeserializeObject<dynamic>(notification.Data) : null;

                if ((overtime != null && notificationData != null) || headManager.Count > 0)
                {
                    overtime!.IsManagerApproved = overtimeRequest.IsApproved;

                    if (overtimeRequest.IsApproved)
                    {
                        if (notificationData != null)
                            notificationData!.Status = RequestStatus.APPROVED;
                        overtime.ApprovedMinutes = overtimeRequest.ApprovedMinutes;
                    }
                    if (!overtimeRequest.IsApproved)
                    {
                        if (notificationData != null)
                            notificationData!.Status = RequestStatus.DISAPPROVED;
                        overtime.ApprovedMinutes = 0;
                    }

                    overtime.ManagerRemarks = overtimeRequest.ManagerRemarks;
                }

                if (notification != null) notification.Data = JsonConvert.SerializeObject(notificationData);

                // create notification
                if (overtime != null)
                {
                    bool isLeaderApproved = overtime.IsLeaderApproved == true;
                    bool isManagerApproved = overtime.IsManagerApproved == true;
                    if (!isLeaderApproved || !isManagerApproved)
                    {
                        await _notificationService.createOvertimeApproveDisapproveNotification(overtime!, overtimeRequest.UserId, DISAPPROVED);
                    }
                }

                return true;
            }

            return false;
        }

        public async Task<bool> ApproveDisapproveLeave(ApproveLeaveUndertimeRequest leaveRequest)
        {
            var errors = _customInputValidation.checkApproveLeaveRequestInput(leaveRequest);

            if (errors.Count > 0) throw new GraphQLException(errors);

            // approve/disapprove operation
            var leave = await Leave_UndertimeApprovalOperation(leaveRequest);

            return true;
        }

        public async Task<bool> ApproveDisapproveUndertime(ApproveLeaveUndertimeRequest undertimeRequest)
        {
            var errors = _customInputValidation.checkApproveUndertimeRequestInput(undertimeRequest);

            if (errors.Count > 0) throw new GraphQLException(errors);

            // approve/disapprove operation
            var leave = await Leave_UndertimeApprovalOperation(undertimeRequest);

            return true;
        }

        private async Task<Leave?> Leave_UndertimeApprovalOperation(ApproveLeaveUndertimeRequest request)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var notification = await context.LeaveNotifications.FindAsync(request.NotificationId);
                var leave = await context.Leaves.FindAsync(notification?.LeaveId);
                var notificationData = notification != null ? JsonConvert.DeserializeObject<dynamic>(notification.Data) : null;
                int userId = notificationData?.User.Id;
                User? userDetails = await context.Users.FindAsync(userId);

                var isManager = _customInputValidation.CheckManagerUser(request.UserId).Result;
                var isProjectLeader = _customInputValidation.checkApprovingProjectLeader(request.UserId, leave!.Id, MultiProjectTypeEnum.LEAVE).Result;

                // if approving manager/project leader doesn't match
                if (isManager && leave.ManagerId != request.UserId) throw new GraphQLException(ErrorBuilder.New().SetMessage(InputValidationMessageEnum.MISMATCH_MANAGER).Build());
                if (!isManager && !isProjectLeader) throw new GraphQLException(ErrorBuilder.New().SetMessage(InputValidationMessageEnum.MISMATCH_PROJECT_LEADER).Build());

                // if manager
                if (leave != null && isManager)
                    leave.IsManagerApproved = request.IsApproved;

                // if project leader
                if (leave != null && isProjectLeader)
                    leave.IsLeaderApproved = request.IsApproved;

                // Update remaining paid leaves
                UpdatePaidLeaves(leave, userDetails);

                // Update notification data
                if (request.IsApproved && notificationData != null) notificationData!.Status = RequestStatus.APPROVED;
                if (!request.IsApproved && notificationData != null) notificationData!.Status = RequestStatus.DISAPPROVED;

                if (notification != null) notification.Data = JsonConvert.SerializeObject(notificationData);

                // create notification
                if (leave != null && leave.IsManagerApproved == true && leave.IsLeaderApproved == true)
                    await _notificationService.createLeaveApproveDisapproveNotification(leave!, request.UserId, APPROVED);
                if (leave != null && leave.IsManagerApproved == null && leave.IsLeaderApproved == true)
                    await _notificationService.createLeaveApproveDisapproveNotification(leave!, request.UserId, APPROVED);
                if (leave != null && (leave.IsLeaderApproved == false && leave.IsManagerApproved == null))
                    await _notificationService.createLeaveApproveDisapproveNotification(leave!, request.UserId, DISAPPROVED);
                else if (leave != null && (leave.IsLeaderApproved == null && leave.IsManagerApproved == false))
                    await _notificationService.createLeaveApproveDisapproveNotification(leave!, request.UserId, DISAPPROVED);
                else if (leave != null && (leave.IsLeaderApproved == false && leave.IsManagerApproved == false))
                    await _notificationService.createLeaveApproveDisapproveNotification(leave!, request.UserId, DISAPPROVED);
                else if (leave != null && (leave.IsLeaderApproved == true && leave.IsManagerApproved == false))
                    await _notificationService.createLeaveApproveDisapproveNotification(leave!, request.UserId, DISAPPROVED);

                await context.SaveChangesAsync();

                return leave;
            }
        }

        private static void UpdatePaidLeaves(Leave? leave, User? userDetails)
        {
            if (leave == null || userDetails == null)
            {
                throw new GraphQLException(ErrorBuilder.New().SetMessage(ErrorMessageEnum.LEAVE_USERDETAILS_NULL_IDENTIFIER).Build());
            }

            if (leave!.IsLeaderApproved == true && leave!.IsManagerApproved == true && leave!.IsWithPay)
            {
                if (leave.Days > userDetails?.PaidLeaves)
                {
                    if (userDetails?.PaidLeaves <= 0)
                    {
                        throw new GraphQLException(ErrorBuilder.New().SetMessage(userDetails?.Name + ErrorMessageEnum.MAXIMUM_LIMIT_OF_PAID_LEAVES).Build());
                    }

                    throw new GraphQLException(ErrorBuilder.New().SetMessage(userDetails?.Name + ErrorMessageEnum.EXCEEDS_MAXIMUM_REMAINING_PAID_LEAVES).Build());
                }
                else
                {
                    userDetails!.PaidLeaves -= leave.Days;
                }
            }
        }

        public async Task<bool> ApproveDisapproveChangeShift(ApproveChangeShiftRequest request)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var errors = new List<IError>();
                errors = _customInputValidation.checkApproveChangeShiftRequestInput(request);
                if (errors.Count > 0) throw new GraphQLException(errors);

                var notification = await context.ChangeShiftNotifications.FindAsync(request.NotificationId);
                var changeShiftRequest = notification != null ? await context.ChangeShiftRequests.FindAsync(notification.ChangeShiftRequestId) : null;
                var changeShiftNotificationList = changeShiftRequest != null ? await context.ChangeShiftNotifications.Where(x => x.ChangeShiftRequestId == changeShiftRequest.Id && x.RecipientId != changeShiftRequest.ManagerId).ToListAsync() : null;

                var isManager = _customInputValidation.CheckManagerUser(request.UserId).Result;
                var isProjectLeader = _customInputValidation.checkApprovingProjectLeader(request.UserId, changeShiftRequest!.Id, MultiProjectTypeEnum.CHANGE_SHIFT).Result;
                var notificationData = notification != null ? JsonConvert.DeserializeObject<dynamic>(notification.Data) : null;

                if (isManager && changeShiftRequest.ManagerId != request.UserId) throw new GraphQLException(ErrorBuilder.New().SetMessage(InputValidationMessageEnum.MISMATCH_MANAGER).Build());
                if (!isManager && !isProjectLeader) throw new GraphQLException(ErrorBuilder.New().SetMessage(InputValidationMessageEnum.MISMATCH_PROJECT_LEADER).Build());

                // Update notification data
                if (request.IsApproved && notificationData != null) notificationData!.Status = RequestStatus.APPROVED;
                if (!request.IsApproved && notificationData != null) notificationData!.Status = RequestStatus.DISAPPROVED;

                if (notification != null) notification.Data = JsonConvert.SerializeObject(notificationData);

                if (isProjectLeader)
                {
                    var allApproved = true;
                    changeShiftRequest.IsLeaderApproved = request.IsApproved;

                    // create notification back to requester
                    await _notificationService.createChangeShiftApproveDisapproveNotification(context, changeShiftRequest, request.UserId, request.IsApproved);

                    // check if all leaders approved before notifying manager
                    changeShiftNotificationList?.ForEach(notif =>
                    {
                        var data = JsonConvert.DeserializeObject<ChangeShiftData>(notif.Data);
                        if (data != null && (data.Status == RequestStatus.DISAPPROVED || data.Status == RequestStatus.PENDING)) allApproved = false;
                    });

                    if (request.IsApproved && allApproved && changeShiftRequest != null)
                    {
                        await _notificationService.createChangeShiftRequestNotification(context, changeShiftRequest, changeShiftRequest.UserId, true);
                    }

                    await context.SaveChangesAsync();
                    return true;
                }

                // update TimeEntries
                if (isManager && changeShiftRequest != null && changeShiftRequest.IsLeaderApproved != null && changeShiftRequest.IsLeaderApproved != false)
                {
                    changeShiftRequest.IsManagerApproved = request.IsApproved;

                    var timeEntry = await context.TimeEntries.FindAsync(changeShiftRequest.TimeEntryId);
                    if (timeEntry != null && changeShiftRequest.IsManagerApproved == true)
                    {
                        timeEntry.StartTime = changeShiftRequest.TimeIn;
                        timeEntry.EndTime = changeShiftRequest.TimeOut;
                    }
                    await _notificationService.createChangeShiftApproveDisapproveNotification(context, changeShiftRequest, request.UserId, (bool)changeShiftRequest.IsManagerApproved);

                    await context.SaveChangesAsync();
                    return true;
                }
                await context.SaveChangesAsync();
            }

            throw new GraphQLException(ErrorBuilder.New().SetMessage("Something went wrong!").Build());
        }

        public async Task<ESLChangeShiftRequest> ApproveDisapproveESLChangeShiftStatus(ApproveESLChangeShiftRequest request, HrisContext context)
        {
            var errors = new List<IError>();
            errors = _customInputValidation.ESLChangeShiftStatusRequestInput(request);
            if (errors.Count > 0) throw new GraphQLException(errors);

            var notification = await context.ESLChangeShiftNotifications.FindAsync(request.NotificationId);
            var eSLChangeShiftRequest = notification != null ? await context.ESLChangeShiftRequests.FindAsync(notification.ESLChangeShiftRequestId) : null;
            var offsets = eSLChangeShiftRequest != null ? await context.ESLOffsets.Where(x => x.ESLChangeShiftRequestId == eSLChangeShiftRequest.Id).ToListAsync() : null;
            var notificationData = notification != null ? JsonConvert.DeserializeObject<dynamic>(notification.Data) : null;
            var timeEntry = await context.TimeEntries.FindAsync(eSLChangeShiftRequest!.TimeEntryId);

            // Update notification data
            if (request.IsApproved && notificationData != null)
            {
                notificationData!.Status = RequestStatus.APPROVED;
                offsets?.ForEach(offset => offset.IsUsed = true);
            }
            if (!request.IsApproved && notificationData != null)
            {
                notificationData!.Status = RequestStatus.DISAPPROVED;
                offsets?.ForEach(offset => offset.IsUsed = false);
            }
            if (notification != null) notification.Data = JsonConvert.SerializeObject(notificationData);
            eSLChangeShiftRequest!.IsLeaderApproved = request.IsApproved;
            if (request.IsApproved)
            {
                timeEntry!.StartTime = eSLChangeShiftRequest.TimeIn;
                timeEntry!.EndTime = eSLChangeShiftRequest.TimeOut;
            }

            // Send notification
            await _notificationService.CreateESLChangeShiftStatusRequestNotification(eSLChangeShiftRequest, request.TeamLeaderId, context);

            await context.SaveChangesAsync();

            return eSLChangeShiftRequest;
        }

        public async Task<ESLOffset> ApproveDisapproveChangeOffsetStatus(ApproveESLChangeShiftRequest request, HrisContext context)
        {
            var errors = new List<IError>();
            errors = _customInputValidation.ChangeESLOffsetStatusRequestInput(request);
            if (errors.Count > 0) throw new GraphQLException(errors);

            var notification = await context.ESLOffsetNotifications.FindAsync(request.NotificationId);
            var changeESLOffsetRequest = notification != null ? await context.ESLOffsets.FindAsync(notification.ESLOffsetId) : null;
            var notificationData = notification != null ? JsonConvert.DeserializeObject<dynamic>(notification.Data) : null;

            // Update notification data
            if (request.IsApproved && notificationData != null) notificationData!.Status = RequestStatus.APPROVED;
            if (!request.IsApproved && notificationData != null) notificationData!.Status = RequestStatus.DISAPPROVED;
            if (notification != null) notification.Data = JsonConvert.SerializeObject(notificationData);
            changeESLOffsetRequest!.IsLeaderApproved = request.IsApproved;

            // Send notification
            await _notificationService.CreateESLOffsetStatusRequestNotification(changeESLOffsetRequest, request.TeamLeaderId, context);

            await context.SaveChangesAsync();
            return changeESLOffsetRequest;
        }
    }
}
