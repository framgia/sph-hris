using api.Entities;

namespace api.DTOs
{
    public class UserDTO : User
    {
        public TimeEntry? TimeEntry { get; set; }
        public UserDTO(User user)
        {
            Id = user.Id;
            Name = user.Name;
            Email = user.Email;
            RoleId = user.RoleId;
            EmployeeScheduleId = user.EmployeeScheduleId;
            IsOnline = user.IsOnline;
            EmployeeSchedule = user.EmployeeSchedule;
            TimeEntry = user.TimeEntries.FirstOrDefault();
        }
    }
}
