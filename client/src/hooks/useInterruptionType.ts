import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { GET_INTERRUPTION_TYPES_QUERY } from '~/graphql/queries/workInterruptionQuery'
import { WorkInterruptionType } from '~/utils/types/workInterruptionTypes'
import { CREATE_INTERRUPTION_MUTATION } from '~/graphql/mutations/workInterruptionMutation'

type CreateInterruptionRequest = {
  timeEntryId: number
  workInterruptionTypeId: number
  timeOut: string
  timeIn: string
  remarks: string
  otherReason: string | null
}
type returnType = {
  handleInterruptionTypeQuery: () => UseQueryResult<WorkInterruptionType, unknown>
  handleInterruptionMutation: () => UseMutationResult<
    any,
    unknown,
    CreateInterruptionRequest,
    unknown
  >
}
type handleInterruptionTypeQueryType = UseQueryResult<WorkInterruptionType, unknown>

type handleInterruptionMutationReturnType = UseMutationResult<
  any,
  unknown,
  CreateInterruptionRequest,
  unknown
>

const useInterruptionType = (): returnType => {
  const handleInterruptionTypeQuery = (): handleInterruptionTypeQueryType =>
    useQuery({
      queryKey: ['GET_INTERRUPTION_TYPES_QUERY'],
      queryFn: async () => await client.request(GET_INTERRUPTION_TYPES_QUERY),
      select: (data: WorkInterruptionType) => data
    })
  const handleInterruptionMutation = (): handleInterruptionMutationReturnType =>
    useMutation({
      mutationFn: async (interruption: CreateInterruptionRequest) => {
        return await client.request(CREATE_INTERRUPTION_MUTATION, {
          interruption
        })
      }
    })
  return {
    handleInterruptionTypeQuery,
    handleInterruptionMutation
  }
}

export default useInterruptionType
