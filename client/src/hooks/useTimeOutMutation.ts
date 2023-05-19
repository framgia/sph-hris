import toast from 'react-hot-toast'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { UPDATE_TIME_OUT_MUTATION } from '~/graphql/mutations/TimeOutMutation'
import { client } from '~/utils/shared/client'

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
  const queryClient = useQueryClient()
  const handleTimeOutMutation = (): handleTimeOutMutationReturnType =>
    useMutation({
      mutationFn: async (timeOut: TimeOutRequest) => {
        return await client.request(UPDATE_TIME_OUT_MUTATION, {
          timeOut
        })
      },
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['GET_USER_QUERY'] }),
          queryClient.invalidateQueries({ queryKey: ['GET_EMPLOYEE_TIMESHEET'] })
        ])
      },
      onError: (error) => {
        const data = JSON.parse(JSON.stringify(error))
        toast.error(data.response.errors[0].message)
      }
    })
  return { handleTimeOutMutation }
}

export default useTimeOutMutation
