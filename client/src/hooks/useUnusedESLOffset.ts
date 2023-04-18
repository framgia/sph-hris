import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { IUnusedESLOffset } from '~/utils/interfaces/unusedELSOffsetInterface'
import { GET_ALL_UNUSED_ESL_OFFSETS_BY_TIME_ENTRY } from '~/graphql/queries/unusedESLOffsets'

type UnusedOffsetFuncReturnType = UseQueryResult<
  { eslOffsetsByTimeEntry: IUnusedESLOffset[] },
  unknown
>

type HookReturnType = {
  getAllUnusedESLOffsetQuery: (
    timeEntryId: number,
    onlyUnused: boolean
  ) => UnusedOffsetFuncReturnType
}

const useUnusedESLOffset = (): HookReturnType => {
  const getAllUnusedESLOffsetQuery = (
    timeEntryId: number,
    onlyUnused: boolean
  ): UnusedOffsetFuncReturnType =>
    useQuery({
      queryKey: ['GET_ALL_UNUSED_ESL_OFFSETS_BY_TIME_ENTRY'],
      queryFn: async () =>
        await client.request(GET_ALL_UNUSED_ESL_OFFSETS_BY_TIME_ENTRY, { timeEntryId, onlyUnused }),
      select: (data: { eslOffsetsByTimeEntry: IUnusedESLOffset[] }) => data
    })

  return {
    getAllUnusedESLOffsetQuery
  }
}

export default useUnusedESLOffset
