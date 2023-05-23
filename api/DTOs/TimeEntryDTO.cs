using api.Entities;
using api.Enums;

namespace api.DTOs
{
    public class TimeEntryDTO : TimeEntry
    {
        private static readonly int ONTIME = 0;

        // override
        public new UserDTO User { get; set; }
        public new string? StartTime { get; set; }
        public new string? EndTime { get; set; }
        public new string? WorkedHours { get; set; }
        public new string? TrackedHours { get; set; }
        public new TimeDTO? TimeIn { get; set; }
        public new TimeDTO? TimeOut { get; set; }
        public new DateOnly Date { get; set; }

        public int Late { get; set; }
        public int Undertime { get; set; }

        public string Status { get; set; }
        public ChangeShiftDTO? ChangeShift { get; set; }
        public ESLChangeShiftDTO? ESLChangeShift { get; set; }

        public TimeEntryDTO(TimeEntry timeEntry, Leave? leave, string domain, ChangeShiftRequest? changeShift, ESLChangeShiftRequest? eslChangeShift)
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
            User = new UserDTO(timeEntry.User, domain);
            TimeIn = timeEntry.TimeIn != null ? new TimeDTO(timeEntry.TimeIn) : null;
            TimeOut = timeEntry.TimeOut != null ? new TimeDTO(timeEntry.TimeOut) : null;
            Overtime = timeEntry.Overtime;
            Undertime = 0;
            Late = 0;
            ChangeShift = changeShift != null ? new ChangeShiftDTO(changeShift) : null;
            ESLChangeShift = eslChangeShift != null ? new ESLChangeShiftDTO(eslChangeShift) : null;

            TimeSpan breakStart = timeEntry.BreakStartTime;
            TimeSpan breakEnd = timeEntry.BreakEndTime;

            if (timeEntry.TimeIn != null && TimeSpan.Compare(timeEntry.TimeIn.TimeHour, timeEntry.StartTime) > ONTIME)
            {
                this.Late = (int)timeEntry.TimeIn.TimeHour.Subtract(timeEntry.StartTime).TotalMinutes;
            }

            //  Handle early logout
            if (timeEntry.TimeOut != null && TimeSpan.Compare(timeEntry.EndTime, timeEntry.TimeOut.TimeHour) > ONTIME && timeEntry.CreatedAt?.Day == timeEntry.TimeOut.CreatedAt?.Day)
            {
                this.Undertime = this.Undertime + (int)timeEntry.EndTime.Subtract(timeEntry.TimeOut.TimeHour).TotalMinutes;

                // handle logout during noon break
                if (TimeSpan.Compare(timeEntry.TimeOut.TimeHour, breakStart) >= 0 && TimeSpan.Compare(timeEntry.TimeOut.TimeHour, breakEnd) <= 0)
                {
                    this.Undertime = this.Undertime - (int)(breakEnd - timeEntry.TimeOut.TimeHour).TotalMinutes;
                }
                // handle logout before noon break
                else if (TimeSpan.Compare(breakStart, timeEntry.TimeOut.TimeHour) >= 0)
                {
                    this.Undertime -= (int)(breakEnd - breakStart).TotalMinutes;
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
                        if ((breakEnd - interruptions.TimeIn)?.TotalMinutes >= 0 && (interruptions.TimeOut - breakStart)?.TotalMinutes >= 0)
                        {
                            difference = 0;
                        }
                        // interruption before noon until noon break
                        else if ((breakStart - interruptions.TimeOut)?.TotalMinutes >= 0 && (interruptions.TimeIn - breakStart)?.TotalMinutes > 0 && (breakEnd - interruptions.TimeIn)?.TotalMinutes >= 0)
                        {
                            difference = difference - (interruptions.TimeIn - breakStart).Value.TotalMinutes;
                        }
                        // interruption during noon break until after noon break
                        else if ((breakEnd - interruptions.TimeOut)?.TotalMinutes > 0 && (interruptions.TimeIn - breakEnd)?.TotalMinutes >= 0 && (interruptions.TimeOut - breakStart)?.TotalMinutes >= 0)
                        {
                            difference = difference - (breakEnd - interruptions.TimeOut).Value.TotalMinutes;
                        }
                        // noon break in duration of interruption
                        else if ((breakStart - interruptions.TimeOut)?.TotalMinutes >= 0 && (breakEnd - interruptions.TimeIn)?.TotalMinutes <= 0)
                        {
                            difference = difference - (breakEnd - breakStart).TotalMinutes;
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
                DateTime currentDate = DateTime.Now;
                TimeSpan currentTimeSpan = new TimeSpan(currentDate.Hour, currentDate.Minute, 0);
                TimeSpan timeZero = TimeSpan.FromHours(0);
                bool sameToday = timeEntry.Date.Day == currentDate.Day;
                bool isWorkTime = currentTimeSpan <= timeEntry.EndTime;
                bool isRestDay = timeEntry.StartTime == timeZero && timeEntry.EndTime == timeZero && timeEntry.BreakStartTime == timeZero && timeEntry.BreakEndTime == timeZero;

                if (isRestDay)
                {
                    Status = WorkStatusEnum.REST;
                }
                else if (sameToday && isWorkTime)
                {
                    Status = WorkStatusEnum.AWAITING;
                }
                else
                {
                    Status = WorkStatusEnum.ABSENT;
                }
            }
            else
            {
                Status = WorkStatusEnum.ONDUTY;
            }
        }

        // private methods
        private Overtime? OnlyApprovedOvertime(TimeEntry timeEntry)
        {
            if (timeEntry.Overtime != null && timeEntry.Overtime.IsLeaderApproved == true && timeEntry.Overtime.IsManagerApproved == true) return timeEntry.Overtime;
            else return null;
        }
    }
}
