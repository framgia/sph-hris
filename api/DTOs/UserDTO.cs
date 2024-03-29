using api.Entities;

namespace api.DTOs
{
    public class UserDTO : User
    {
        public TimeEntry? TimeEntry { get; set; }

        public UserDTO(User user, string domain)
        {
            Id = user.Id;
            Name = user.Name;
            Email = user.Email;
            RoleId = user.RoleId;
            EmployeeScheduleId = user.EmployeeScheduleId;
            IsOnline = user.IsOnline;
            EmployeeSchedule = user.EmployeeSchedule;
            Role = user.Role;
            Position = user.Position;
            TimeEntry = user.TimeEntries != null ? checkLatestTimeEntry(user) : null;
            AvatarLink = $"{domain}/media/{user.ProfileImage?.CollectionName}/{user.ProfileImage?.FileName}";
            PaidLeaves = user.PaidLeaves;
        }
        private TimeEntry? checkLatestTimeEntry(User user)
        {
            TimeEntry? entry = user.TimeEntries.Where(t => t.TimeIn != null && t.TimeOut == null).FirstOrDefault();
            return entry != null ? entry : user.TimeEntries.FirstOrDefault();
        }
        public string? AvatarLink { get; set; }
    }
}
