import { gql } from 'graphql-request'
export const CREATE_LEAVE_MUTATION = gql`
  mutation ($leave: CreateLeaveRequestInput!) {
    createLeave(leave: $leave) {
      id
    }
  }
`
