using api.Context;
using api.Entities;
using api.Requests;
using api.Services;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;

namespace api.Schema.Mutations
{
    [ExtendObjectType("Mutation")]
    public class OvertimeMutation
    {
        public async Task<Overtime> CreateOvertime(CreateOvertimeRequest overtime, [Service] OvertimeService _overtimeService, [Service] NotificationService _notificationService, [Service] ITopicEventSender eventSender, [Service] IDbContextFactory<HrisContext> contextFactory)
        {
            using (HrisContext context = contextFactory.CreateDbContext())
            {
                try
                {
                    using var transaction = context.Database.BeginTransaction();

                    var newOvertime = await _overtimeService.Create(overtime);

                    var notificationList = await _notificationService.createOvertimeNotification(newOvertime);

                    notificationList.ForEach(notif =>
                    {
                        _notificationService.sendOvertimeNotificationEvent(notif);
                    });

                    transaction.Commit();

                    return newOvertime;
                }
                catch (GraphQLException error)
                {
                    throw error;
                }
            }
        }
    }
}
