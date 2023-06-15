namespace api.Requests
{
    public class CreateBulkOvertimeRequest
    {
        public int ManagerId { get; set; }
        public string? OtherProject { get; set; }
        public int RequestedMinutes { get; set; }
        public string Remarks { get; set; } = default!;
        public string Date { get; set; } = default!;
        public List<int> EmployeeIds { get; set; } = default!;
        public int ProjectId { get; set; } = default!;
    }
}
