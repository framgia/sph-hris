namespace api.Requests
{
    public class AddMemberToScheduleRequest
    {
        public int UserId { get; set; }
        public List<int> EmployeeIds { get; set; } = null!;
        public int ScheduleId { get; set; }
    }
}
