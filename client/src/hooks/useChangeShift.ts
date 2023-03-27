import { toast } from 'react-hot-toast'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { CREATE_CHANGE_SHIFT_MUTATION } from '~/graphql/mutations/changeShiftMutation'
import { IChangeShiftRequestInput } from '~/utils/types/changeShiftTypes'

type handleChangeShiftRequestMutationType = UseMutationResult<
  any,
  unknown,
  IChangeShiftRequestInput,
  unknown
>

type returnType = {
  handleChangeShiftRequestMutation: () => handleChangeShiftRequestMutationType
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

  return {
    handleChangeShiftRequestMutation
  }
}

export default useChangeShift
