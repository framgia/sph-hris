import { gql } from 'graphql-request'

export const CREATE_ESL_OFFSET_MUTATION = gql`
  mutation ($request: CreateESLChangeShiftRequestInput!) {
    createESLChangeShift(request: $request) {
      id
    }
  }
`

export const APROVE_DISAPPROVE_ESL_OFFSET_MUTATION = gql`
  mutation ($request: ApproveESLChangeShiftRequestInput!) {
    approveDisapproveESLChangeShiftStatus(request: $request) {
      id
    }
  }
`

export const APROVE_DISAPPROVE_OFFSET_MUTATION = gql`
  mutation ($request: ApproveESLChangeShiftRequestInput!) {
    approveDisapproveChangeOffsetStatus(request: $request) {
      id
    }
  }
`
