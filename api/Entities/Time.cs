using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    public class Time : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public TimeSpan TimeHour { get; set; }
        public string? Remarks { get; set; }
    }
}

namespace api.Entities
{
    public class TimeDTO : Time
    {
        public TimeDTO(Time time)
        {
            if (time != null)
            {
                TimeHour = time.TimeHour.ToString(@"hh\:mm\:ss");
            }
            else
            {
                TimeHour = null;
            }
        }

        public new string? TimeHour { get; set; }
    }
}
