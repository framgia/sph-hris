import { toast } from 'react-hot-toast'
import {
  useQuery,
  useMutation,
  UseQueryResult,
  useQueryClient,
  UseMutationResult
} from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { GET_ALL_OVERTIME } from '~/graphql/queries/overtimeQuery'
import {
  CREATE_OVERTIME_MUTATION,
  CREATE_BULK_OVERTIME_MUTATION,
  CREATE_OVERTIME_SUMMARY_MUTATION,
  APROVE_DISAPPROVE_OVERTIME_MUTATION,
  APROVE_DISAPPROVE_OVERTIME_SUMMARY_MUTATION
} from '~/graphql/mutations/overtimeMutation'
import {
  IAllOvertime,
  IOvertimeRequestInput,
  IBulkOvertimeRequestInput,
  ILeaderApproveOvertimeRequestInput,
  ICreateOvertimeSummaryRequestInput,
  IManagerApproveOvertimeRequestInput
} from '~/utils/types/overtimeTypes'

type handleOvertimeMutationType = UseMutationResult<any, unknown, IOvertimeRequestInput, unknown>
type handleBulkOvertimeMutationType = UseMutationResult<
  any,
  unknown,
  IBulkOvertimeRequestInput,
  unknown
>
type handleManagerApproveOvertimeMutationType = UseMutationResult<
  any,
  unknown,
  IManagerApproveOvertimeRequestInput,
  unknown
>
type handleManagerApproveOvertimeSummaryMutationType = UseMutationResult<
  any,
  unknown,
  IManagerApproveOvertimeRequestInput[],
  unknown
>
type handleLeaderApproveOvertimeMutationType = UseMutationResult<
  any,
  unknown,
  ILeaderApproveOvertimeRequestInput,
  unknown
>
type handleCreateOvertimeSummaryMutationType = UseMutationResult<
  any,
  unknown,
  ICreateOvertimeSummaryRequestInput,
  unknown
>

type returnType = {
  handleOvertimeMutation: () => handleOvertimeMutationType
  handleBulkOvertimeMutation: () => handleBulkOvertimeMutationType
  handleLeaderApproveOvertimeMutation: () => handleLeaderApproveOvertimeMutationType
  handleCreateOvertimeSummaryMutation: () => handleCreateOvertimeSummaryMutationType
  handleManagerApproveOvertimeMutation: () => handleManagerApproveOvertimeMutationType
  handleManagerApproveOvertimesSummaryMutation: () => handleManagerApproveOvertimeSummaryMutationType
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

  const handleBulkOvertimeMutation = (): handleBulkOvertimeMutationType =>
    useMutation({
      mutationFn: async (request: IBulkOvertimeRequestInput) => {
        return await client.request(CREATE_BULK_OVERTIME_MUTATION, {
          request
        })
      },
      onSuccess: async () => {
        toast.success('Overtime request filed successfully!')
        await queryClient.invalidateQueries({
          queryKey: ['GET_ALL_OVERTIME_QUERY']
        })
      },
      onError: async (error: Error) => {
        const [errorMessage] = error.message.split(/:\s/, 2)
        toast.error(errorMessage)
      }
    })

  const handleManagerApproveOvertimeMutation = (): handleManagerApproveOvertimeMutationType =>
    useMutation({
      mutationFn: async (approveOvertimeRequests: IManagerApproveOvertimeRequestInput) => {
        return await client.request(APROVE_DISAPPROVE_OVERTIME_MUTATION, {
          overtimeApproval: approveOvertimeRequests
        })
      },
      onSuccess: async () => {
        toast.success('Success!')
        await queryClient.invalidateQueries({
          queryKey: ['GET_ALL_OVERTIME']
        })
      },
      onError: async () => {
        toast.error('Something went wrong')
      }
    })

  const handleManagerApproveOvertimesSummaryMutation =
    (): handleManagerApproveOvertimeSummaryMutationType =>
      useMutation({
        mutationFn: async (data: IManagerApproveOvertimeRequestInput[]) => {
          return await client.request(APROVE_DISAPPROVE_OVERTIME_SUMMARY_MUTATION, {
            approveOvertimeRequests: { approveOvertimeRequests: data }
          })
        },
        onSuccess: async (message) => {
          toast.success(message.approveDisapproveAllOvertimeSummary)
          await queryClient.invalidateQueries({
            queryKey: ['GET_ALL_OVERTIME']
          })
        },
        onError: async () => {
          toast.error('Something went wrong')
        }
      })

  const handleLeaderApproveOvertimeMutation = (): handleLeaderApproveOvertimeMutationType =>
    useMutation({
      mutationFn: async (data: ILeaderApproveOvertimeRequestInput) => {
        return await client.request(APROVE_DISAPPROVE_OVERTIME_MUTATION, {
          overtimeApproval: data
        })
      },
      onSuccess: async () => {
        toast.success('Success!')
      },
      onError: async () => {
        toast.error('Something went wrong')
      }
    })

  const handleCreateOvertimeSummaryMutation = (): handleCreateOvertimeSummaryMutationType =>
    useMutation({
      mutationFn: async (data: ICreateOvertimeSummaryRequestInput) => {
        return await client.request(CREATE_OVERTIME_SUMMARY_MUTATION, {
          overtimeSummary: data
        })
      },
      onSuccess: async (data) => {
        toast.success(data.createSummarizedOvertime)
      },
      onError: async () => {
        toast.error('Something went wrong')
      }
    })

  return {
    handleOvertimeMutation,
    handleBulkOvertimeMutation,
    handleLeaderApproveOvertimeMutation,
    handleCreateOvertimeSummaryMutation,
    handleManagerApproveOvertimeMutation,
    handleManagerApproveOvertimesSummaryMutation
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
