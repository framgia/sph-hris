import { ProjectDetails } from './types/projectTypes'

export type OptionLabel = {
  label: string
  value: string
}
export const generateProjectsMultiSelect = (projects: ProjectDetails[]): OptionLabel[] => {
  return projects?.map((project) => {
    return { label: project.name, value: project.id.toString() }
  })
}
