using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    public class ESLChangeShiftRequest : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TimeEntryId { get; set; }
        public int TeamLeaderId { get; set; }
        public TimeSpan TimeIn { get; set; }
        public TimeSpan TimeOut { get; set; }
        public string Description { get; set; } = default!;
        public bool? IsLeaderApproved { get; set; }
        public User User { get; set; } = default!;
        public User TeamLeader { get; set; } = default!;
        public TimeEntry TimeEntry { get; set; } = default!;
        public ICollection<ESLOffset> ESLOffsets { get; set; } = default!;
    }
}
