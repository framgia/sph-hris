using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    public class Notification : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int? RecipientId { get; set; }
        public string Type { get; set; } = default!;
        public string Data { get; set; } = default!;
        public DateTime? ReadAt { get; set; } = default!;
        public bool IsRead { get; set; } = false;

        public User? Recipient { get; set; }
    }
}
