namespace api.Enums
{
    public static class ErrorMessageEnum
    {
        public const string FAILED_OVERTIME_REQUEST = "Overtime Request Failed.";
        public const string FAILED_LEAVE_REQUEST = "Leave/Undertime Request Failed.";
        public const string FAILED_SCHEDULE_CREATION = "Failed to create schedule!";
        public const string FAILED_SCHEDULE_UPDATE = "Failed to update schedule!";
        public const string FAILED_ADDING_USER_TO_SCHEDULE = "Failed to add user to schedule!";
        public const string FAILED_ADDING_NEW_EMPLOYEE = "Failed to add new employee!";
        public const string FAILED_SCHEDULE_DELETE = "Failed to delete schedule!";
        public const string FAILED_SCHEDULE_DELETE_USER = "Schedule has currently assigned Employees. Failed to delete schedule!";
        public const string MAXIMUM_LIMIT_OF_PAID_LEAVES = " has 0 remaining paid leaves!";
        public const string EXCEEDS_MAXIMUM_REMAINING_PAID_LEAVES = " does not have enough remaining paid leaves!";
        public const string LEAVE_USERDETAILS_NULL_IDENTIFIER = "Leave or userDetails is null";
        public const string FAILED_LEAVE_CANCEL = "Failed to cancel leave!";
        public const string EMPTY_OVERTIME = "Empty overtime request range";
    }
}
