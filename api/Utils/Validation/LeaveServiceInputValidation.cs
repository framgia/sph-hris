using api.Context;
using api.Enums;
using api.Requests;
using Microsoft.EntityFrameworkCore;

namespace api.Utils
{
    public class LeaveServiceInputValidation : CustomInputValidation
    {
        // constructor
        public LeaveServiceInputValidation(IDbContextFactory<HrisContext> contextFactory) : base(contextFactory)
        {

        }

        public List<IError> CheckLeaveRequestInput(CreateLeaveRequest leave)
        {
            var errors = new List<IError>();
            int index = 0;

            if (!checkUserExist(leave.UserId))
                errors.Add(buildError(nameof(leave.UserId), InputValidationMessageEnum.INVALID_USER));

            if (!CheckManagerUser(leave.ManagerId).Result)
                errors.Add(buildError(nameof(leave.ManagerId), InputValidationMessageEnum.INVALID_MANAGER));

            if (!checkLeaveType(leave.LeaveTypeId))
                errors.Add(buildError(nameof(leave.LeaveTypeId), InputValidationMessageEnum.INVALID_LEAVE_TYPE));

            if (!checkLeaveDates(leave.LeaveDates))
                errors.Add(buildError(nameof(leave.LeaveDates), InputValidationMessageEnum.MISSING_LEAVE_DATES));

            if (!checkMultiProjects(leave.LeaveProjects))
                errors.Add(buildError(nameof(leave.LeaveProjects), InputValidationMessageEnum.MISSING_PROJECTS));

            index = 0;
            leave.LeaveProjects?.ForEach(project =>
            {
                if (!checkProjectExist(project.ProjectId))
                    errors.Add(buildError(nameof(project.ProjectId), InputValidationMessageEnum.INVALID_PROJECT, index));

                if (!checkUserExist(project.ProjectLeaderId))
                    errors.Add(buildError(nameof(project.ProjectLeaderId), InputValidationMessageEnum.INVALID_PROJECT_LEADER, index));

                index++;
            });

            index = 0;
            leave.LeaveDates?.ForEach(date =>
            {
                if (!checkDateFormat(date.LeaveDate))
                    errors.Add(buildError(nameof(date.LeaveDate), InputValidationMessageEnum.INVALID_DATE, index));

                index++;
            });

            return errors;
        }

        public List<IError> CheckCancelLeaveRequestInput(CancelLeaveRequest request)
        {
            var errors = new List<IError>();

            if (!checkUserExist(request.UserId))
                errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.INVALID_USER));

            if (!CheckUserOwnsLeave(request.UserId, request.LeaveId).Result)
                errors.Add(buildError(nameof(request.LeaveId), InputValidationMessageEnum.INVALID_LEAVE_ID));

            if (!CheckPendingStatus(request.LeaveId).Result)
                errors.Add(buildError(nameof(request.LeaveId), InputValidationMessageEnum.LEAVE_NOT_PENDING));

            return errors;
        }

        // private methods
        private async Task<bool> CheckUserOwnsLeave(int userId, int leaveId)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                try
                {
                    var leave = await context.Leaves.FindAsync(leaveId);
                    return leave != null && leave.UserId == userId;
                }
                catch
                {
                    return false;
                }
            }
        }

        private async Task<bool> CheckPendingStatus(int leaveId)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                try
                {
                    var leave = await context.Leaves.FindAsync(leaveId);
                    var isDisapproved = leave?.IsLeaderApproved == false && leave.IsManagerApproved == false;
                    var isApproved = leave?.IsLeaderApproved == true && leave.IsManagerApproved == true;

                    return leave != null && !(isDisapproved || isApproved);
                }
                catch
                {
                    return false;
                }
            }
        }
    }
}
