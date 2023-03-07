import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { client } from '~/utils/shared/client'
import { CREATE_OVERTIME_MUTATION } from '~/graphql/mutations/overtimeMutation'
import { IOvertimeRequestInput } from '~/utils/types/overtimeTypes'

type handleOvertimeMutationType = UseMutationResult<any, unknown, IOvertimeRequestInput, unknown>

type returnType = {
  handleOvertimeMutation: () => handleOvertimeMutationType
}

const useOvertime = (): returnType => {
  const queryClient = useQueryClient()

  const handleOvertimeMutation = (): handleOvertimeMutationType =>
    useMutation({
      mutationFn: async (overtime: IOvertimeRequestInput) => {
        return await client.request(CREATE_OVERTIME_MUTATION, {
          overtime
        })
      },
      onSuccess: async () => {
        toast.success('Overtime request filed successfully!')
        await queryClient.invalidateQueries({
          queryKey: ['GET_EMPLOYEE_TIMESHEET']
        })
      },
      onError: async () => {
        toast.error('Something went wrong')
      }
    })

  return {
    handleOvertimeMutation
  }
}

export default useOvertime
