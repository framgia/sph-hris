using api.Context;
using api.Entities;
using api.Middlewares.Attributes;
using api.Enums;
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
            using HrisContext context = contextFactory.CreateDbContext();
            try
            {
                using var transaction = context.Database.BeginTransaction();

                var newOvertime = await _overtimeService.Create(overtime);

                var notificationList = await _notificationService.createOvertimeNotification(newOvertime);

                notificationList.ForEach(notif => _notificationService.sendOvertimeNotificationEvent(notif));

                transaction.Commit();

                return newOvertime;
            }
            catch (GraphQLException)
            {
                throw;
            }
        }

        public async Task<string> CreateSummarizedOvertime(CreateSummaryRequest overtimeSummary, [Service] OvertimeService _overtimeService, [Service] NotificationService _notificationService, [Service] ITopicEventSender eventSender, [Service] IDbContextFactory<HrisContext> contextFactory)
        {
            using HrisContext context = contextFactory.CreateDbContext();
            try
            {
                using var transaction = context.Database.BeginTransaction();

                var summarizedOvertime = await _overtimeService.CreateSummary(overtimeSummary);

                var notificationList = await _notificationService.CreateSummarizedOvertimeNotification(summarizedOvertime, context);

                _notificationService.SendSummarizedOvertimeNotificationEvent(notificationList);

                transaction.Commit();

                return SuccessMessageEnum.OVERTIME_SUMMARY_SUBMITTED;
            }
            catch (GraphQLException)
            {
                throw;
            }
        }

        [LeaderUser]
        public async Task<List<Overtime>> CreateBulkOvertime(CreateBulkOvertimeRequest request, [Service] IHttpContextAccessor _accessor, [Service] OvertimeService _overtimeService, [Service] NotificationService _notificationService, [Service] ITopicEventSender eventSender, [Service] IDbContextFactory<HrisContext> contextFactory)
        {
            using (HrisContext context = contextFactory.CreateDbContext())
            {
                try
                {
                    var httpContext = _accessor.HttpContext;
                    var leader = (User)httpContext?.Items["User"]!;
                    using var transaction = context.Database.BeginTransaction();

                    var newOvertimes = await _overtimeService.CreateBulk(request);

                    var notificationList = await _notificationService.createBulkOvertimeNotification(newOvertimes, leader.Id);

                    notificationList.ForEach(notif =>
                    {
                        _notificationService.sendOvertimeNotificationEvent(notif);
                    });

                    transaction.Commit();

                    return newOvertimes;
                }
                catch (GraphQLException error)
                {
                    throw error;
                }
                catch (Exception e)
                {
                    throw new GraphQLException(ErrorBuilder.New()
                    .SetMessage(e.Message)
                    .SetCode("BAD_REQUEST")
                    .Build());
                }
            }
        }
    }
}
