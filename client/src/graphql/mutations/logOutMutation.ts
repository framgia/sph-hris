import { gql } from 'graphql-request'
export const LOGOUT_USER_MUTATION = gql`
  mutation ($logOut: LogoutRequestInput!) {
    logout(logOut: $logOut)
  }
`
