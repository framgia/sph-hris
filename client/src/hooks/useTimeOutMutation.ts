import toast from 'react-hot-toast'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { UPDATE_TIME_OUT_MUTATION } from '~/graphql/mutations/TimeOutMutation'

type TimeOutRequest = {
  userId: number
  timeEntryId: number
  timeHour: string
  remarks: string
  workedHours: string
}
type returnType = {
  handleTimeOutMutation: () => UseMutationResult<any, unknown, TimeOutRequest, unknown>
}
type handleTimeOutMutationReturnType = UseMutationResult<any, unknown, TimeOutRequest, unknown>

const useTimeOutMutation = (): returnType => {
  const handleTimeOutMutation = (): handleTimeOutMutationReturnType =>
    useMutation({
      mutationFn: async (timeOut: TimeOutRequest) => {
        return await client().request(UPDATE_TIME_OUT_MUTATION, {
          timeOut
        })
      },
      onError: (error) => {
        const data = JSON.parse(JSON.stringify(error))
        toast.error(data.response.errors[0].message)
      }
    })
  return { handleTimeOutMutation }
}

export default useTimeOutMutation
