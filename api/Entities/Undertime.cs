using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    public class Undertime : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProjectId { get; set; }
        public int? ManagerId { get; set; }
        public string? OtherProject { get; set; }
        public string? Reason { get; set; }
        public TimeSpan From { get; set; }
        public TimeSpan To { get; set; }
        public bool? IsApproved { get; set; }
        public ICollection<Project> Projects { get; set; } = default!;
        public User Manager { get; set; } = default!;
        public User User { get; set; } = default!;
    }
}
