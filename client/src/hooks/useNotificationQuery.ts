import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'

import { GET_ALL_USER_NOTIFICATION } from '~/graphql/queries/NotificationQueries'
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
