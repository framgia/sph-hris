import { IDTRManagement } from '../interfaces'

export interface fetchedData {
  id: number
  user: {
    name: string
  }
  timeIn: {
    timeHour: string
  }
  timeOut: {
    timeHour: string
  }
  startTime: string
  endTime: string
  workedHours: string
  late: number
  undertime: number
  overtime: number
  status: string
}

export const mapDTRManagement = (data: fetchedData[]): IDTRManagement[] => {
  const newTable: IDTRManagement[] = []

  data?.forEach((entry: fetchedData) => {
    const newRow: IDTRManagement = {
      id: entry.id,
      name: entry.user.name,
      time_in: entry.timeIn?.timeHour,
      time_out: entry.timeIn?.timeHour,
      start_time: entry.startTime,
      end_time: entry.endTime,
      work_hours: parseInt(entry.workedHours.split(':')[0]),
      late: entry.late,
      undertime: entry.undertime,
      overtime: entry.overtime,
      status: entry.status
    }

    newTable.push(newRow)
  })

  return newTable
}
