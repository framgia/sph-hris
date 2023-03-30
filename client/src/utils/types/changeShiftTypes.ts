export interface IChangeShiftRequestInput {
  userId: number
  managerId: number
  timeEntryId: number
  timeIn: string
  timeOut: string
  description: string
  otherProject: string | null
  projects: Project[]
}

export interface Project {
  projectId: number
  projectLeaderId: number
}

export interface IApproveChangeShiftRequestInput {
  userId: number
  notificationId: number
  isApproved: boolean
}
