namespace api.Requests
{
    public class TimeOutRequest
    {
        public int UserId { get; set; }
        public int? TimeEntryId { get; set; }
        public TimeSpan TimeHour { get; set; }
        public string? Remarks { get; set; }
    }
}
