namespace api.Requests
{
    public class LeaveDateRequest
    {
        public string LeaveDate { get; set; } = default!;
        public bool IsWithPay { get; set; }
        public float Days { get; set; }
    }
}
