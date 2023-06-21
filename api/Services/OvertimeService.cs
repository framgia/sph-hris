using api.Context;
using api.DTOs;
using api.Entities;
using api.Enums;
using api.Requests;
using api.Utils;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class OvertimeService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        private readonly HttpContextService _httpService;
        private readonly OvertimeServiceInputValidation _customInputValidation;
        private readonly IHttpContextAccessor _accessor;

        public OvertimeService(IDbContextFactory<HrisContext> contextFactory, IHttpContextAccessor accessor)
        {
            _contextFactory = contextFactory;
            _customInputValidation = new OvertimeServiceInputValidation(_contextFactory);
            _httpService = new HttpContextService(accessor);
            _accessor = accessor;
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

        public CreateSummaryRequest CreateSummary(CreateSummaryRequest overtimeRequests)
        {
            using HrisContext context = _contextFactory.CreateDbContext();
            var errors = _customInputValidation.CheckSummaryOvertimeRequestInput(overtimeRequests);

            if (errors.Count > 0) throw new GraphQLException(errors);

            return overtimeRequests;
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

        public async Task<List<Overtime>> CreateBulk(CreateBulkOvertimeRequest request)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                using var transaction = context.Database.BeginTransaction();
                var httpContext = _accessor.HttpContext!;
                var leader = (User)httpContext.Items["User"]!;
                var overtimesList = new List<Overtime>();
                var overtimeProjectsList = new List<MultiProject>();
                var errors = _customInputValidation.checkBulkOvertimeRequestInput(request);

                if (errors.Count > 0) throw new GraphQLException(errors);

                DateTime requestedDate = DateTime.Parse(request.Date);

                // Get all related time entries
                var timeEntries = await context.TimeEntries.Where(x => request.EmployeeIds.Contains(x.UserId)).Include(x => x.User).ToListAsync();
                timeEntries = timeEntries.Where(x => (x.Date.Date - requestedDate.Date).Days == 0).ToList();

                // Get existing overtimes for time entries if there are any
                var timeEntriesIds = timeEntries.Select(x => x.Id).ToList();
                var existingOvertimes = await context.Overtimes.Where(x => timeEntriesIds.Contains(x.TimeEntryId)).ToListAsync();

                // Create overtime, pre-approved by leader
                request.EmployeeIds.ForEach(id =>
                {
                    var userTimeEntry = timeEntries != null ? timeEntries.Where(x => x.UserId == id).FirstOrDefault() : null;
                    var timeEntryOvertime = existingOvertimes.Find(x => x.TimeEntryId == userTimeEntry?.Id);

                    if (timeEntryOvertime != null) throw new Exception($"{ErrorMessageEnum.EXISTING_OVERTIME} for {userTimeEntry?.User.Name}");

                    if (userTimeEntry != null)
                    {
                        // Create MultiProjects entity
                        var projectOvertime = new MultiProject
                        {
                            ProjectId = request.ProjectId,
                            ProjectLeaderId = leader.Id,
                            Type = MultiProjectTypeEnum.OVERTIME
                        };
                        overtimeProjectsList.Add(projectOvertime);

                        var newOvertime = new Overtime
                        {
                            UserId = id,
                            TimeEntryId = userTimeEntry.Id,
                            ManagerId = request.ManagerId,
                            MultiProjects = new List<MultiProject> { projectOvertime },
                            OtherProject = request.OtherProject,
                            Remarks = request.Remarks,
                            OvertimeDate = requestedDate,
                            RequestedMinutes = request.RequestedMinutes,
                            IsLeaderApproved = true
                        };
                        overtimesList.Add(newOvertime);
                    }
                    else
                    {
                        throw new Exception(ErrorMessageEnum.ADVANCED_DATE);
                    }
                });

                await context.MultiProjects.AddRangeAsync(overtimeProjectsList);
                await context.Overtimes.AddRangeAsync(overtimesList);
                await context.SaveChangesAsync();
                await transaction.CommitAsync();

                return overtimesList;
            }
        }
    }
}
