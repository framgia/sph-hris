import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { IMyOvertime } from '~/utils/types/overtimeTypes'
import { GET_ALL_OVERTIME_QUERY } from '~/graphql/queries/overtimeQueries'

export const getOvertimeQuery = (
  userId: number
): UseQueryResult<{ overtime: IMyOvertime[] }, unknown> => {
  const result = useQuery({
    queryKey: ['GET_ALL_OVERTIME_QUERY', userId],
    queryFn: async () => await client.request(GET_ALL_OVERTIME_QUERY, { userId }),
    select: (data: { overtime: IMyOvertime[] }) => data,
    enabled: !isNaN(userId)
  })
  return result
}
