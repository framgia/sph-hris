import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { client } from '~/utils/shared/client'
import {
  GET_MY_LEAVES_QUERY,
  GET_YEARLY_ALL_LEAVES_QUERY,
  GET_LEAVE_TYPES_QUERY,
  GET_SPECIFIC_USER_LEAVE_QUERY
} from '~/graphql/queries/leaveQuery'
import {
  LeaveRequest,
  Leaves,
  YearlyLeaves,
  LeaveTypes,
  IUserLeave,
  UpdateLeaveRequest,
  IApproveLeaveUndertimeRequestInput
} from '~/utils/types/leaveTypes'
import {
  CREATE_LEAVE_MUTATION,
  APROVE_DISAPPROVE_LEAVE_MUTATION,
  APROVE_DISAPPROVE_UNDERTIME_MUTATION,
  UPDATE_LEAVE_MUTATION
} from '~/graphql/mutations/leaveMutation'

type getLeaveQueryType = UseQueryResult<Leaves, unknown>
type getYearlyLeaveQueryType = UseQueryResult<YearlyLeaves, unknown>
type getSpecificLeaveQuery = UseQueryResult<IUserLeave, unknown>
type getLeaveTypeQueryType = UseQueryResult<LeaveTypes, unknown>
type handleLeaveMutationType = UseMutationResult<any, unknown, LeaveRequest, unknown>
type handleUpdateLeaveMutationType = UseMutationResult<any, unknown, UpdateLeaveRequest, unknown>
type handleApproveLeaveUndertimeMutationType = UseMutationResult<
  any,
  unknown,
  IApproveLeaveUndertimeRequestInput,
  unknown
>

type returnType = {
  getLeaveQuery: (userId: number, year: number) => getLeaveQueryType
  getSpecificLeaveQuery: (userId: number) => getSpecificLeaveQuery
  handleLeaveMutation: (userId: number, year: number) => handleLeaveMutationType
  handleUpdateLeaveMutation: (userId: number, year: number) => handleUpdateLeaveMutationType
  handleLeaveTypeQuery: () => getLeaveTypeQueryType
  getYearlyAllLeaveQuery: (year: number, ready: boolean) => getYearlyLeaveQueryType
  handleApproveLeaveMutation: () => handleApproveLeaveUndertimeMutationType
  handleApproveUndertimeMutation: () => handleApproveLeaveUndertimeMutationType
}

const useLeave = (): returnType => {
  const getLeaveQuery = (userId: number, year: number): getLeaveQueryType =>
    useQuery({
      queryKey: ['GET_MY_LEAVES_QUERY', userId, year],
      queryFn: async () => await client.request(GET_MY_LEAVES_QUERY, { userId, year }),
      select: (data: Leaves) => data,
      enabled: Boolean(userId) && Boolean(year)
    })

  const getSpecificLeaveQuery = (leaveId: number): getSpecificLeaveQuery =>
    useQuery({
      queryKey: ['GET_SPECIFIC_USER_LEAVE_QUERY', leaveId],
      queryFn: async () => await client.request(GET_SPECIFIC_USER_LEAVE_QUERY, { leaveId }),
      select: (data: IUserLeave) => data,
      enabled: !isNaN(leaveId)
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
  const handleLeaveMutation = (): handleLeaveMutationType =>
    useMutation({
      mutationFn: async (leave: LeaveRequest) => {
        return await client.request(CREATE_LEAVE_MUTATION, {
          leave
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

  const handleUpdateLeaveMutation = (): handleUpdateLeaveMutationType =>
    useMutation({
      mutationFn: async (updateLeave: UpdateLeaveRequest) => {
        return await client.request(UPDATE_LEAVE_MUTATION, {
          updateLeave
        })
      },
      onError: async (err: Error) => {
        const [errorMessage] = err.message.split(/:\s/, 2)
        toast.error(errorMessage)
      }
    })

  return {
    getLeaveQuery,
    getYearlyAllLeaveQuery,
    getSpecificLeaveQuery,
    handleUpdateLeaveMutation,
    handleLeaveMutation,
    handleLeaveTypeQuery,
    handleApproveLeaveMutation,
    handleApproveUndertimeMutation
  }
}

export default useLeave
