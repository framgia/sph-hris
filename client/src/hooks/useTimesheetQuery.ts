import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { client } from '~/utils/shared/client'
import {
  GET_ALL_EMPLOYEE_TIMESHEET,
  GET_EMPLOYEE_TIMESHEET,
  GET_SPECIFIC_TIME_ENTRY
} from '~/graphql/queries/timesheetQueries'
import { ITimeEntry, IEmployeeTimeEntry, ITimeEntryById } from '~/utils/types/timeEntryTypes'

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

export const getSpecificTimeEntry = (
  id: number
): UseQueryResult<
  {
    timeById: ITimeEntryById
  },
  unknown
> => {
  const result = useQuery({
    queryKey: ['GET_SPECIFIC_TIME_ENTRY', id],
    queryFn: async () => await client.request(GET_SPECIFIC_TIME_ENTRY, { id }),
    select: (data: { timeById: ITimeEntryById }) => data,
    enabled: !isNaN(id)
  })
  return result
}
