import { NOTIFICATION_TYPE, SpecificType } from './constants/notificationTypes'
import { NotificationData } from './types/notificationTypes'

export const getDuration = (data: NotificationData, type: string): number => {
  if (
    type === NOTIFICATION_TYPE.LEAVE ||
    type === NOTIFICATION_TYPE.UNDERTIME ||
    type === NOTIFICATION_TYPE.LEAVE_RESOLVED ||
    type === NOTIFICATION_TYPE.UNDERTIME_RESOLVED
  )
    return data.RequestedHours as number
  if (type === NOTIFICATION_TYPE.OVERTIME && data.Type === SpecificType.REQUEST)
    return data.RequestedMinutes as number
  if (
    type === NOTIFICATION_TYPE.OVERTIME_RESOLVED &&
    (data.Type === SpecificType.APPROVAL || data.Type === SpecificType.DISAPPROVAL)
  )
    return data.ApprovedMinutes as number

  return 0
}
