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

export interface IBulkOvertimeRequestInput {
  managerId: number
  requestedMinutes: number
  otherProject: string | null
  remarks: string
  date: string
  projectId: number
  employeeIds: number[]
}

export interface IOvertimeProjects {
  id?: number
  projectId: number
  projectLeaderId: number
}

export interface IMyOvertime {
  id: number
  multiProjects: IMultiProject[]
  otherProject?: string
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
  manager: {
    id: number
  }
  isLeaderApproved: boolean
  isManagerApproved: boolean
  remarks: string
  createdAt: string
  managerRemarks?: string | null
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
  }
}

export interface IMultiProject {
  id: number
  project: {
    name: string
  }
  projectLeader: {
    name: string
  }
}

export interface IManagerApproveOvertimeRequestInput {
  userId: number
  overtimeId: number
  isApproved: boolean | undefined
  approvedMinutes: number | null
  managerRemarks?: string | null
}

export interface IManagerApproveOvertimeSummaryRequestInput {
  approvingDatas: IManagerApproveOvertimeRequestInput[]
}

export interface ILeaderApproveOvertimeRequestInput {
  userId: number
  notificationId: number
  isApproved: boolean
}
