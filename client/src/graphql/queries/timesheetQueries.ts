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

export const GET_EMPLOYEE_TIMESHEET = gql`
  query ($id: Int!) {
    timeEntriesByEmployeeId(id: $id) {
      id
      date
      timeIn {
        timeHour
      }
      timeOut {
        timeHour
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
