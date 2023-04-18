export interface IESLOffsetInput {
  userId: number
  teamLeaderId: number
  timeEntryId: number
  timeIn: string
  timeOut: string
  description: string
  eslOffsetIDs: number[]
}

export interface IApproveESLOffsetInput {
  teamLeaderId: number
  notificationId: number
  isApproved: boolean
}

export interface IApproveOffsetInput {
  teamLeaderId: number
  notificationId: number
  isApproved: boolean
}
