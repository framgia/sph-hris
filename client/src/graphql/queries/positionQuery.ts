import { gql } from 'graphql-request'

export const GET_ALL_POSITION_QUERY = gql`
  query {
    allPositions {
      id
      name
    }
  }
`
