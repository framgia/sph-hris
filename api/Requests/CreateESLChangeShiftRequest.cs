namespace api.Requests
{
    public class CreateESLChangeShiftRequest
    {
        public int UserId { get; set; }
        public int TimeEntryId { get; set; }
        public int TeamLeaderId { get; set; }
        public string TimeIn { get; set; } = default!;
        public string TimeOut { get; set; } = default!;
        public string Description { get; set; } = default!;
        public List<int> ESLOffsetIDs { get; set; } = default!;
    }
}
