using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using api.Interfaces;

namespace api.Entities
{
    public class Leave : BaseEntity, ISoftDeletable
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int LeaveTypeId { get; set; }
        public int? ManagerId { get; set; }
        public string? OtherProject { get; set; }
        public string? Reason { get; set; }
        public DateTime LeaveDate { get; set; }
        public float Days { get; set; }
        public bool IsWithPay { get; set; }
        public bool? IsLeaderApproved { get; set; }
        public bool? IsManagerApproved { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<MultiProject> LeaveProjects { get; set; } = default!;
        public LeaveType LeaveType { get; set; } = default!;
        public User Manager { get; set; } = default!;
        public User User { get; set; } = default!;
        public ICollection<LeaveNotification> LeaveNotifications { get; set; } = default!;
    }
}
