namespace api.NotificationDataClasses
{
    public class OvertimeData
    {
        public NotificationUser User { get; set; } = default!;
        public int RequestedMinutes { get; set; }
        public DateTime DateRequested { get; set; }
        public DateTime DateFiled { get; set; }
        public string Type { get; set; } = default!;
        public string Status { get; set; } = default!;
        public string? Remarks { get; set; } = default!;
    }

    public class OvertimeManagerData : OvertimeData
    {
        public IQueryable<string?> Projects { get; set; } = default!;
    }

    public class OvertimeLeaderData : OvertimeData
    {
        public List<string> Projects { get; set; } = default!;
    }

    public class BulkOvertimeManagerData : OvertimeManagerData
    {
        public NotificationUser ProjectMember { get; set; } = default!;
    }
}
