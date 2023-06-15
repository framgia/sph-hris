namespace api.Requests
{
    public class CreateSummaryRequest
    {
        public int HrAdminId { get; set; }
        public int ManagerId { get; set; }
        public string StartDate { get; set; } = default!;
        public string EndDate { get; set; } = default!;
    }
}
