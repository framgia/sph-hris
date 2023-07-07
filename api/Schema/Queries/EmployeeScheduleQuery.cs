using api.DTOs;
using api.Entities;
using api.Middlewares.Attributes;
using api.Requests;
using api.Services;

namespace api.Schema.Queries
{
    [ExtendObjectType("Query")]
    public class EmployeeScheduleQuery
    {
        private readonly EmployeeScheduleService _employeeScheduleService;
        public EmployeeScheduleQuery(EmployeeScheduleService EmployeeScheduleService)
        {
            _employeeScheduleService = EmployeeScheduleService;
        }

        public async Task<List<EmployeeScheduleDTO>> GetAllEmployeeScheduleDetails()
        {
            return await _employeeScheduleService.GetAllEmployeeScheduleDetails();
        }

        public async Task<List<EmployeeScheduleDTO>> GetEmployeeScheduleDetails(int employeeScheduleId)
        {
            return await _employeeScheduleService.GetEmployeeScheduleDetails(employeeScheduleId);
        }

        public async Task<List<UserDTO>> GetEmployeesBySchedule(int employeeScheduleId)
        {
            return await _employeeScheduleService.GetEmployeesBySchedule(employeeScheduleId);
        }

        public async Task<List<ChangeScheduleRequest>?> GetEmployeeChangeScheduleRequest(int userId)
        {
            return await _employeeScheduleService.GetEmployeeChangeScheduleRequest(userId);
        }

        [AdminUser]
        public async Task<List<UserDTO>> SearchEmployeesBySchedule(SearchEmployeesByScheduleRequest request)
        {
            return await _employeeScheduleService.SearchEmployeesBySchedule(request);
        }
    }
}
