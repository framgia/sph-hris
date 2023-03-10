import { gql } from 'graphql-request'

export const GET_ALL_OVERTIME_QUERY = gql`
  query ($userId: Int!) {
    overtime(userId: $userId) {
      id
      multiProjects {
        id
        project {
          name
        }
        projectLeader {
          name
        }
      }
      otherProject
      overtimeDate
      requestedMinutes
      approvedMinutes
      isLeaderApproved
      isManagerApproved
      remarks
      createdAt
    }
  }
`
