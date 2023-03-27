using api.Context;
using api.Entities;
using api.Enums;
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
                if (_customInputValidation.checkManagerUser(overtimeRequest.UserId).Result)
                {
                    // validate input for manager case
                    errors = _customInputValidation.checkManagerApproveOvertimeRequestInput(overtimeRequest);
                    if (errors.Count > 0) throw new GraphQLException(errors);

                    // approve/disapprove operation
                    var headManager = await context.Users.Where(x => x.PositionId == 1).FirstOrDefaultAsync();
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

                var isManager = _customInputValidation.checkManagerUser(request.UserId).Result;
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
    }
}
