import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { UPDATE_TIME_IN_MUTATION } from '~/graphql/mutations/TimeInMutation'
import { client } from '~/utils/shared/client'

type TimeInRequest = {
  id: number
  date: string
  userId: number
  startTime: string
  endTime: string
  timeHour: string
  remarks: string
  files: FileList
}
type returnType = {
  handleTimeInMutation: () => UseMutationResult<any, unknown, TimeInRequest, unknown>
}

type handleTimeInMutationReturnType = UseMutationResult<any, unknown, TimeInRequest, unknown>

const useTimeInMutation = (): returnType => {
  const queryClient = useQueryClient()
  const handleTimeInMutation = (): handleTimeInMutationReturnType =>
    useMutation({
      mutationFn: async (timeIn: TimeInRequest) => {
        return await client.request(UPDATE_TIME_IN_MUTATION, {
          timeIn
        })
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['GET_USER_QUERY']
        })
      }
    })
  return { handleTimeInMutation }
}

export default useTimeInMutation
