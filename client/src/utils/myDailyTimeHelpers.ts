import { WorkStatus } from './constants/work-status'

type ApprovalStatus = 'pending' | 'approved' | 'disapproved'

export const getApprovalStatus = (isLeaderApprove: boolean | null): ApprovalStatus => {
  switch (isLeaderApprove) {
    case true:
      return 'approved'
    case false:
      return 'disapproved'
    default:
      return 'pending'
  }
}

export const statusClassNames = {
  [WorkStatus.VACATION_LEAVE.toLowerCase()]: 'bg-yellow-50 hover:bg-yellow-100',
  [WorkStatus.ABSENT.toLowerCase()]: 'bg-fuchsia-50 hover:bg-fuchsia-100',
  [WorkStatus.SICK_LEAVE.toLowerCase()]: 'bg-rose-50 hover:bg-rose-100',
  [WorkStatus.BEREAVEMENT_LEAVE.toLowerCase()]: '',
  [WorkStatus.EMERGENCY_LEAVE.toLowerCase()]: 'bg-red-50 hover:bg-red-100',
  [WorkStatus.MATERNITY_PATERNITY_LEAVE.toLowerCase()]: 'bg-violet-50 hover:bg-violet-100',
  [WorkStatus.UNDERTIME.toLowerCase()]: 'bg-amber-50 hover:bg-amber-100',
  [WorkStatus.REST.toLowerCase()]: 'bg-sky-50 hover:bg-sky-100'
}
