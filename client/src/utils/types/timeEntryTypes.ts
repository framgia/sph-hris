export interface IEmployeeTimeEntry {
  id: number
  date: string
  timeIn: {
    timeHour: string
    remarks: string
  }
  timeOut: {
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
  timeHour: string
  remarks: string
}