namespace api.Requests
{
    public class CreateInterruptionRequest
    {
        public int TimeEntryId { get; set; }
        public int WorkInterruptionTypeId { get; set; }
        public TimeSpan? TimeOut { get; set; }
        public TimeSpan? TimeIn { get; set; }
        public string? Remarks { get; set; }
        public string? OtherReason { get; set; }
    }
}
