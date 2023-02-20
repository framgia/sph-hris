namespace api.Entities
{
    public class LeaveNotification : Notification
    {
        public int LeaveId { get; set; }
        public Leave Leave { get; set; } = default!;
    }
}
