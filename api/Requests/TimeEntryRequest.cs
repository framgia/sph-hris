namespace api.Requests
{
    public class UpdateTimeEntry
    {
        public int UserId { get; set; }
        public int TimeEntryId { get; set; }
        public string? TimeIn { get; set; }
        public string? TimeOut { get; set; }
    }
}
