namespace api.Requests
{
    public class CreateChangeShiftRequest
    {
        public int UserId { get; set; }
        public int TimeEntryId { get; set; }
        public int ManagerId { get; set; }
        public string TimeIn { get; set; } = default!;
        public string TimeOut { get; set; } = default!;
        public string? OtherProject { get; set; } = default!;
        public string Description { get; set; } = default!;
        public List<MultiProjectRequest> Projects { get; set; } = default!;
    }
}
