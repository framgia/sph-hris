import { gql } from 'graphql-request'
export const GET_USER_QUERY = gql`
  query ($token: String!, $schedule: String!) {
    userById(token: $token, schedule: $schedule) {
      id
      name
      avatarLink
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
export const GET_ALL_USERS_QUERY = gql`
  query {
    allUsers {
      id
      name
      role {
        id
        name
      }
    }
  }
`
