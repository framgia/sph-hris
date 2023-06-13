import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult
} from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { client } from '~/utils/shared/client'
import {
  GET_ALL_WORK_INTERRUPTIONS_QUERY,
  GET_INTERRUPTION_TYPES_QUERY
} from '~/graphql/queries/workInterruptionQuery'
import {
  CREATE_INTERRUPTION_MUTATION,
  DELETE_INTERRUPTION_MUTATION,
  UPDATE_INTERRUPTION_MUTATION
} from '~/graphql/mutations/workInterruptionMutation'
import { WorkInterruptions, WorkInterruptionType } from '~/utils/types/workInterruptionTypes'

type CreateInterruptionRequest = {
  timeEntryId: number
  workInterruptionTypeId: number
  timeOut: string
  timeIn: string
  remarks: string
  otherReason: string | null
}
type UpdateInterruptionRequest = {
  id: number
  otherReason: string
  remarks: string
  timeIn: string
  timeOut: string
  workInterruptionTypeId: number
}
type DeleteInterruptionRequest = {
  id: number
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
  handleUpdateInterruptionMutation: (
    interruption: ShowInterruptionRequest
  ) => UseMutationResult<any, unknown, UpdateInterruptionRequest, unknown>
  handleDeleteInterruptionMutation: () => UseMutationResult<
    any,
    unknown,
    DeleteInterruptionRequest,
    unknown
  >
}
type handleInterruptionTypeQueryType = UseQueryResult<WorkInterruptionType, unknown>
type handleGetAllWorkInterruptionsQueryType = UseQueryResult<WorkInterruptions, unknown>

type handleInterruptionMutationReturnType = UseMutationResult<
  any,
  unknown,
  CreateInterruptionRequest,
  unknown
>
type handleUpdateInterruptionMutationReturnType = UseMutationResult<
  any,
  unknown,
  UpdateInterruptionRequest,
  unknown
>
type handleDeleteInterruptionMutationReturnType = UseMutationResult<
  any,
  unknown,
  DeleteInterruptionRequest,
  unknown
>

const useInterruptionType = (): returnType => {
  const queryClient = useQueryClient()
  const handleInterruptionTypeQuery = (): handleInterruptionTypeQueryType =>
    useQuery({
      queryKey: ['GET_INTERRUPTION_TYPES_QUERY'],
      queryFn: async () => await client().request(GET_INTERRUPTION_TYPES_QUERY),
      select: (data: WorkInterruptionType) => data
    })
  const handleInterruptionMutation = (): handleInterruptionMutationReturnType =>
    useMutation({
      mutationFn: async (interruption: CreateInterruptionRequest) => {
        return await client().request(CREATE_INTERRUPTION_MUTATION, {
          interruption
        })
      }
    })
  const handleGetAllWorkInterruptionsQuery = (
    interruption: ShowInterruptionRequest
  ): handleGetAllWorkInterruptionsQueryType =>
    useQuery({
      queryKey: ['GET_ALL_WORK_INTERRUPTIONS_QUERY'],
      queryFn: async () =>
        await client().request(GET_ALL_WORK_INTERRUPTIONS_QUERY, { interruption }),
      select: (data: WorkInterruptions) => data
    })
  const handleUpdateInterruptionMutation = (
    interruption: ShowInterruptionRequest
  ): handleUpdateInterruptionMutationReturnType =>
    useMutation({
      mutationFn: async (interruption: UpdateInterruptionRequest) => {
        return await client().request(UPDATE_INTERRUPTION_MUTATION, {
          interruption
        })
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['GET_ALL_WORK_INTERRUPTIONS_QUERY']
        })
        toast.success('Successfully Saved')
      },
      onError: async () => {
        toast.error('Something went wrong')
      }
    })
  const handleDeleteInterruptionMutation = (): handleDeleteInterruptionMutationReturnType =>
    useMutation({
      mutationFn: async (interruption: DeleteInterruptionRequest) => {
        return await client().request(DELETE_INTERRUPTION_MUTATION, interruption)
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['GET_ALL_WORK_INTERRUPTIONS_QUERY']
        })
        toast.success('Successfully Deleted')
      },
      onError: async () => {
        toast.error('Something went wrong')
      }
    })
  return {
    handleInterruptionTypeQuery,
    handleInterruptionMutation,
    handleGetAllWorkInterruptionsQuery,
    handleUpdateInterruptionMutation,
    handleDeleteInterruptionMutation
  }
}

export default useInterruptionType
