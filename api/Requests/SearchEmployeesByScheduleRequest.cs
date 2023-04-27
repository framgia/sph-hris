namespace api.Requests
{
    public class SearchEmployeesByScheduleRequest
    {
        public int employeeScheduleId { get; set; }
        public string searchKey { get; set; } = default!;
    }
}
