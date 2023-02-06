import { gql } from 'graphql-request'

export const GET_ALL_REQUESTED_LEAVES = gql`
  query {
    allLeaves {
      id
      projects {
        name
        projectLeader {
          name
        }
      }
      user {
        name
        role {
          name
        }
      }
      leaveType {
        name
      }
      manager {
        name
      }
      otherProject
      reason
      leaveDate
      isWithPay
      isLeaderApproved
      isManagerApproved
      days
      createdAt
    }
  }
`
