using api.Context;
using api.Entities;
using api.Enums;
using api.Requests;
using Microsoft.EntityFrameworkCore;

namespace api.Utils
{
    public class ApprovalServiceInputValidation : CustomInputValidation
    {
        // constructor
        public ApprovalServiceInputValidation(IDbContextFactory<HrisContext> contextFactory) : base(contextFactory)
        {

        }

        public async Task<bool> checkApprovingProjectLeader(int projectLeaderId, int id, string type)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                MultiProject? multiProject = null;
                if (type == MultiProjectTypeEnum.LEAVE) multiProject = await context.MultiProjects.Where(x => x.Type == type && x.LeaveId == id && x.ProjectLeaderId == projectLeaderId).FirstOrDefaultAsync();
                if (type == MultiProjectTypeEnum.OVERTIME) multiProject = await context.MultiProjects.Where(x => x.Type == type && x.OvertimeId == id && x.ProjectLeaderId == projectLeaderId).FirstOrDefaultAsync();
                if (type == MultiProjectTypeEnum.CHANGE_SHIFT) multiProject = await context.MultiProjects.Where(x => x.Type == type && x.ChangeShiftRequestId == id && x.ProjectLeaderId == projectLeaderId).FirstOrDefaultAsync();
                return multiProject != null;
            }
        }

        public List<IError> checkApproveLeaveRequestInput(ApproveLeaveUndertimeRequest request)
        {
            var errors = new List<IError>();

            if (!checkUserExist(request.UserId))
                errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.INVALID_USER));

            if (!(CheckManagerUser(request.UserId).Result || checkProjectLeaderUser(request.UserId).Result)) errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.NOT_MANAGER_PROJECT_LEADER));

            if (!checkNotificationExist(request.NotificationId, NotificationTypeEnum.LEAVE).Result)
                errors.Add(buildError(nameof(request.NotificationId), InputValidationMessageEnum.INVALID_NOTIFICATION));

            return errors;
        }

        public List<IError> checkApproveUndertimeRequestInput(ApproveLeaveUndertimeRequest request)
        {
            var errors = new List<IError>();

            if (!checkUserExist(request.UserId))
                errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.INVALID_USER));


            if (!(CheckManagerUser(request.UserId).Result || checkProjectLeaderUser(request.UserId).Result)) errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.NOT_MANAGER_PROJECT_LEADER));

            if (!checkNotificationExist(request.NotificationId, NotificationTypeEnum.UNDERTIME).Result)
                errors.Add(buildError(nameof(request.NotificationId), InputValidationMessageEnum.INVALID_NOTIFICATION));

            return errors;
        }

        public List<IError> checkLeaderApproveOvertimeRequestInput(ApproveOvertimeRequest request)
        {
            var errors = new List<IError>();

            if (!checkUserExist(request.UserId))
                errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.INVALID_USER));

            if (!(CheckManagerUser(request.UserId).Result || checkProjectLeaderUser(request.UserId).Result)) errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.NOT_MANAGER_PROJECT_LEADER));

            if (request.NotificationId == null || !checkNotificationExist((int)request.NotificationId, NotificationTypeEnum.OVERTIME).Result)
                errors.Add(buildError(nameof(request.NotificationId), InputValidationMessageEnum.INVALID_NOTIFICATION));

            return errors;
        }

        public List<IError> checkManagerApproveOvertimeRequestInput(ApproveOvertimeRequest request)
        {
            var errors = new List<IError>();

            if (!checkUserExist(request.UserId))
                errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.INVALID_USER));


            if (!(CheckManagerUser(request.UserId).Result || checkProjectLeaderUser(request.UserId).Result)) errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.NOT_MANAGER_PROJECT_LEADER));

            if (request.OvertimeId == null || !checkOvertimeExist((int)request.OvertimeId).Result)
                errors.Add(buildError(nameof(request.OvertimeId), InputValidationMessageEnum.INVALID_OVERTIME));

            if (request.IsApproved && request.ApprovedMinutes == null)
                errors.Add(buildError(nameof(request.ApprovedMinutes), InputValidationMessageEnum.MISSING_APPROVED_MINUTES));

            return errors;
        }

        public List<IError> checkApproveChangeShiftRequestInput(ApproveChangeShiftRequest request)
        {
            var errors = new List<IError>();

            if (!checkUserExist(request.UserId))
                errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.INVALID_USER));

            if (!(CheckManagerUser(request.UserId).Result || checkProjectLeaderUser(request.UserId).Result)) errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.NOT_MANAGER_PROJECT_LEADER));

            if (!checkNotificationExist(request.NotificationId, NotificationTypeEnum.CHANGE_SHIFT).Result) errors.Add(buildError(nameof(request.NotificationId), InputValidationMessageEnum.INVALID_NOTIFICATION));

            return errors;
        }

        public List<IError> ESLChangeShiftStatusRequestInput(ApproveESLChangeShiftRequest request)
        {
            var errors = new List<IError>();

            if (!checkUserExist(request.TeamLeaderId))
                errors.Add(buildError(nameof(request.TeamLeaderId), InputValidationMessageEnum.INVALID_USER));

            if (checkNonESLUser(request.TeamLeaderId))
                errors.Add(buildError(nameof(request.TeamLeaderId), InputValidationMessageEnum.INVALID_TEAM_LEADER));

            if (!checkNotificationExist(request.NotificationId, NotificationTypeEnum.ESL_OFFSET_SCHEDULE).Result) errors.Add(buildError(nameof(request.NotificationId), InputValidationMessageEnum.INVALID_NOTIFICATION));

            return errors;
        }

        public List<IError> ChangeESLOffsetStatusRequestInput(ApproveESLChangeShiftRequest request)
        {
            var errors = new List<IError>();

            if (!checkUserExist(request.TeamLeaderId))
                errors.Add(buildError(nameof(request.TeamLeaderId), InputValidationMessageEnum.INVALID_USER));

            if (checkNonESLUser(request.TeamLeaderId))
                errors.Add(buildError(nameof(request.TeamLeaderId), InputValidationMessageEnum.INVALID_TEAM_LEADER));

            if (!checkNotificationExist(request.NotificationId, NotificationTypeEnum.ESL_OFFSET).Result) errors.Add(buildError(nameof(request.NotificationId), InputValidationMessageEnum.INVALID_NOTIFICATION));

            return errors;
        }
    }
}
