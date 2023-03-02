namespace api.Entities
{
    public class OvertimeNotification : Notification
    {
        public int OvertimeId { get; set; }
        public Overtime Overtime { get; set; } = default!;
    }
}
