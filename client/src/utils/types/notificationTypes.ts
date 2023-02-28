export type Notification = {
  id: number
  leaveId: number | null
  type: string
  data: string
  readAt: string | null
  isRead: boolean
}

export type UserNotifications = {
  notificationByRecipientId: Notification[]
}

export type NotificationData = {
  User: {
    Id: number
    Name: string
    AvatarLink: string
  }
  ReadAt: string | null
  DateFiled: string
  DateRequested: string
  Projects: string[]
  Remarks: string
  RequestedHours: number
  Status: string
  Type: string
}
