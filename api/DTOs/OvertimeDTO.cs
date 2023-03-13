using api.Entities;

namespace api.DTOs
{
    public class OvertimeDTO : Overtime
    {
        public OvertimeDTO(Overtime overtimes, string domain)
        {
            Id = overtimes.Id;
            Projects = overtimes.MultiProjects;
            OtherProject = overtimes.OtherProject!;
            User = new(overtimes.User.Id, overtimes.User.Name!, overtimes.User!.Role.Id, overtimes.User.Role.Name!, $"{domain}/static/{overtimes.User.ProfileImage?.CollectionName}/{overtimes.User.ProfileImage?.FileName}");
            Manager = overtimes.Manager;
            Supervisor = overtimes.Manager.Name!;
            DateFiled = overtimes.CreatedAt;
            Remarks = overtimes.Remarks!;
            OvertimeDate = overtimes.OvertimeDate;
            ApprovedMinutes = overtimes.ApprovedMinutes;
            RequestedMinutes = overtimes.RequestedMinutes;
            IsLeaderApproved = overtimes.IsLeaderApproved;
            IsManagerApproved = overtimes.IsManagerApproved!;
        }
        new public Over? User { get; set; }
        new public int Id { get; set; }
        public ICollection<MultiProject> Projects { get; set; } = default!;
        new public string OtherProject { get; set; } = default!;
        public string Supervisor { get; set; }
        public DateTime? DateFiled { get; set; }
        new public string Remarks { get; set; }
        new public DateTime? OvertimeDate { get; set; }
        new public int? ApprovedMinutes { get; set; }
        new public bool? IsLeaderApproved { get; set; }
        new public bool? IsManagerApproved { get; set; }

    }
    public class Over
    {
        public int Id { get; set; }
        public string Link { get; set; }
        public string Name { get; set; } = string.Empty;
        public int RoleId { get; set; }
        public string RoleName { get; set; } = string.Empty;

        public Over(int id, string name, int roleId, string roleName, string link)
        {
            Id = id;
            Link = link;
            Name = name;
            RoleId = roleId;
            RoleName = roleName;
        }
    }
}
