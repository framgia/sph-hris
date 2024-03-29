import { gql } from 'graphql-request'

export const GET_ALL_REQUESTED_LEAVES = gql`
  query {
    allLeaves {
      id
      userId
      avatar
      userName
      userRole
      leaveType
      manager
      leaveProjects {
        project {
          name
        }
        projectLeader {
          name
        }
      }
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

export const GET_REMAINING_PAID_LEAVES = gql`
query ($id: Int!) {
  paidLeaves(id: $id) {
  }
}
`
