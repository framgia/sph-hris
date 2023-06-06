using api.Entities;

namespace api.DTOs
{
    public class LeaveDTO : Leave
    {
        public LeaveDTO(Leave leave, string domain)
        {
            Id = leave.Id;
            UserId = leave.User.Id;
            UserName = leave.User.Name;
            UserRole = leave.User.Role.Name;
            LeaveProjects = leave.LeaveProjects;
            LeaveTypeId = leave.LeaveTypeId;
            LeaveType = leave.LeaveType.Name;
            ManagerId = leave.Manager.Id;
            Manager = leave.Manager.Name;
            OtherProject = leave.OtherProject;
            Reason = leave.Reason;
            LeaveDate = leave.LeaveDate;
            IsWithPay = leave.IsWithPay;
            IsLeaderApproved = leave.IsLeaderApproved;
            IsManagerApproved = leave.IsManagerApproved;
            Days = leave.Days;
            CreatedAt = leave.CreatedAt;
            Avatar = $"{domain}/media/{leave.User.ProfileImage!.CollectionName}/{leave.User.ProfileImage!.FileName}";
        }

        public new int? UserId { get; set; }
        public string? Avatar { get; set; }
        public string? UserName { get; set; }
        public string? UserRole { get; set; }
        public new string? LeaveType { get; set; }
        public new string? Manager { get; set; }
        public new string? Reason { get; set; }
        public new DateTime? LeaveDate { get; set; }
        public new bool? IsWithPay { get; set; }
        public new bool? IsLeaderApproved { get; set; }
        public new bool? IsManagerApproved { get; set; }
        public new float? Days { get; set; }
        public new DateTime? CreatedAt { get; set; }
    }
}
