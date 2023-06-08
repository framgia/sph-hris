using api.Context;
using api.Entities;
using api.Enums;
using api.Requests;
using api.Services;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;

namespace api.Schema.Mutations
{
    [ExtendObjectType("Mutation")]
    public class LeaveMutation
    {
        public async Task<List<Leave>> CreateLeave(CreateLeaveRequest leave, [Service] LeaveService _leaveService, [Service] NotificationService _notificationService, [Service] ITopicEventSender eventSender, [Service] IDbContextFactory<HrisContext> contextFactory)
        {
            using (HrisContext context = contextFactory.CreateDbContext())
            {
                try
                {
                    var leaves = await _leaveService.Create(leave);

                    // Create Notifications
                    leaves.ForEach(async leave =>
                        {
                            var notificationList = await _notificationService.createLeaveNotification(leave);

                            notificationList.ForEach(notif =>
                            {
                                _notificationService.sendLeaveNotificationEvent(notif);
                            });
                        }
                    );

                    return leaves;
                }
                catch
                {
                    throw new GraphQLException(ErrorBuilder.New()
                    .SetMessage(ErrorMessageEnum.FAILED_LEAVE_REQUEST)
                    .Build());
                }
            }
        }

        public async Task<string?> UpdateLeave(UpdateLeaveRequest leave, [Service] LeaveService _leaveService, [Service] NotificationService _notificationService, [Service] IDbContextFactory<HrisContext> contextFactory)
        {
            using (HrisContext context = contextFactory.CreateDbContext())
            {
                try
                {
                    List<LeaveNotification> updatedNotifications = await _leaveService.UpdateLeave(leave);

                    // Send Notifications
                    updatedNotifications.ForEach(notif => _notificationService.sendLeaveNotificationEvent(notif));

                    return SuccessMessageEnum.LEAVE_UPDATED;
                }
                catch (GraphQLException)
                {
                    throw;
                }
            }
        }

        public async Task<string> CancelLeave(CancelLeaveRequest request, [Service] LeaveService _leaveService, [Service] NotificationService _notificationService, [Service] ITopicEventSender eventSender, [Service] IDbContextFactory<HrisContext> contextFactory)
        {
            using (HrisContext context = contextFactory.CreateDbContext())
            {
                try
                {
                    using var transaction = context.Database.BeginTransaction();
                    var cancel = await _leaveService.CancelLeave(request, context);

                    transaction.Commit();

                    return cancel;
                }
                catch (GraphQLException)
                {
                    throw;
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
}
