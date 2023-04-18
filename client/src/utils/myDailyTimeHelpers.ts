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
  [WorkStatus.VACATION_LEAVE.toLowerCase()]: 'bg-yellow-50 hover:bg-yellow-50',
  [WorkStatus.ABSENT.toLowerCase()]: 'bg-fuchsia-50 hover:bg-fuchsia-50',
  [WorkStatus.SICK_LEAVE.toLowerCase()]: 'bg-rose-50 hover:bg-rose-50',
  [WorkStatus.BEREAVEMENT_LEAVE.toLowerCase()]: 'bg-gray-50 hover:bg-gray-50',
  [WorkStatus.EMERGENCY_LEAVE.toLowerCase()]: 'bg-red-50 hover:bg-red-50',
  [WorkStatus.MATERNITY_PATERNITY_LEAVE.toLowerCase()]: 'bg-violet-50 hover:bg-violet-50',
  [WorkStatus.UNDERTIME.toLowerCase()]: 'bg-amber-50 hover:bg-amber-50'
}
