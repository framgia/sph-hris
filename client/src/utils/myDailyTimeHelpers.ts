type ApprovalStatus = 'pending' | 'approved' | 'disapproved'

export const getApprovalStatus = (isLeaderApprove: boolean | null): ApprovalStatus => {
  switch (true) {
    case isLeaderApprove === true:
      return 'approved'
    case isLeaderApprove === false:
      return 'disapproved'
    case isLeaderApprove === null:
      return 'pending'
    default:
      return 'disapproved'
  }
}
