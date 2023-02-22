using System.Text.Json;
using api.Context;
using api.Entities;
using api.Enums;
using api.Subscriptions;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class NotificationService
    {
        private readonly IDbContextFactory<HrisContext> _contextFactory = default!;
        private readonly ITopicEventSender _eventSender;
        private readonly LeaveService _leaveService;
        public NotificationService(IDbContextFactory<HrisContext> contextFactory, LeaveService leaveService, [Service] ITopicEventSender eventSender)
        {
            _contextFactory = contextFactory;
            _eventSender = eventSender;
            _leaveService = leaveService;
        }

        public async Task<List<LeaveNotification>> createLeaveNotification(Leave leave)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var notifications = new List<LeaveNotification>();
                var user = await context.Users.FindAsync(leave.UserId);
                var undertimeLeave = context.LeaveTypes.Where(x => x.Name != null && x.Name.ToLower() == "undertime").First();
                var data = JsonSerializer.Serialize(new { User = user?.Name, Date = leave.LeaveDate, Type = NotificationDataTypeEnum.REQUEST });

                var dataToManager = JsonSerializer.Serialize(new
                {
                    User = new
                    {
                        Id = user?.Id,
                        Name = user?.Name
                    },
                    Projects = leave.LeaveProjects,
                    RequestedHours = _leaveService.LeaveDaysToHours(leave.Days),
                    DateRequested = leave.LeaveDate,
                    DateFiled = leave.CreatedAt,
                    Type = NotificationDataTypeEnum.REQUEST,
                    Status = _leaveService.GetLeaveRequestStatus(leave),
                    Remarks = leave.Reason
                }
                    );

                // Notification to Manager
                var notificationToManager = new LeaveNotification
                {
                    RecipientId = leave.ManagerId,
                    LeaveId = leave.Id,
                    Type = leave.LeaveTypeId == undertimeLeave.Id ? NotificationTypeEnum.UNDERTIME : NotificationTypeEnum.LEAVE,
                    Data = dataToManager
                };
                notifications.Add(notificationToManager);

                // Notification per project
                leave.LeaveProjects.ToList().ForEach(project =>
                {
                    var dataToProjectLeader = JsonSerializer.Serialize(new
                    {
                        User = new
                        {
                            Id = user?.Id,
                            Name = user?.Name
                        },
                        Projects = new List<LeaveProject> { project },
                        RequestedHours = _leaveService.LeaveDaysToHours(leave.Days),
                        DateRequested = leave.LeaveDate,
                        DateFiled = leave.CreatedAt,
                        Type = NotificationDataTypeEnum.REQUEST,
                        Status = _leaveService.GetLeaveRequestStatus(leave),
                        Remarks = leave.Reason
                    }
                    );
                    var notificationToProjectLeader = new LeaveNotification
                    {
                        RecipientId = project.ProjectLeaderId,
                        LeaveId = leave.Id,
                        Type = leave.LeaveTypeId == undertimeLeave.Id ? NotificationTypeEnum.UNDERTIME : NotificationTypeEnum.LEAVE,
                        Data = dataToProjectLeader
                    };
                    notifications.Add(notificationToProjectLeader);
                });

                notifications.ForEach(notif =>
                {
                    context.LeaveNotifications.Add(notif);
                });

                await context.SaveChangesAsync();
                return notifications;
            }
        }

        public async Task<List<Notification>> getByRecipientId(int id)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                return await context.Notifications.Where(notif => notif.RecipientId == id).ToListAsync();
            }
        }

        public async void sendLeaveNotificationEvent(LeaveNotification notif)
        {
            try
            {
                string topic = $"{notif.RecipientId}_{nameof(SubscriptionObjectType.LeaveCreated)}";
                await _eventSender.SendAsync(topic, notif);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
