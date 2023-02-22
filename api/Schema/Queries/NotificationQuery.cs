using api.Entities;
using api.Services;

namespace api.Schema.Queries
{
    [ExtendObjectType("Query")]
    public class NotificationQuery
    {
        private readonly NotificationService _notificationService;
        public NotificationQuery(NotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        public async Task<List<Notification>> GetNotificationByRecipientId(int id)
        {
            return await _notificationService.getByRecipientId(id);
        }
    }
}
