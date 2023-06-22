import { toast } from 'react-hot-toast'
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { queryClient } from '~/lib/queryClient'
import {
  GET_LEAVES_BY_DATE,
  GET_MY_LEAVES_QUERY,
  GET_LEAVE_TYPES_QUERY,
  GET_YEARLY_ALL_LEAVES_QUERY,
  GET_SPECIFIC_USER_LEAVE_QUERY,
  GET_YEARLY_LEAVES_BY_DATE_QUERY
} from '~/graphql/queries/leaveQuery'
import {
  Leaves,
  LeaveTypes,
  IUserLeave,
  LeaveByDate,
  YearlyLeaves,
  LeaveRequest,
  YearlyLeaveByDate,
  UpdateLeaveRequest,
  CancelLeaveRequest,
  IApproveLeaveUndertimeRequestInput
} from '~/utils/types/leaveTypes'
import {
  CREATE_LEAVE_MUTATION,
  UPDATE_LEAVE_MUTATION,
  CANCEL_LEAVE_MUTATION,
  APROVE_DISAPPROVE_LEAVE_MUTATION,
  APROVE_DISAPPROVE_UNDERTIME_MUTATION
} from '~/graphql/mutations/leaveMutation'

type getLeaveQueryType = UseQueryResult<Leaves, unknown>
type getSpecificLeaveQuery = UseQueryResult<IUserLeave, unknown>
type getLeaveTypeQueryType = UseQueryResult<LeaveTypes, unknown>
type LeaveByDateReturnFunc = UseQueryResult<LeaveByDate, unknown>
type getYearlyLeaveQueryType = UseQueryResult<YearlyLeaves, unknown>
type YearlyLeaveByDateReturnFunc = UseQueryResult<YearlyLeaveByDate, unknown>
type handleLeaveMutationType = UseMutationResult<any, unknown, LeaveRequest, unknown>
type handleUpdateLeaveMutationType = UseMutationResult<any, unknown, UpdateLeaveRequest, unknown>
type handleCancelLeaveMutationType = UseMutationResult<any, unknown, CancelLeaveRequest, unknown>
type handleApproveLeaveUndertimeMutationType = UseMutationResult<
  any,
  unknown,
  IApproveLeaveUndertimeRequestInput,
  unknown
>

type HookReturnType = {
  handleLeaveTypeQuery: () => getLeaveTypeQueryType
  getSpecificLeaveQuery: (userId: number) => getSpecificLeaveQuery
  getLeaveQuery: (userId: number, year: number, leaeTypeId: number) => getLeaveQueryType
  handleApproveLeaveMutation: () => handleApproveLeaveUndertimeMutationType
  handleApproveUndertimeMutation: () => handleApproveLeaveUndertimeMutationType
  handleLeaveMutation: (userId: number, year: number) => handleLeaveMutationType
  getYearlyAllLeaveQuery: (
    year: number,
    leaveById: number,
    ready: boolean
  ) => getYearlyLeaveQueryType
  handleUpdateLeaveMutation: (userId: number, year: number) => handleUpdateLeaveMutationType
  handleCancelLeaveMutation: (userId: number, leaveIds: number) => handleCancelLeaveMutationType
  getLeaveByDateQuery: (userId: number, date: string, isReady: boolean) => LeaveByDateReturnFunc
  getYearlyLeaveByDateQuery: (date: string, isReady: boolean) => YearlyLeaveByDateReturnFunc
}

const useLeave = (): HookReturnType => {
  const getLeaveQuery = (userId: number, year: number, leaveTypeId: number): getLeaveQueryType =>
    useQuery({
      queryKey: ['GET_MY_LEAVES_QUERY', userId, year],
      queryFn: async () => await client.request(GET_MY_LEAVES_QUERY, { userId, year, leaveTypeId }),
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

  const getYearlyAllLeaveQuery = (
    year: number,
    leaveTypeId: number,
    ready: boolean
  ): getYearlyLeaveQueryType =>
    useQuery({
      queryKey: ['GET_YEARLY_ALL_LEAVES_QUERY', year, leaveTypeId],
      queryFn: async () => await client.request(GET_YEARLY_ALL_LEAVES_QUERY, { year, leaveTypeId }),
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
      },
      onSuccess: () => {
        void queryClient.invalidateQueries()
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

  const handleCancelLeaveMutation = (): handleCancelLeaveMutationType =>
    useMutation({
      mutationFn: async (request: CancelLeaveRequest) => {
        return await client.request(CANCEL_LEAVE_MUTATION, {
          request
        })
      },
      onSuccess: () => {
        void queryClient.invalidateQueries()
      },
      onError: async (err: Error) => {
        const [errorMessage] = err.message.split(/:\s/, 2)
        toast.error(errorMessage)
      }
    })

  const getLeaveByDateQuery = (
    userId: number,
    date: string,
    isReady: boolean
  ): LeaveByDateReturnFunc =>
    useQuery({
      queryKey: ['GET_LEAVES_BY_DATE', userId, date],
      queryFn: async () => await client.request(GET_LEAVES_BY_DATE, { userId, date }),
      select: (data: LeaveByDate) => data,
      enabled: isReady
    })

  const getYearlyLeaveByDateQuery = (date: string, isReady: boolean): YearlyLeaveByDateReturnFunc =>
    useQuery({
      queryKey: ['GET_YEARLY_LEAVES_BY_DATE_QUERY', date],
      queryFn: async () => await client.request(GET_YEARLY_LEAVES_BY_DATE_QUERY, { date }),
      select: (data: YearlyLeaveByDate) => data,
      enabled: isReady
    })

  return {
    getLeaveQuery,
    getLeaveByDateQuery,
    handleLeaveMutation,
    handleLeaveTypeQuery,
    getSpecificLeaveQuery,
    getYearlyAllLeaveQuery,
    getYearlyLeaveByDateQuery,
    handleUpdateLeaveMutation,
    handleCancelLeaveMutation,
    handleApproveLeaveMutation,
    handleApproveUndertimeMutation
  }
}

export default useLeave
