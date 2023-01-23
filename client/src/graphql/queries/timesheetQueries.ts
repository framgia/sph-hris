import { gql } from 'graphql-request'

export const GET_ALL_EMPLOYEE_TIMESHEET = (input: string, argument: string): string => {
  return gql`
    query (${input}){
      timeEntries (${argument}) {
        id
        date
        user {
          id
          name
        }
        timeIn {
          id
          timeHour
          remarks
        }
        timeOut {
          id
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
}

export const GET_EMPLOYEE_TIMESHEET = gql`
  query ($id: Int!) {
    timeEntriesByEmployeeId(id: $id) {
      id
      date
      timeIn {
        id
        timeHour
        remarks
      }
      timeOut {
        id
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
export const GET_SPECIFIC_TIME_ENTRY = gql`
  query ($id: Int!) {
    timeById(id: $id) {
      timeHour
      remarks
    }
  }
`
