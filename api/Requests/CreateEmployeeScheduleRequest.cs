namespace api.Requests
{
    public class CreateEmployeeScheduleRequest
    {
        public int UserId { get; set; }
        public string? ScheduleName { get; set; }
        public List<WorkingDayTimesRequest> WorkingDays { get; set; } = null!;
    }
}
