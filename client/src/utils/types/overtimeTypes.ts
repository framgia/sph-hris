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
export interface IAllOvertime {
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
  otherProject: string
  user: {
    id: number
    name: string
    link: string
    roleId: number
    roleName: string
  }
  supervisor: string
  dateFiled: string
  overtimeDate: string
  requestedMinutes: number
  approvedMinutes: number
  isLeaderApproved: boolean
  isManagerApproved: boolean
  remarks: string
  createdAt: string
}

export interface IUser {
  id: number
  name: string
  link: string
  roleId: number
  roleName: string
}

export interface IMultiProjects {
  id: number
  project: {
    id: number
    name: string
  }
  projectLeader: {
    id: number
    name: string
  }
}

export interface IManagerApproveOvertimeRequestInput {
  userId: number
  overtimeId: number
  isApproved: boolean
  approvedMinutes: number | null
}

export interface ILeaderApproveOvertimeRequestInput {
  userId: number
  notificationId: number
  isApproved: boolean
}
