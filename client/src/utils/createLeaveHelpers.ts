import { ProjectDetails } from './types/projectTypes'
import { User } from '~/utils/types/userTypes'
import { LeaveType } from './types/leaveTypes'

export type SelectOptionType = {
  label: string
  value: string
}

export const generateProjectsMultiSelect = (projects: ProjectDetails[]): SelectOptionType[] => {
  return projects?.map((project) => {
    return { label: project.name, value: project.id.toString() }
  })
}

export const generateUserSelect = (users: User[]): SelectOptionType[] => {
  return users?.map((user) => {
    return { label: user.name, value: user.id.toString() }
  })
}

export const generateLeaveTypeSelect = (types: LeaveType[]): SelectOptionType[] => {
  return types?.map((type) => {
    return { label: type.name, value: type.id.toString() }
  })
}

export const generateNumberOfDaysSelect = (
  types: Array<{ id: number; value: string }>
): SelectOptionType[] => {
  return types?.map((type) => {
    return { label: type.value, value: type.value.toString() }
  })
}
