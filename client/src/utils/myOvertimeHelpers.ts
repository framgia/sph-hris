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
    case isLeaderApprove === true && isManagerApproved === true:
      return 'approved'
    case isLeaderApprove === false || isManagerApproved === false:
      return 'disapproved'
    case isLeaderApprove === null || isManagerApproved === null:
      return 'pending'
    default:
      return 'disapproved'
  }
}
