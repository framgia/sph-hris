namespace api.Requests
{
    public class ApproveESLChangeShiftRequest
    {
        public int ManagerId { get; set; }
        public int NotificationId { get; set; }
        public bool IsApproved { get; set; }
    }
}
