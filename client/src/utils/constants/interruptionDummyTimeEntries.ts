import { IInterruptionTimeEntry } from '../interfaces'

export const interruptions: IInterruptionTimeEntry[] = [
  {
    id: 1,
    createdAt: 'January 20, 2023',
    timeOut: '13:30',
    timeIn: '16:30',
    workInterruptionTypeId: 1,
    timeEntryId: 1,
    otherReason: '',
    remarks:
      'We are currently experiencing power interruption at our place. I will find a co-working space to continue my tasks. Sorry for the inconvenience it may have caused.'
  },
  {
    id: 2,
    createdAt: 'January 20, 2023',
    timeOut: '17:00',
    timeIn: '17:00',
    workInterruptionTypeId: 1,
    timeEntryId: 1,
    otherReason: '',
    remarks: 'We are currently experiencing power flood interruption'
  },
  {
    id: 3,
    createdAt: 'January 20, 2023',
    timeOut: '17:00',
    timeIn: '117:00',
    workInterruptionTypeId: 1,
    timeEntryId: 1,
    otherReason: '',
    remarks: 'We are currently experiencing super power'
  },
  {
    id: 4,
    createdAt: 'January 20, 2023',
    timeOut: '17:00',
    timeIn: '17:00',
    workInterruptionTypeId: 1,
    timeEntryId: 1,
    otherReason: '',
    remarks: 'We are currently experiencing power kilikili'
  }
]
