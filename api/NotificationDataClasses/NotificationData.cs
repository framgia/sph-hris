namespace api.NotificationDataClasses
{
    public class NotificationData
    {
        public NotificationUser User { get; set; } = default!;
        public string Type { get; set; } = default!;
        public string Status { get; set; } = default!;
        public string? Remarks { get; set; } = default!;
    }
}
