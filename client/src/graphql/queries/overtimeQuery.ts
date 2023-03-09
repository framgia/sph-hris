import { gql } from 'graphql-request'
export const GET_ALL_OVERTIME = gql`
  query {
    allOvertime {
      id
      projects {
        id
        project {
          id
          name
        }
        projectLeader {
          id
          name
        }
      }
      otherProject
      user {
        id
        link
        name
        roleId
        roleName
      }
      supervisor
      dateFiled
      overtimeDate
      requestedMinutes
      approvedMinutes
      isLeaderApproved
      isManagerApproved
      remarks
    }
  }
`
