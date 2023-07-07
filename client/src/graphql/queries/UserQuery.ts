import { gql } from 'graphql-request'
export const GET_USER_QUERY = gql`
  query {
    userById {
      id
      name
      avatarLink
      paidLeaves
      position {
        id
        name
      }
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
      position {
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
          breakFrom
          breakTo
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
      employeeScheduleId
      role {
        id
        name
      }
    }
  }
`

export const GET_ALL_ESL_USERS_QUERY = gql`
  query ($requestingUserId: Int) {
    allESLUsers(exceptUserId: $requestingUserId) {
      id
      name
    }
  }
`
