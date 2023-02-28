using api.Requests;
using api.Services;

namespace api.Schema.Mutations
{
    [ExtendObjectType("Mutation")]
    public class NotificationMutation
    {
        private readonly NotificationService _notificationService;
        public NotificationMutation(NotificationService notificationService)
        {
            _notificationService = notificationService;
        }
        public async Task<int> ReadNotification(NotificationRequest notification)
        {
            return await _notificationService.ReadNotification(notification);
        }
    }
}
