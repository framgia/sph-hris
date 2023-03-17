namespace api.DTOs
{
    public class TimeEntriesSummaryDTO
    {
        public TimeEntriesSummaryDTO(TimeEntryDTO timeEntry)
        {
            User = timeEntry.User;
            Leave = 0;
            Absences = 0;
            Late = 0;
            Undertime = 0;
            Overtime = 0;
        }

        // override
        public UserDTO User { get; set; }
        public float Leave { get; set; }
        public int Absences { get; set; }

        public int? Late { get; set; }
        public int? Undertime { get; set; }
        public int? Overtime { get; set; }

        // methods
        public void AddLeave(float days)
        {
            this.Leave = this.Leave + days;
        }
        public void AddAbsences()
        {
            this.Absences++;
        }
        public void AddLate(int minutes)
        {
            this.Late = this.Late + minutes;
        }
        public void AddUndertime(int minutes)
        {
            this.Undertime = this.Undertime + minutes;
        }
        public void AddOvertime(int minutes)
        {
            this.Overtime = this.Overtime + minutes;
        }
    }
}
