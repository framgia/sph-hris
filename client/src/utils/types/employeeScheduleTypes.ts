export interface IGetAllEmployeeSchedule {
  id: number
  scheduleName: string
}

export interface IGetEmployeeSchedule {
  id: number
  days: Array<{
    isDaySelected: boolean
    workingDay: string
    timeIn: string
    timeOut: string
  }>
  scheduleName: string
  memberCount: number
}

export interface ICreateEmployeeScheduleRequestInput {
  // eslint-disable-next-line @typescript-eslint/array-type
  workingDays: {
    day: string
    from: string
    to: string
  }[]
  userId: number
  scheduleName: string
}

export interface IEditEmployeeScheduleRequestInput {
  // eslint-disable-next-line @typescript-eslint/array-type
  workingDays: {
    day: string
    from: string
    to: string
  }[]
  userId: number
  scheduleName: string
  employeeScheduleId: number
}
