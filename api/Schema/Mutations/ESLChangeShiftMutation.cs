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
    public class ESLChangeShiftMutation
    {
        [ESLUser]
        public async Task<ESLChangeShiftRequest> CreateESLChangeShift(CreateESLChangeShiftRequest request, [Service] ESLChangeShiftService _eslChangeShiftService, [Service] NotificationService _notificationService, [Service] ITopicEventSender eventSender, [Service] IDbContextFactory<HrisContext> contextFactory)
        {
            using (HrisContext context = contextFactory.CreateDbContext())
            {
                try
                {
                    using var transaction = context.Database.BeginTransaction();
                    var changeShift = await _eslChangeShiftService.Create(request, context);
                    await _notificationService.createESLChangeShiftRequestNotification(context, changeShift);

                    transaction.Commit();
                    return changeShift;
                }
                catch (GraphQLException e)
                {
                    throw e;
                }
            }
        }

        public async Task<ESLChangeShiftRequest> ApproveDisapproveESLChangeShiftStatus(ApproveESLChangeShiftRequest request, [Service] ApprovalService _eslChangeShiftStatusService, [Service] IDbContextFactory<HrisContext> contextFactory)
        {
            using (HrisContext context = contextFactory.CreateDbContext())
            {
                try
                {
                    using var transaction = context.Database.BeginTransaction();
                    var eSLChangeShift = await _eslChangeShiftStatusService.ApproveDisapproveESLChangeShiftStatus(request, context);

                    transaction.Commit();
                    return eSLChangeShift;
                }
                catch (GraphQLException)
                {
                    throw;
                }
            }
        }
    }
}
