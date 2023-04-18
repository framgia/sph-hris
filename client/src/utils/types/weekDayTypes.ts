export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

export type DayProperties = {
  [key in DayOfWeek]: {
    selected: string
    timeIn: string
    timeOut: string
  }
}
