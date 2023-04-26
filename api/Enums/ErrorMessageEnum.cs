namespace api.Enums
{
    public static class ErrorMessageEnum
    {
        public const string FAILED_OVERTIME_REQUEST = "Overtime Request Failed.";
        public const string FAILED_LEAVE_REQUEST = "Leave/Undertime Request Failed.";
        public const string FAILED_SCHEDULE_CREATION = "Failed to create schedule!";
        public const string FAILED_SCHEDULE_UPDATE = "Failed to update schedule!";
        public const string FAILED_ADDING_USER_TO_SCHEDULE = "Failed to add user to schedule!";
        public const string FAILED_SCHEDULE_DELETE = "Failed to delete schedule!";
        public const string FAILED_SCHEDULE_DELETE_USER = "Schedule has currently assigned Employees. Failed to delete schedule!";
    }
}
