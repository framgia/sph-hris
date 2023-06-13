import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { IMyOvertimeData } from '~/utils/interfaces'
import { GET_ALL_OVERTIME_QUERY } from '~/graphql/queries/overtimeQueries'

export const getOvertimeQuery = (
  userId: number
): UseQueryResult<{ overtime: IMyOvertimeData[] }, unknown> => {
  const result = useQuery({
    queryKey: ['GET_ALL_OVERTIME_QUERY', userId],
    queryFn: async () => await client().request(GET_ALL_OVERTIME_QUERY, { userId }),
    select: (data: { overtime: IMyOvertimeData[] }) => data,
    enabled: !isNaN(userId)
  })
  return result
}
