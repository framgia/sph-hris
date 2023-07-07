import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { User } from '~/utils/types/userTypes'
import { ReactSelectOption } from '~/utils/types/formValues'
import { GET_ALL_ROLE_QUERY } from '~/graphql/queries/roleQuery'
import { GET_ALL_POSITION_QUERY } from '~/graphql/queries/positionQuery'
import {
  GET_USER_QUERY,
  GET_ALL_USERS_QUERY,
  GET_ALL_ESL_USERS_QUERY
} from '~/graphql/queries/UserQuery'

type UserPickData = Array<Pick<User, 'id' | 'name'>>
type UserQueryType = UseQueryResult<
  {
    userById: User
  },
  unknown
>
type AllUsersQueryType = UseQueryResult<
  {
    allUsers: User[]
  },
  unknown
>
type ESLUserReturnType = UseQueryResult<
  {
    allESLUsers: UserPickData
  },
  unknown
>
type PositionReturnType = UseQueryResult<ReactSelectOption[], unknown>
type RoleReturnType = UseQueryResult<ReactSelectOption[], unknown>
type HookReturnType = {
  handleUserQuery: () => UserQueryType
  handleAllUsersQuery: (ready?: boolean) => AllUsersQueryType
  getESLUserQuery: (ready?: boolean) => ESLUserReturnType
  getAllPositionQuery: () => PositionReturnType
  getAllRoleQuery: () => RoleReturnType
}

// GET SPECIFIC USER
const useUserQuery = (): HookReturnType => {
  const handleUserQuery = (): UserQueryType =>
    useQuery({
      queryKey: ['GET_USER_QUERY'],
      queryFn: async () => await client.request(GET_USER_QUERY),
      select: (data: { userById: User }) => data
    })

  // GET ALL USERS
  const handleAllUsersQuery = (ready: boolean = true): AllUsersQueryType =>
    useQuery({
      queryKey: ['GET_ALL_USERS_QUERY'],
      queryFn: async () => await client.request(GET_ALL_USERS_QUERY),
      select: (data: { allUsers: User[] }) => data,
      enabled: ready
    })

  // GET ALL ESL USERS
  const getESLUserQuery = (ready: boolean = true): ESLUserReturnType =>
    useQuery({
      queryKey: ['GET_ESL_USERS_QUERY'],
      queryFn: async () =>
        await client.request(GET_ALL_ESL_USERS_QUERY, { requestingUserId: null }),
      select: (data: { allESLUsers: UserPickData }) => data,
      enabled: ready
    })

  // GET ALL POSITIONS
  const getAllPositionQuery = (): PositionReturnType =>
    useQuery({
      queryKey: ['GET_ALL_POSITION_QUERY'],
      queryFn: async () => await client.request(GET_ALL_POSITION_QUERY),
      select: (data: { allPositions: UserPickData }) =>
        data.allPositions.map((position) => ({
          value: position.id.toString(),
          label: position.name
        }))
    })

  // GET ALL ROLES
  const getAllRoleQuery = (): RoleReturnType =>
    useQuery({
      queryKey: ['GET_ALL_ROLE_QUERY'],
      queryFn: async () => await client.request(GET_ALL_ROLE_QUERY),
      select: (data: { allRoles: UserPickData }) =>
        data.allRoles.map((role) => ({
          value: role.id.toString(),
          label: role.name
        }))
    })

  return {
    handleUserQuery,
    getESLUserQuery,
    getAllRoleQuery,
    handleAllUsersQuery,
    getAllPositionQuery
  }
}

export default useUserQuery
