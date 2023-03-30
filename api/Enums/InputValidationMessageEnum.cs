namespace api.Enums
{
    public class InputValidationMessageEnum
    {
        public const string INVALID_USER = "User doesn't exist";
        public const string INVALID_MANAGER = "Manager doesn't exist";
        public const string INVALID_PROJECT_LEADER = "Project Leader doesn't exist";
        public const string INVALID_TEAM_LEADER = "Invalid Team Leader";
        public const string INVALID_PROJECT = "Project doesn't exist";
        public const string INVALID_OVERTIME = "Overtime doesn't exist";
        public const string INVALID_LEAVE = "Leave doesn't exist";
        public const string INVALID_TIME_ENTRY = "Time entry doesn't exist";
        public const string INVALID_NON_ESL_USER = "User should not be an ESL Teacher";
        public const string INVALID_ESL_USER = "User should be an ESL Teacher";
        public const string INVALID_DATE = "Invalid Date";
        public const string INVALID_LEAVE_TYPE = "Invalid leave type";
        public const string MISSING_LEAVE_DATES = "Leave Date/s is required";
        public const string MISSING_PROJECTS = "Project/s is required";
        public const string MISSING_APPROVED_MINUTES = "Approved minutes is required";
        public const string INVALID_NOTIFICATION = "Invalid Notification";
        public const string NOT_MANAGER_PROJECT_LEADER = "User is not Manager or Project Leader";
        public const string MISMATCH_PROJECT_LEADER = "Project Leader doesn't match";
        public const string MISMATCH_MANAGER = "Manager doesn't match";
        public const string DUPLICATE_REQUEST = "There's already an existing request!";
    }
}
