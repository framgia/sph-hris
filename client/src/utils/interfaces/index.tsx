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

export interface IListOfLeave {
  id: number
  userId: number
  name: string
  project: string
  leaveDate: string
  type: string
  isWithPay: boolean
  manager: string
  projectLeader: string
  totalUndertime: number
  totalLeaves: number
  dateFiled: string
  reason: string
}

export interface IMyOvertime {
  id: number
  // eslint-disable-next-line @typescript-eslint/array-type
  project: {
    value: string
    label: string
  }[]
  date: string
  overtimeIn: string
  overtimeOut: string
  requestedHours: number
  supervisor: string
  dateFiled: string
  remarks: string
}
export interface INotification {
  id: number
  name: string
  project: string
  type: string
  date: string
  remarks: string
  duration: number
  dateFiled: string
  status: string
}

export interface IOvertimeManagement {
  id: number
  user: {
    id: number
    name: string
    role: {
      id: number
      name: string
    }
  }
  // eslint-disable-next-line @typescript-eslint/array-type
  project: {
    label: string
    value: string
  }[]
  date: string
  overtimeIn: string
  overtimeOut: string
  requestedHours: number
  supervisor: string
  dateFiled: string
  remarks: string
  status: string
}

export type IOvertimeManagementManager = Required<
  Omit<IOvertimeManagement, 'overtimeIn' | 'overtimeOut' | 'supervisor'>
>
