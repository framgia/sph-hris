import { IMultiProject, IMyOvertime } from './types/overtimeTypes'

export const decimalFormatter = (value: number): number => {
  const decimalFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  })

  const formattedNumber = decimalFormatter.format(value / 60)
  const parsedNumber = parseFloat(formattedNumber)

  return parsedNumber
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

export const getInitialProjectNameAndLeader = (original: IMyOvertime): string => {
  const projectName = original.multiProjects[0].project?.name ?? ''
  const projectLeader = original.multiProjects[0].projectLeader?.name ?? ''

  return projectName === 'Others' || original.otherProject !== ''
    ? `${original.otherProject ?? ''} - ${projectLeader}`
    : `${projectName} - ${projectLeader}`
}

export const getProjectWithNameDisplay = (option: IMultiProject, original: IMyOvertime): string => {
  const projectName = option.project?.name ?? ''
  const projectLeader = option.projectLeader?.name ?? ''
  const otherProject = original.otherProject ?? ''

  return projectName === 'Others' || otherProject !== ''
    ? `${otherProject} - ${projectLeader}`
    : `${projectName} - ${projectLeader}`
}
