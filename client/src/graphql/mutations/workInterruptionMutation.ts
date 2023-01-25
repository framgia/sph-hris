import { gql } from 'graphql-request'
export const CREATE_INTERRUPTION_MUTATION = gql`
  mutation ($interruption: CreateInterruptionRequestInput!) {
    createWorkInterruption(interruption: $interruption) {
      id
    }
  }
`
export const UPDATE_INTERRUPTION_MUTATION = gql`
  mutation ($interruption: UpdateInterruptionRequestInput!) {
    updateWorkInterruption(interruption: $interruption)
  }
`
export const DELETE_INTERRUPTION_MUTATION = gql`
  mutation ($id: Int!) {
    deleteWorkInterruption(id: $id)
  }
`
