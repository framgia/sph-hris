export type User = {
  id: number
  name: string
  role: Role
  timeEntry: TimeEntry
  employeeSchedule: EmployeeSchedule
  avatarLink: string
}
export type Role = {
  id: number
  name: string
}
// MARK: - EmployeeSchedule
export type EmployeeSchedule = {
  id: number
  name: string
  workingDayTimes: [WorkingDayTime]
}

// MARK: - WorkingDayTime
export type WorkingDayTime = {
  id: number
  from: string
  to: string
  day: string
}

// MARK: - TimeEntry
export type TimeEntry = {
  id: number
  date: string
  timeIn: Time
  timeOut: Time
}

// MARK: - Time
export type Time = {
  id: number
  timeHour: string
}

export type Users = {
  id: number
  name: string
  email: string
}
