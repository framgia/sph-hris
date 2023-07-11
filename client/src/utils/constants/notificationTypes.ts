export const SpecificType = {
  REQUEST: 'request',
  APPROVAL: 'approve',
  DISAPPROVAL: 'disapprove',
  SUMMARY: 'summary'
} as const

export const NOTIFICATION_TYPE = {
  OVERTIME: 'overtime',
  UNDERTIME: 'undertime',
  LEAVE: 'leave',
  CHANGE_SHIFT: 'change shift',
  OVERTIME_RESOLVED: 'overtime_resolved',
  UNDERTIME_RESOLVED: 'undertime_resolved',
  LEAVE_RESOLVED: 'leave_resolved',
  CHANGE_SHIFT_RESOLVED: 'change shift_resolved',
  RESOLVED: 'resolved',
  OFFSET_SCHEDULE: 'offset schedule',
  OFFSET: 'offset',
  OFFSET_RESOLVED: 'offset_resolved',
  ESL_CHANGE_SHIFT: 'esl change shift',
  ESL_CHANGE_SHIFT_RESOLVED: 'esl change shift_resolved',
  CHANGE_SCHEDULE: 'change schedule'
} as const
