using api.Entities;
using api.Services;

namespace api.Schema.Queries
{
    [ExtendObjectType("Query")]
    public class OvertimeQuery
    {
        public async Task<List<Overtime>> GetOvertime([Service] OvertimeService _overtimeService, int UserId)
        {
            return await _overtimeService.GetOvertime(UserId);
        }
    }
}
