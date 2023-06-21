namespace api.DTOs
{
    public class LeaveHeatMapDTO
    {
        public List<HeatMapDTO> January { get; set; } = new List<HeatMapDTO>();
        public List<HeatMapDTO> February { get; set; } = new List<HeatMapDTO>();
        public List<HeatMapDTO> March { get; set; } = new List<HeatMapDTO>();
        public List<HeatMapDTO> April { get; set; } = new List<HeatMapDTO>();
        public List<HeatMapDTO> May { get; set; } = new List<HeatMapDTO>();
        public List<HeatMapDTO> June { get; set; } = new List<HeatMapDTO>();
        public List<HeatMapDTO> July { get; set; } = new List<HeatMapDTO>();
        public List<HeatMapDTO> August { get; set; } = new List<HeatMapDTO>();
        public List<HeatMapDTO> September { get; set; } = new List<HeatMapDTO>();
        public List<HeatMapDTO> October { get; set; } = new List<HeatMapDTO>();
        public List<HeatMapDTO> November { get; set; } = new List<HeatMapDTO>();
        public List<HeatMapDTO> December { get; set; } = new List<HeatMapDTO>();

        public LeaveHeatMapDTO()
        {
        }

        public LeaveHeatMapDTO(List<LeavesTableDTO> leaves)
        {
            leaves.Where(x => x.IsManagerApproved != false && x.IsLeaderApproved != false).OrderBy(leave => leave.Date).ToList().ForEach(leave =>
            {
                switch (leave.Date?.Month)
                {
                    case 1:
                        January?.Add(new HeatMapDTO(leave));
                        break;
                    case 2:
                        February?.Add(new HeatMapDTO(leave));
                        break;
                    case 3:
                        March?.Add(new HeatMapDTO(leave));
                        break;
                    case 4:
                        April?.Add(new HeatMapDTO(leave));
                        break;
                    case 5:
                        May?.Add(new HeatMapDTO(leave));
                        break;
                    case 6:
                        June?.Add(new HeatMapDTO(leave));
                        break;
                    case 7:
                        July?.Add(new HeatMapDTO(leave));
                        break;
                    case 8:
                        August?.Add(new HeatMapDTO(leave));
                        break;
                    case 9:
                        September?.Add(new HeatMapDTO(leave));
                        break;
                    case 10:
                        October?.Add(new HeatMapDTO(leave));
                        break;
                    case 11:
                        November?.Add(new HeatMapDTO(leave));
                        break;
                    case 12:
                        December?.Add(new HeatMapDTO(leave));
                        break;
                }
            });
        }

        public void summarizeMonth()
        {
            this.January = this.summarizeToDays(this.January);
            this.February = this.summarizeToDays(this.February);
            this.March = this.summarizeToDays(this.March);
            this.April = this.summarizeToDays(this.April);
            this.May = this.summarizeToDays(this.May);
            this.June = this.summarizeToDays(this.June);
            this.July = this.summarizeToDays(this.July);
            this.August = this.summarizeToDays(this.August);
            this.September = this.summarizeToDays(this.September);
            this.October = this.summarizeToDays(this.October);
            this.November = this.summarizeToDays(this.November);
            this.December = this.summarizeToDays(this.December);
        }

        private List<HeatMapDTO> summarizeToDays(List<HeatMapDTO> month)
        {
            var groupedByDays = month.GroupBy(month => month.day);
            List<HeatMapDTO> newHeatmap = new List<HeatMapDTO>();

            foreach (var dayGroup in groupedByDays)
            {
                var majority = dayGroup.GroupBy(group => group.value).OrderByDescending(value => value.Count()).First();
                newHeatmap.Add(new HeatMapDTO(dayGroup.Key, majority.Key, dayGroup.First().leaveName));
            }

            return newHeatmap;
        }
    }
}
