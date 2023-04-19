import { toast } from 'react-hot-toast'
import { useMutation, useQuery, UseQueryResult, UseMutationResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import {
  GET_ALL_EMPLOYEE_SCHEDULE,
  GET_EMPLOYEE_SCHEDULE
} from '~/graphql/queries/employeeSchedule'

import {
  CREATE_EMPLOYEE_SCHEDULE,
  EDIT_EMPLOYEE_SCHEDULE
} from '~/graphql/mutations/employeeScheduleMutation'
import {
  IGetAllEmployeeSchedule,
  IGetEmployeeSchedule,
  ICreateEmployeeScheduleRequestInput,
  IEditEmployeeScheduleRequestInput
} from '~/utils/types/employeeScheduleTypes'

type GetAllEmployeeScheduleFuncReturnType = UseQueryResult<
  { allEmployeeScheduleDetails: IGetAllEmployeeSchedule[] },
  unknown
>

type GetEmployeeScheduleFuncReturnType = UseQueryResult<
  { employeeScheduleDetails: IGetEmployeeSchedule[] },
  unknown
>

type createEmployeeScheduleMutationType = UseMutationResult<
  any,
  unknown,
  ICreateEmployeeScheduleRequestInput,
  unknown
>

type editEmployeeScheduleMutationType = UseMutationResult<
  any,
  unknown,
  IEditEmployeeScheduleRequestInput,
  unknown
>

type HookReturnType = {
  getAllEmployeeScheduleQuery: () => GetAllEmployeeScheduleFuncReturnType
  handleCreateEmployeeScheduleMutation: () => createEmployeeScheduleMutationType
  handleEditEmployeeScheduleMutation: () => editEmployeeScheduleMutationType
  getEmployeeScheduleQuery: (employeeScheduleId: number) => GetEmployeeScheduleFuncReturnType
}

const useEmployeeSchedule = (): HookReturnType => {
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

  const handleCreateEmployeeScheduleMutation = (): createEmployeeScheduleMutationType =>
    useMutation({
      mutationFn: async (request: ICreateEmployeeScheduleRequestInput) => {
        return await client.request(CREATE_EMPLOYEE_SCHEDULE, { request })
      },
      onError: async (err: Error) => {
        const [errorMessage] = err.message.split(/:\s/, 2)
        toast.error(errorMessage)
      }
    })

  const handleEditEmployeeScheduleMutation = (): editEmployeeScheduleMutationType =>
    useMutation({
      mutationFn: async (request: IEditEmployeeScheduleRequestInput) => {
        return await client.request(EDIT_EMPLOYEE_SCHEDULE, { request })
      },
      onError: async (err: Error) => {
        const [errorMessage] = err.message.split(/:\s/, 2)
        toast.error(errorMessage)
      }
    })

  return {
    getEmployeeScheduleQuery,
    getAllEmployeeScheduleQuery,
    handleEditEmployeeScheduleMutation,
    handleCreateEmployeeScheduleMutation
  }
}

export default useEmployeeSchedule
