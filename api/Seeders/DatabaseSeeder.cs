using api.Entities;

namespace api.Seeders
{
    public class DatabaseSeeder
    {
        public static EmployeeSchedule employeeSchedule = new EmployeeSchedule
        {
            Id = 1,
            Name = "Morning Shift"
        };
        public static List<WorkingDayTime> workingDayTime = new List<WorkingDayTime>(){
            new WorkingDayTime {
                Id = 1,
                EmployeeScheduleId = employeeSchedule.Id,
                Day="Monday",
                From = new TimeSpan(9, 30, 0),
                To = new TimeSpan(18, 30, 0)
            },
            new WorkingDayTime {
                Id = 2,
                EmployeeScheduleId = employeeSchedule.Id,
                Day="Tuesday",
                From = new TimeSpan(9, 30, 0),
                To = new TimeSpan(18, 30, 0)
            },
            new WorkingDayTime {
                Id = 3,
                EmployeeScheduleId = employeeSchedule.Id,
                Day="Wednesday",
                From = new TimeSpan(9, 30, 0),
                To = new TimeSpan(18, 30, 0)
            },
            new WorkingDayTime {
                Id = 4,
                EmployeeScheduleId = employeeSchedule.Id,
                Day="Thursday",
                From = new TimeSpan(9, 30, 0),
                To = new TimeSpan(18, 30, 0)
            },
            new WorkingDayTime {
                Id = 5,
                EmployeeScheduleId = employeeSchedule.Id,
                Day="Friday",
                From = new TimeSpan(9, 30, 0),
                To = new TimeSpan(18, 30, 0)
            },
        };
        public static User[] users()
        {
            User[] users = {
                new User
                {
                    Id = 1,
                    Name = "John Doe",
                    Email = "johndoe@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false
                },
                new User
                {
                    Id = 2,
                    Name = "Rean Schwarzer",
                    Email = "reanschwarzer@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false
                }
            };
            return users;
        }

        public static Time[] times()
        {
            Time[] times = {
                new Time
                {
                    Id = 1,
                    TimeHour = new TimeSpan(9, 15, 0),
                    Remarks = "First time in"
                },
                new Time
                {
                    Id = 2,
                    TimeHour = new TimeSpan(9, 15, 0),
                    Remarks = "Second time in"
                },
                new Time
                {
                    Id = 3,
                    TimeHour = new TimeSpan(10, 15, 0),
                    Remarks = "Third time in"
                },
                new Time
                {
                    Id = 4,
                    TimeHour = new TimeSpan(18, 15, 0),
                    Remarks = "First time out"
                },
                new Time
                {
                    Id = 5,
                    TimeHour = new TimeSpan(18, 30, 0),
                    Remarks = "Second time out"
                },
                new Time
                {
                    Id = 6,
                    TimeHour = new TimeSpan(19, 59, 0),
                    Remarks = "Third time out"
                }
            };
            return times;
        }

        public static TimeEntry[] timeEntries()
        {
            TimeEntry[] entries = {
                new TimeEntry
                {
                    Id = 1,
                    UserId = 1,
                    Date = DateTime.Now,
                    StartTime = new TimeSpan(9, 30, 0),
                    EndTime = new TimeSpan(18, 30, 0),
                    TimeInId = 1,
                    TimeOutId = 4,
                    WorkedHours = times().First(time => time.Id==4).TimeHour.Subtract(times().First(time => time.Id==1)?.TimeHour ?? DateTime.Now.TimeOfDay).Subtract(TimeSpan.FromHours(1)),
                    TrackedHours = new TimeSpan(18, 30, 0).Subtract(new TimeSpan(9, 30, 0)).Subtract(TimeSpan.FromHours(1))
                },
                new TimeEntry
                {
                    Id = 2,
                    UserId = 2,
                    Date = DateTime.Now,
                    StartTime = new TimeSpan(9, 30, 0),
                    EndTime = new TimeSpan(18, 30, 0),
                    TimeInId = 2,
                    TimeOutId = 5,
                    WorkedHours = times().First(time => time.Id==5).TimeHour.Subtract(times().First(time => time.Id==2)?.TimeHour ?? DateTime.Now.TimeOfDay).Subtract(TimeSpan.FromHours(1)),
                    TrackedHours = new TimeSpan(18, 30, 0).Subtract(new TimeSpan(9, 30, 0)).Subtract(TimeSpan.FromHours(1))
                },
                new TimeEntry
                {
                    Id = 3,
                    UserId = 1,
                    Date = DateTime.Now,
                    StartTime = new TimeSpan(9, 30, 0),
                    EndTime = new TimeSpan(18, 30, 0),
                    TimeInId = 3,
                    TimeOutId = 6,
                    WorkedHours = times().First(time => time.Id==6).TimeHour.Subtract(times().First(time => time.Id==3)?.TimeHour ?? DateTime.Now.TimeOfDay).Subtract(TimeSpan.FromHours(1)),
                    TrackedHours = new TimeSpan(18, 30, 0).Subtract(new TimeSpan(9, 30, 0)).Subtract(TimeSpan.FromHours(1))
                },
            };
            return entries;
        }
    }
}
