export interface IEmployeeTimeEntry {
  id: number
  date: string
  timeIn: {
    id: number
    timeHour: string
    remarks: string
  }
  timeOut: {
    id: number
    timeHour: string
    remarks: string
  }
  startTime: string
  endTime: string
  workedHours: string
  trackedHours: string
  late: number
  undertime: number
  overtime: number
  status: string
}

export interface ITimeEntry {
  id: number
  date: string
  user: {
    id: number
    name: string
  }
  timeIn: {
    id: number
    timeHour: string
    remarks: string
  }
  timeOut: {
    id: number
    timeHour: string
    remarks: string
  }
  startTime: string
  endTime: string
  workedHours: string
  trackedHours: string
  late: number
  undertime: number
  overtime: number
  status: string
}

export interface ITimeEntryById {
  id: number
  timeHour: string
  remarks: string
  createdAt: string
  media: [
    {
      collectionName: string
      name: string
      fileName: string
      mimeType: string
    }
  ]
}

export interface ISpecificTimeEntryById {
  user: {
    id: number
    name: string
  }
}

export interface ISpecificUserDetail {
  name: string
  avatarLink: string
}

export interface ITimesheetSummary {
  user: {
    id: number
    name: string
  }
  leave: number
  absences: number
  late: number
  undertime: number
  overtime: number
}
