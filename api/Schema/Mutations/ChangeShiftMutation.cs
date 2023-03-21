using api.Context;
using api.Entities;
using api.Requests;
using api.Services;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;

namespace api.Schema.Mutations
{
    [ExtendObjectType("Mutation")]
    public class ChangeShiftMutation
    {
        public async Task<ChangeShiftRequest> CreateChangeShift(CreateChangeShiftRequest request, [Service] ChangeShiftService _changeShiftService, [Service] NotificationService _notificationService, [Service] ITopicEventSender eventSender, [Service] IDbContextFactory<HrisContext> contextFactory)
        {
            using (HrisContext context = contextFactory.CreateDbContext())
            {
                try
                {
                    using var transaction = context.Database.BeginTransaction();
                    var changeShift = await _changeShiftService.Create(request);
                    var notificationList = await _notificationService.createChangeShiftRequestNotification(changeShift);

                    notificationList.ForEach(notif =>
                    {
                        _notificationService.sendChangeShiftNotificationEvent(notif);
                    });

                    transaction.Commit();
                    return changeShift;
                }
                catch (GraphQLException e)
                {
                    throw e;
                }
            }
        }
    }
}
