import { NumberOfDaysInLeave, NumberOfDaysInLeaveByUndertime } from './numberOfDaysInLeaves'

export const numberOfDaysInLeaves = [
  {
    id: 1,
    value: NumberOfDaysInLeave.FourHours
  },
  {
    id: 2,
    value: NumberOfDaysInLeave.FiveHours
  },
  {
    id: 3,
    value: NumberOfDaysInLeave.AfternoonOnly
  },
  {
    id: 4,
    value: NumberOfDaysInLeave.WholeDay
  }
]

export const numberOfDaysInLeavesByUndertime = [
  {
    id: 1,
    value: NumberOfDaysInLeaveByUndertime.OneHour
  },
  {
    id: 2,
    value: NumberOfDaysInLeaveByUndertime.OneAndHalfHour
  },
  {
    id: 3,
    value: NumberOfDaysInLeaveByUndertime.TwoHours
  },
  {
    id: 4,
    value: NumberOfDaysInLeaveByUndertime.TwoAndHalfHours
  },
  {
    id: 5,
    value: NumberOfDaysInLeaveByUndertime.ThreeHours
  }
]
