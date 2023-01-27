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
        await queryClient.invalidateQueries({
          queryKey: ['GET_USER_QUERY']
        })
      }
    })
  return { handleTimeOutMutation }
}

export default useTimeOutMutation
