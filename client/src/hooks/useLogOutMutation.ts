import { client } from '~/utils/shared/client'
import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { LOGOUT_USER_MUTATION } from '~/graphql/mutations/logOutMutation'

type LogoutRequestInput = {
  token: string
}

type returnType = {
  handleLogoutMutation: () => UseMutationResult<any, unknown, LogoutRequestInput, unknown>
}

type handleLogoutMutationReturnType = UseMutationResult<any, unknown, LogoutRequestInput, unknown>

const useLogoutMutation = (): returnType => {
  const handleLogoutMutation = (): handleLogoutMutationReturnType =>
    useMutation({
      mutationFn: async (logOut: LogoutRequestInput) => {
        return await client.request(LOGOUT_USER_MUTATION, { logOut })
      },
      onSuccess: async (data) => {}
    })
  return { handleLogoutMutation }
}

export default useLogoutMutation
