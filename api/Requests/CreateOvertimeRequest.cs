namespace api.Requests
{
    public class CreateOvertimeRequest
    {
        public int UserId { get; set; }
        public int ManagerId { get; set; }
        public string? OtherProject { get; set; }
        public int RequestedMinutes { get; set; }
        public string? Remarks { get; set; }
        public string Date { get; set; } = default!;
        public List<MultiProjectRequest> OvertimeProjects { get; set; } = default!;
    }
}
