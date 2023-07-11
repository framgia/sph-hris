export const getChangeScheduleNotificationSubscription = (id: number): string => `
  subscription {
    notificationCreated(id: ${id}) {
      id
      type
      data
      readAt
      isRead
    }
  }
`
