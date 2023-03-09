export interface IOvertimeRequestInput {
  userId: number
  timeEntryId: number
  managerId: number
  otherProject: string
  requestedMinutes: number
  remarks: string
  date: string
  overtimeProjects: IOvertimeProjects[]
}

export interface IOvertimeProjects {
  id?: number
  projectId: number
  projectLeaderId: number
}

export interface IMyOvertime {
  id: number
  multiProjects: IOvertimeProjects[]
  overtimeDate: string
  requestedMinutes: number
  approvedMinutes: number
  isLeaderApproved: boolean | null
  isManagerApproved: boolean | null
  remarks: string
  createdAt: string
}
