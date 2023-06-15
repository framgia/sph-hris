import moment from 'moment'

import { User } from '~/utils/types/userTypes'
import { LeaveType } from './types/leaveTypes'
import { ProjectDetails } from './types/projectTypes'
import { IUnusedESLOffset } from './interfaces/unusedELSOffsetInterface'

export type SelectOptionType = {
  label: string
  value: string
}

export const generateProjectsMultiSelect = (projects: ProjectDetails[]): SelectOptionType[] =>
  projects
    ?.filter((item) => item.name !== 'Others')
    .map((project) => ({ label: project.name, value: project.id.toString() }))

export const generateProjectSelect = (project: ProjectDetails[]): SelectOptionType[] =>
  project?.map((project) => ({ label: project.name, value: project.id.toString() }))

export const generateUserSelect = (users: User[]): SelectOptionType[] =>
  users?.map((user) => ({ label: user?.name, value: user?.id.toString() }))

export const generateLeaveTypeSelect = (types: LeaveType[]): SelectOptionType[] =>
  types?.map((type) => ({ label: type.name, value: type.id.toString() }))

export const generateNumberOfDaysSelect = (
  types: Array<{ id: number; value: string }>
): SelectOptionType[] => types?.map((type) => ({ label: type.value, value: type.value.toString() }))

export const generateESLUserSelect = (
  eslUsers: Array<Pick<User, 'id' | 'name'>>
): SelectOptionType[] => eslUsers?.map((user) => ({ label: user.name, value: user.id.toString() }))

export const generateUnusedESLDateSelect = (
  eslOffsetsByTimeEntry: IUnusedESLOffset[]
): SelectOptionType[] =>
  eslOffsetsByTimeEntry?.map((item) => ({
    label: `${item.title} (${moment(item.createdAt).format('MMMM DD, YYYY')} - ${item.timeIn}-${
      item.timeOut
    })`,
    value: item.id.toString()
  }))
