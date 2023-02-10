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
      id
      timeHour
      remarks
      createdAt
      media {
        collectionName
        name
        fileName
        mimeType
      }
    }
  }
`

export const GET_SPECIFIC_TIME_ENTRY_BY_ID = gql`
  query ($id: Int!) {
    specificTimeEntryById(id: $id) {
      user {
        id
        name
      }
    }
  }
`

export const GET_SPECIFIC_USER_PROFILE_LINK = gql`
  query ($id: Int!) {
    specificUserProfileDetail(id: $id) {
      name
      avatarLink
    }
  }
`

export const GET_TIMESHEET_SUMMARY = (input: string, argument: string): string => {
  return gql`
    query (${input}){
      timesheetSummary (${argument}) {
        user{
          id
          name
        }
        leave
        absences
        late
        undertime
        overtime
      }
    }
  `
}
