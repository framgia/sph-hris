using api.Entities;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;

namespace api.DTOs
{
    public class UserDTO : User
    {
        public TimeEntry? TimeEntry { get; set; }

        public UserDTO(User user, IServer? server = null)
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
            AvatarLink = $"{server?.Features.Get<IServerAddressesFeature>()?.Addresses.ElementAt(1)}/static/{user.ProfileImage?.CollectionName}/{user.ProfileImage?.FileName}";
        }
        private TimeEntry? checkLatestTimeEntry(User user)
        {
            TimeEntry? entry = user.TimeEntries.Where(t => t.TimeIn != null && t.TimeOut == null).FirstOrDefault();
            return entry != null ? entry : user.TimeEntries.FirstOrDefault();
        }
        public string? AvatarLink { get; set; }
    }
}
