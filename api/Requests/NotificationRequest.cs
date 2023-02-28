namespace api.Requests
{
    public class NotificationRequest
    {
        public int Id { get; set; }
        public DateTime? ReadAt { get; set; } = default!;
    }
}
