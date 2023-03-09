using api.Entities;
using api.Services;

namespace api.Schema.Queries
{
    [ExtendObjectType("Query")]
    public class OvertimeQuery
    {
        private readonly OvertimeService _overtimeService;
        public OvertimeQuery(OvertimeService overtimeService)
        {
            _overtimeService = overtimeService;
        }
        public async Task<List<Overtime>> GetOvertime([Service] OvertimeService _overtimeService, int UserId)
        {
            return await _overtimeService.GetOvertime(UserId);
        }

        public async Task<List<DTOs.OvertimeDTO>> GetAllOvertime()
        {
            return await _overtimeService.Index();
        }
    }
}
