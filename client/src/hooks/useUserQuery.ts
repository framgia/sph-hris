import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { GET_USER_QUERY } from '~/graphql/queries/UserQuery'
import { client } from '~/utils/shared/client'
import { User } from '~/utils/types/userTypes'
import moment from 'moment'

type returnType = {
  handleUserQuery: () => UseQueryResult<
    {
      userById: User
    },
    unknown
  >
}
type handleUserQueryType = UseQueryResult<
  {
    userById: User
  },
  unknown
>
const useUserQuery = (): returnType => {
  const handleUserQuery = (): handleUserQueryType =>
    useQuery({
      queryKey: ['GET_USER_QUERY'],
      queryFn: async () =>
        await client.request(GET_USER_QUERY, {
          token: localStorage.getItem('cookies'),
          schedule: moment(new Date()).format('dddd')
        }),
      select: (data: { userById: User }) => data
    })
  return {
    handleUserQuery
  }
}

export default useUserQuery
