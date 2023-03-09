import { toast } from 'react-hot-toast'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult
} from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { GET_ALL_OVERTIME } from '~/graphql/queries/overtimeQuery'
import { CREATE_OVERTIME_MUTATION } from '~/graphql/mutations/overtimeMutation'
import { IOvertimeRequestInput, IAllOvertime } from '~/utils/types/overtimeTypes'

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

export const getAllovertime = (): UseQueryResult<{ allOvertime: IAllOvertime[] }, unknown> => {
  const result = useQuery({
    queryKey: ['GET_ALL_OVERTIME'],
    queryFn: async () => await client.request(GET_ALL_OVERTIME),
    select: (data: { allOvertime: IAllOvertime[] }) => data
  })
  return result
}
