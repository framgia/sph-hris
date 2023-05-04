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
    public class ESLOffsetMutation
    {
        [ESLUser]
        public async Task<ESLOffset> CreateESLOffset(CreateESLOffsetRequest request, [Service] ESLOffsetService _eslOffsetService, [Service] NotificationService _notificationService, [Service] ITopicEventSender eventSender, [Service] IDbContextFactory<HrisContext> contextFactory)
        {
            using (HrisContext context = contextFactory.CreateDbContext())
            {
                try
                {
                    using var transaction = context.Database.BeginTransaction();
                    var offset = await _eslOffsetService.Create(request);
                    await _notificationService.createESLOffsetRequestNotification(offset);

                    transaction.Commit();
                    return offset;
                }
                catch (GraphQLException e)
                {
                    throw e;
                }
            }
        }

        public async Task<ESLOffset> ApproveDisapproveChangeOffsetStatus(ApproveESLChangeShiftRequest request, [Service] ApprovalService _changeESLOffsetStatusService, [Service] IDbContextFactory<HrisContext> contextFactory)
        {
            using (HrisContext context = contextFactory.CreateDbContext())
            {
                try
                {
                    using var transaction = context.Database.BeginTransaction();
                    var changeShift = await _changeESLOffsetStatusService.ApproveDisapproveChangeOffsetStatus(request);

                    transaction.Commit();
                    return changeShift;
                }
                catch (GraphQLException)
                {
                    throw;
                }
            }
        }
    }
}
