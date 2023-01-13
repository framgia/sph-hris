import { gql } from 'graphql-request'
export const SIGNIN_USER_MUTATION = gql`
  mutation ($signIn: SigninRequestInput!) {
    createSignIn(signIn: $signIn)
  }
`
