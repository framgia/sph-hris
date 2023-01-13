import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { client } from '~/utils/shared/client'
import { GET_ALL_EMPLOYEE_TIMESHEET } from '~/graphql/queries/timesheetQueries'
import { ITimeEntry } from '~/utils/types/timeEntryTypes'

export interface IAllTimeSheet {
  timeEntries: ITimeEntry[]
}

export const getAllEmployeeTimesheet = (): UseQueryResult => {
  return useQuery({
    queryKey: ['GET_ALL_EMPLOYEE_TIMESHEET'],
    queryFn: async () => await client.request(GET_ALL_EMPLOYEE_TIMESHEET)
  })
}
