using api.Context;
using api.DTOs;
using api.Entities;
using api.Requests;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class LeaveService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        public LeaveService(IDbContextFactory<HrisContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }
        public async Task<LeavesDTO> GetLeavesSummary(int userId, int year)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var leaves = await context.Leaves
                            .Include(i => i.LeaveType)
                            .Where(u => u.UserId == userId && u.LeaveDate.Year == year)
                            .OrderBy(o => o.LeaveDate.Day)
                            .Select(s => new LeavesTableDTO(s))
                            .ToListAsync();
                LeaveHeatMapDTO heatmap = new LeaveHeatMapDTO(leaves);
                return new LeavesDTO(new LeaveHeatMapDTO(leaves), leaves);
            }
        }

        public async Task<LeavesDTO> ShowYearlyLeavesSummary(int year)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {

                var leaves = await context.Leaves
                            .Include(i => i.LeaveType)
                            .Where(u => u.LeaveDate.Year == year)
                            .OrderBy(o => o.LeaveDate.Day)
                            .Select(s => new LeavesTableDTO(s))
                            .ToListAsync();
                LeaveHeatMapDTO heatmap = new LeaveHeatMapDTO(leaves);
                heatmap.summarizeMonth();
                return new LeavesDTO(heatmap, leaves);
            }
        }
        public async Task<List<Leave>> Create(CreateLeaveRequest leave)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var leaves = new List<Leave>();
                leave.LeaveDates?.ForEach(date =>
                {
                    leaves.Add(context.Leaves.Add(new Leave
                    {
                        UserId = leave.UserId,
                        ProjectId = leave.ProjectId,
                        LeaveTypeId = leave.LeaveTypeId,
                        ManagerId = leave.ManagerId,
                        OtherProject = leave.OtherProject,
                        Reason = leave.Reason,
                        LeaveDate = DateTime.Parse(date.LeaveDate),
                        IsWithPay = date.IsWithPay,
                        Days = date.Days
                    }).Entity);
                });
                await context.SaveChangesAsync();
                return leaves;
            }
        }
        public async Task<List<Leave>> Index()
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return
                await context.Leaves
                .Include(x => x.User.Role)
                .Include(x => x.LeaveType)
                .Include(x => x.Manager)
                .Include(x => x.Projects)
                .ToListAsync();
            }
        }
    }
}
