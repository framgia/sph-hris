import { Row } from '@tanstack/react-table'
import useProject from '~/hooks/useProject'
import { IMyOvertime } from './types/overtimeTypes'
import { ProjectDetails } from './types/projectTypes'

export const decimalFormatter = (value: number): number => {
  const decimalFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  })

  const formattedNumber = decimalFormatter.format(value / 60)
  const parsedNumber = parseFloat(formattedNumber)

  return parsedNumber
}

type ReturnTypeMultiProjects = {
  multiProjectNames: Array<ProjectDetails | undefined>
  projectLeaders: Array<ProjectDetails | undefined>
}

export const getMultiProjectDetails = (row: Row<IMyOvertime>): ReturnTypeMultiProjects => {
  const { handleProjectQuery } = useProject()
  const { data: projects } = handleProjectQuery()

  const multiProjectNames = row.original.multiProjects.map((mp) => {
    const projectdata = projects?.projects.find((project) => project.id === mp.projectId)
    return projectdata
  })

  const projectLeaders = row.original.multiProjects.map((mp) => {
    const projectdata = projects?.projects.find((project) => project.id === mp.projectId)
    return projectdata
  })

  return {
    multiProjectNames,
    projectLeaders
  }
}

type ApprovalStatus = 'pending' | 'approved' | 'disapproved'

export const getApprovalStatus = (
  isLeaderApprove: boolean | null,
  isManagerApproved: boolean | null
): ApprovalStatus => {
  switch (true) {
    case isLeaderApprove === null || isManagerApproved === null:
      return 'pending'
    case isLeaderApprove === true && isManagerApproved === true:
      return 'approved'
    default:
      return 'disapproved'
  }
}
