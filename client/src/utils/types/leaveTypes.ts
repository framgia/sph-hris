export interface ILeave {
  id: number
  userId: number
  avatar: string
  userName: string
  userRole: string
  leaveType: string
  manager: string
  leaveProjects: Array<{
    project: {
      name: string
    }
    projectLeader: {
      name: string
    }
  }>
  reason: string
  leaveDate: string
  isWithPay: boolean
  isLeaderApproved: boolean
  isManagerApproved: boolean
  days: number
  createdAt: string
}
export type HeatmapDetails = {
  value: number
  day: number
  leaveName: string
}
export type Heatmap = {
  january: HeatmapDetails[]
  february: HeatmapDetails[]
  march: HeatmapDetails[]
  april: HeatmapDetails[]
  may: HeatmapDetails[]
  june: HeatmapDetails[]
  july: HeatmapDetails[]
  august: HeatmapDetails[]
  september: HeatmapDetails[]
  october: HeatmapDetails[]
  november: HeatmapDetails[]
  december: HeatmapDetails[]
}
export type LeaveTable = {
  date: string
  leaveTypeId: number
  isWithPay: boolean
  reason: string
  numLeaves: number
  status: string
  userName: string
  userId: number
  leaveId: number
  createdAt: string
}

export type LeaveCellDetailTable = {
  id: number
  userName: string
  typeOfLeave: string
  withPay: string
  numOfLeaves: string
  reason: string
}

export type Breakdown = {
  sickLeave: number
  undertime: number
  vacationLeave: number
  emergencyLeave: number
  bereavementLeave: number
  maternityLeave: number
  withoutPayTotal: number
  withPayTotal: number
  pending: number
}
export type Leaves = {
  leaves: {
    user: {
      id: number
      paidLeaves: number
    }
    breakdown: Breakdown
    heatmap: Heatmap
    table: LeaveTable[]
  }
}

export type LeaveByDate = {
  leavesByDate: {
    totalNumberOfFiledLeaves: number
    table: LeaveTable[]
  }
}

export type YearlyLeaveByDate = {
  yearlyAllLeavesByDate: {
    totalNumberOfFiledLeaves: number
    table: LeaveTable[]
  }
}

export type YearlyLeaves = {
  yearlyAllLeaves: {
    breakdown: Breakdown
    heatmap: Heatmap
    table: LeaveTable[]
  }
}
export type LeaveRequest = {
  userId: number
  leaveTypeId: number
  managerId: number
  otherProject: string
  reason: string
  leaveDates: LeaveDateRequest[]
  leaveProjects: LeaveProjectsRequest[]
}
export type UpdateLeaveRequest = {
  userId: number
  leaveTypeId: number
  leaveId: number
  managerId: number
  otherProject: string
  reason: string
  leaveDates: LeaveDateRequest[]
  leaveProjects: LeaveProjectsRequest[]
}
export type LeaveDateRequest = {
  leaveDate: string
  isWithPay: boolean
  days: number
}

export type LeaveProjectsRequest = {
  projectId: number
  projectLeaderId: number
}
export type LeaveTypes = {
  leaveTypes: LeaveType[]
}
export type LeaveType = {
  id: number
  name: string
}

export interface IApproveLeaveUndertimeRequestInput {
  userId: number
  notificationId: number
  isApproved: boolean
}

export type LeaveProject = {
  projectId: number
  project: {
    name: string
  }
  projectLeaderId: number
  projectLeader: {
    name: string
  }
}

export type IUserLeave = {
  userLeave: Array<{
    id: number
    userId: number
    userName: string
    userRole: string
    leaveProjects: LeaveProject[]
    leaveType: string
    leaveTypeId: number
    managerId: number
    manager: string
    otherProject: string
    reason: string
    leaveDate: string
    isWithPay: boolean
    isLeaderApproved: boolean
    isManagerApproved: boolean
    days: number
    createdAt: string
    avatar: string
  }>
}

export type CancelLeaveRequest = {
  userId: number
  leaveId: number
}
