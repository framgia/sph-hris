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
        public NotificationService(IDbContextFactory<HrisContext> contextFactory, [Service] ITopicEventSender eventSender)
        {
            _contextFactory = contextFactory;
            _eventSender = eventSender;
        }

        public async Task<List<LeaveNotification>> createLeaveNotification(Leave leave)
        {
            using (HrisContext context = _contextFactory.CreateDbContext())
            {
                var notifications = new List<LeaveNotification>();
                var user = await context.Users.FindAsync(leave.UserId);
                var data = JsonSerializer.Serialize(new { User = user?.Name, Date = leave.LeaveDate, Type = NotificationDataTypeEnum.REQUEST });

                // Notification to Manager
                var notificationToManager = new LeaveNotification
                {
                    RecipientId = leave.ManagerId,
                    LeaveId = leave.Id,
                    Type = NotificationTypeEnum.LEAVE,
                    Data = data
                };
                notifications.Add(notificationToManager);

                // Notification per project
                leave.LeaveProjects.ToList().ForEach(project =>
                {
                    var notificationToProjectLeader = new LeaveNotification
                    {
                        RecipientId = project.ProjectLeaderId,
                        LeaveId = leave.Id,
                        Type = NotificationTypeEnum.LEAVE,
                        Data = data
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
