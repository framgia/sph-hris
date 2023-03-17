export type TimeEntry = {
  timeIn: string
  timeOut: string
}

export interface ISchedule {
  id?: number
  scheduleName: string
  mondaySelected: boolean
  monday: TimeEntry
  tuesdaySelected: boolean
  tuesday: TimeEntry
  wednesdaySelected: boolean
  wednesday: TimeEntry
  thursdaySelected: boolean
  thursday: TimeEntry
  fridaySelected: boolean
  friday: TimeEntry
  saturdaySelected: boolean
  saturday: TimeEntry
  sundaySelected: boolean
  sunday: TimeEntry
}
