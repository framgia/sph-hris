import { ConstLeaveTypes } from './leaveTypes'
import { NumberOfDaysInLeave, NumberOfDaysInLeaveByUndertime } from './numberOfDaysInLeaves'

export const projectList = [
  {
    label: 'Admin',
    value: 'Admin'
  },
  {
    label: 'Casec',
    value: 'Casec'
  },
  {
    label: 'Shaperon',
    value: 'Shaperon'
  },
  {
    label: '01Booster',
    value: '01Booster'
  },
  {
    label: 'Edge',
    value: 'Edge'
  },
  {
    label: 'DTS',
    value: 'DTS'
  },
  {
    label: 'OJT',
    value: 'Safie'
  },
  {
    label: 'AAA Education',
    value: 'AAA Education'
  },
  {
    label: 'Development Training',
    value: 'Development Training'
  },
  {
    label: 'Yamato',
    value: 'Yamato'
  },
  {
    label: 'Next Base',
    value: 'Next Base'
  },
  {
    label: 'MetaJobs',
    value: 'MetaJobs'
  },
  {
    label: 'Prrrr',
    value: 'Prrrr'
  },
  {
    label: 'Aironworks',
    value: 'Aironworks'
  },
  {
    label: 'Osaka Metro',
    value: 'Osaka Metro'
  },
  {
    label: 'Others',
    value: 'Others'
  }
]

export const projectLeaders = [
  {
    label: 'Karlo Lee',
    value: 'Karlo Lee'
  },
  {
    label: 'Jeremiah Cabellero',
    value: 'Jeremiah Cabellero'
  },
  {
    label: 'Inah San Juan',
    value: 'Inah San Juan'
  },
  {
    label: 'Zion Tavera',
    value: 'Zion Tavera'
  }
]

export const dummyLeaveTypes = [
  {
    label: ConstLeaveTypes.SICK_LEAVE,
    value: ConstLeaveTypes.SICK_LEAVE
  },
  {
    label: ConstLeaveTypes.BEREAVEMENT_LEAVE,
    value: ConstLeaveTypes.BEREAVEMENT_LEAVE
  },
  {
    label: ConstLeaveTypes.VACATION_LEAVE,
    value: ConstLeaveTypes.VACATION_LEAVE
  },
  {
    label: ConstLeaveTypes.MATERNITY_PATERNITY_LEAVE,
    value: ConstLeaveTypes.MATERNITY_PATERNITY_LEAVE
  }
]

export const numberOfDaysInLeaves = [
  {
    label: NumberOfDaysInLeave.FourHours,
    value: NumberOfDaysInLeave.FourHours
  },
  {
    label: NumberOfDaysInLeave.FiveHours,
    value: NumberOfDaysInLeave.FiveHours
  },
  {
    label: NumberOfDaysInLeave.AfternoonOnly,
    value: NumberOfDaysInLeave.AfternoonOnly
  },
  {
    label: NumberOfDaysInLeave.WholeDay,
    value: NumberOfDaysInLeave.WholeDay
  }
]

export const numberOfDaysInLeavesByUndertime = [
  {
    label: NumberOfDaysInLeaveByUndertime.OneHour,
    value: NumberOfDaysInLeaveByUndertime.OneHour
  },
  {
    label: NumberOfDaysInLeaveByUndertime.OneAndHalfHour,
    value: NumberOfDaysInLeaveByUndertime.OneAndHalfHour
  },
  {
    label: NumberOfDaysInLeaveByUndertime.TwoHours,
    value: NumberOfDaysInLeaveByUndertime.TwoHours
  },
  {
    label: NumberOfDaysInLeaveByUndertime.TwoAndHalfHours,
    value: NumberOfDaysInLeaveByUndertime.TwoAndHalfHours
  },
  {
    label: NumberOfDaysInLeaveByUndertime.ThreeHours,
    value: NumberOfDaysInLeaveByUndertime.ThreeHours
  }
]

export const dummyManagers = [
  {
    label: 'Daisuke Nishide',
    value: 'Daisuke Nishide'
  },
  {
    label: 'Ryan Dupay',
    value: 'Ryan Dupay'
  }
]
