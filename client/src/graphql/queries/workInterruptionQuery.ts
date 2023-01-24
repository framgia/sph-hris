import { gql } from 'graphql-request'
export const GET_INTERRUPTION_TYPES_QUERY = gql`
  {
    allWorkInterruptionTypes {
      id
      name
    }
  }
`
export const GET_ALL_WORK_INTERRUPTIONS_QUERY = gql`
  query ($interruption: ShowInterruptionRequestInput!) {
    interruptionsByTimeEntryId(interruption: $interruption) {
      id
      timeOut
      timeIn
      otherReason
      remarks
      workInterruptionType {
        id
        name
      }
      createdAt
    }
  }
`
