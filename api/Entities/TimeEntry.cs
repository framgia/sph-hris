using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    public class TimeEntry : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int? TimeInId { get; set; }
        public int? TimeOutId { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan WorkedHours { get; set; }
        public TimeSpan TrackedHours { get; set; }
        public User User { get; set; } = default!;
        public Time? TimeIn { get; set; }
        public Time? TimeOut { get; set; }
    }
}

namespace api.Entities
{
    public class TimeEntryDTO : TimeEntry
    {
        private static int ONTIME = 0;
        private static string ABSENT = "absent";
        private static string ONDUTY = "on-duty";
        public TimeEntryDTO(TimeEntry timeEntry)
        {
            Id = timeEntry.Id;
            UserId = timeEntry.UserId;
            TimeInId = timeEntry.TimeInId;
            TimeOutId = timeEntry.TimeOutId;
            StartTime = timeEntry.StartTime.ToString(@"hh\:mm\:ss");
            EndTime = timeEntry.EndTime.ToString(@"hh\:mm\:ss");
            Date = timeEntry.Date;
            WorkedHours = timeEntry.WorkedHours.ToString(@"hh\:mm\:ss");
            TrackedHours = timeEntry.TrackedHours.ToString(@"hh\:mm\:ss");
            User = timeEntry.User;
            TimeIn = new TimeDTO(timeEntry.TimeIn);
            TimeOut = new TimeDTO(timeEntry.TimeOut);
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

            if (timeEntry.TimeIn != null && timeEntry.TimeOut != null)
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

        public int? Late { get; set; }
        public int? Undertime { get; set; }
        public int? Overtime { get; set; }

        public string Status { get; set; }
    }
}
