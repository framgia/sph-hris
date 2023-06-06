using api.Entities;

namespace api.DTOs
{
    public class LeavesDTO
    {
        public LeaveHeatMapDTO Heatmap { get; set; }
        public List<LeavesTableDTO> Table { get; set; }
        public LeaveBreakdownDTO Breakdown { get; set; }
        public User? User { get; set; } = null;

        public LeavesDTO(LeaveHeatMapDTO heatmapLeaves, List<LeavesTableDTO> table, User? user = null)
        {
            Heatmap = heatmapLeaves;
            User = user;
            Table = table.OrderByDescending(table => table.CreatedAt).ToList();
            Breakdown = new LeaveBreakdownDTO(table);
        }
    }
}
