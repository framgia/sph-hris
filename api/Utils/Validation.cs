
using System.Globalization;
using api.Context;
using api.Enums;
using api.Requests;
using Microsoft.EntityFrameworkCore;

namespace api.Utils
{
    public class CustomInputValidation
    {
        public string VARIABLE_STRING = "variable";
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        public CustomInputValidation(IDbContextFactory<HrisContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public IError buildError(string propertyName, string message, int? index = null)
        {
            if (index != null) return ErrorBuilder.New()
                    .SetMessage(message)
                    .SetExtension(VARIABLE_STRING, char.ToLower(propertyName[0]) + propertyName.Substring(1))
                    .SetExtension("index", index)
                    .Build();

            return ErrorBuilder.New()
                    .SetMessage(message)
                    .SetExtension(VARIABLE_STRING, char.ToLower(propertyName[0]) + propertyName.Substring(1))
                    .Build();
        }

        public string propertyNameToJSONKey(string name)
        {
            return char.ToLower(name[0]) + name.Substring(1);
        }

        public bool checkUserExist(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return context.Users.Find(id) != null;
            }
        }

        public bool checkProjectExist(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return context.Projects.Find(id) != null;
            }
        }

        public bool checkLeaveType(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return context.LeaveTypes.Find(id) != null;
            }
        }

        public bool checkDateFormat(string date)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                string format = "yyyy-MM-dd";
                DateTime datetime;
                return DateTime.TryParseExact(date, format, CultureInfo.InvariantCulture, DateTimeStyles.None, out datetime);
            }
        }

        public bool checkLeaveDates(List<LeaveDateRequest> leaveDates)
        {
            return !(leaveDates == null || leaveDates.Count == 0);
        }

        public bool checkLeaveProjects(List<MultiProjectRequest> leaveProjects)
        {
            return !(leaveProjects == null || leaveProjects.Count == 0);
        }

        public List<IError> checkLeaveRequestInput(CreateLeaveRequest leave)
        {
            var errors = new List<IError>();
            int index = 0;

            if (!checkUserExist(leave.UserId))
                errors.Add(buildError(nameof(leave.UserId), InputValidationMessageEnum.INVALID_USER));

            if (!checkUserExist(leave.ManagerId))
                errors.Add(buildError(nameof(leave.ManagerId), InputValidationMessageEnum.INVALID_MANAGER));

            if (!checkLeaveType(leave.LeaveTypeId))
                errors.Add(buildError(nameof(leave.LeaveTypeId), InputValidationMessageEnum.INVALID_LEAVE_TYPE));

            if (!checkLeaveDates(leave.LeaveDates))
                errors.Add(buildError(nameof(leave.LeaveDates), InputValidationMessageEnum.MISSING_LEAVE_DATES));

            if (!checkLeaveProjects(leave.LeaveProjects))
                errors.Add(buildError(nameof(leave.LeaveProjects), InputValidationMessageEnum.MISSING_LEAVE_PROJECTS));

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

        public List<IError> checkOvertimeRequestInput(CreateOvertimeRequest overtime)
        {
            var errors = new List<IError>();
            var index = 0;

            if (!checkUserExist(overtime.UserId))
                errors.Add(buildError(nameof(overtime.UserId), InputValidationMessageEnum.INVALID_USER));

            if (!checkUserExist(overtime.UserId))
                errors.Add(buildError(nameof(overtime.ManagerId), InputValidationMessageEnum.INVALID_MANAGER));

            if (!checkDateFormat(overtime.Date))
                errors.Add(buildError(nameof(overtime.Date), InputValidationMessageEnum.INVALID_DATE));


            index = 0;
            overtime.OvertimeProjects?.ForEach(project =>
            {
                if (!checkProjectExist(project.ProjectId))
                    errors.Add(buildError(nameof(project.ProjectId), InputValidationMessageEnum.INVALID_PROJECT, index));

                if (!checkUserExist(project.ProjectLeaderId))
                    errors.Add(buildError(nameof(project.ProjectLeaderId), InputValidationMessageEnum.INVALID_PROJECT_LEADER, index));

                index++;
            });

            return errors;
        }
    }
}
