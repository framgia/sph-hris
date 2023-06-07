namespace api.Requests
{
    public class ApproveOvertimeRequest
    {
        public int UserId { get; set; }
        public int? OvertimeId { get; set; }
        public int? NotificationId { get; set; }
        public int? ApprovedMinutes { get; set; }
        public bool IsApproved { get; set; }
        public string? ManagerRemarks { get; set; }
    }
}
