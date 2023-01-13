import { gql } from 'graphql-request'
export const UPDATE_TIME_IN_MUTATION = gql`
  mutation ($timeIn: TimeInRequestInput!) {
    updateTimeIn(timeIn: $timeIn)
  }
`
