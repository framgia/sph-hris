import { gql } from 'graphql-request'

export const UPDATE_TIME_ENTRY = gql`
  mutation ($updatedTimeEntry: UpdateTimeEntryInput!) {
    updateOneTimeEntry(updatedTimeEntry: $updatedTimeEntry)
  }
`
