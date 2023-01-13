import { gql } from 'graphql-request'

export const GET_ALL_EMPLOYEE_TIMESHEET = gql`
  query {
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
  }
`
