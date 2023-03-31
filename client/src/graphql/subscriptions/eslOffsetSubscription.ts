export const getESLOffsetNotificationSubscription = (id: number): string => `
  subscription {
    eslChangeShiftCreated(id: ${id}) {
      type
      data
      readAt
      isRead
    }
  }
`
