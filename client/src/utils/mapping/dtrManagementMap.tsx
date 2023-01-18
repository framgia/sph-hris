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
      time_in: entry.timeIn != null ? entry.timeIn.timeHour : 'N/A',
      time_out: entry.timeOut != null ? entry.timeOut.timeHour : 'N/A',
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
