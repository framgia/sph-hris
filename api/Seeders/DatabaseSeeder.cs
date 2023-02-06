using api.Entities;
using api.Enums;

namespace api.Seeders
{
    public static class DatabaseSeeder
    {
        public static EmployeeSchedule employeeSchedule = new EmployeeSchedule
        {
            Id = 1,
            Name = "Morning Shift",
            CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
            UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
        };
        public static List<WorkingDayTime> workingDayTime = new List<WorkingDayTime>(){
            new WorkingDayTime {
                Id = 1,
                EmployeeScheduleId = employeeSchedule.Id,
                Day = "Monday",
                From = new TimeSpan(9, 30, 0),
                To = new TimeSpan(18, 30, 0),
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new WorkingDayTime {
                Id = 2,
                EmployeeScheduleId = employeeSchedule.Id,
                Day = "Tuesday",
                From = new TimeSpan(9, 30, 0),
                To = new TimeSpan(18, 30, 0),
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new WorkingDayTime {
                Id = 3,
                EmployeeScheduleId = employeeSchedule.Id,
                Day = "Wednesday",
                From = new TimeSpan(9, 30, 0),
                To = new TimeSpan(18, 30, 0),
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new WorkingDayTime {
                Id = 4,
                EmployeeScheduleId = employeeSchedule.Id,
                Day = "Thursday",
                From = new TimeSpan(9, 30, 0),
                To = new TimeSpan(18, 30, 0),
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new WorkingDayTime {
                Id = 5,
                EmployeeScheduleId = employeeSchedule.Id,
                Day = "Friday",
                From = new TimeSpan(9, 30, 0),
                To = new TimeSpan(18, 30, 0),
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
        };
        public static List<WorkInterruptionType> workInterruptionType = new List<WorkInterruptionType>(){
            new WorkInterruptionType {
                Id = 1,
                Name = WorkInterruptionEnum.POWER_INTERRUPTION,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new WorkInterruptionType {
                Id = 2,
                Name = WorkInterruptionEnum.LOST_INTERNET_CONNECTION,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new WorkInterruptionType {
                Id = 3,
                Name = WorkInterruptionEnum.EMERGENCY,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new WorkInterruptionType {
                Id = 4,
                Name = WorkInterruptionEnum.ERRANDS,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new WorkInterruptionType {
                Id = 5,
                Name = WorkInterruptionEnum.OTHERS,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
        };
        public static List<Role> roles = new List<Role>(){
            new Role {
                Id = 1,
                Name = RoleEnum.MANAGER,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Role {
                Id = 2,
                Name = RoleEnum.HR_ADMIN,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Role {
                Id = 3,
                Name = RoleEnum.EMPLOYEE,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            }
        };
        public static User[] users()
        {
            User[] users = {
                new User
                {
                    Id = 1,
                    Name = "John Doe",
                    Email = "johndoe@sun-asterisk.com",
                    RoleId = 2,
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
                },
                new User
                {
                    Id = 2,
                    Name = "Rean Schwarzer",
                    RoleId = 1,
                    Email = "reanschwarzer@sun-asterisk.com",
                    EmployeeScheduleId = employeeSchedule.Id,
                    IsOnline = false,
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
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
                    Remarks = "First time in",
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
                },
                new Time
                {
                    Id = 2,
                    TimeHour = new TimeSpan(9, 15, 0),
                    Remarks = "Second time in",
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
                },
                new Time
                {
                    Id = 3,
                    TimeHour = new TimeSpan(10, 15, 0),
                    Remarks = "Third time in",
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
                },
                new Time
                {
                    Id = 4,
                    TimeHour = new TimeSpan(18, 15, 0),
                    Remarks = "First time out",
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
                },
                new Time
                {
                    Id = 5,
                    TimeHour = new TimeSpan(18, 30, 0),
                    Remarks = "Second time out",
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
                },
                new Time
                {
                    Id = 6,
                    TimeHour = new TimeSpan(19, 59, 0),
                    Remarks = "Third time out",
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
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
                    Date = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    StartTime = new TimeSpan(9, 30, 0),
                    EndTime = new TimeSpan(18, 30, 0),
                    TimeInId = 1,
                    TimeOutId = 4,
                    WorkedHours = times().First(time => time.Id==4).TimeHour.Subtract(times().First(time => time.Id==1)?.TimeHour ?? DateTime.Now.TimeOfDay).Subtract(TimeSpan.FromHours(1)).ToString(@"hh\:mm"),
                    TrackedHours = new TimeSpan(18, 30, 0).Subtract(new TimeSpan(9, 30, 0)).Subtract(TimeSpan.FromHours(1)),
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
                },
                new TimeEntry
                {
                    Id = 2,
                    UserId = 2,
                    Date = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    StartTime = new TimeSpan(9, 30, 0),
                    EndTime = new TimeSpan(18, 30, 0),
                    TimeInId = 2,
                    TimeOutId = 5,
                    WorkedHours = times().First(time => time.Id==5).TimeHour.Subtract(times().First(time => time.Id==2)?.TimeHour ?? DateTime.Now.TimeOfDay).Subtract(TimeSpan.FromHours(1)).ToString(@"hh\:mm"),
                    TrackedHours = new TimeSpan(18, 30, 0).Subtract(new TimeSpan(9, 30, 0)).Subtract(TimeSpan.FromHours(1)),
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
                },
                new TimeEntry
                {
                    Id = 3,
                    UserId = 1,
                    Date = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    StartTime = new TimeSpan(9, 30, 0),
                    EndTime = new TimeSpan(18, 30, 0),
                    TimeInId = 3,
                    TimeOutId = 6,
                    WorkedHours = times().First(time => time.Id==6).TimeHour.Subtract(times().First(time => time.Id==3)?.TimeHour ?? DateTime.Now.TimeOfDay).Subtract(TimeSpan.FromHours(1)).ToString(@"hh\:mm"),
                    TrackedHours = new TimeSpan(18, 30, 0).Subtract(new TimeSpan(9, 30, 0)).Subtract(TimeSpan.FromHours(1)),
                    CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                    UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
                },
            };
            return entries;
        }
        public static List<LeaveType> leaveTypes = new List<LeaveType>(){
            new LeaveType {
                Id = 1,
                Name = "Sick leave",
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new LeaveType {
                Id = 2,
                Name = "Bereavement leave",
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new LeaveType {
                Id = 3,
                Name = "Emergency leave",
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new LeaveType {
                Id = 4,
                Name = "Vacation leave",
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new LeaveType {
                Id = 5,
                Name = "Maternity/Paternity leave",
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new LeaveType {
                Id = 6,
                Name = "Undertime",
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
        };
        public static List<Project> projects = new List<Project>(){
            new Project {
                Id = 1,
                Name = "Admin",
                ProjectLeaderId = 1,
                ProjectSubLeaderId = 2,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 2,
                Name = "Casec",
                ProjectLeaderId = 2,
                ProjectSubLeaderId = 1,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 3,
                Name = "Shaperon",
                ProjectLeaderId = 1,
                ProjectSubLeaderId = 2,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 4,
                Name = "01Booster",
                ProjectLeaderId = 2,
                ProjectSubLeaderId = 1,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 5,
                Name = "Edge",
                ProjectLeaderId = 1,
                ProjectSubLeaderId = 2,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 6,
                Name = "DTS",
                ProjectLeaderId = 2,
                ProjectSubLeaderId = 1,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 7,
                Name = "OJT",
                ProjectLeaderId = 1,
                ProjectSubLeaderId = 2,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 8,
                Name = "Safie",
                ProjectLeaderId = 2,
                ProjectSubLeaderId = 1,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 9,
                Name = "AAA Education",
                ProjectLeaderId = 1,
                ProjectSubLeaderId = 2,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 10,
                Name = "Development Training",
                ProjectLeaderId = 2,
                ProjectSubLeaderId = 1,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 11,
                Name = "Yamato",
                ProjectLeaderId = 1,
                ProjectSubLeaderId = 2,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 12,
                Name = "Next Base",
                ProjectLeaderId = 2,
                ProjectSubLeaderId = 1,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 13,
                Name = "MetaJobs",
                ProjectLeaderId = 1,
                ProjectSubLeaderId = 2,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 14,
                Name = "Prrrr",
                ProjectLeaderId = 2,
                ProjectSubLeaderId = 1,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 15,
                Name = "Aironworks",
                ProjectLeaderId = 1,
                ProjectSubLeaderId = 2,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 16,
                Name = "OsakaMetro",
                ProjectLeaderId = 1,
                ProjectSubLeaderId = 1,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
            new Project {
                Id = 17,
                Name = "Others",
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827)
            },
        };
        public static List<Leave> leaves = new List<Leave>(){
            new Leave {
                Id = 1,
                UserId = 1,
                ProjectId = 1,
                LeaveTypeId = 1,
                ManagerId = 1,
                OtherProject = "None",
                Reason = "Leave lang guds",
                LeaveDate = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                IsWithPay = false,
                IsLeaderApproved = true,
                IsManagerApproved = true,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                Days = 1.5f
            },
            new Leave {
                Id = 2,
                UserId = 2,
                ProjectId = 4,
                LeaveTypeId = 6,
                ManagerId = 1,
                OtherProject = "None",
                Reason = "Vacation leave",
                LeaveDate = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                IsWithPay = true,
                IsLeaderApproved = true,
                IsManagerApproved = true,
                CreatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                UpdatedAt = new DateTime(2023, 1, 27, 16, 28, 6, 79, DateTimeKind.Local).AddTicks(7827),
                Days = 2.0f
            },
        };
    }
}
