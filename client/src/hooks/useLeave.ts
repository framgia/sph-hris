import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { Leaves } from '~/utils/types/leaveTypes'
import { GET_MY_LEAVES_QUERY } from '~/graphql/queries/leaveQuery'

type handleLeaveQueryType = UseQueryResult<Leaves, unknown>

type returnType = {
  handleLeaveQuery: (userId: number, year: number) => handleLeaveQueryType
}

const useLeave = (): returnType => {
  const handleLeaveQuery = (userId: number, year: number): handleLeaveQueryType =>
    useQuery({
      queryKey: ['GET_MY_LEAVES_QUERY', userId, year],
      queryFn: async () => await client.request(GET_MY_LEAVES_QUERY, { userId, year }),
      select: (data: Leaves) => data,
      enabled: Boolean(userId) && Boolean(year)
    })
  return {
    handleLeaveQuery
  }
}

export default useLeave
