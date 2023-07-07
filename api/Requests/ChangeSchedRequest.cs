namespace api.Requests
{
    public class ChangeSchedRequest
    {
        public List<int> LeaderIds { get; set; } = default!;
        public List<WorkingDayTimesRequest> WorkingDays { get; set; } = default!;
    }
}
