export interface IGetAllEmployeeSchedule {
  id: number
  scheduleName: string
  days: IDay[]
}

export interface IDay {
  isDaySelected: boolean
  workingDay: string
  timeIn: string
  timeOut: string
  breakFrom: string
  breakTo: string
}

export interface IGetEmployeeSchedule {
  id: number
  days: IDay[]
  scheduleName: string
  memberCount: number
}

export interface IAddMemberToScheduleInput {
  employeeIds: Number[]
  userId: number
  scheduleId: number
}

export interface IWorkDay {
  day: string
  from: string
  to: string
  breakFrom: string
  breakTo: string
}

export interface ICreateEmployeeScheduleRequestInput {
  workingDays: IWorkDay[]
  userId: number
  scheduleName: string
}

export interface IEditEmployeeScheduleRequestInput {
  workingDays: IWorkDay[]
  userId: number
  scheduleName: string
  employeeScheduleId: number
}

export interface IDeleteEmployeeScheduleRequestInput {
  userId: number
  employeeScheduleId: number
}

export interface ISearchEmployeesByScheduleRequestInput {
  employeeScheduleId: number
  searchKey: string
}

export interface IReassignEmployeesScheduleRequestInput {
  userId: number
  employeeId: number
  scheduleId: number
}
