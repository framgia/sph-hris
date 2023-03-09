namespace api.Enums
{
    public class InputValidationMessageEnum
    {
        public const string INVALID_USER = "User doesn't exist";
        public const string INVALID_MANAGER = "Manager doesn't exist";
        public const string INVALID_PROJECT_LEADER = "Project Leader doesn't exist";
        public const string INVALID_PROJECT = "Project doesn't exist";
        public const string INVALID_OVERTIME = "Overtime doesn't exist";
        public const string INVALID_LEAVE = "Leave doesn't exist";
        public const string INVALID_DATE = "Invalid Date";
        public const string INVALID_LEAVE_TYPE = "Invalid leave type";
        public const string MISSING_LEAVE_DATES = "Leave Date/s is required";
        public const string MISSING_LEAVE_PROJECTS = "Leave Project/s is required";
        public const string MISSING_APPROVED_MINUTES = "Approved minutes is required";
        public const string INVALID_NOTIFICATION = "Invalid Notification";
        public const string NOT_MANAGER_PROJECT_LEADER = "User is not Manager or Project Leader";
        public const string MISMATCH_PROJECT_LEADER = "Project Leader doesn't match";
        public const string MISMATCH_MANAGER = "Manager doesn't match";
    }
}
