import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { SIGNIN_USER_MUTATION } from '~/graphql/mutations/signInMutation'
import { client } from '~/utils/shared/client'

type SigninRequestInput = {
  email: string
  token: string
  expiration: string
}

type returnType = {
  handleSignInMutation: () => UseMutationResult<any, unknown, SigninRequestInput, unknown>
}
type handleSignInMutationReturnType = UseMutationResult<any, unknown, SigninRequestInput, unknown>

const useSignInMutation = (): returnType => {
  const handleSignInMutation = (): handleSignInMutationReturnType =>
    useMutation({
      mutationFn: async (signIn: SigninRequestInput) => {
        return await client.request(SIGNIN_USER_MUTATION, {
          signIn
        })
      },
      onSuccess: async (data) => {}
    })
  return { handleSignInMutation }
}

export default useSignInMutation
