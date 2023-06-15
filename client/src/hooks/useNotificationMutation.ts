import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import {
  NOTIFICATION_READ_AT_MUTATION,
  READ_ALL_NOTIFICATIONS
} from '~/graphql/mutations/notificationMutation'
import { NotificationRequestInput } from '~/utils/types/notificationTypes'

type returnType = {
  handleNotificationMutation: () => UseMutationResult<
    any,
    unknown,
    NotificationRequestInput,
    unknown
  >
  handleReadAllNotificationMutation: () => UseMutationResult<
    any,
    unknown,
    NotificationRequestInput,
    unknown
  >
}

type handleNotificationMutationReturnType = UseMutationResult<
  any,
  unknown,
  NotificationRequestInput,
  unknown
>

const useNotificationMutation = (): returnType => {
  const handleNotificationMutation = (): handleNotificationMutationReturnType =>
    useMutation({
      mutationFn: async (notification: NotificationRequestInput) => {
        return await client.request(NOTIFICATION_READ_AT_MUTATION, { notification })
      },
      onSuccess: async () => {}
    })

  const handleReadAllNotificationMutation = (): handleNotificationMutationReturnType =>
    useMutation({
      mutationFn: async (id: NotificationRequestInput) => {
        return await client.request(READ_ALL_NOTIFICATIONS, { id })
      },
      onSuccess: async () => {}
    })

  return { handleNotificationMutation, handleReadAllNotificationMutation }
}

export default useNotificationMutation
