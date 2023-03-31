namespace api.Entities
{
    public class ESLOffsetNotification : Notification
    {
        public int ESLOffsetId { get; set; }
        public ESLOffset ESLOffset { get; set; } = default!;
    }
}
