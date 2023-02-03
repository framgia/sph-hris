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
        public List<LeaveDateRequest>? LeaveDates { get; set; }
    }
}
