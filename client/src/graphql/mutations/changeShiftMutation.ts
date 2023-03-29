import { gql } from 'graphql-request'

export const CREATE_CHANGE_SHIFT_MUTATION = gql`
  mutation ($changeShiftRequest: CreateChangeShiftRequestInput!) {
    createChangeShift(request: $changeShiftRequest) {
      id
    }
  }
`

export const APROVE_DISAPPROVE_CHANGE_SHIFT_MUTATION = gql`
  mutation ($changeShiftApproval: ApproveChangeShiftRequestInput!) {
    approveDisapproveChangeShift(approvingData: $changeShiftApproval)
  }
`
