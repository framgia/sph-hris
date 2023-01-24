import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import {
  GET_ALL_WORK_INTERRUPTIONS_QUERY,
  GET_INTERRUPTION_TYPES_QUERY
} from '~/graphql/queries/workInterruptionQuery'
import { CREATE_INTERRUPTION_MUTATION } from '~/graphql/mutations/workInterruptionMutation'
import { WorkInterruptions, WorkInterruptionType } from '~/utils/types/workInterruptionTypes'

type CreateInterruptionRequest = {
  timeEntryId: number
  workInterruptionTypeId: number
  timeOut: string
  timeIn: string
  remarks: string
  otherReason: string | null
}
type ShowInterruptionRequest = {
  timeEntryId: number
}
type returnType = {
  handleInterruptionTypeQuery: () => UseQueryResult<WorkInterruptionType, unknown>
  handleInterruptionMutation: () => UseMutationResult<
    any,
    unknown,
    CreateInterruptionRequest,
    unknown
  >
  handleGetAllWorkInterruptionsQuery: (
    interruption: ShowInterruptionRequest
  ) => UseQueryResult<WorkInterruptions, unknown>
}
type handleInterruptionTypeQueryType = UseQueryResult<WorkInterruptionType, unknown>
type handleGetAllWorkInterruptionsQueryType = UseQueryResult<WorkInterruptions, unknown>

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
  const handleGetAllWorkInterruptionsQuery = (
    interruption: ShowInterruptionRequest
  ): handleGetAllWorkInterruptionsQueryType =>
    useQuery({
      queryKey: ['GET_ALL_WORK_INTERRUPTIONS_QUERY', interruption],
      queryFn: async () => await client.request(GET_ALL_WORK_INTERRUPTIONS_QUERY, { interruption }),
      select: (data: WorkInterruptions) => data
    })
  return {
    handleInterruptionTypeQuery,
    handleInterruptionMutation,
    handleGetAllWorkInterruptionsQuery
  }
}

export default useInterruptionType
