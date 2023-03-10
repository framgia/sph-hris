import { gql } from 'graphql-request'
export const CREATE_LEAVE_MUTATION = gql`
  mutation ($leave: CreateLeaveRequestInput!) {
    createLeave(leave: $leave) {
      id
    }
  }
`
export const APROVE_DISAPPROVE_LEAVE_MUTATION = gql`
  mutation ($approval: ApproveLeaveUndertimeRequestInput!) {
    approveDisapproveLeave(approvingData: $approval)
  }
`

export const APROVE_DISAPPROVE_UNDERTIME_MUTATION = gql`
  mutation ($approval: ApproveLeaveUndertimeRequestInput!) {
    approveDisapproveUndertime(approvingData: $approval)
  }
`
