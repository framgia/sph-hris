import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { GET_ALL_USERS_QUERY, GET_USER_QUERY } from '~/graphql/queries/UserQuery'
import { client } from '~/utils/shared/client'
import { User } from '~/utils/types/userTypes'
import moment from 'moment'

type handleUserQueryType = UseQueryResult<
  {
    userById: User
  },
  unknown
>
type handleAllUsersQueryType = UseQueryResult<
  {
    allUsers: User[]
  },
  unknown
>
type returnType = {
  handleUserQuery: () => handleUserQueryType
  handleAllUsersQuery: () => handleAllUsersQueryType
}
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
  const handleAllUsersQuery = (): handleAllUsersQueryType =>
    useQuery({
      queryKey: ['GET_ALL_USERS_QUERY'],
      queryFn: async () => await client.request(GET_ALL_USERS_QUERY),
      select: (data: { allUsers: User[] }) => data
    })
  return {
    handleUserQuery,
    handleAllUsersQuery
  }
}

export default useUserQuery
