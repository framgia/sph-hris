namespace api.Requests
{
    public class CreateLeaveRequest
    {
        public int UserId { get; set; }
        public int ProjectId { get; set; }
        public int LeaveTypeId { get; set; }
        public int? ManagerId { get; set; }
        public string? OtherProject { get; set; }
        public string? Reason { get; set; }
        public bool IsWithPay { get; set; }
        public List<string>? LeaveDates { get; set; }
        public string? From { get; set; }
        public string? To { get; set; }
    }
}
