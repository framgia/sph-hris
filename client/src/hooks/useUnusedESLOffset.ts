import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { IUnusedESLOffset } from '~/utils/interfaces/unusedELSOffsetInterface'
import {
  GET_ALL_UNUSED_ESL_OFFSETS_BY_TIME_ENTRY,
  GET_ALL_UNUSED_ESL_OFFSETS
} from '~/graphql/queries/unusedESLOffsets'

type UnusedOffsetFuncReturnType = UseQueryResult<
  { eslOffsetsByTimeEntry: IUnusedESLOffset[] },
  unknown
>
type AllOffsetFuncReturnType = UseQueryResult<{ allESLOffsets: IUnusedESLOffset[] }, unknown>

type HookReturnType = {
  getAllUnusedESLOffsetQueryByTimeEntry: (
    timeEntryId: number,
    onlyUnused: boolean
  ) => UnusedOffsetFuncReturnType
  getAllESLOffsetQuery: () => AllOffsetFuncReturnType
}

const useUnusedESLOffset = (): HookReturnType => {
  const getAllUnusedESLOffsetQueryByTimeEntry = (
    timeEntryId: number,
    onlyUnused: boolean
  ): UnusedOffsetFuncReturnType =>
    useQuery({
      queryKey: ['GET_ALL_UNUSED_ESL_OFFSETS_BY_TIME_ENTRY'],
      queryFn: async () =>
        await client().request(GET_ALL_UNUSED_ESL_OFFSETS_BY_TIME_ENTRY, {
          timeEntryId,
          onlyUnused
        }),
      select: (data: { eslOffsetsByTimeEntry: IUnusedESLOffset[] }) => data
    })

  const getAllESLOffsetQuery = (): AllOffsetFuncReturnType =>
    useQuery({
      queryKey: ['GET_ALL_UNUSED_ESL_OFFSETS'],
      queryFn: async () => await client().request(GET_ALL_UNUSED_ESL_OFFSETS),
      select: (data: { allESLOffsets: IUnusedESLOffset[] }) => data
    })

  return {
    getAllUnusedESLOffsetQueryByTimeEntry,
    getAllESLOffsetQuery
  }
}

export default useUnusedESLOffset
