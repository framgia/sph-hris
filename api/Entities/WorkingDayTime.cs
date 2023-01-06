using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    public class WorkingDayTime : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int EmployeeScheduleId { get; set; }
        public TimeSpan From { get; set; }
        public TimeSpan To { get; set; }
    }
}
