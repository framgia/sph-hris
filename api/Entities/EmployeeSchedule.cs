using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    public class EmployeeSchedule : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? Name { get; set; }
        public ICollection<User> Users { get; set; } = default!;
        public WorkingDayTime WorkingDayTime { get; set; } = default!;
    }
}
