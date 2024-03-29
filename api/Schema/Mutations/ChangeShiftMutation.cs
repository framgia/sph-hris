using api.Context;
using api.Entities;
using api.Middlewares.Attributes;
using api.Requests;
using api.Services;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;

namespace api.Schema.Mutations
{
    [ExtendObjectType("Mutation")]
    public class ChangeShiftMutation
    {
        [NonESLUser]
        public async Task<ChangeShiftRequest> CreateChangeShift(CreateChangeShiftRequest request, [Service] ChangeShiftService _changeShiftService, [Service] NotificationService _notificationService, [Service] ITopicEventSender eventSender, [Service] IDbContextFactory<HrisContext> contextFactory)
        {
            using HrisContext context = contextFactory.CreateDbContext();
            try
            {
                using var transaction = context.Database.BeginTransaction();
                var changeShift = await _changeShiftService.Create(request, context);
                await _notificationService.createChangeShiftRequestNotification(context, changeShift, changeShift.UserId);

                transaction.Commit();
                return changeShift;
            }
            catch (GraphQLException e)
            {
                throw e;
            }
            catch (Exception e)
            {
                throw new GraphQLException(ErrorBuilder.New()
                .SetMessage(e.Message)
                .Build());
            }
        }
    }
}
