using api.Context;
using api.DTOs;
using api.Entities;
using api.Requests;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class LeaveService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        private readonly ITopicEventSender _eventSender;
        public LeaveService(IDbContextFactory<HrisContext> contextFactory, ITopicEventSender eventSender)
        {
            _contextFactory = contextFactory;
            _eventSender = eventSender;
        }
        public async Task<List<LeaveType>> GetLeaveTypes()
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.LeaveTypes.ToListAsync();
            }
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

                var user = await context.Users
                            .Where(u => u.Id == userId)
                            .FirstAsync();

                LeaveHeatMapDTO heatmap = new LeaveHeatMapDTO(leaves);
                return new LeavesDTO(new LeaveHeatMapDTO(leaves), leaves, user);
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
                    // Create LeaveProjects
                    var leaveProjectsList = new List<LeaveProject>();
                    leave.LeaveProjects?.ForEach(project =>
                    {
                        var projectLeave = new LeaveProject
                        {
                            ProjectId = project.ProjectId,
                            ProjectLeaderId = project.ProjectLeaderId
                        };
                        leaveProjectsList.Add(context.LeaveProjects.Add(projectLeave).Entity);

                    });

                    // Create Leaves
                    var myLeaves = new Leave
                    {
                        UserId = leave.UserId,
                        LeaveTypeId = leave.LeaveTypeId,
                        LeaveProjects = leaveProjectsList,
                        ManagerId = leave.ManagerId,
                        OtherProject = leave.OtherProject,
                        Reason = leave.Reason,
                        LeaveDate = DateTime.Parse(date.LeaveDate),
                        IsWithPay = date.IsWithPay,
                        Days = date.Days
                    };
                    leaves.Add(context.Leaves.Add(myLeaves).Entity);
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
                .Include(x => x.LeaveProjects)
                .ToListAsync();
            }
        }
        public async Task<double> GetPaidLeaves(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                User user = await context.Users.Where(c => c.Id == id).FirstAsync();

                return Convert.ToDouble(user.PaidLeaves.ToString("N3"));

            }
        }
    }
}
