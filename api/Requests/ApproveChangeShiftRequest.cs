namespace api.Requests
{
    public class ApproveChangeShiftRequest
    {
        public int UserId { get; set; }
        public int NotificationId { get; set; }
        public bool IsApproved { get; set; }
    }
}
