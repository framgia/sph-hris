import { gql } from 'graphql-request'

export const GET_ALL_ROLE_QUERY = gql`
  query {
    allRoles {
      id
      name
    }
  }
`
