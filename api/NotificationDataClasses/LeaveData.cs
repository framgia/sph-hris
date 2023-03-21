namespace api.NotificationDataClasses
{
    public class LeaveData
    {
        public NotificationUser User { get; set; } = default!;
        public float RequestedHours { get; set; }
        public DateTime DateRequested { get; set; }
        public DateTime DateFiled { get; set; }
        public string Type { get; set; } = default!;
        public string Status { get; set; } = default!;
        public string? Remarks { get; set; } = default!;
    }

    public class LeaveManagerData : LeaveData
    {
        public IQueryable<string?> Projects { get; set; } = default!;
    }

    public class LeaveLeaderData : LeaveData
    {
        public List<string> Projects { get; set; } = default!;
    }
}
