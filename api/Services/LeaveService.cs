using api.Context;
using api.DTOs;
using api.Entities;
using api.Enums;
using api.Requests;
using api.Utils;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class LeaveService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        private readonly HttpContextService _httpService;
        private readonly ITopicEventSender _eventSender;
        private readonly CustomInputValidation _customInputValidation;
        public LeaveService(IDbContextFactory<HrisContext> contextFactory, ITopicEventSender eventSender, IHttpContextAccessor accessor)
        {
            _contextFactory = contextFactory;
            _eventSender = eventSender;
            _customInputValidation = new CustomInputValidation(_contextFactory);
            _httpService = new HttpContextService(accessor);
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
                // validate inputs
                var errors = _customInputValidation.checkLeaveRequestInput(leave);

                if (errors.Count > 0) throw new GraphQLException(errors);

                var leaves = new List<Leave>();
                leave.LeaveDates?.ForEach(date =>
                {
                    // Create LeaveProjects
                    var leaveProjectsList = new List<MultiProject>();
                    leave.LeaveProjects?.ForEach(project =>
                    {
                        var projectLeave = new MultiProject
                        {
                            ProjectId = project.ProjectId,
                            ProjectLeaderId = project.ProjectLeaderId,
                            Type = MultiProjectTypeEnum.LEAVE
                        };
                        leaveProjectsList.Add(context.MultiProjects.Add(projectLeave).Entity);

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
        public async Task<List<LeaveDTO>> Index()
        {
            var domain = _httpService.getDomainURL();
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var project = await context.Projects.FindAsync(1);

                return
                await context.Leaves
                .Include(x => x.User.Role)
                .Include(x => x.User)
                    .ThenInclude(x => x.ProfileImage)
                .Include(x => x.LeaveType)
                .Include(x => x.Manager)
                .Include(x => x.LeaveProjects)
                    .ThenInclude(x => x.Project)
                .Include(x => x.LeaveProjects)
                    .ThenInclude(x => x.ProjectLeader)
                .Select(x => new LeaveDTO(x, domain))
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

        public float LeaveDaysToHours(float days)
        {
            switch (days)
            {
                case 0.125f:
                    return 4;
                case 0.19f:
                    return 1.5f;
                case 0.25f:
                    return 2;
                case 0.31f:
                    return 2.5f;
                case 0.38f:
                    return 3;
                case 0.5f:
                    return 4;
                case 0.625f:
                    return 5;
                case 0.69f:
                    return 5.5f;
                case 1:
                    return 8;
                default:
                    return 0;
            }
        }

        public string GetLeaveRequestStatus(Leave leave)
        {
            if (leave.IsLeaderApproved == true && leave.IsManagerApproved == true) return RequestStatus.APPROVED;
            if (leave.IsLeaderApproved == false && leave.IsManagerApproved == false) return RequestStatus.DISAPPROVED;
            return RequestStatus.PENDING;
        }
    }
}
