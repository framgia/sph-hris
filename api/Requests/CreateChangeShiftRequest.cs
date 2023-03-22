namespace api.Requests
{
    public class CreateChangeShiftRequest
    {
        public int UserId { get; set; }
        public int TimeEntryId { get; set; }
        public int ManagerId { get; set; }
        public TimeSpan TimeIn { get; set; }
        public TimeSpan TimeOut { get; set; }
        public string? OtherProject { get; set; } = default!;
        public string Description { get; set; } = default!;
        public List<MultiProjectRequest> Projects { get; set; } = default!;
    }
}
