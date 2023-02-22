export const getLeaveNotificationSubQuery = (id: number): string => `
  subscription {
    leaveCreated(id: ${id}) {
      id
      leaveId
      type
      data
      readAt
      isRead
    }
  }
`
