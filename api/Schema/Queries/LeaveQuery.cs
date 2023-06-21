using api.DTOs;
using api.Entities;
using api.Middlewares.Attributes;
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

        [AdminUser]
        public async Task<List<LeaveDTO>> GetAllLeaves()
        {
            return await _leaveService.Index();
        }
        public async Task<List<LeaveType>> GetLeaveTypes()
        {
            return await _leaveService.GetLeaveTypes();
        }
        public async Task<LeavesDTO> GetLeaves(int userId, int year, int leaveTypeId)
        {
            return await _leaveService.GetLeavesSummary(userId, year, leaveTypeId);
        }

        public async Task<LeavesDTO> GetLeavesByDate(int userId, string date)
        {
            return await _leaveService.GetLeavesByDate(userId, date);
        }

        [AdminUser]
        public async Task<LeavesDTO> GetYearlyAllLeaves(int year, int leaveTypeId)
        {
            return await _leaveService.ShowYearlyLeavesSummary(year, leaveTypeId);
        }

        [AdminUser]
        public async Task<LeavesDTO> GetYearlyAllLeavesByDate(string date)
        {
            return await _leaveService.ShowYearlyLeavesSummaryByDate(date);
        }

        public async Task<double> GetPaidLeaves(int id)
        {
            return await _leaveService.GetPaidLeaves(id);
        }

        public async Task<List<LeaveDTO>> GetUserLeave(int leaveId)
        {
            return await _leaveService.GetUserLeave(leaveId);
        }
    }
}
