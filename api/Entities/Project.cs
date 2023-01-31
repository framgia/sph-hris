using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    public class Project : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int? ProjectLeaderId { get; set; }
        public int? ProjectSubLeaderId { get; set; }
        [Required]
        public string? Name { get; set; }
        public User? ProjectLeader { get; set; } = default!;
        public User? ProjectSubLeader { get; set; } = default!;
        public ICollection<Leave> Leaves { get; set; } = default!;
        public ICollection<Undertime> Undertimes { get; set; } = default!;

    }
}
