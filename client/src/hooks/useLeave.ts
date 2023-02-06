import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { Leaves, YearlyLeaves } from '~/utils/types/leaveTypes'
import { GET_MY_LEAVES_QUERY, GET_YEARLY_ALL_LEAVES_QUERY } from '~/graphql/queries/leaveQuery'

type handleLeaveQueryType = UseQueryResult<Leaves, unknown>
type handleYearlyLeaveQueryType = UseQueryResult<YearlyLeaves, unknown>

type returnType = {
  handleLeaveQuery: (userId: number, year: number) => handleLeaveQueryType
  handleYearlyAllLeaveQuery: (year: number, ready: boolean) => handleYearlyLeaveQueryType
}

const useLeave = (): returnType => {
  const handleLeaveQuery = (userId: number, year: number): handleLeaveQueryType =>
    useQuery({
      queryKey: ['GET_MY_LEAVES_QUERY', userId, year],
      queryFn: async () => await client.request(GET_MY_LEAVES_QUERY, { userId, year }),
      select: (data: Leaves) => data,
      enabled: Boolean(userId) && Boolean(year)
    })

  const handleYearlyAllLeaveQuery = (year: number, ready: boolean): handleYearlyLeaveQueryType =>
    useQuery({
      queryKey: ['GET_YEARLY_ALL_LEAVES_QUERY', year],
      queryFn: async () => await client.request(GET_YEARLY_ALL_LEAVES_QUERY, { year }),
      select: (data: YearlyLeaves) => data,
      enabled: ready
    })

  return {
    handleLeaveQuery,
    handleYearlyAllLeaveQuery
  }
}

export default useLeave
