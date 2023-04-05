import toast from 'react-hot-toast'
import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { GET_ALL_ESL_FILED_OFFSETS } from '~/graphql/queries/eslFiledOffsets'
import { IFiledOffsetData, IFileOffset } from '~/utils/interfaces/fileOffsetInterface'
import { CREATE_FILE_OFFSET_MUTATION } from '~/graphql/mutations/fileOffsetMutation'

type FileOffsetFuncReturnType = UseMutationResult<any, unknown, IFileOffset, unknown>
type FiledOffsetFuncReturnType = UseQueryResult<
  { eslOffsetsByTimeEntry: IFiledOffsetData[] },
  unknown
>

type HookReturnType = {
  handleAddFileOffsetMutation: () => FileOffsetFuncReturnType
  getESLFiledOffsetsQuery: (timeEntryId: number) => FiledOffsetFuncReturnType
}

const useFileOffset = (): HookReturnType => {
  const handleAddFileOffsetMutation = (): FileOffsetFuncReturnType =>
    useMutation({
      mutationFn: async (request: IFileOffset) => {
        return await client.request(CREATE_FILE_OFFSET_MUTATION, { request })
      },
      onError: async (err: Error) => {
        const [errorMessage] = err.message.split(/:\s/, 2)
        toast.error(errorMessage)
      }
    })

  const getESLFiledOffsetsQuery = (timeEntryId: number): FiledOffsetFuncReturnType =>
    useQuery({
      queryKey: ['GET_ALL_ESL_FILED_OFFSETS'],
      queryFn: async () => await client.request(GET_ALL_ESL_FILED_OFFSETS, { timeEntryId }),
      select: (data: { eslOffsetsByTimeEntry: IFiledOffsetData[] }) => data
    })

  return {
    handleAddFileOffsetMutation,
    getESLFiledOffsetsQuery
  }
}

export default useFileOffset
