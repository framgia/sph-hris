using api.Entities;
using api.Enums;

namespace api.DTOs
{
    public class TimeEntryDTO : TimeEntry
    {
        private static readonly int ONTIME = 0;
        public TimeEntryDTO(TimeEntry timeEntry, Leave? leave, string domain)
        {
            Id = timeEntry.Id;
            UserId = timeEntry.UserId;
            TimeInId = timeEntry.TimeInId;
            TimeOutId = timeEntry.TimeOutId;
            StartTime = timeEntry.StartTime.ToString(@"hh\:mm");
            EndTime = timeEntry.EndTime.ToString(@"hh\:mm");
            Date = DateOnly.FromDateTime(timeEntry.Date);
            WorkedHours = timeEntry.WorkedHours?.Remove(timeEntry.WorkedHours.LastIndexOf(':'));
            TrackedHours = timeEntry.TrackedHours.ToString(@"hh\:mm");
            User = timeEntry.User;
            Avatar = $"{domain}/media/{timeEntry.User.ProfileImage!.CollectionName}/{timeEntry.User.ProfileImage!.FileName}";
            TimeIn = timeEntry.TimeIn != null ? new TimeDTO(timeEntry.TimeIn) : null;
            TimeOut = timeEntry.TimeOut != null ? new TimeDTO(timeEntry.TimeOut) : null;
            Overtime = timeEntry.Overtime;   // Overtime Entity
            Undertime = 0;
            Late = 0;

            TimeSpan noonBreakStart = new TimeSpan(12, 0, 0);
            TimeSpan noonBreakEnd = new TimeSpan(13, 0, 0);

            if (timeEntry.TimeIn != null && TimeSpan.Compare(timeEntry.TimeIn.TimeHour, timeEntry.StartTime) > ONTIME)
            {
                this.Late = (int)timeEntry.TimeIn.TimeHour.Subtract(timeEntry.StartTime).TotalMinutes;
            }

            //  Handle early logout
            if (timeEntry.TimeOut != null && TimeSpan.Compare(timeEntry.EndTime, timeEntry.TimeOut.TimeHour) > ONTIME)
            {
                this.Undertime = this.Undertime + (int)timeEntry.EndTime.Subtract(timeEntry.TimeOut.TimeHour).TotalMinutes;

                // handle logout during noon break
                if (TimeSpan.Compare(timeEntry.TimeOut.TimeHour, noonBreakStart) >= 0 && TimeSpan.Compare(timeEntry.TimeOut.TimeHour, noonBreakEnd) <= 0)
                {
                    this.Undertime = this.Undertime - (int)(noonBreakEnd - timeEntry.TimeOut.TimeHour).TotalMinutes;
                }
                // handle logout before noon break
                else if (TimeSpan.Compare(noonBreakStart, timeEntry.TimeOut.TimeHour) >= 0)
                {
                    this.Undertime -= (int)(noonBreakEnd - noonBreakStart).TotalMinutes;
                }
            }

            // Handle work interruptions undertime
            if (timeEntry.WorkInterruptions?.Count > 0)
            {
                foreach (var interruptions in timeEntry.WorkInterruptions)
                {
                    if (interruptions.TimeIn != null && interruptions.TimeOut != null)
                    {
                        var difference = (interruptions.TimeIn - interruptions.TimeOut).Value.TotalMinutes;

                        // interruption during noon break
                        if ((noonBreakEnd - interruptions.TimeIn)?.TotalMinutes >= 0 && (interruptions.TimeOut - noonBreakStart)?.TotalMinutes >= 0)
                        {
                            difference = 0;
                        }
                        // interruption before noon until noon break
                        else if ((noonBreakStart - interruptions.TimeOut)?.TotalMinutes >= 0 && (interruptions.TimeIn - noonBreakStart)?.TotalMinutes > 0 && (noonBreakEnd - interruptions.TimeIn)?.TotalMinutes >= 0)
                        {
                            difference = difference - (interruptions.TimeIn - noonBreakStart).Value.TotalMinutes;
                        }
                        // interruption during noon break until after noon break
                        else if ((noonBreakEnd - interruptions.TimeOut)?.TotalMinutes > 0 && (interruptions.TimeIn - noonBreakEnd)?.TotalMinutes >= 0 && (interruptions.TimeOut - noonBreakStart)?.TotalMinutes >= 0)
                        {
                            difference = difference - (noonBreakEnd - interruptions.TimeOut).Value.TotalMinutes;
                        }
                        // noon break in duration of interruption
                        else if ((noonBreakStart - interruptions.TimeOut)?.TotalMinutes >= 0 && (noonBreakEnd - interruptions.TimeIn)?.TotalMinutes <= 0)
                        {
                            difference = difference - (noonBreakEnd - noonBreakStart).TotalMinutes;
                        }

                        this.Undertime = this.Undertime + (int)difference;
                    }
                }
            }

            if (leave != null)
            {
                Status = (leave.LeaveType.Name!).ToLower();
            }
            else if (timeEntry.TimeIn == null && timeEntry.TimeOut == null)
            {
                Status = WorkStatusEnum.ABSENT;
            }
            else
            {
                Status = WorkStatusEnum.ONDUTY;
            }
        }

        // override
        public new string? StartTime { get; set; }
        public string? Avatar { get; set; }
        public new string? EndTime { get; set; }
        public new string? WorkedHours { get; set; }
        public new string? TrackedHours { get; set; }
        public new TimeDTO? TimeIn { get; set; }
        public new TimeDTO? TimeOut { get; set; }
        public new DateOnly Date { get; set; }

        public int Late { get; set; }
        public int Undertime { get; set; }

        public string Status { get; set; }
    }
}
