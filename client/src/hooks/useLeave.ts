import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult
} from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { client } from '~/utils/shared/client'
import {
  GET_MY_LEAVES_QUERY,
  GET_YEARLY_ALL_LEAVES_QUERY,
  GET_LEAVE_TYPES_QUERY
} from '~/graphql/queries/leaveQuery'
import {
  LeaveRequest,
  Leaves,
  YearlyLeaves,
  LeaveTypes,
  IApproveLeaveUndertimeRequestInput
} from '~/utils/types/leaveTypes'
import {
  CREATE_LEAVE_MUTATION,
  APROVE_DISAPPROVE_LEAVE_MUTATION,
  APROVE_DISAPPROVE_UNDERTIME_MUTATION
} from '~/graphql/mutations/leaveMutation'

type getLeaveQueryType = UseQueryResult<Leaves, unknown>
type getYearlyLeaveQueryType = UseQueryResult<YearlyLeaves, unknown>
type getLeaveTypeQueryType = UseQueryResult<LeaveTypes, unknown>
type handleLeaveMutationType = UseMutationResult<any, unknown, LeaveRequest, unknown>
type handleApproveLeaveUndertimeMutationType = UseMutationResult<
  any,
  unknown,
  IApproveLeaveUndertimeRequestInput,
  unknown
>

type returnType = {
  getLeaveQuery: (userId: number, year: number) => getLeaveQueryType
  handleLeaveMutation: (userId: number, year: number) => handleLeaveMutationType
  handleLeaveTypeQuery: () => getLeaveTypeQueryType
  getYearlyAllLeaveQuery: (year: number, ready: boolean) => getYearlyLeaveQueryType
  handleApproveLeaveMutation: () => handleApproveLeaveUndertimeMutationType
  handleApproveUndertimeMutation: () => handleApproveLeaveUndertimeMutationType
}

const useLeave = (): returnType => {
  const queryClient = useQueryClient()
  const getLeaveQuery = (userId: number, year: number): getLeaveQueryType =>
    useQuery({
      queryKey: ['GET_MY_LEAVES_QUERY', userId, year],
      queryFn: async () => await client.request(GET_MY_LEAVES_QUERY, { userId, year }),
      select: (data: Leaves) => data,
      enabled: Boolean(userId) && Boolean(year)
    })

  const getYearlyAllLeaveQuery = (year: number, ready: boolean): getYearlyLeaveQueryType =>
    useQuery({
      queryKey: ['GET_YEARLY_ALL_LEAVES_QUERY', year],
      queryFn: async () => await client.request(GET_YEARLY_ALL_LEAVES_QUERY, { year }),
      select: (data: YearlyLeaves) => data,
      enabled: ready
    })
  const handleLeaveTypeQuery = (): getLeaveTypeQueryType =>
    useQuery({
      queryKey: ['GET_LEAVE_TYPES_QUERY'],
      queryFn: async () => await client.request(GET_LEAVE_TYPES_QUERY),
      select: (data: LeaveTypes) => data
    })
  const handleLeaveMutation = (userId: number, year: number): handleLeaveMutationType =>
    useMutation({
      mutationFn: async (leave: LeaveRequest) => {
        return await client.request(CREATE_LEAVE_MUTATION, {
          leave
        })
      },
      onSuccess: async () => {
        toast.success('Leave request filed successfully!')
        await queryClient.invalidateQueries({
          queryKey: ['GET_MY_LEAVES_QUERY', userId, year]
        })
      },
      onError: async () => {
        toast.error('Something went wrong')
      }
    })

  const handleApproveLeaveMutation = (): handleApproveLeaveUndertimeMutationType =>
    useMutation({
      mutationFn: async (data: IApproveLeaveUndertimeRequestInput) => {
        return await client.request(APROVE_DISAPPROVE_LEAVE_MUTATION, {
          approval: data
        })
      },
      onSuccess: async () => {
        toast.success('Success!')
      },
      onError: async (err: Error) => {
        const [errorMessage] = err.message.split(/:\s/, 2)
        toast.error(errorMessage)
      }
    })

  const handleApproveUndertimeMutation = (): handleApproveLeaveUndertimeMutationType =>
    useMutation({
      mutationFn: async (data: IApproveLeaveUndertimeRequestInput) => {
        return await client.request(APROVE_DISAPPROVE_UNDERTIME_MUTATION, {
          approval: data
        })
      },
      onSuccess: async () => {
        toast.success('Success!')
      },
      onError: async () => {
        toast.error('Something went wrong')
      }
    })

  return {
    getLeaveQuery,
    getYearlyAllLeaveQuery,
    handleLeaveMutation,
    handleLeaveTypeQuery,
    handleApproveLeaveMutation,
    handleApproveUndertimeMutation
  }
}

export default useLeave
