import { gql } from 'graphql-request'

export const GET_ALL_OVERTIME_QUERY = gql`
  query ($userId: Int!) {
    overtime(userId: $userId) {
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
      supervisor
      dateFiled
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
