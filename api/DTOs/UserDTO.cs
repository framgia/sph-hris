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
            Role = user.Role;
            TimeEntry = checkLatestTimeEntry(user);


        }
        private TimeEntry? checkLatestTimeEntry(User user)
        {
            TimeEntry? entry = user.TimeEntries.Where(t => t.TimeIn != null && t.TimeOut == null).FirstOrDefault();
            return entry != null ? entry : user.TimeEntries.FirstOrDefault();
        }
    }
}
