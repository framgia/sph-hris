import toast from 'react-hot-toast'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import {
  IESLOffsetInput,
  IApproveESLOffsetInput,
  IApproveOffsetInput
} from '~/utils/interfaces/eslOffsetInterface'
import {
  CREATE_ESL_OFFSET_MUTATION,
  APROVE_DISAPPROVE_ESL_OFFSET_MUTATION,
  APROVE_DISAPPROVE_OFFSET_MUTATION
} from '~/graphql/mutations/eslOffsetMutation'

type NewOffsetFuncReturnType = UseMutationResult<any, unknown, IESLOffsetInput, unknown>
type ApproveChangeShiftMutationType = UseMutationResult<
  any,
  unknown,
  IApproveESLOffsetInput,
  unknown
>
type handleApproveOffsetMutationType = UseMutationResult<any, unknown, IApproveOffsetInput, unknown>
type HookReturnType = {
  handleAddNewOffsetMutation: () => NewOffsetFuncReturnType
  handleApproveEslOffsetMutation: () => ApproveChangeShiftMutationType
  handleApproveOffsetMutation: () => handleApproveOffsetMutationType
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

  const handleApproveEslOffsetMutation = (): ApproveChangeShiftMutationType =>
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

  const handleApproveOffsetMutation = (): handleApproveOffsetMutationType =>
    useMutation({
      mutationFn: async (request: IApproveOffsetInput) => {
        return await client.request(APROVE_DISAPPROVE_OFFSET_MUTATION, {
          request: request
        })
      },
      onSuccess: async () => {
        toast.success('Request Approved Successfully!')
      },
      onError: async () => {
        toast.error('Something went wrong')
      }
    })

  return {
    handleAddNewOffsetMutation,
    handleApproveEslOffsetMutation,
    handleApproveOffsetMutation
  }
}

export default useOffsetForESL
