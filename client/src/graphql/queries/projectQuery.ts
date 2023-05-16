import { gql } from 'graphql-request'
export const GET_ALL_PROJECTS_QUERY = gql`
  {
    projects {
      id
      name
      projectLeader {
        id
        name
      }
      projectSubLeader {
        id
        name
      }
    }
  }
`

export const GET_ALL_LEADERS_QUERY = gql`
  query ($projectId: Int) {
    allLeaders(projectId: $projectId) {
      id
      name
    }
  }
`
