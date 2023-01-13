export interface ITimeEntry {
  id: number
  date: string
  user: {
    id: number
    name: string
  }
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
