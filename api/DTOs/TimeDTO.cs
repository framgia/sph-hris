using api.Entities;

namespace api.DTOs
{
    public class TimeDTO : Time
    {
        public TimeDTO(Time time)
        {
            if (time != null)
            {
                Id = time.Id;
                TimeHour = time.TimeHour.ToString(@"hh\:mm");
                Remarks = time.Remarks;
            }
            else
            {
                TimeHour = null;
            }

        }

        public new string? TimeHour { get; set; }
    }
}
