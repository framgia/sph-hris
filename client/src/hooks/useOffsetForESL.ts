import toast from 'react-hot-toast'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { IESLOffsetInput } from '~/utils/interfaces/eslOffsetInterface'
import { CREATE_ESL_OFFSET_MUTATION } from '~/graphql/mutations/eslOffsetMutation'

type NewOffsetFuncReturnType = UseMutationResult<any, unknown, IESLOffsetInput, unknown>

type HookReturnType = {
  handleAddNewOffsetMutation: () => NewOffsetFuncReturnType
}

const useOffsetForESL = (): HookReturnType => {
  const handleAddNewOffsetMutation = (): NewOffsetFuncReturnType =>
    useMutation({
      mutationFn: async (request: IESLOffsetInput) => {
        return await client.request(CREATE_ESL_OFFSET_MUTATION, { request })
      },
      onSuccess: async () => {
        toast.success('Added New Offset Successfully')
      },
      onError: async (err: Error) => {
        const [errorMessage] = err.message.split(/:\s/, 2)
        toast.error(errorMessage)
      }
    })

  return {
    handleAddNewOffsetMutation
  }
}

export default useOffsetForESL
