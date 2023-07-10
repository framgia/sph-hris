import { toast } from 'react-hot-toast'
import { useMutation, useQuery, UseQueryResult, UseMutationResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import {
  GET_ALL_EMPLOYEE_SCHEDULE,
  GET_ALL_EMPLOYEE_SCHEDULE_REQUESTS,
  GET_EMPLOYEE_SCHEDULE,
  GET_EMPLOYEES_BY_SCHEDULE,
  SEARCH_EMPLOYEES_BY_SCHEDULE
} from '~/graphql/queries/employeeSchedule'

import { queryClient } from '~/lib/queryClient'
import {
  ADD_EMPLOYEE_TO_SCHEDULE,
  CREATE_EMPLOYEE_SCHEDULE,
  EDIT_EMPLOYEE_SCHEDULE,
  DELETE_EMPLOYEE_SCHEDULE,
  REASSIGN_EMPLOYEE_TO_SCHEDULE
} from '~/graphql/mutations/employeeScheduleMutation'
import {
  IGetAllEmployeeSchedule,
  IGetEmployeeSchedule,
  ICreateEmployeeScheduleRequestInput,
  IEditEmployeeScheduleRequestInput,
  IDeleteEmployeeScheduleRequestInput,
  IAddMemberToScheduleInput,
  ISearchEmployeesByScheduleRequestInput,
  IReassignEmployeesScheduleRequestInput,
  IAllFiledScheduleRequest
} from '~/utils/types/employeeScheduleTypes'
import { IScheduleMember } from '~/utils/interfaces/scheduleMemberInterface'

type GetAllEmployeeScheduleFuncReturnType = UseQueryResult<
  { allEmployeeScheduleDetails: IGetAllEmployeeSchedule[] },
  unknown
>

type GetEmployeeScheduleFuncReturnType = UseQueryResult<
  { employeeScheduleDetails: IGetEmployeeSchedule[] },
  unknown
>

type CreateEmployeeScheduleMutationType = UseMutationResult<
  any,
  unknown,
  ICreateEmployeeScheduleRequestInput,
  unknown
>

type EditEmployeeScheduleMutationType = UseMutationResult<
  any,
  unknown,
  IEditEmployeeScheduleRequestInput,
  unknown
>

type ReassignEmployeeScheduleMutationType = UseMutationResult<
  any,
  unknown,
  IReassignEmployeesScheduleRequestInput,
  unknown
>

type DeleteEmployeeScheduleMutationType = UseMutationResult<
  any,
  unknown,
  IDeleteEmployeeScheduleRequestInput,
  unknown
>

type GetEmployeesByScheduleFuncReturnType = UseQueryResult<
  { employeesBySchedule: IScheduleMember[] },
  unknown
>

type GetAllEmployeeScheduleRequestsReturnType = UseQueryResult<
  { employeeChangeScheduleRequest: IAllFiledScheduleRequest[] },
  unknown
>

type AddMemberToScheduleReturnType = UseMutationResult<
  any,
  unknown,
  IAddMemberToScheduleInput,
  unknown
>

type GetSearchEmployeesByScheduleFuncReturnType = UseQueryResult<
  { searchEmployeesBySchedule: IScheduleMember[] },
  unknown
>

type HookReturnType = {
  getAllEmployeeScheduleQuery: () => GetAllEmployeeScheduleFuncReturnType
  getAllScheduleRequestsQuery: (userId: number) => GetAllEmployeeScheduleRequestsReturnType
  handleCreateEmployeeScheduleMutation: () => CreateEmployeeScheduleMutationType
  handleEditEmployeeScheduleMutation: () => EditEmployeeScheduleMutationType
  handleDeleteEmployeeScheduleMutation: () => DeleteEmployeeScheduleMutationType
  handleReassignEmployeeScheduleMutation: () => ReassignEmployeeScheduleMutationType
  handleAddMemberToScheduleMutation: () => AddMemberToScheduleReturnType
  getEmployeeScheduleQuery: (employeeScheduleId: number) => GetEmployeeScheduleFuncReturnType
  getEmployeesByScheduleQuery: (
    employeeScheduleId: number,
    isOpen: boolean
  ) => GetEmployeesByScheduleFuncReturnType
  getSearchEmployeesByScheduleQuery: (
    request: ISearchEmployeesByScheduleRequestInput,
    isOpen: boolean
  ) => GetSearchEmployeesByScheduleFuncReturnType
}

const useEmployeeSchedule = (): HookReturnType => {
  const handleAddMemberToScheduleMutation = (): AddMemberToScheduleReturnType =>
    useMutation({
      mutationFn: async (request: IAddMemberToScheduleInput) => {
        return await client.request(ADD_EMPLOYEE_TO_SCHEDULE, { request })
      },
      onSuccess: async (data) => {
        void queryClient.invalidateQueries().then(() => {
          toast.success(data.addMembersToSchedule)
        })
      },
      onError: async (err: Error) => {
        const [errorMessage] = err.message.split(/:\s/, 2)
        toast.error(errorMessage)
      }
    })

  const getAllEmployeeScheduleQuery = (): GetAllEmployeeScheduleFuncReturnType =>
    useQuery({
      queryKey: ['GET_ALL_EMPLOYEE_SCHEDULE'],
      queryFn: async () => await client.request(GET_ALL_EMPLOYEE_SCHEDULE),
      select: (data: { allEmployeeScheduleDetails: IGetAllEmployeeSchedule[] }) => data
    })

  const getEmployeeScheduleQuery = (
    employeeScheduleId: number
  ): GetEmployeeScheduleFuncReturnType =>
    useQuery({
      queryKey: ['GET_EMPLOYEE_SCHEDULE', employeeScheduleId],
      queryFn: async () => await client.request(GET_EMPLOYEE_SCHEDULE, { employeeScheduleId }),
      select: (data: { employeeScheduleDetails: IGetEmployeeSchedule[] }) => data,
      enabled: !isNaN(employeeScheduleId)
    })

  const handleCreateEmployeeScheduleMutation = (): CreateEmployeeScheduleMutationType =>
    useMutation({
      mutationFn: async (request: ICreateEmployeeScheduleRequestInput) => {
        return await client.request(CREATE_EMPLOYEE_SCHEDULE, { request })
      },
      onError: async (err: Error) => {
        const [errorMessage] = err.message.split(/:\s/, 2)
        toast.error(errorMessage)
      }
    })

  const handleEditEmployeeScheduleMutation = (): EditEmployeeScheduleMutationType =>
    useMutation({
      mutationFn: async (request: IEditEmployeeScheduleRequestInput) => {
        return await client.request(EDIT_EMPLOYEE_SCHEDULE, { request })
      },
      onError: async (err: Error) => {
        const [errorMessage] = err.message.split(/:\s/, 2)
        toast.error(errorMessage)
      }
    })

  const handleReassignEmployeeScheduleMutation = (): ReassignEmployeeScheduleMutationType =>
    useMutation({
      mutationFn: async (request: IReassignEmployeesScheduleRequestInput) => {
        return await client.request(REASSIGN_EMPLOYEE_TO_SCHEDULE, { request })
      },
      onSuccess: async (data) => {
        void queryClient.invalidateQueries().then(() => {
          toast.success(data.updateMemberSchedule)
        })
      },
      onError: async (err: Error) => {
        const [errorMessage] = err.message.split(/:\s/, 2)
        toast.error(errorMessage)
      }
    })

  const handleDeleteEmployeeScheduleMutation = (): DeleteEmployeeScheduleMutationType =>
    useMutation({
      mutationFn: async (request: IDeleteEmployeeScheduleRequestInput) => {
        return await client.request(DELETE_EMPLOYEE_SCHEDULE, { request })
      },
      onError: async (err: Error) => {
        const [errorMessage] = err.message.split(/:\s/, 2)
        toast.error(errorMessage)
      }
    })

  const getEmployeesByScheduleQuery = (
    employeeScheduleId: number,
    isOpen: boolean
  ): GetEmployeesByScheduleFuncReturnType =>
    useQuery({
      queryKey: ['GET_EMPLOYEES_BY_SCHEDULE', employeeScheduleId],
      queryFn: async () => await client.request(GET_EMPLOYEES_BY_SCHEDULE, { employeeScheduleId }),
      select: (data: { employeesBySchedule: IScheduleMember[] }) => data,
      enabled: !isNaN(employeeScheduleId) && isOpen
    })

  const getAllScheduleRequestsQuery = (userId: number): GetAllEmployeeScheduleRequestsReturnType =>
    useQuery({
      queryKey: ['GET_ALL_EMPLOYEE_SCHEDULE_REQUESTS', userId],
      queryFn: async () => await client.request(GET_ALL_EMPLOYEE_SCHEDULE_REQUESTS, { userId }),
      select: (data: { employeeChangeScheduleRequest: IAllFiledScheduleRequest[] }) => data,
      enabled: !isNaN(userId)
    })

  const getSearchEmployeesByScheduleQuery = (
    request: ISearchEmployeesByScheduleRequestInput,
    isOpen: boolean
  ): GetSearchEmployeesByScheduleFuncReturnType =>
    useQuery({
      queryKey: ['SEARCH_EMPLOYEES_BY_SCHEDULE', request.employeeScheduleId, request.searchKey],
      queryFn: async () => await client.request(SEARCH_EMPLOYEES_BY_SCHEDULE, { request }),
      select: (data: { searchEmployeesBySchedule: IScheduleMember[] }) => data,
      enabled: !isNaN(request.employeeScheduleId) && isOpen
    })

  return {
    getEmployeeScheduleQuery,
    getAllEmployeeScheduleQuery,
    getAllScheduleRequestsQuery,
    handleEditEmployeeScheduleMutation,
    handleCreateEmployeeScheduleMutation,
    handleDeleteEmployeeScheduleMutation,
    getEmployeesByScheduleQuery,
    handleAddMemberToScheduleMutation,
    getSearchEmployeesByScheduleQuery,
    handleReassignEmployeeScheduleMutation
  }
}

export default useEmployeeSchedule
