import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { client } from '~/utils/shared/client'
import {
  GET_ALL_EMPLOYEE_TIMESHEET,
  GET_EMPLOYEE_TIMESHEET
} from '~/graphql/queries/timesheetQueries'
import { ITimeEntry, IEmployeeTimeEntry } from '~/utils/types/timeEntryTypes'

export interface IAllTimeSheet {
  timeEntries: ITimeEntry[]
}

export interface IEmployeeTimeSheet {
  timeEntriesByEmployeeId: IEmployeeTimeEntry[]
}

export const getAllEmployeeTimesheet = (): UseQueryResult => {
  return useQuery({
    queryKey: ['GET_ALL_EMPLOYEE_TIMESHEET'],
    queryFn: async () => await client.request(GET_ALL_EMPLOYEE_TIMESHEET)
  })
}

export const getEmployeeTimesheet = (userId: number): UseQueryResult => {
  const result = useQuery({
    queryKey: ['GET_EMPLOYEE_TIMESHEET', userId],
    queryFn: async () => await client.request(GET_EMPLOYEE_TIMESHEET, { id: userId })
  })
  return result
}
