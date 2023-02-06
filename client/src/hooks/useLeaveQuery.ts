import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { GET_ALL_REQUESTED_LEAVES } from '~/graphql/queries/leaveQueries'
import { ILeave } from '~/utils/types/leaveTypes'

export const getLeave = (): UseQueryResult<{ allLeaves: ILeave[] }, unknown> => {
  const result = useQuery({
    queryKey: ['GET_ALL_REQUESTED_LEAVES'],
    queryFn: async () => await client.request(GET_ALL_REQUESTED_LEAVES),
    select: (data: { allLeaves: ILeave[] }) => data
  })
  return result
}
