import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { GET_ALL_PROJECTS_QUERY } from '~/graphql/queries/projectQuery'
import { Project } from '~/utils/types/projectTypes'

type handleProjectQueryType = UseQueryResult<Project, unknown>

type returnType = {
  handleProjectQuery: () => handleProjectQueryType
}

const useProject = (): returnType => {
  const handleProjectQuery = (): handleProjectQueryType =>
    useQuery({
      queryKey: ['GET_ALL_PROJECTS_QUERY'],
      queryFn: async () => await client.request(GET_ALL_PROJECTS_QUERY),
      select: (data: Project) => data
    })
  return {
    handleProjectQuery
  }
}

export default useProject
