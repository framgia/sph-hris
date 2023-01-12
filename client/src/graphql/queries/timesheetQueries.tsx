import { useQuery, UseQueryResult } from '@tanstack/react-query'
import graphqlQuery from './graphqlQuery'

export interface ITimeEntries {
  id: number
  date: string
  user: {
    id: number
    name: string
  }
  timeIn: {
    timeHour: string
    remarks: string
  }
  timeOut: {
    timeHour: string
    remarks: string
  }
  startTime: string
  endTime: string
  workedHours: string
  trackedHours: string
  late: number
  undertime: number
  overtime: number
  status: string
}

export interface IAllTimeSheet {
  timeEntries: ITimeEntries[]
}

export const getAllEmployeeTimesheet = (): UseQueryResult => {
  return useQuery({
    queryKey: ['getAllTimesheet'],
    queryFn: async () =>
      await graphqlQuery(
        `query {
        timeEntries {
          id
          date
          user {
            id
            name
          }
          timeIn {
            timeHour
            remarks
          }
          timeOut {
            timeHour
            remarks
          }
          startTime
          endTime
          workedHours
          trackedHours
          late
          undertime
          overtime
          status
        }
      }`
      )
  })
}
