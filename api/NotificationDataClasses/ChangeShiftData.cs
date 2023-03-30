namespace api.NotificationDataClasses
{
    public class ChangeShiftData
    {
        public NotificationUser User { get; set; } = default!;
        public TimeSpan RequestedTimeIn { get; set; }
        public TimeSpan RequestedTimeOut { get; set; }
        public DateTime Date { get; set; }
        public DateTime DateFiled { get; set; }
        public string Type { get; set; } = default!;
        public string Status { get; set; } = default!;
        public string? Description { get; set; } = default!;
    }

    public class ChangeShiftManagerData : ChangeShiftData
    {
        public IQueryable<string?> Projects { get; set; } = default!;
    }

    public class ChangeShiftLeaderData : ChangeShiftData
    {
        public List<string> Projects { get; set; } = default!;
    }
}
