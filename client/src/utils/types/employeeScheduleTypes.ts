export interface IGetAllEmployeeSchedule {
  id: number
  scheduleName: string
}

export interface IGetEmployeeSchedule {
  // eslint-disable-next-line @typescript-eslint/array-type
  days: {
    isDaySelected: boolean
    workingDay: string
    timeIn: string
    timeOut: string
  }[]
  scheduleName: string
}
