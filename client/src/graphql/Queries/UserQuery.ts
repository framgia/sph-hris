import { gql } from 'graphql-request'
export const GET_USER_QUERY = gql`
  query ($id: Int!, $schedule: String!) {
    userById(id: $id, schedule: $schedule) {
      id
      name
      timeEntry {
        id
        date
        timeIn {
          id
          timeHour
          media {
            id
            fileName
          }
        }
        timeOut {
          id
          timeHour
        }
      }
      employeeSchedule {
        id
        name
        workingDayTimes {
          id
          day
          from
          to
        }
      }
    }
  }
`
