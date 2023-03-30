import { toast } from 'react-hot-toast'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import {
  APROVE_DISAPPROVE_CHANGE_SHIFT_MUTATION,
  CREATE_CHANGE_SHIFT_MUTATION
} from '~/graphql/mutations/changeShiftMutation'
import {
  IChangeShiftRequestInput,
  IApproveChangeShiftRequestInput
} from '~/utils/types/changeShiftTypes'

type handleChangeShiftRequestMutationType = UseMutationResult<
  any,
  unknown,
  IChangeShiftRequestInput,
  unknown
>
type handleApproveChangeShiftMutationType = UseMutationResult<
  any,
  unknown,
  IApproveChangeShiftRequestInput,
  unknown
>

type returnType = {
  handleChangeShiftRequestMutation: () => handleChangeShiftRequestMutationType
  handleApproveChangeShiftMutation: () => handleApproveChangeShiftMutationType
}

const useChangeShift = (): returnType => {
  const handleChangeShiftRequestMutation = (): handleChangeShiftRequestMutationType =>
    useMutation({
      mutationFn: async (data: IChangeShiftRequestInput) => {
        return await client.request(CREATE_CHANGE_SHIFT_MUTATION, {
          changeShiftRequest: data
        })
      },
      onSuccess: async () => {
        toast.success('Success!')
      },
      onError: async (error: any) => {
        if (error.response.errors[0].message !== undefined)
          toast.error(error.response.errors[0].message)
        else toast.error('Something went wrong')
      }
    })

  const handleApproveChangeShiftMutation = (): handleApproveChangeShiftMutationType =>
    useMutation({
      mutationFn: async (data: IApproveChangeShiftRequestInput) => {
        return await client.request(APROVE_DISAPPROVE_CHANGE_SHIFT_MUTATION, {
          changeShiftApproval: data
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
    handleChangeShiftRequestMutation,
    handleApproveChangeShiftMutation
  }
}

export default useChangeShift
