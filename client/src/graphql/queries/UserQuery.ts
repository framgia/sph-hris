import { gql } from 'graphql-request'
export const GET_USER_QUERY = gql`
  query ($token: String!, $schedule: String!) {
    userById(token: $token, schedule: $schedule) {
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
      role {
        id
        name
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
