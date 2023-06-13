import { toast } from 'react-hot-toast'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { UPDATE_TIME_ENTRY } from '~/graphql/mutations/timeEntryMutation'

type UpdateTimeEntryRequest = {
  updatedTimeEntry: {
    userId: number
    timeEntryId: number
    timeIn: string | null
    timeOut: string | null
  }
}
type returnType = {
  handleUpdateTimeEntryMutation: () => UseMutationResult<
    any,
    unknown,
    UpdateTimeEntryRequest,
    unknown
  >
}
type handleUpdateTimeEntryMutationReturnType = UseMutationResult<
  any,
  unknown,
  UpdateTimeEntryRequest,
  unknown
>

const useUpdateTimeEntryMutation = (): returnType => {
  const queryClient = useQueryClient()

  const handleUpdateTimeEntryMutation = (): handleUpdateTimeEntryMutationReturnType =>
    useMutation({
      mutationFn: async (updatedTimeEntry: UpdateTimeEntryRequest) => {
        return await client().request(UPDATE_TIME_ENTRY, updatedTimeEntry)
      },
      onSuccess: async (data) => {
        await queryClient.refetchQueries(['GET_ALL_EMPLOYEE_TIMESHEET'])
        toast.success(data.updateOneTimeEntry)
      },
      onError: (error) => {
        const data = JSON.parse(JSON.stringify(error))
        toast.error(data.response.errors[0].message)
      }
    })
  return { handleUpdateTimeEntryMutation }
}

export default useUpdateTimeEntryMutation
