export const getFileOffsetNotificationSubscription = (id: number): string => `
  subscription {
    eslOffsetCreated(id: ${id}) {
      id
      type
      data
      readAt
      isRead
    }
  }
`
