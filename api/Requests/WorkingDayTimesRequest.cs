namespace api.Requests
{
    public class WorkingDayTimesRequest
    {
        public string? Day { get; set; }
        public string? From { get; set; }
        public string? To { get; set; }
        public string? BreakFrom { get; set; }
        public string? BreakTo { get; set; }
    }
}
