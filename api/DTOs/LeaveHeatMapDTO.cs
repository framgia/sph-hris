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

        public LeaveHeatMapDTO(List<LeavesTableDTO> leaves)
        {
            leaves.ForEach(leave =>
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
                        January?.Add(new HeatMapDTO(leave));
                        break;
                    case 7:
                        June?.Add(new HeatMapDTO(leave));
                        break;
                    case 8:
                        July?.Add(new HeatMapDTO(leave));
                        break;
                    case 9:
                        August?.Add(new HeatMapDTO(leave));
                        break;
                    case 10:
                        September?.Add(new HeatMapDTO(leave));
                        break;
                    case 11:
                        October?.Add(new HeatMapDTO(leave));
                        break;
                    case 12:
                        November?.Add(new HeatMapDTO(leave));
                        break;
                }
            });
        }
    }
}
