using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    public class Overtime : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int? ManagerId { get; set; }
        public int TimeEntryId { get; set; }
        public string? OtherProject { get; set; }
        public string? Remarks { get; set; }
        public DateTime OvertimeDate { get; set; }
        public int RequestedMinutes { get; set; }
        public int? ApprovedMinutes { get; set; }
        public bool? IsLeaderApproved { get; set; }
        public bool? IsManagerApproved { get; set; }
        public string? ManagerRemarks { get; set; }
        public ICollection<MultiProject> MultiProjects { get; set; } = default!;
        public User Manager { get; set; } = default!;
        public User User { get; set; } = default!;
        public TimeEntry TimeEntry { get; set; } = default!;
    }
}
