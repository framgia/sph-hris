import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { ILeave } from '~/utils/types/leaveTypes'
import { GET_ALL_REQUESTED_LEAVES, GET_REMAINING_PAID_LEAVES } from '~/graphql/queries/leaveQueries'

export const getLeave = (): UseQueryResult<{ allLeaves: ILeave[] }, unknown> => {
  const result = useQuery({
    queryKey: ['GET_ALL_REQUESTED_LEAVES'],
    queryFn: async () => await client.request(GET_ALL_REQUESTED_LEAVES),
    select: (data: { allLeaves: ILeave[] }) => data
  })
  return result
}

export const getRemainingPaidLeaves = (id: number): UseQueryResult<{ paidLeaves: number }> => {
  const result = useQuery({
    queryKey: ['GET_ALL_REQUESTED_LEAVES', id],
    queryFn: async () => await client.request(GET_REMAINING_PAID_LEAVES, { id }),
    select: (data: { paidLeaves: number }) => data,
    enabled: !isNaN(id)
  })
  return result
}
