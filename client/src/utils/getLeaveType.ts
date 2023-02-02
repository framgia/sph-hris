import { LeaveTypes } from './constants/leaveTypes'

export const getLeaveType = (id: number): string | undefined => {
  switch (id) {
    case LeaveTypes.SICK_LEAVE:
      return 'Sick Leave'
    case LeaveTypes.UNDERTIME:
      return 'Undertime'
    case LeaveTypes.VACATION_LEAVE:
      return 'Vacation Leave'
    case LeaveTypes.EMERGENCY_LEAVE:
      return 'Emergency Leave'
    case LeaveTypes.BEREAVEMENT_LEAVE:
      return 'Bereavement Leave'
    case LeaveTypes.MATERNITY_LEAVE:
      return 'Maternity Leave'
  }
}
