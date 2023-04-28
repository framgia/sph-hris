namespace api.Requests
{
    public class UpdateMemberScheduleRequest
    {
        public int UserId { get; set; }
        public int EmployeeId { get; set; }
        public int ScheduleId { get; set; }
    }
}
