import { gql } from 'graphql-request'
export const UPDATE_TIME_OUT_MUTATION = gql`
  mutation ($timeOut: TimeOutRequestInput!) {
    updateTimeOut(timeOut: $timeOut)
  }
`
