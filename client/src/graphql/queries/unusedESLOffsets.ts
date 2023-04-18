import { gql } from 'graphql-request'

export const GET_ALL_UNUSED_ESL_OFFSETS_BY_TIME_ENTRY = gql`
  query ($timeEntryId: Int!, $onlyUnused: Boolean) {
    eslOffsetsByTimeEntry(timeEntryId: $timeEntryId, onlyUnused: $onlyUnused) {
      id
      title
      timeIn
      timeOut
      createdAt
      isUsed
    }
  }
`
