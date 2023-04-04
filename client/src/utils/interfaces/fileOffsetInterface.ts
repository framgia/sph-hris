export interface IFileOffset {
  userId: number
  teamLeaderId: number
  timeEntryId: number
  timeIn: string
  timeOut: string
  description: string
  title: string
}

export interface IFiledOffsetData {
  id: number
  title: string
  timeIn: string
  timeOut: string
  createdAt: string
  updatedAt: string
  teamLeader: {
    id: number
    name: string
  }
  description: string
  isLeaderApproved: boolean | null
}
