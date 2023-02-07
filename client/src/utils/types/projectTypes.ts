import { User } from './userTypes'

export type Project = {
  projects: ProjectDetails[]
}
export type ProjectDetails = {
  id: number
  name: string
  projectLeader: User
  projectSubLeader: User
}
export type ProjectAssignee = {
  id: number
  name: string
}
