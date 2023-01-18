import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { client } from '~/utils/shared/client'
import {
  GET_ALL_EMPLOYEE_TIMESHEET,
  GET_EMPLOYEE_TIMESHEET
} from '~/graphql/queries/timesheetQueries'
import { ITimeEntry, IEmployeeTimeEntry } from '~/utils/types/timeEntryTypes'

export const getAllEmployeeTimesheet = (): UseQueryResult<
  {
    timeEntries: ITimeEntry[]
  },
  unknown
> => {
  const result = useQuery({
    queryKey: ['GET_ALL_EMPLOYEE_TIMESHEET'],
    queryFn: async () => await client.request(GET_ALL_EMPLOYEE_TIMESHEET),
    select: (data: { timeEntries: ITimeEntry[] }) => data
  })
  return result
}

export const getEmployeeTimesheet = (
  userId: number
): UseQueryResult<
  {
    timeEntriesByEmployeeId: IEmployeeTimeEntry[]
  },
  unknown
> => {
  const result = useQuery({
    queryKey: ['GET_EMPLOYEE_TIMESHEET', userId],
    queryFn: async () => await client.request(GET_EMPLOYEE_TIMESHEET, { id: userId }),
    select: (data: { timeEntriesByEmployeeId: IEmployeeTimeEntry[] }) => data,
    enabled: !isNaN(userId)
  })
  return result
}
