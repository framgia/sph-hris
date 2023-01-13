namespace api.Requests
{
    public class TimeInRequest
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public TimeSpan TimeHour { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string? Remarks { get; set; }
        public List<IFile>? files { get; set; }
    }
}
