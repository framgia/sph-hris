import { gql } from 'graphql-request'
export const GET_INTERRUPTION_TYPES_QUERY = gql`
  {
    allWorkInterruptionTypes {
      id
      name
    }
  }
`
