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
import { LeaveRequest, Leaves, YearlyLeaves, LeaveTypes } from '~/utils/types/leaveTypes'
import { CREATE_LEAVE_MUTATION } from '~/graphql/mutations/leaveMutation'

type handleLeaveQueryType = UseQueryResult<Leaves, unknown>
type handleYearlyLeaveQueryType = UseQueryResult<YearlyLeaves, unknown>
type handleLeaveTypeQueryType = UseQueryResult<LeaveTypes, unknown>
type handleLeaveMutationType = UseMutationResult<any, unknown, LeaveRequest, unknown>

type returnType = {
  handleLeaveQuery: (userId: number, year: number) => handleLeaveQueryType
  handleLeaveMutation: (userId: number, year: number) => handleLeaveMutationType
  handleLeaveTypeQuery: () => handleLeaveTypeQueryType
  handleYearlyAllLeaveQuery: (year: number, ready: boolean) => handleYearlyLeaveQueryType
}

const useLeave = (): returnType => {
  const queryClient = useQueryClient()
  const handleLeaveQuery = (userId: number, year: number): handleLeaveQueryType =>
    useQuery({
      queryKey: ['GET_MY_LEAVES_QUERY', userId, year],
      queryFn: async () => await client.request(GET_MY_LEAVES_QUERY, { userId, year }),
      select: (data: Leaves) => data,
      enabled: Boolean(userId) && Boolean(year)
    })

  const handleYearlyAllLeaveQuery = (year: number, ready: boolean): handleYearlyLeaveQueryType =>
    useQuery({
      queryKey: ['GET_YEARLY_ALL_LEAVES_QUERY', year],
      queryFn: async () => await client.request(GET_YEARLY_ALL_LEAVES_QUERY, { year }),
      select: (data: YearlyLeaves) => data,
      enabled: ready
    })
  const handleLeaveTypeQuery = (): handleLeaveTypeQueryType =>
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

  return {
    handleLeaveQuery,
    handleYearlyAllLeaveQuery,
    handleLeaveMutation,
    handleLeaveTypeQuery
  }
}

export default useLeave
