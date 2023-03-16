using api.DTOs;
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

        public async Task<List<LeaveDTO>> GetAllLeaves()
        {
            return await _leaveService.Index();
        }
        public async Task<List<LeaveType>> GetLeaveTypes()
        {
            return await _leaveService.GetLeaveTypes();
        }
        public async Task<LeavesDTO> GetLeaves(int userId, int year)
        {
            return await _leaveService.GetLeavesSummary(userId, year);
        }

        public async Task<LeavesDTO> GetYearlyAllLeaves(int year)
        {
            return await _leaveService.ShowYearlyLeavesSummary(year);
        }

        public async Task<double> GetPaidLeaves(int id)
        {
            return await _leaveService.GetPaidLeaves(id);
        }
    }
}
