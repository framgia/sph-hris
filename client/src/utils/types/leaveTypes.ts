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
