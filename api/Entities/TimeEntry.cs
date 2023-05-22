using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    public class TimeEntry : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int? TimeInId { get; set; }
        public int? TimeOutId { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public TimeSpan BreakStartTime { get; set; }
        public TimeSpan BreakEndTime { get; set; }
        public DateTime Date { get; set; }
        public string? WorkedHours { get; set; }
        public TimeSpan TrackedHours { get; set; }
        public User User { get; set; } = default!;
        public Time? TimeIn { get; set; }
        public Time? TimeOut { get; set; }
        public Overtime? Overtime { get; set; } = default!;
        public ChangeShiftRequest? ChangeShiftRequest { get; set; } = default!;
        public ICollection<WorkInterruption> WorkInterruptions { get; set; } = default!;
        public ICollection<ESLOffset>? ESLOffsets { get; set; } = default!;
    }
}
