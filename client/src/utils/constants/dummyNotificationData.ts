import { INotification } from '../interfaces'

export const dummyNotificationData: INotification[] = [
  {
    id: 1,
    name: 'Joshua Galit',
    project: '5Kwek',
    type: 'Overtime',
    date: 'December 3, 2023',
    remarks: 'I need to work harder',
    duration: 5,
    dateFiled: 'December 3, 2023',
    status: 'Approved',
    specificType: 'request',
    isRead: false,
    userAvatarLink: 'null'
  },
  {
    id: 2,
    name: 'Joshua G.',
    project: '5Kwek',
    type: 'Overtime',
    date: 'December 3, 2023',
    remarks: 'I need to work harder',
    duration: 5,
    dateFiled: 'December 3, 2023',
    status: 'Pending',
    specificType: 'approve',
    isRead: false,
    userAvatarLink: 'null'
  },
  {
    id: 3,
    name: 'Jane Doe',
    project: '5Kwek',
    type: 'Undertime',
    date: 'December 3, 2023',
    remarks: 'I need to sleep harder',
    duration: 5,
    dateFiled: 'December 3, 2023',
    status: 'Pending',
    specificType: 'request',
    isRead: true,
    userAvatarLink: 'null'
  },
  {
    id: 4,
    name: 'John Doe',
    project: '5Kwek',
    type: 'Undertime',
    date: 'December 3, 2023',
    remarks: 'I need to sleep harder',
    duration: 5,
    dateFiled: 'December 3, 2023',
    status: 'Pending',
    specificType: 'disapprove',
    isRead: true,
    userAvatarLink: 'null'
  },
  {
    id: 5,
    name: 'Bart Doe',
    project: '5Kwek',
    type: 'Leave',
    date: 'December 3, 2023',
    remarks: 'I need to sleep harder',
    duration: 5,
    dateFiled: 'December 3, 2023',
    status: 'Pending',
    specificType: 'request',
    isRead: false,
    userAvatarLink: 'null'
  },
  {
    id: 6,
    name: 'Kurt Doe',
    project: '5Kwek',
    type: 'Leave',
    date: 'December 3, 2023',
    remarks: 'I need to sleep harder',
    duration: 5,
    dateFiled: 'December 3, 2023',
    status: 'Pending',
    specificType: 'true',
    isRead: false,
    userAvatarLink: 'null'
  }
]
