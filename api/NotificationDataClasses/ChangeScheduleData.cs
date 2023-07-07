using api.Requests;

namespace api.NotificationDataClasses
{
    public class ChangeScheduleData : NotificationData
    {
        public List<WorkingDayTimesRequest> WorkingDays { get; set; } = default!;
    }
}
