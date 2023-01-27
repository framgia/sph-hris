import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import {
  GET_ALL_EMPLOYEE_TIMESHEET,
  GET_EMPLOYEE_TIMESHEET,
  GET_SPECIFIC_TIME_ENTRY,
  GET_TIMESHEET_SUMMARY
} from '~/graphql/queries/timesheetQueries'
import { QueryVariablesType } from '~/pages/dtr-management'
import {
  ITimeEntry,
  IEmployeeTimeEntry,
  ITimeEntryById,
  ITimesheetSummary
} from '~/utils/types/timeEntryTypes'

export const getAllEmployeeTimesheet = (
  input: string = '',
  argument: string,
  variables: QueryVariablesType,
  ready: boolean
): UseQueryResult<
  {
    timeEntries: ITimeEntry[]
  },
  unknown
> => {
  const result = useQuery({
    queryKey: ['GET_ALL_EMPLOYEE_TIMESHEET'],
    queryFn: async () =>
      await client.request(GET_ALL_EMPLOYEE_TIMESHEET(input, argument), variables),
    select: (data: { timeEntries: ITimeEntry[] }) => data,
    enabled: ready
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

export const getTimesheetSummary = (
  input: string = '',
  argument: string,
  variables: QueryVariablesType,
  ready: boolean
): UseQueryResult<
  {
    timesheetSummary: ITimesheetSummary[]
  },
  unknown
> => {
  const result = useQuery({
    queryKey: ['GET_TIMESHEET_SUMMARY'],
    queryFn: async () => await client.request(GET_TIMESHEET_SUMMARY(input, argument), variables),
    select: (data: { timesheetSummary: ITimesheetSummary[] }) => data,
    enabled: ready
  })
  return result
}
