import * as Icons from 'react-feather'

export type IconName = keyof typeof Icons

export interface IInterruptionTimeEntry {
  id: number | string
  createdAt: string
  timeOut: string
  timeIn: string
  workInterruptionTypeId: number
  timeEntryId: number
  otherReason: string
  remarks?: string
}

export interface ILeaveManagementSummaryTable {
  date: string
  typeOfLeave: string
  pay: string
  reason: string
  numOfLeaves: number
}
