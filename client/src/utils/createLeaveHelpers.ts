import { ProjectDetails } from './types/projectTypes'

export type SelectOptionType = {
  label: string
  value: string
}

export const generateProjectsMultiSelect = (projects: ProjectDetails[]): SelectOptionType[] => {
  return projects?.map((project) => {
    return { label: project.name, value: project.id.toString() }
  })
}

export const generateNumberOfDaysSelect = (
  types: Array<{ id: number; value: string }>
): SelectOptionType[] => {
  return types?.map((type) => {
    return { label: type.value, value: type.value.toString() }
  })
}
