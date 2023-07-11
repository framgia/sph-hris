import toast from 'react-hot-toast'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { IChangeSchedule } from '~/utils/interfaces/changeScheduleInterface'
import { CREATE_CHANGE_SCHEDULE_MUTATION } from '~/graphql/mutations/changeScheduleMutation'

type ChangeFuncReturnType = UseMutationResult<any, Error, IChangeSchedule, unknown>

type HookReturnType = {
  handleChangeScheduleMutation: () => UseMutationResult<any, Error, IChangeSchedule, unknown>
}

const useChangeSchedule = (): HookReturnType => {
  const handleChangeScheduleMutation = (): ChangeFuncReturnType =>
    useMutation({
      mutationFn: async (request: IChangeSchedule) => {
        return await client.request(CREATE_CHANGE_SCHEDULE_MUTATION, { request })
      },
      onError: async (err: Error) => {
        const [errorMessage] = err.message.split(/:\s/, 2)
        toast.error(errorMessage)
      }
    })

  return {
    handleChangeScheduleMutation
  }
}

export default useChangeSchedule
