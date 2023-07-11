import * as Icons from 'react-feather'

import { IESLOffset } from './eslOffsetInterface'
import { IWorkDayData } from '../types/notificationTypes'
import { ReactSelectOption, TimeEntryWithBreak } from './../types/formValues'

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
  projects: Array<{
    project_name: ReactSelectOption
    project_leader: ReactSelectOption
  }>
  leaveDate: string
  type: string
  isWithPay: boolean
  manager: string
  projectLeader: string
  totalUndertime: number
  totalLeaves: number
  dateFiled: string
  reason: string
  avatar: string
}

export interface INotification {
  id: number
  name: string
  project: string
  type: string
  specificType: string
  date: string
  remarks: string
  duration: number
  dateFiled: string
  status: string
  readAt: string | null
  isRead: boolean
  requestedTimeIn: string | null
  requestedTimeOut: string | null
  description: string | null
  userAvatarLink: string
  createdAt: string
  offsets: IESLOffset[]
  managerRemarks: string | null
  startDate: string
  endDate: string
  workingDays: IWorkDayData[]
}

export interface IEmployeeManagement {
  id: number
  name: string
  email: string
  position: string
  date_joined: string
  status: string
}

export interface IOvertimeManagement {
  id: number
  user: {
    id: number
    name: string
    link: string
    role: {
      id: number
      name: string
    }
  }
  // eslint-disable-next-line @typescript-eslint/array-type
  projects: {
    project_name: {
      label: string
      value: string
    }
    project_leader: {
      label: string
      value: string
    }
  }[]
  manager: {
    label: string
    value: string
  }
  date: string
  overtimeIn: string
  overtimeOut: string
  requestedMinutes: number
  approvedMinutes: number
  supervisor: string
  dateFiled: string
  managerid: number
  remarks: string
  status: string
  isManagerApproved: boolean
  managerRemarks: string | null
}

export type IOvertimeManagementManager = Required<
  Omit<IOvertimeManagement, 'overtimeIn' | 'overtimeOut' | 'supervisor'>
>

export interface IMyOvertimeData {
  id: number
  projects: Array<{
    id: number
    project: {
      id: number
      name: string
    }
    projectLeader: {
      id: number
      name: string
    }
  }>
  otherProject?: string
  supervisor: string
  dateFiled: string
  overtimeDate: string
  requestedMinutes: number | null
  approvedMinutes: number | null
  isLeaderApproved: boolean | null
  isManagerApproved: boolean | null
  remarks: string
  createdAt: string
}

export interface IMyOvertimeTable {
  id: number
  // eslint-disable-next-line @typescript-eslint/array-type
  projects: {
    project_name: {
      label: string
      value: string
    }
    project_leader: {
      label: string
      value: string
    }
  }[]
  manager?: {
    label: string
    value: string
  }
  date: string
  requestedHours: number
  approvedMinutes: number | null
  supervisor: string
  dateFiled: string
  remarks: string
  status: string
}

export interface IFiledOffsetTable {
  id: number
  title: string
  timeIn: string
  timeOut: string
  teamLeader: string
  status: string
  remarks: string
  createdAt: string
  updateAt: string
  isUsed: boolean
}

export interface IMyFiledScheduleData {
  id: string
  dateFiled: string
  status: string
  schedule: {
    monday: TimeEntryWithBreak
    tuesday: TimeEntryWithBreak
    wednesday: TimeEntryWithBreak
    thursday: TimeEntryWithBreak
    friday: TimeEntryWithBreak
    saturday: TimeEntryWithBreak
    sunday: TimeEntryWithBreak
  }
}
