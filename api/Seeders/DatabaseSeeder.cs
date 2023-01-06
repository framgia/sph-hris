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
        public static WorkingDayTime workingDayTime = new WorkingDayTime
        {
            Id = 1,
            EmployeeScheduleId = employeeSchedule.Id,
            From = TimeSpan.FromHours(9),
            To = TimeSpan.FromHours(6)
        };
        public static User user = new User
        {
            Id = 1,
            Name = "John Doe",
            Email = "johndoe@sun-asterisk.com",
            EmployeeScheduleId = employeeSchedule.Id,
            IsOnline = false
        };
    }
}
