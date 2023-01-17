namespace api.Entities
{
    public class WorkInterruption : BaseEntity
    {
        public int Id { get; set; }
        public int TimeEntryId { get; set; }
        public int? WorkInterruptionTypeId { get; set; }
        public string? OtherReason { get; set; }
        public TimeSpan? TimeOut { get; set; }
        public TimeSpan? TimeIn { get; set; }
        public string? Remarks { get; set; }
        public WorkInterruptionType? WorkInterruptionType { get; set; }
        public TimeEntry? TimeEntry { get; set; } = default!;
    }
}
