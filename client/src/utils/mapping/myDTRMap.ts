import moment from 'moment'

import { IMyDTR } from '../interfaces'
import { IEmployeeTimeEntry } from '../types/timeEntryTypes'

export const mapDTRData = (data: IEmployeeTimeEntry[]): IMyDTR[] => {
  const newTable: IMyDTR[] = []

  data.forEach((entry: IEmployeeTimeEntry) => {
    const newRow: IMyDTR = {
      id: entry.id,
      date: moment(new Date(entry.date)).format('MMMM DD, YYYY'),
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
