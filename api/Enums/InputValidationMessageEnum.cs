namespace api.Enums
{
    public class InputValidationMessageEnum
    {
        public const string ALREADY_USED_ESL_OFFSET = "Already used ESL Offset ID";
        public const string INVALID_USER_ID = "Invalid user ID";
        public const string INVALID_USER = "User doesn't exist";
        public const string INVALID_EMPLOYEE = "Employee doesn't exist";
        public const string INVALID_MANAGER = "Manager doesn't exist";
        public const string INVALID_PROJECT_LEADER = "Project Leader doesn't exist";
        public const string INVALID_TEAM_LEADER = "Invalid Team Leader";
        public const string INVALID_PROJECT = "Project doesn't exist";
        public const string INVALID_OVERTIME = "Overtime doesn't exist";
        public const string INVALID_LEAVE = "Leave doesn't exist";
        public const string INVALID_TIME_ENTRY = "Time entry doesn't exist";
        public const string INVALID_NON_ESL_USER = "User should not be an ESL Teacher";
        public const string INVALID_ESL_USER = "User should be an ESL Teacher";
        public const string INVALID_ESL_OFFSET_IDS = "Invalid ESL Offset IDs";
        public const string INVALID_DATE = "Invalid Date";
        public const string INVALID_LEAVE_TYPE = "Invalid leave type";
        public const string INVALID_DAY = "Invalid Day";
        public const string INVALID_END_TIME = "Invalid End Time";
        public const string INVALID_START_TIME = "Invalid Start Time";
        public const string INVALID_SCHEDULE = "Schedule doesn't exist";
        public const string INVALID_SCHEDULE_NAME = "Invalid Schedule Name";
        public const string INVALID_SCHEDULE_ID = "Employee schedule does not exist";
        public const string MISSING_LEAVE_DATES = "Leave Date/s is required";
        public const string MISSING_PROJECTS = "Project/s is required";
        public const string MISSING_APPROVED_MINUTES = "Approved minutes is required";
        public const string INVALID_NOTIFICATION = "Invalid Notification";
        public const string NOT_MANAGER_PROJECT_LEADER = "User is not Manager or Project Leader";
        public const string NOT_HR_ADMIN = "User is not an HR Admin";
        public const string MISMATCH_PROJECT_LEADER = "Project Leader doesn't match";
        public const string MISMATCH_MANAGER = "Manager doesn't match";
        public const string DUPLICATE_REQUEST = "There's already an existing request!";
        public const string DUPLICATE_SCHEDULE_NAME = "Schedule name already exists!";
        public const string DUPLICATE_EMPLOYEE = " is already in the schedule!";
    }
}
