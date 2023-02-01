using api.Entities;
using api.Services;

namespace api.Schema.Queries
{
    [ExtendObjectType("Query")]
    public class LeaveQuery
    {
        private readonly LeaveService _leaveService;
        public LeaveQuery(LeaveService leaveService)
        {
            _leaveService = leaveService;
        }

        public async Task<List<Leave>> GetAllLeaves()
        {
            return await _leaveService.Index();
        }
    }
}
