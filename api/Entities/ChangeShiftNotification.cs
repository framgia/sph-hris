namespace api.Entities
{
    public class ChangeShiftNotification : Notification
    {
        public int ChangeShiftRequestId { get; set; }
        public ChangeShiftRequest ChangeShiftRequest { get; set; } = default!;
    }
}
