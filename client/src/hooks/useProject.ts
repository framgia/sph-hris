import toast from 'react-hot-toast'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { GET_ALL_LEADERS_QUERY, GET_ALL_PROJECTS_QUERY } from '~/graphql/queries/projectQuery'
import { Leaders, Project } from '~/utils/types/projectTypes'

type handleProjectQueryType = UseQueryResult<Project, unknown>
type getLeadersQueryType = UseQueryResult<Leaders, unknown>

type returnType = {
  handleProjectQuery: () => handleProjectQueryType
  getLeadersQuery: (projectId: number | undefined) => getLeadersQueryType
}

const useProject = (): returnType => {
  const handleProjectQuery = (): handleProjectQueryType =>
    useQuery({
      queryKey: ['GET_ALL_PROJECTS_QUERY'],
      queryFn: async () => await client().request(GET_ALL_PROJECTS_QUERY),
      select: (data: Project) => data
    })

  const getLeadersQuery = (projectId: number | undefined): getLeadersQueryType =>
    useQuery({
      queryKey: ['GET_ALL_LEADERS_QUERY', projectId],
      queryFn: async () => await client().request(GET_ALL_LEADERS_QUERY, { projectId }),
      select: (data: Leaders) => data,
      onError: () => toast.error('Failed fetching leaders')
    })
  return {
    handleProjectQuery,
    getLeadersQuery
  }
}

export default useProject
