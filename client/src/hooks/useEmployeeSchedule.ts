import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import {
  GET_ALL_EMPLOYEE_SCHEDULE,
  GET_EMPLOYEE_SCHEDULE
} from '~/graphql/queries/employeeSchedule'
import { IGetAllEmployeeSchedule, IGetEmployeeSchedule } from '~/utils/types/employeeScheduleTypes'

type GetAllEmployeeScheduleFuncReturnType = UseQueryResult<
  { allEmployeeScheduleDetails: IGetAllEmployeeSchedule[] },
  unknown
>

type GetEmployeeScheduleFuncReturnType = UseQueryResult<
  { employeeScheduleDetails: IGetEmployeeSchedule[] },
  unknown
>

type HookReturnType = {
  getAllEmployeeScheduleQuery: () => GetAllEmployeeScheduleFuncReturnType
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

  return {
    getAllEmployeeScheduleQuery,
    getEmployeeScheduleQuery
  }
}

export default useEmployeeSchedule
