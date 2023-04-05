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
