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

        // Resolver
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
    }
}
