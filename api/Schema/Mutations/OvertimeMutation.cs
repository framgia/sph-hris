using api.Entities;
using api.Requests;
using api.Services;
using HotChocolate.Subscriptions;

namespace api.Schema.Mutations
{
    [ExtendObjectType("Mutation")]
    public class OvertimeMutation
    {
        public async Task<Overtime> CreateOvertime(CreateOvertimeRequest overtime, [Service] OvertimeService _overtimeService, [Service] NotificationService _notificationService, [Service] ITopicEventSender eventSender)
        {
            var newOvertime = await _overtimeService.Create(overtime);

            var notificationList = await _notificationService.createOvertimeNotification(newOvertime);

            notificationList.ForEach(notif =>
            {
                _notificationService.sendOvertimeNotificationEvent(notif);
            });

            return newOvertime;
        }
    }
}
