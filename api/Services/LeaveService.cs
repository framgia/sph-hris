using api.Context;
using api.DTOs;
using api.Entities;
using api.Enums;
using api.NotificationDataClasses;
using api.Requests;
using api.Utils;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace api.Services
{
    public class LeaveService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        private readonly HttpContextService _httpService;
        private readonly ITopicEventSender _eventSender;
        private readonly LeaveServiceInputValidation _customInputValidation;
        public LeaveService(IDbContextFactory<HrisContext> contextFactory, ITopicEventSender eventSender, IHttpContextAccessor accessor)
        {
            _contextFactory = contextFactory;
            _eventSender = eventSender;
            _customInputValidation = new LeaveServiceInputValidation(_contextFactory);
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
                            .Include(i => i.User)
                            .Where(u => u.UserId == userId && u.LeaveDate.Year == year)
                            .OrderBy(o => o.LeaveDate.Day)
                            .Select(s => new LeavesTableDTO(s))
                            .ToListAsync();

                var user = await context.Users
                            .Where(u => u.Id == userId)
                            .FirstAsync();

                LeaveHeatMapDTO heatmap = new(leaves);
                return new LeavesDTO(new LeaveHeatMapDTO(leaves), leaves, user);
            }
        }

        public async Task<LeavesDTO> ShowYearlyLeavesSummary(int year)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var leaves = await context.Leaves
                            .Include(i => i.LeaveType)
                            .Include(i => i.User)
                            .Where(u => u.LeaveDate.Year == year)
                            .OrderBy(o => o.LeaveDate.Day)
                            .Select(s => new LeavesTableDTO(s))
                            .ToListAsync();
                LeaveHeatMapDTO heatmap = new(leaves);
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

        public async Task<string> CancelLeave(CancelLeaveRequest request, HrisContext context)
        {
            // validate inputs
            var errors = _customInputValidation.CheckCancelLeaveRequestInput(request);

            if (errors.Count > 0) throw new GraphQLException(errors);

            var leave = await context.Leaves.FindAsync(request.LeaveId);
            if(leave != null) leave.IsDeleted = true;
            
            try
            {
                // modify notifications too
                LeaveNotificationToCancel(request);
                
                // save to database
                await context.SaveChangesAsync();
            }
            catch
            {
                throw new Exception(ErrorMessageEnum.FAILED_LEAVE_CANCEL);
            }

            return SuccessMessageEnum.LEAVE_CANCELLED;
        }

        // public methods
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

        public async Task<List<LeaveDTO>> GetUserLeave(int leaveId)
        {
            var domain = _httpService.getDomainURL();
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
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
                    .Where(x => x.Id == leaveId)
                .Select(x => new LeaveDTO(x, domain))
                .ToListAsync();
            }
        }

        public async Task<List<LeaveNotification>> UpdateLeave(UpdateLeaveRequest requestLeave)
        {
            using HrisContext context = _contextFactory.CreateDbContext();
            // validate inputs
            var errors = _customInputValidation.CheckUpdateLeaveRequestInput(requestLeave);
            if (errors.Count > 0) throw new GraphQLException(errors);

            var existingLeave = context.Leaves.FirstOrDefault(x => x.Id == requestLeave.LeaveId);
            int oldManagerId = (int)existingLeave!.ManagerId!;

            List<LeaveNotification> updatedNotifications = new();

            requestLeave.LeaveDates?.ForEach(date =>
            {
                var existingNotfication = context.LeaveNotifications.Where(x => x.LeaveId == requestLeave.LeaveId).ToList();

                if (existingLeave != null)
                {
                    // Update LeaveProjects
                    UpdateLeaveProjects(context, requestLeave);

                    // Update the existing Leave entity
                    UpdateExistingLeave(requestLeave, date, existingLeave);

                    // Update manager notification
                    int managerNotificationId = UpdateManagerNotification(requestLeave, existingLeave, oldManagerId, updatedNotifications).Result;

                    // Update leader notification
                    UpdateLeaderLeaveNotification(requestLeave, existingLeave, managerNotificationId, updatedNotifications);
                }
            });

            await context.SaveChangesAsync();
            return updatedNotifications;
        }

        public async Task<int> UpdateManagerNotification(UpdateLeaveRequest requestLeave, Leave leave, int oldManagerId, List<LeaveNotification> updatedNotifications)
        {
            using HrisContext context = _contextFactory.CreateDbContext();
            var notifications = context.LeaveNotifications.Where(x => x.LeaveId == requestLeave.LeaveId).ToList();
            var managerNotification = notifications.Find(x => x.RecipientId == oldManagerId && x.LeaveId == requestLeave.LeaveId);

            List<int> projectIds = requestLeave.LeaveProjects.ConvertAll(u => u.ProjectId);
            List<int?> recipientIdList = notifications.ConvertAll(x => x.RecipientId);
            User? managerUser = context.Users.Include(x => x.Role).Where(x => recipientIdList.Contains(x.Id) && x.Role.Name == RoleEnum.MANAGER).FirstOrDefault();

            var projects = context.Projects.Where(x => projectIds.Contains(x.Id));
            var notificationData = JsonConvert.DeserializeObject<LeaveLeaderData>(managerNotification!.Data);
            var leaveProjectIds = requestLeave.LeaveProjects.ConvertAll(x => x.ProjectLeaderId);

            notificationData!.Projects = projects.Select(project => project.Name!).ToList();
            notificationData!.RequestedHours = LeaveDaysToHours(leave.Days);
            notificationData.Remarks = leave.Reason;
            notificationData.IsWithPay = leave.IsWithPay;
            notificationData.DateRequested = leave.LeaveDate;
            notificationData.Status = RequestStatus.PENDING;
            managerNotification.Data = JsonConvert.SerializeObject(notificationData);

            managerNotification.RecipientId = requestLeave.ManagerId;
            managerNotification.IsRead = false;
            managerNotification.ReadAt = null;

            await context.SaveChangesAsync();

            updatedNotifications.Add(managerNotification);

            return managerNotification.Id;
        }

        public async void UpdateLeaderLeaveNotification(UpdateLeaveRequest requestLeave, Leave leave, int managerNotificationId, List<LeaveNotification> updatedNotifications)
        {
            using HrisContext context = _contextFactory.CreateDbContext();
            var notifications = context.LeaveNotifications.Where(x => x.LeaveId == requestLeave.LeaveId).ToList();

            // All notifications recipient ID
            var recipientId = notifications.ConvertAll(x => x.RecipientId);

            // Check and get all the project leaders ID on the notifications
            List<int> projectLeaderUsers = context.Users
            .Include(x => x.Position)
            .Where(x => recipientId.Contains(x.Id) && PositionEnum.ALL_LEADERS.Contains(x.PositionId))
            .Select(x => x.Id)
            .ToList();

            var leaderNotifications = notifications.Where(x => projectLeaderUsers.Contains((int)x.RecipientId!) && x.LeaveId == requestLeave.LeaveId && x.Id != managerNotificationId).ToList();

            // Old + New project leader notifications ID
            List<int> newLeaderIds = requestLeave.LeaveProjects.ConvertAll(u => u.ProjectLeaderId);

            // Old + New projects
            List<int> projectIds = requestLeave.LeaveProjects.ConvertAll(u => u.ProjectId);
            var projects = context.Projects.Where(x => projectIds.Contains(x.Id)).ToList();

            int index = 0;
            leaderNotifications.ForEach((leaderNotification) =>
            {
                var notificationData = JsonConvert.DeserializeObject<LeaveLeaderData>(leaderNotification.Data);
                var leaveProjectId = requestLeave.LeaveProjects[index].ProjectId;
                var project = projects.Find(x => x.Id == leaveProjectId);

                notificationData!.Projects = new List<string> { project!.Name == "Others" ? leave.OtherProject! : project.Name! };
                notificationData!.RequestedHours = LeaveDaysToHours(leave.Days);
                notificationData.Remarks = leave.Reason;
                notificationData.IsWithPay = leave.IsWithPay;
                notificationData.DateRequested = leave.LeaveDate;
                notificationData.Status = RequestStatus.PENDING;
                leaderNotification.Data = JsonConvert.SerializeObject(notificationData);

                leaderNotification.RecipientId = newLeaderIds[index];
                leaderNotification.IsRead = false;
                leaderNotification.ReadAt = null;

                index++;
            });

            await context.SaveChangesAsync();
            updatedNotifications.AddRange(leaderNotifications);
        }

        private static void UpdateLeaveProjects(HrisContext context, UpdateLeaveRequest leave)
        {
            leave.LeaveProjects?.ForEach(project =>
                    {
                        DeleteOutdatedProjects(leave.LeaveId, context);
                        UpdateMultiProjects(leave.LeaveId, project, context);
                    });
        }

        private static void UpdateMultiProjects(int leaveId, MultiProjectRequest project, HrisContext context)
        {
            var leaveProjectsList = new List<MultiProject>();
            var projectLeave = new MultiProject
            {
                ProjectId = project.ProjectId,
                ProjectLeaderId = project.ProjectLeaderId,
                Type = MultiProjectTypeEnum.LEAVE,
                LeaveId = leaveId
            };
            leaveProjectsList.Add(context.MultiProjects.Add(projectLeave).Entity);
        }

        private static void DeleteOutdatedProjects(int leaveId, HrisContext context)
        {
            var existingProjects = context.MultiProjects.Where(x => x.LeaveId == leaveId);
            context.MultiProjects.RemoveRange(existingProjects);
        }

        private static void UpdateExistingLeave(UpdateLeaveRequest leave, LeaveDateRequest date, Leave existingLeave)
        {
            existingLeave.ManagerId = leave.ManagerId;
            existingLeave.LeaveTypeId = leave.LeaveTypeId;
            existingLeave.OtherProject = leave.OtherProject;
            existingLeave.Reason = leave.Reason;
            existingLeave.IsWithPay = date.IsWithPay;
            existingLeave.Days = date.Days;
            existingLeave.IsManagerApproved = null;
            existingLeave.IsLeaderApproved = null;
            existingLeave.LeaveDate = DateTime.Parse(date.LeaveDate);
        }

        // private
        private async void LeaveNotificationToCancel (CancelLeaveRequest request)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var notificationsList = await context.LeaveNotifications.Where(
                                        x => x.LeaveId == request.LeaveId && 
                                        (x.Type == NotificationTypeEnum.LEAVE || x.Type == NotificationTypeEnum.LEAVE_RESOLVED)).ToListAsync();
                
                foreach (var notification in notificationsList)
                {
                    var notificationData = notification != null ? JsonConvert.DeserializeObject<dynamic>(notification.Data) : null;

                    if (notification != null && notificationData != null && notificationData?.Status == RequestStatus.PENDING)
                    {
                        notificationData!.Status = RequestStatus.CANCELLED;
                        notification!.Data = JsonConvert.SerializeObject(notificationData);
                    }
                }
                await context.SaveChangesAsync();
            }
        }
    }
}
