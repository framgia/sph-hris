using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    public class Form : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Type { get; set; } = default!;
        public string Field { get; set; } = default!;
        public string? Value { get; set; }
        public User User { get; set; } = default!;
    }
}
