
using System.Globalization;
using System.Text.RegularExpressions;
using api.Context;
using api.Entities;
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

        public async Task<bool> CheckManagerUser(int id)
        {
            using HrisContext context = _contextFactory.CreateDbContext();
            var user = await context.Users.FindAsync(id);
            var role = await context.Roles.Where(x => x.Name == RoleEnum.MANAGER).FirstAsync();
            if (user == null) return false;
            return user.RoleId == role.Id;
        }

        public async Task<bool> checkProjectLeaderUser(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var user = await context.Users.FindAsync(id);

                return user != null && PositionEnum.ALL_LEADERS.Contains(user.PositionId);
            }
        }

        public bool checkNonESLUser(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var user = context.Users.Find(id);
                return user != null && user.PositionId != PositionEnum.ESL_TEACHER;
            }
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

        public bool checkProjectExist(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return context.Projects.Find(id) != null;
            }
        }

        public async Task<bool> checkOvertimeExist(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.Overtimes.FindAsync(id) != null;
            }
        }

        public bool checkTimeEntryExist(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return context.TimeEntries.Find(id) != null;
            }
        }

        public bool checkChangeShiftRequestExist(int timeEntryId)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return context.ChangeShiftRequests.Where(x => x.TimeEntryId == timeEntryId).Count() > 0;
            }
        }

        public bool checkESLChangeShiftRequestExist(int timeEntryId)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return context.ESLChangeShiftRequests.Where(x => x.TimeEntryId == timeEntryId).Count() > 0;
            }
        }

        public async Task<bool> checkPositionExist(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.Positions.FindAsync(id) != null;
            }
        }

        public async Task<bool> checkRoleExist(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.Roles.FindAsync(id) != null;
            }
        }

        public async Task<bool> checkScheduleExist(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.EmployeeSchedules.FindAsync(id) != null;
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

        public bool checkEmailFormat(string email)
        {
            string regexPattern = @"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$";
            return Regex.IsMatch(email, regexPattern);
        }


        public bool checkLeaveDates(List<LeaveDateRequest> leaveDates)
        {
            return !(leaveDates == null || leaveDates.Count == 0);
        }

        public bool checkMultiProjects(List<MultiProjectRequest> multiProjects)
        {
            return !(multiProjects == null || multiProjects.Count == 0);
        }

        public async Task<bool> checkNotificationExist(int id, string type)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var notification = await context.Notifications.FindAsync(id);
                return notification?.Type == type;
            }
        }

        public async Task<bool> checkOvertimeNotificationExist(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var notification = await context.Notifications.FindAsync(id);
                return notification?.Type == NotificationTypeEnum.OVERTIME;
            }
        }

        public async Task<bool> checkAllESLOffsetsExist(List<int> ids)
        {
            var errors = new List<IError>();
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var offsets = await context.ESLOffsets.Where(x => ids.Contains(x.Id)).ToListAsync();
                return offsets.Count() == ids.Count();
            }
        }

        public async Task<List<IError>?> checkESLOffsetNotUsed(List<int> ids, string propertyName)
        {
            var errors = new List<IError>();

            if (!checkAllESLOffsetsExist(ids).Result)
                errors.Add(buildError(propertyName, InputValidationMessageEnum.INVALID_ESL_OFFSET_IDS));

            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var offsets = await context.ESLOffsets.Where(x => ids.Contains(x.Id)).ToListAsync();
                offsets.ForEach(offset =>
                {
                    if (offset.IsUsed)
                        errors.Add(buildError(propertyName, $"{InputValidationMessageEnum.ALREADY_USED_ESL_OFFSET} {offset.Id}"));
                });
            }
            return errors.Count() > 0 ? errors : null;
        }

        public List<IError> checkLeaveRequestInput(CreateLeaveRequest leave)
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

        public List<IError> checkOvertimeRequestInput(CreateOvertimeRequest overtime)
        {
            var errors = new List<IError>();
            var index = 0;

            if (!checkUserExist(overtime.UserId))
                errors.Add(buildError(nameof(overtime.UserId), InputValidationMessageEnum.INVALID_USER));

            if (!CheckManagerUser(overtime.ManagerId).Result)
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

        public List<IError> checkApproveOvertimeRequestInput(ApproveOvertimeRequest request)
        {
            var errors = new List<IError>();

            if (!checkUserExist(request.UserId))
                errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.INVALID_USER));

            if (!(CheckManagerUser(request.UserId).Result || checkProjectLeaderUser(request.UserId).Result)) errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.NOT_MANAGER_PROJECT_LEADER));

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

        public List<IError> checkChangeShiftRequestInput(CreateChangeShiftRequest request)
        {
            var errors = new List<IError>();
            int index = 0;

            if (checkChangeShiftRequestExist(request.TimeEntryId))
                errors.Add(buildError(nameof(request.TimeEntryId), InputValidationMessageEnum.DUPLICATE_REQUEST));

            if (!checkUserExist(request.UserId))
                errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.INVALID_USER));

            if (!checkNonESLUser(request.UserId))
                errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.INVALID_NON_ESL_USER));

            if (!checkTimeEntryExist(request.TimeEntryId))
                errors.Add(buildError(nameof(request.TimeEntryId), InputValidationMessageEnum.INVALID_TIME_ENTRY));

            if (!CheckManagerUser(request.ManagerId).Result)
                errors.Add(buildError(nameof(request.ManagerId), InputValidationMessageEnum.INVALID_MANAGER));

            if (!checkMultiProjects(request.Projects))
                errors.Add(buildError(nameof(request.Projects), InputValidationMessageEnum.MISSING_PROJECTS));

            index = 0;
            request.Projects?.ForEach(project =>
            {
                if (!checkProjectExist(project.ProjectId))
                    errors.Add(buildError(nameof(project.ProjectId), InputValidationMessageEnum.INVALID_PROJECT, index));

                if (!checkUserExist(project.ProjectLeaderId))
                    errors.Add(buildError(nameof(project.ProjectLeaderId), InputValidationMessageEnum.INVALID_PROJECT_LEADER, index));

                index++;
            });

            return errors;
        }

        public List<IError> checkESLChangeShiftRequestInput(CreateESLChangeShiftRequest request)
        {
            var errors = new List<IError>();

            var eslOffsetErrors = checkESLOffsetNotUsed(request.ESLOffsetIDs, nameof(request.ESLOffsetIDs)).Result;

            if (checkESLChangeShiftRequestExist(request.TimeEntryId))
                errors.Add(buildError(nameof(request.TimeEntryId), InputValidationMessageEnum.DUPLICATE_REQUEST));

            if (!checkUserExist(request.UserId))
                errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.INVALID_USER));

            if (checkNonESLUser(request.UserId))
                errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.INVALID_ESL_USER));

            if (!checkTimeEntryExist(request.TimeEntryId))
                errors.Add(buildError(nameof(request.TimeEntryId), InputValidationMessageEnum.INVALID_TIME_ENTRY));

            if (checkNonESLUser(request.TeamLeaderId))
                errors.Add(buildError(nameof(request.TeamLeaderId), InputValidationMessageEnum.INVALID_TEAM_LEADER));

            if (eslOffsetErrors != null)
                errors.AddRange(eslOffsetErrors);

            return errors;
        }

        public List<IError> checkESLOffsetRequestInput(CreateESLOffsetRequest request)
        {
            var errors = new List<IError>();

            if (!checkUserExist(request.UserId))
                errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.INVALID_USER));

            if (checkNonESLUser(request.UserId))
                errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.INVALID_ESL_USER));

            if (!checkTimeEntryExist(request.TimeEntryId))
                errors.Add(buildError(nameof(request.TimeEntryId), InputValidationMessageEnum.INVALID_TIME_ENTRY));

            if (checkNonESLUser(request.TeamLeaderId))
                errors.Add(buildError(nameof(request.TeamLeaderId), InputValidationMessageEnum.INVALID_TEAM_LEADER));

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

        internal List<IError> CheckEmployeeScheduleRequestInput(CreateEmployeeScheduleRequest request)
        {
            var errors = new List<IError>();

            if (!CheckHrRole(request.UserId))
                errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.NOT_HR_ADMIN));

            if (string.IsNullOrEmpty(request.ScheduleName))
            {
                errors.Add(buildError(nameof(request.ScheduleName), InputValidationMessageEnum.INVALID_SCHEDULE_NAME));
            }

            if (!CheckScheduleNameAlreadyExist(request.ScheduleName!).Result)
                errors.Add(buildError(nameof(request.ScheduleName), InputValidationMessageEnum.DUPLICATE_SCHEDULE_NAME));

            foreach (var workingDay in request.WorkingDays)
            {
                if (string.IsNullOrEmpty(workingDay.Day))
                {
                    errors.Add(buildError(nameof(workingDay.Day), InputValidationMessageEnum.INVALID_DAY));
                }

                if (string.IsNullOrEmpty(workingDay.From))
                {
                    errors.Add(buildError(nameof(workingDay.From), InputValidationMessageEnum.INVALID_START_TIME));
                }

                if (string.IsNullOrEmpty(workingDay.To))
                {
                    errors.Add(buildError(nameof(workingDay.To), InputValidationMessageEnum.INVALID_END_TIME));
                }
            }

            return errors;
        }

        public async Task<bool> CheckScheduleNameAlreadyExist(string scheduleName)
        {
            using HrisContext context = _contextFactory.CreateDbContext();
            var workingDay = await context.EmployeeSchedules.Where(x => x.Name == scheduleName).FirstOrDefaultAsync();
            return workingDay == null;
        }

        private bool CheckHrRole(int userId)
        {
            using HrisContext context = _contextFactory.CreateDbContext();
            var user = context.Users.Include(x => x.Role).Where(x => x.Id == userId).FirstOrDefault();
            return user?.Role.Name?.ToLower() == RoleEnum.HR_ADMIN.ToLower();
        }

        private bool CheckScheduleNameExist(string scheduleName, int employeeScheduleId)
        {
            using HrisContext context = _contextFactory.CreateDbContext();
            var user = context.EmployeeSchedules.Where(x => x.Name == scheduleName).FirstOrDefault();
            if (user?.Id == employeeScheduleId) return false;
            return user != null;
        }

        private bool CheckScheduleExist(int employeeScheduleId)
        {
            using HrisContext context = _contextFactory.CreateDbContext();
            var user = context.EmployeeSchedules.Where(x => x.Id == employeeScheduleId).FirstOrDefault();
            return user == null;
        }

        internal List<IError> CheckUpdateEmployeeScheduleRequestInput(UpdateEmployeeScheduleRequest request)
        {
            var errors = new List<IError>();

            if (!CheckHrRole(request.UserId))
                errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.NOT_HR_ADMIN));

            if (string.IsNullOrEmpty(request.ScheduleName))
            {
                errors.Add(buildError(nameof(request.ScheduleName), InputValidationMessageEnum.INVALID_SCHEDULE_NAME));
            }

            if (CheckScheduleExist(request.EmployeeScheduleId))
                errors.Add(buildError(nameof(request.EmployeeScheduleId), InputValidationMessageEnum.INVALID_SCHEDULE_ID));

            if (CheckScheduleNameExist(request.ScheduleName!, request.EmployeeScheduleId))
                errors.Add(buildError(nameof(request.EmployeeScheduleId), InputValidationMessageEnum.DUPLICATE_SCHEDULE_NAME));

            foreach (var workingDay in request.WorkingDays)
            {
                if (string.IsNullOrEmpty(workingDay.Day))
                {
                    errors.Add(buildError(nameof(workingDay.Day), InputValidationMessageEnum.INVALID_DAY));
                }

                if (string.IsNullOrEmpty(workingDay.From))
                {
                    errors.Add(buildError(nameof(workingDay.From), InputValidationMessageEnum.INVALID_START_TIME));
                }

                if (string.IsNullOrEmpty(workingDay.To))
                {
                    errors.Add(buildError(nameof(workingDay.To), InputValidationMessageEnum.INVALID_END_TIME));
                }
            }
            return errors;
        }

        private static bool CheckEmployeeWithinSchedule(int employeeId, int scheduleId, HrisContext context)
        {
            var employee = context.Users.Where(x => x.Id == employeeId).FirstOrDefault();
            if (!CheckUserExist(employeeId, context)) return false;
            return employee!.EmployeeScheduleId == scheduleId;
        }

        private static bool CheckUserExist(int id, HrisContext context)
        {
            var user = context.Users.Find(id);
            return user != null;
        }

        internal List<IError> CheckAddMemberRequestInput(AddMemberToScheduleRequest request, HrisContext context)
        {
            var errors = new List<IError>();
            // Check HR role
            if (!CheckHrRole(request.UserId))
                errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.NOT_HR_ADMIN));

            // Check Schedule exists
            if (CheckScheduleExist(request.ScheduleId))
                errors.Add(buildError(nameof(request.ScheduleId), InputValidationMessageEnum.INVALID_SCHEDULE_ID));

            foreach (int employeeId in request.EmployeeIds)
            {
                // Check if employee exists
                if (!checkUserExist(employeeId))
                    errors.Add(buildError(nameof(employeeId), InputValidationMessageEnum.INVALID_EMPLOYEE));

                // Check if the employee already in the schedule
                if (CheckEmployeeWithinSchedule(employeeId, request.ScheduleId, context))
                {
                    User? user = context.Users.Find(employeeId);
                    errors.Add(buildError(nameof(request.ScheduleId), user!.Name + InputValidationMessageEnum.DUPLICATE_EMPLOYEE));
                }
            }

            return errors;
        }
        internal List<IError> CheckDeleteEmployeeScheduleRequestInput(DeleteEmployeeScheduleRequest request)
        {
            var errors = new List<IError>();

            if (!CheckHrRole(request.UserId))
                errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.NOT_HR_ADMIN));

            if (CheckScheduleExist(request.EmployeeScheduleId))
                errors.Add(buildError(nameof(request.EmployeeScheduleId), InputValidationMessageEnum.INVALID_SCHEDULE_ID));

            return errors;
        }

        internal List<IError> CheckUpdateMemberScheduleRequestInput(UpdateMemberScheduleRequest request, HrisContext context)
        {
            var errors = new List<IError>();
            // Check HR role
            if (!CheckHrRole(request.UserId))
                errors.Add(buildError(nameof(request.UserId), InputValidationMessageEnum.NOT_HR_ADMIN));

            // Check Schedule exists
            if (CheckScheduleExist(request.ScheduleId))
                errors.Add(buildError(nameof(request.ScheduleId), InputValidationMessageEnum.INVALID_SCHEDULE_ID));

            // Check if employee exists
            if (!checkUserExist(request.EmployeeId))
                errors.Add(buildError(nameof(request.EmployeeId), InputValidationMessageEnum.INVALID_EMPLOYEE));

            // Check if the employee already in the schedule
            if (CheckEmployeeWithinSchedule(request.EmployeeId, request.ScheduleId, context))
            {
                User? user = context.Users.Find(request.EmployeeId);
                errors.Add(buildError(nameof(request.ScheduleId), user!.Name + InputValidationMessageEnum.DUPLICATE_EMPLOYEE));
            }

            return errors;
        }
    }
}
