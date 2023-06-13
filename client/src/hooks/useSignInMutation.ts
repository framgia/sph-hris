import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { SIGNIN_USER_MUTATION } from '~/graphql/mutations/signInMutation'
import { client } from '~/utils/shared/client'

type returnType = {
  handleSignInMutation: () => UseMutationResult<any, unknown, unknown, unknown>
}
type handleSignInMutationReturnType = UseMutationResult<any, unknown, unknown, unknown>

const useSignInMutation = (): returnType => {
  const handleSignInMutation = (): handleSignInMutationReturnType =>
    useMutation({
      mutationFn: async () => {
        return await client().request(SIGNIN_USER_MUTATION)
      },
      onSuccess: async (data) => {}
    })
  return { handleSignInMutation }
}

export default useSignInMutation
