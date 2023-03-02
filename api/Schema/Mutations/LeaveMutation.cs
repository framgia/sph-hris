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
    }
}
