namespace api.Requests
{
    public class UpdateEmployeeScheduleRequest
    {
        public int UserId { get; set; }
        public int EmployeeScheduleId { get; set; }
        public string? ScheduleName { get; set; }
        public List<WorkingDayTimesRequest> WorkingDays { get; set; } = null!;

    }
}
