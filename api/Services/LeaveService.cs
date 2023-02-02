using api.Context;
using api.DTOs;
using api.Entities;
using api.Enums;
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

        public async Task<LeavesDTO> ShowHeapMap(int userId, int year)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {

                var leaves = await context.Leaves
                            .Include(i => i.LeaveType)
                            .Where(u => u.UserId == userId && u.LeaveDate.Year == year)
                            .OrderBy(o => o.LeaveDate.Day)
                            .Select(s => new LeavesTableDTO(s))
                            .ToListAsync();
                var undertimes = await context.Undertimes
                            .Where(u => u.UserId == userId && (u.CreatedAt ?? DateTime.Now).Year == year)
                            .OrderBy(o => (o.CreatedAt ?? DateTime.Now).Day)
                            .Select(s => new LeavesTableDTO(s))
                            .ToListAsync();
                leaves.AddRange(undertimes);
                LeaveHeatMapDTO heatmap = new LeaveHeatMapDTO(leaves);
                return new LeavesDTO(new LeaveHeatMapDTO(leaves), leaves);
            }
        }

        public async Task<List<Leave>> Create(CreateLeaveRequest leave)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var leaves = new List<Leave>();
                if (leave.LeaveTypeId != LeaveTypeEnum.UNDERTIME)
                {
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
                            LeaveDate = DateTime.Parse(date),
                            IsWithPay = leave.IsWithPay,
                        }).Entity);
                    });
                    await context.SaveChangesAsync();
                    return leaves;
                }
                throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Invalid Leave Type")
                .Build());
            }
        }
        public async Task<List<Leave>> Index()
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.Leaves.ToListAsync();
            }
        }
    }
}
