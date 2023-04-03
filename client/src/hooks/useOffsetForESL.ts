import toast from 'react-hot-toast'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { IESLOffsetInput, IApproveESLOffsetInput } from '~/utils/interfaces/eslOffsetInterface'
import {
  CREATE_ESL_OFFSET_MUTATION,
  APROVE_DISAPPROVE_ESL_OFFSET_MUTATION
} from '~/graphql/mutations/eslOffsetMutation'

type NewOffsetFuncReturnType = UseMutationResult<any, unknown, IESLOffsetInput, unknown>
type handleApproveChangeShiftMutationType = UseMutationResult<
  any,
  unknown,
  IApproveESLOffsetInput,
  unknown
>
type HookReturnType = {
  handleAddNewOffsetMutation: () => NewOffsetFuncReturnType
  handleApproveEslOffsetMutation: () => handleApproveChangeShiftMutationType
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

  const handleApproveEslOffsetMutation = (): handleApproveChangeShiftMutationType =>
    useMutation({
      mutationFn: async (data: IApproveESLOffsetInput) => {
        return await client.request(APROVE_DISAPPROVE_ESL_OFFSET_MUTATION, {
          request: data
        })
      },
      onSuccess: async () => {
        toast.success('Success!')
      },
      onError: async () => {
        toast.error('Something went wrong')
      }
    })

  return {
    handleAddNewOffsetMutation,
    handleApproveEslOffsetMutation
  }
}

export default useOffsetForESL
