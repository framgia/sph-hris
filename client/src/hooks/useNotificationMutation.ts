import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { NOTIFICATION_READ_AT_MUTATION } from '~/graphql/mutations/notificationMutation'

type NotificationRequestInput = {
  id: number
}

type returnType = {
  handleNotificationMutation: () => UseMutationResult<
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
      onSuccess: async (data) => {}
    })
  return { handleNotificationMutation }
}

export default useNotificationMutation
