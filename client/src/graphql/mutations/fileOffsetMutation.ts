import { gql } from 'graphql-request'

export const CREATE_FILE_OFFSET_MUTATION = gql`
  mutation ($request: CreateESLOffsetRequestInput!) {
    createESLOffset(request: $request) {
      id
      title
      timeIn
      timeOut
      createdAt
      updatedAt
      description
      isLeaderApproved
    }
  }
`
