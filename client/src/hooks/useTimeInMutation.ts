import toast from 'react-hot-toast'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

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
  const handleTimeInMutation = (): handleTimeInMutationReturnType =>
    useMutation({
      mutationFn: async (timeIn: TimeInRequest) => {
        return await client.request(UPDATE_TIME_IN_MUTATION, {
          timeIn
        })
      },
      onError: (error) => {
        const data = JSON.parse(JSON.stringify(error))
        toast.error(data.response.errors[0].message)
      }
    })
  return { handleTimeInMutation }
}

export default useTimeInMutation
