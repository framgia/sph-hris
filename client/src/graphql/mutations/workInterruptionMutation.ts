import { gql } from 'graphql-request'
export const CREATE_INTERRUPTION_MUTATION = gql`
  mutation ($interruption: CreateInterruptionRequestInput!) {
    createWorkInterruption(interruption: $interruption) {
      id
    }
  }
`
