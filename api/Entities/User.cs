using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    public class User : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public int RoleId { get; set; }
        public int PositionId { get; set; }
        public int EmployeeScheduleId { get; set; }
        public float PaidLeaves { get; set; }
        public bool IsOnline { get; set; }
        public int? ProfileImageId { get; set; }
        public Role Role { get; set; } = default!;
        public Position Position { get; set; } = default!;
        public EmployeeSchedule EmployeeSchedule { get; set; } = default!;
        public ICollection<TimeEntry> TimeEntries { get; set; } = default!;
        public ICollection<Overtime> Overtimes { get; set; } = default!;
        public Media? ProfileImage { get; set; }

    }
}
