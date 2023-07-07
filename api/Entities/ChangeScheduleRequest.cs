using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    public class ChangeScheduleRequest : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UserId { get; set; }
        public bool? IsManagerApproved { get; set; }
        public bool? IsLeaderApproved { get; set; }
        public string Data { get; set; } = default!;
        public User User { get; set; } = default!;
    }
}
