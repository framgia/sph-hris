import { useQuery, UseQueryResult } from '@tanstack/react-query'
import {
  GET_ALL_ESL_USERS_QUERY,
  GET_ALL_USERS_QUERY,
  GET_USER_QUERY
} from '~/graphql/queries/UserQuery'
import { client } from '~/utils/shared/client'
import { User } from '~/utils/types/userTypes'

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

type ESLUserReturnType = UseQueryResult<
  {
    allESLUsers: Array<Pick<User, 'id' | 'name'>>
  },
  unknown
>

type returnType = {
  handleUserQuery: () => handleUserQueryType
  handleAllUsersQuery: (ready?: boolean) => handleAllUsersQueryType
  getESLUserQuery: (ready?: boolean) => ESLUserReturnType
}

// GET SPECIFIC USER
const useUserQuery = (): returnType => {
  const handleUserQuery = (): handleUserQueryType =>
    useQuery({
      queryKey: ['GET_USER_QUERY'],
      queryFn: async () => await client().request(GET_USER_QUERY),
      select: (data: { userById: User }) => data
    })

  // GET ALL USERS
  const handleAllUsersQuery = (ready: boolean = true): handleAllUsersQueryType =>
    useQuery({
      queryKey: ['GET_ALL_USERS_QUERY'],
      queryFn: async () => await client().request(GET_ALL_USERS_QUERY),
      select: (data: { allUsers: User[] }) => data,
      enabled: ready
    })

  // GET ALL ESL USERS
  const getESLUserQuery = (ready: boolean = true): ESLUserReturnType =>
    useQuery({
      queryKey: ['GET_ESL_USERS_QUERY'],
      queryFn: async () =>
        await client().request(GET_ALL_ESL_USERS_QUERY, { requestingUserId: null }),
      select: (data: { allESLUsers: Array<Pick<User, 'id' | 'name'>> }) => data,
      enabled: ready
    })

  return {
    handleUserQuery,
    handleAllUsersQuery,
    getESLUserQuery
  }
}

export default useUserQuery
