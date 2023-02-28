import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'

import { GET_ALL_USER_NOTIFICATION, IS_READ } from '~/graphql/queries/NotificationQueries'
import { UserNotifications } from '~/utils/types/notificationTypes'

type getUserNotificationsQueryType = UseQueryResult<UserNotifications, unknown>

type returnType = {
  getUserNotificationsQuery: (userId: number) => getUserNotificationsQueryType
}

export const useNotification = (): returnType => {
  const getUserNotificationsQuery = (id: number): getUserNotificationsQueryType =>
    useQuery({
      queryKey: ['GET_ALL_USER_NOTIFICATION'],
      queryFn: async () => await client.request(GET_ALL_USER_NOTIFICATION, { id }),
      select: (data: UserNotifications) => data,
      enabled: !isNaN(id)
    })

  return {
    getUserNotificationsQuery
  }
}

export default useNotification

export const updateIsRead = (
  recipientId: number,
  ready: boolean
): UseQueryResult<
  {
    notificationByRecipientId: Notification[]
  },
  unknown
> => {
  const result = useQuery({
    queryKey: ['IS_READ', recipientId],
    queryFn: async () => await client.request(IS_READ, { id: recipientId }),
    select: (data: { notificationByRecipientId: Notification[] }) => data,
    enabled: !isNaN(recipientId) && ready
  })
  return result
}
