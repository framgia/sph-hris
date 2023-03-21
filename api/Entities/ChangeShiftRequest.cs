using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    public class ChangeShiftRequest : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TimeEntryId { get; set; }
        public int ManagerId { get; set; }
        public TimeSpan TimeIn { get; set; }
        public TimeSpan TimeOut { get; set; }
        public string? OtherProject { get; set; } = default!;
        public string Description { get; set; } = default!;
        public bool? IsManagerApproved { get; set; }
        public bool? IsLeaderApproved { get; set; }
        public User User { get; set; } = default!;
        public User Manager { get; set; } = default!;
        public TimeEntry TimeEntry { get; set; } = default!;
        public ICollection<MultiProject> MultiProjects { get; set; } = default!;
    }
}
