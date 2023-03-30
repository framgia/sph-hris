namespace api.Entities
{
    public class ESLChangeShiftNotification : Notification
    {
        public int ESLChangeShiftRequestId { get; set; }
        public ESLChangeShiftRequest ESLChangeShiftRequest { get; set; } = default!;
    }
}
