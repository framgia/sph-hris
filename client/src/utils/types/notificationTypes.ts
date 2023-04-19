import { IESLOffset } from '../interfaces/eslOffsetInterface'

export type Notification = {
  id: number
  leaveId: number | null
  type: string
  data: string
  readAt: string | null
  isRead: boolean
  createdAt: string
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
  Offsets: IESLOffset[]
  ReadAt: string | null
  DateFiled: string
  DateRequested: string
  Projects: string[]
  Remarks: string
  RequestedHours: number | null
  RequestedMinutes: number | null
  ApprovedMinutes: number | null
  Status: string
  Type: string
  RequestedTimeIn: string | null
  RequestedTimeOut: string | null
  Description: string | null
}
