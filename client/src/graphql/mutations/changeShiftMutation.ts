import { gql } from 'graphql-request'

export const CREATE_CHANGE_SHIFT_MUTATION = gql`
  mutation ($changeShiftRequest: CreateChangeShiftRequestInput!) {
    createChangeShift(request: $changeShiftRequest) {
      id
    }
  }
`
