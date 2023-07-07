using api.Entities;
using HotChocolate.Execution;
using HotChocolate.Subscriptions;

namespace api.Subscriptions
{
    public class SubscriptionObjectType
    {

        [Topic]
        [Subscribe]
        public Leave SubscribeAllLeave([EventMessage] Leave leaveEntry)
        {
            return leaveEntry;
        }

        // Subscriber
        public ValueTask<ISourceStream<LeaveNotification>> LeaveEventReceiver(int id, [Service] ITopicEventReceiver eventReceiver)
        {
            var topic = $"{id}_{nameof(SubscriptionObjectType.LeaveCreated)}";
            return eventReceiver.SubscribeAsync<LeaveNotification>(topic);
        }

        public ValueTask<ISourceStream<OvertimeNotification>> OvertimeEventReceiver(int id, [Service] ITopicEventReceiver eventReceiver)
        {
            var topic = $"{id}_{nameof(SubscriptionObjectType.OvertimeCreated)}";
            return eventReceiver.SubscribeAsync<OvertimeNotification>(topic);
        }

        public ValueTask<ISourceStream<ChangeShiftNotification>> ChangeShiftEventReceiver(int id, [Service] ITopicEventReceiver eventReceiver)
        {
            var topic = $"{id}_{nameof(SubscriptionObjectType.ChangeShiftCreated)}";
            return eventReceiver.SubscribeAsync<ChangeShiftNotification>(topic);
        }

        public ValueTask<ISourceStream<ESLChangeShiftNotification>> ESLChangeShiftEventReceiver(int id, [Service] ITopicEventReceiver eventReceiver)
        {
            var topic = $"{id}_{nameof(SubscriptionObjectType.ESLChangeShiftCreated)}";
            return eventReceiver.SubscribeAsync<ESLChangeShiftNotification>(topic);
        }

        public ValueTask<ISourceStream<ESLOffsetNotification>> ESLOffsetEventReceiver(int id, [Service] ITopicEventReceiver eventReceiver)
        {
            var topic = $"{id}_{nameof(SubscriptionObjectType.ESLOffsetCreated)}";
            return eventReceiver.SubscribeAsync<ESLOffsetNotification>(topic);
        }

        public ValueTask<ISourceStream<Notification>> OvertimeSummaryEventReceiver(int id, [Service] ITopicEventReceiver eventReceiver)
        {
            var topic = $"{id}_{nameof(OvertimeSummaryCreated)}";
            return eventReceiver.SubscribeAsync<Notification>(topic);
        }
        public ValueTask<ISourceStream<Notification>> EventReceiver(int id, [Service] ITopicEventReceiver eventReceiver)
        {
            var topic = $"{id}_{nameof(NotificationCreated)}";
            return eventReceiver.SubscribeAsync<Notification>(topic);
        }

        // Resolver
        [Subscribe(With = nameof(OvertimeSummaryEventReceiver))]
        public Notification OvertimeSummaryCreated([EventMessage] Notification notification)
        {
            return notification;
        }

        [Subscribe(With = nameof(SubscriptionObjectType.LeaveEventReceiver))]
        public LeaveNotification LeaveCreated([EventMessage] LeaveNotification notification)
        {
            return notification;
        }

        [Subscribe(With = nameof(SubscriptionObjectType.OvertimeEventReceiver))]
        public OvertimeNotification OvertimeCreated([EventMessage] OvertimeNotification notification)
        {
            return notification;
        }

        [Subscribe(With = nameof(SubscriptionObjectType.ChangeShiftEventReceiver))]
        public ChangeShiftNotification ChangeShiftCreated([EventMessage] ChangeShiftNotification notification)
        {
            return notification;
        }

        [Subscribe(With = nameof(SubscriptionObjectType.ESLChangeShiftEventReceiver))]
        public ESLChangeShiftNotification ESLChangeShiftCreated([EventMessage] ESLChangeShiftNotification notification)
        {
            return notification;
        }

        [Subscribe(With = nameof(SubscriptionObjectType.ESLOffsetEventReceiver))]
        public ESLOffsetNotification ESLOffsetCreated([EventMessage] ESLOffsetNotification notification)
        {
            return notification;
        }
        [Subscribe(With = nameof(EventReceiver))]
        public Notification NotificationCreated([EventMessage] Notification notification)
        {
            return notification;
        }
    }
}
