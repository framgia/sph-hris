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
export const getOvertimeNotificationSubQuery = (id: number): string => `
  subscription {
    overtimeCreated(id: ${id}) {
      id
      type
      data
      readAt
      isRead
    }
  }
`

export const getChangeShiftNotificationSubQuery = (id: number): string => `
  subscription {
    changeShiftCreated(id: ${id}) {
      id
      type
      data
      readAt
      isRead
    }
  }
`
export const getSummaryOvertimeNotification = (id: number): string => `
subscription {
  overtimeSummaryCreated(id: ${id}) {
    id
    type
    data
    readAt
    isRead
  }
}
`
