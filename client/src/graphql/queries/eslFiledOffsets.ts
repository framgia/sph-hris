import { gql } from 'graphql-request'

export const GET_ALL_ESL_FILED_OFFSETS = gql`
  query ($timeEntryId: Int!) {
    eslOffsetsByTimeEntry(timeEntryId: $timeEntryId) {
      id
      title
      timeIn
      timeOut
      createdAt
      updatedAt
      teamLeader {
        id
        name
      }
      description
      isLeaderApproved
      isUsed
    }
  }
`
