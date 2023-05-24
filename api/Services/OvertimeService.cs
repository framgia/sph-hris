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
    public class OvertimeService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        private readonly HttpContextService _httpService;
        private readonly ITopicEventSender _eventSender;
        private readonly CustomInputValidation _customInputValidation;

        public OvertimeService(IDbContextFactory<HrisContext> contextFactory, ITopicEventSender eventSender, IHttpContextAccessor accessor)
        {
            _contextFactory = contextFactory;
            _eventSender = eventSender;
            _customInputValidation = new CustomInputValidation(_contextFactory);
            _httpService = new HttpContextService(accessor);
        }

        public async Task<Overtime> Create(CreateOvertimeRequest overtime)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var errors = _customInputValidation.checkOvertimeRequestInput(overtime);

                if (errors.Count > 0) throw new GraphQLException(errors);

                // Create LeaveProjects
                var overtimeProjectsList = new List<MultiProject>();
                overtime.OvertimeProjects?.ForEach(project =>
                {
                    var projectOvertime = new MultiProject
                    {
                        ProjectId = project.ProjectId,
                        ProjectLeaderId = project.ProjectLeaderId,
                        Type = MultiProjectTypeEnum.OVERTIME
                    };
                    overtimeProjectsList.Add(context.MultiProjects.Add(projectOvertime).Entity);

                });

                // Create Overtime
                var myOvertime = new Overtime
                {
                    UserId = overtime.UserId,
                    TimeEntryId = overtime.TimeEntryId,
                    ManagerId = overtime.ManagerId,
                    MultiProjects = overtimeProjectsList,
                    OtherProject = overtime.OtherProject,
                    Remarks = overtime.Remarks,
                    OvertimeDate = DateTime.Parse(overtime.Date),
                    RequestedMinutes = overtime.RequestedMinutes
                };
                var newOvertime = context.Overtimes.Add(myOvertime).Entity;
                await context.SaveChangesAsync();
                return newOvertime;
            }
        }

        public string GetOvertimeRequestStatus(Overtime overtime)
        {
            if (overtime.IsLeaderApproved == true && overtime.IsManagerApproved == true) return RequestStatus.APPROVED;
            if (overtime.IsLeaderApproved == false && overtime.IsManagerApproved == false) return RequestStatus.DISAPPROVED;
            return RequestStatus.PENDING;
        }

        public async Task<List<MyOvertimeDTO>> GetOvertime(int UserId)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.Overtimes
                    .Include(x => x.MultiProjects)
                        .ThenInclude(x => x.Project)
                    .Include(x => x.MultiProjects)
                        .ThenInclude(x => x.ProjectLeader)
                    .Include(x => x.Manager)
                        .ThenInclude(x => x.Role)
                    .Where(w => w.UserId == UserId)
                    .OrderByDescending(x => x.CreatedAt)
                    .Select(x => new MyOvertimeDTO(x))
                    .ToListAsync();
            }
        }
        public async Task<List<OvertimeDTO>> Index()
        {
            var domain = _httpService.getDomainURL();
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.Overtimes
                .Include(x => x.MultiProjects)
                    .ThenInclude(x => x.Project)
                .Include(x => x.MultiProjects)
                    .ThenInclude(x => x.ProjectLeader)
                .Include(x => x.User)
                    .ThenInclude(x => x.Role)
                .Include(x => x.User)
                    .ThenInclude(x => x.ProfileImage)
                .Include(x => x.Manager)
                    .ThenInclude(x => x.Role)
                .Include(x => x.TimeEntry)
                    .ThenInclude(x => x.TimeIn)
                .Include(x => x.TimeEntry)
                    .ThenInclude(x => x.TimeOut)
                .OrderByDescending(x => x.CreatedAt)
                .Select(x => new OvertimeDTO(x, domain))
                .ToListAsync();
            }
        }
    }
}
