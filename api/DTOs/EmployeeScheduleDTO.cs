using api.Entities;
using api.Enums;

namespace api.DTOs
{
    public class EmployeeScheduleDTO : WorkingDayTime
    {
        public new int? Id { get; set; }
        public string? ScheduleName { get; set; }
        public ICollection<Day> Days { get; set; }
        public int MemberCount { get; set; }

        public EmployeeScheduleDTO(EmployeeSchedule employeeSchedule)
        {
            Id = employeeSchedule.Id;
            ScheduleName = employeeSchedule.Name;
            Days = new List<Day>();
            MemberCount = employeeSchedule.Users.Count();
            if (employeeSchedule.WorkingDayTimes is not null)
            {
                string[]? DaysOfTheWeek = { DaysOfTheWeekEnum.MONDAY, DaysOfTheWeekEnum.TUESDAY, DaysOfTheWeekEnum.WEDNESDAY, DaysOfTheWeekEnum.THURSDAY, DaysOfTheWeekEnum.FRIDAY, DaysOfTheWeekEnum.SATURDAY, DaysOfTheWeekEnum.SUNDAY };

                // For included days of the week
                foreach (var workingDayTime in employeeSchedule.WorkingDayTimes)
                {
                    Day workingDayTimes = new(workingDayTime.Day, workingDayTime.From.ToString(@"hh\:mm"), workingDayTime.To.ToString(@"hh\:mm"), true);
                    DaysOfTheWeek = DaysOfTheWeek.Where(val => val.ToLower() != workingDayTime.Day?.ToLower()).ToArray();
                    Days.Add(workingDayTimes);
                }

                // For exluded days of the week
                foreach (var DayOfTheWeek in DaysOfTheWeek)
                {
                    Day workingDayTimes = new(DayOfTheWeek, "", "", false);
                    Days.Add(workingDayTimes);
                }
            }
        }
    }

    public class Day
    {
        public bool? IsDaySelected { get; set; }
        public string? WorkingDay { get; set; }
        public string? TimeIn { get; set; }
        public string? TimeOut { get; set; }

        public Day(string? workingDay, string timeIn, string timeOut, bool selected)
        {
            IsDaySelected = selected;
            WorkingDay = workingDay;
            TimeIn = timeIn;
            TimeOut = timeOut;
        }
    }
}
