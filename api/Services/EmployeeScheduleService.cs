using api.Context;
using api.DTOs;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class EmployeeScheduleService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;

        public EmployeeScheduleService(IDbContextFactory<HrisContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }
        public async Task<List<EmployeeScheduleDTO>> GetAllEmployeeScheduleDetails()
        {
            using HrisContext context = _contextFactory.CreateDbContext();

            return await context.EmployeeSchedules
                .Include(x => x.WorkingDayTimes)
                .Select(x => new EmployeeScheduleDTO(x))
                .ToListAsync();
        }

        public async Task<List<EmployeeScheduleDTO>> GetEmployeeScheduleDetails(int employeeScheduleId)
        {
            using HrisContext context = _contextFactory.CreateDbContext();

            return await context.EmployeeSchedules
                .Include(x => x.WorkingDayTimes)
                .Where(x => x.Id == employeeScheduleId)
                .Select(x => new EmployeeScheduleDTO(x))
                .ToListAsync();
        }
    }
}
