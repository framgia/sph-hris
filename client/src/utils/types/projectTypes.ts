import { User } from './userTypes'

export type Project = {
  projects: ProjectDetails[]
}

export type Leaders = {
  allLeaders: LeaderDetails[]
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

export type LeaderDetails = {
  id: number
  name: string
}
