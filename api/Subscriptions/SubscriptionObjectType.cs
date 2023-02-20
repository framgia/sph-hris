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

        // Resolver
        [Subscribe(With = nameof(SubscriptionObjectType.LeaveEventReceiver))]
        public LeaveNotification LeaveCreated([EventMessage] LeaveNotification notification)
        {
            return notification;
        }
    }
}
