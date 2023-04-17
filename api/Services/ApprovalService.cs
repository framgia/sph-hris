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
        private readonly CustomInputValidation _customInputValidation;
        private readonly NotificationService _notificationService;
        private readonly bool APPROVED = true;
        private readonly bool DISAPPROVED = false;

        public ApprovalService(IDbContextFactory<HrisContext> contextFactory, ITopicEventSender eventSender, NotificationService notificationService)
        {
            _contextFactory = contextFactory;
            _eventSender = eventSender;
            _customInputValidation = new CustomInputValidation(_contextFactory);
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
                    var headManager = await context.Users.Where(x => x.PositionId == PositionEnum.MANAGER).FirstOrDefaultAsync();
                    var notification = await context.OvertimeNotifications.Where(x => x.OvertimeId == overtimeRequest.OvertimeId && x.RecipientId == overtimeRequest.UserId && x.Type == NotificationTypeEnum.OVERTIME).FirstOrDefaultAsync();
                    var overtime = await context.Overtimes.FindAsync(overtimeRequest.OvertimeId);
                    var notificationData = notification != null ? JsonConvert.DeserializeObject<dynamic>(notification.Data) : null;

                    if ((overtime != null && notificationData != null) || headManager?.Id == overtimeRequest.UserId)
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
                    }

                    if (notification != null) notification.Data = JsonConvert.SerializeObject(notificationData);

                    // create notification
                    if (overtime != null && overtime.IsManagerApproved == true && overtime.IsLeaderApproved == true)
                        await _notificationService.createOvertimeApproveDisapproveNotification(overtime!, APPROVED);

                    if (overtime != null && (overtime.IsLeaderApproved == null && overtime.IsManagerApproved == false))
                        await _notificationService.createOvertimeApproveDisapproveNotification(overtime!, DISAPPROVED);
                    else if (overtime != null && (overtime.IsLeaderApproved == true && overtime.IsManagerApproved == false))
                        await _notificationService.createOvertimeApproveDisapproveNotification(overtime!, DISAPPROVED);

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
                        await _notificationService.createOvertimeApproveDisapproveNotification(overtime!, APPROVED);

                    if (overtime != null && (overtime.IsLeaderApproved == false && overtime.IsManagerApproved == null))
                        await _notificationService.createOvertimeApproveDisapproveNotification(overtime!, DISAPPROVED);
                    else if (overtime != null && (overtime.IsLeaderApproved == null && overtime.IsManagerApproved == false))
                        await _notificationService.createOvertimeApproveDisapproveNotification(overtime!, DISAPPROVED);

                    // end
                    await context.SaveChangesAsync();
                    return true;
                }
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

                // Update notification data
                if (request.IsApproved && notificationData != null) notificationData!.Status = RequestStatus.APPROVED;
                if (!request.IsApproved && notificationData != null) notificationData!.Status = RequestStatus.DISAPPROVED;

                if (notification != null) notification.Data = JsonConvert.SerializeObject(notificationData);

                // create notification
                if (leave != null && leave.IsManagerApproved == true && leave.IsLeaderApproved == true)
                    await _notificationService.createLeaveApproveDisapproveNotification(leave!, APPROVED);

                if (leave != null && (leave.IsLeaderApproved == false && leave.IsManagerApproved == null))
                    await _notificationService.createLeaveApproveDisapproveNotification(leave!, DISAPPROVED);
                else if (leave != null && (leave.IsLeaderApproved == null && leave.IsManagerApproved == false))
                    await _notificationService.createLeaveApproveDisapproveNotification(leave!, DISAPPROVED);

                await context.SaveChangesAsync();

                return leave;
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

                    // check if all leaders approved before notifying manager
                    changeShiftNotificationList?.ForEach(notif =>
                    {
                        var data = JsonConvert.DeserializeObject<ChangeShiftData>(notif.Data);
                        if (data != null && (data.Status == RequestStatus.DISAPPROVED || data.Status == RequestStatus.PENDING)) allApproved = false;
                    });

                    if (request.IsApproved && allApproved && changeShiftRequest != null)
                    {
                        await _notificationService.createChangeShiftRequestNotification(changeShiftRequest, true);
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
                    await _notificationService.createChangeShiftApproveDisapproveNotification(changeShiftRequest, (bool)changeShiftRequest.IsManagerApproved);

                    await context.SaveChangesAsync();
                    return true;
                }
                await context.SaveChangesAsync();
            }

            throw new GraphQLException(ErrorBuilder.New().SetMessage("Something went wrong!").Build());
        }

        public async Task<ESLChangeShiftRequest> ApproveDisapproveESLChangeShiftStatus(ApproveESLChangeShiftRequest request)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
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
                if (request.IsApproved && notificationData != null) notificationData!.Status = RequestStatus.APPROVED;
                if (!request.IsApproved && notificationData != null)
                {
                    notificationData!.Status = RequestStatus.DISAPPROVED;
                    offsets?.ForEach(offset =>
                    {
                        offset.IsUsed = false;
                    });
                }
                if (notification != null) notification.Data = JsonConvert.SerializeObject(notificationData);
                eSLChangeShiftRequest!.IsLeaderApproved = request.IsApproved;
                if (request.IsApproved)
                {
                    timeEntry!.StartTime = eSLChangeShiftRequest.TimeIn;
                    timeEntry!.EndTime = eSLChangeShiftRequest.TimeOut;
                };

                // Send notification
                await _notificationService.CreateESLChangeShiftStatusRequestNotification(eSLChangeShiftRequest);

                await context.SaveChangesAsync();

                return eSLChangeShiftRequest;
            }
        }

        public async Task<ESLOffset> ApproveDisapproveChangeOffsetStatus(ApproveESLChangeShiftRequest request)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var errors = new List<IError>();
                errors = _customInputValidation.ChangeESLOffsetStatusRequestInput(request);
                if (errors.Count > 0) throw new GraphQLException(errors);

                var notification = await context.ESLOffsetNotifications.FindAsync(request.NotificationId);
                var changeESLOffsetRequest = notification != null ? await context.ESLOffsets.FindAsync(notification.ESLOffsetId) : null;
                var notificationData = notification != null ? JsonConvert.DeserializeObject<dynamic>(notification.Data) : null;
                var timeEntry = await context.TimeEntries.FindAsync(changeESLOffsetRequest!.TimeEntryId);

                // Update notification data
                if (request.IsApproved && notificationData != null) notificationData!.Status = RequestStatus.APPROVED;
                if (!request.IsApproved && notificationData != null) notificationData!.Status = RequestStatus.DISAPPROVED;
                if (notification != null) notification.Data = JsonConvert.SerializeObject(notificationData);
                changeESLOffsetRequest!.IsLeaderApproved = request.IsApproved;
                if (request.IsApproved)
                {
                    timeEntry!.StartTime = changeESLOffsetRequest.TimeIn;
                    timeEntry!.EndTime = changeESLOffsetRequest.TimeOut;
                }

                // Send notification
                await _notificationService.CreateESLOffsetStatusRequestNotification(changeESLOffsetRequest);

                await context.SaveChangesAsync();
                return changeESLOffsetRequest;
            }
        }
    }
}
