using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    public class MultiProject : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Type { get; set; } = default!;
        public int? ProjectId { get; set; }
        public int? ProjectLeaderId { get; set; }
        public int? LeaveId { get; set; }
        public int? OvertimeId { get; set; }
        public int? ChangeShiftRequestId { get; set; }
        public Project Project { get; set; } = default!;
        public User ProjectLeader { get; set; } = default!;
    }
}
