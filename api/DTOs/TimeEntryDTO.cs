using api.Entities;

namespace api.DTOs
{
    public class TimeEntryDTO : TimeEntry
    {
        private static readonly int ONTIME = 0;
        private static readonly string ABSENT = "absent";
        private static readonly string ONDUTY = "on-duty";
        public TimeEntryDTO(TimeEntry timeEntry)
        {
            Id = timeEntry.Id;
            UserId = timeEntry.UserId;
            TimeInId = timeEntry.TimeInId;
            TimeOutId = timeEntry.TimeOutId;
            StartTime = timeEntry.StartTime.ToString(@"hh\:mm");
            EndTime = timeEntry.EndTime.ToString(@"hh\:mm");
            Date = DateOnly.FromDateTime(timeEntry.Date);
            WorkedHours = timeEntry.WorkedHours.ToString(@"hh\:mm");
            TrackedHours = timeEntry.TrackedHours.ToString(@"hh\:mm");
            User = timeEntry.User;
            TimeIn = timeEntry.TimeIn != null ? new TimeDTO(timeEntry.TimeIn) : null;
            TimeOut = timeEntry.TimeOut != null ? new TimeDTO(timeEntry.TimeOut) : null;
            Overtime = 0;   // for now, default to 0

            if (timeEntry.TimeIn != null && TimeSpan.Compare(timeEntry.TimeIn.TimeHour, timeEntry.StartTime) > ONTIME)
            {
                Late = (int)timeEntry.TimeIn.TimeHour.Subtract(timeEntry.StartTime).TotalMinutes;
            }
            else
            {
                Late = 0;
            }

            if (timeEntry.TimeOut != null && TimeSpan.Compare(timeEntry.EndTime, timeEntry.TimeOut.TimeHour) > ONTIME)
            {
                Undertime = (int)timeEntry.EndTime.Subtract(timeEntry.TimeOut.TimeHour).TotalMinutes;
            }
            else
            {
                Undertime = 0;
            }

            if (timeEntry.TimeIn == null && timeEntry.TimeOut == null)
            {
                Status = ABSENT;
            }
            else
            {
                Status = ONDUTY;
            }
        }

        // override
        public new string? StartTime { get; set; }
        public new string? EndTime { get; set; }
        public new string? WorkedHours { get; set; }
        public new string? TrackedHours { get; set; }
        public new TimeDTO? TimeIn { get; set; }
        public new TimeDTO? TimeOut { get; set; }
        public new DateOnly Date { get; set; }

        public int Late { get; set; }
        public int Undertime { get; set; }
        public int Overtime { get; set; }

        public string Status { get; set; }
    }
}
