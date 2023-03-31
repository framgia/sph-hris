import { gql } from 'graphql-request'

export const CREATE_ESL_OFFSET_MUTATION = gql`
  mutation ($request: CreateESLChangeShiftRequestInput!) {
    createESLChangeShift(request: $request) {
      id
    }
  }
`
