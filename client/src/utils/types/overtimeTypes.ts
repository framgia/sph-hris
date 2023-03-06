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
  projectId: number
  projectLeaderId: number
}
