namespace api.Requests
{
    public class AddNewEmployeeRequest
    {
        public string Email { get; set; } = default!;
        public int PositionId { get; set; }
        public int RoleId { get; set; }
        public int? ScheduleId { get; set; }
        public string FirstName { get; set; } = default!;
        public string? MiddleName { get; set; }
        public string LastName { get; set; } = default!;
    }
}
