import {
  Form,
  Timer,
  Sleep,
  Credit,
  AddUser,
  ListOne,
  Calendar,
  Schedule,
  ViewList,
  FileStaff,
  EveryUser,
  CodeLaptop,
  SendToBack,
  ListSuccess,
  MindmapList,
  FileDateOne,
  FileStaffOne,
  FileEditingOne,
  MedicationTime,
  ChartProportion,
  CalendarThirtyTwo
} from '@icon-park/react'

import { Roles } from './roles'

export interface IMenu {
  name: string
  Icon: any
  href: string
  isMenu?: boolean
  spacing?: boolean
  submenu?: boolean
  submenuItems?: ISubMenu
  role: string[]
}

export type ISubMenu = Array<{
  name: string
  Icon: any
  href: string
}>

export const Menus: IMenu[] = [
  {
    name: 'Dashboard',
    Icon: ChartProportion,
    href: '/',
    role: [Roles.EMPLOYEE, Roles.HR_ADMIN, Roles.MANAGER]
  },
  {
    name: 'My Leaves',
    Icon: FileStaff,
    href: '/my-leaves',
    role: [Roles.EMPLOYEE, Roles.HR_ADMIN, Roles.MANAGER]
  },
  {
    name: 'My Daily Time Record',
    Icon: Timer,
    href: '/my-daily-time-record',
    role: [Roles.EMPLOYEE, Roles.HR_ADMIN, Roles.MANAGER]
  },
  {
    name: 'My Overtime',
    href: '/my-overtime',
    Icon: Sleep,
    role: [Roles.EMPLOYEE, Roles.HR_ADMIN, Roles.MANAGER]
  },
  {
    name: 'My Schedule',
    Icon: Schedule,
    href: '/my-schedule',
    role: [Roles.EMPLOYEE, Roles.HR_ADMIN, Roles.MANAGER],
    submenu: true,
    submenuItems: [
      {
        name: 'Current Schedule',
        Icon: CalendarThirtyTwo,
        href: '/my-schedule/current-schedule'
      },
      {
        name: 'Request New Schedule',
        Icon: SendToBack,
        href: '/my-schedule/request-new-schedule'
      },
      {
        name: 'Filed Schedules',
        Icon: ViewList,
        href: '/my-schedule/filed-schedules'
      }
    ]
  },
  {
    name: 'My Forms',
    Icon: Form,
    href: '/my-forms',
    role: [Roles.EMPLOYEE, Roles.HR_ADMIN, Roles.MANAGER],
    submenu: true,
    spacing: true,
    submenuItems: [
      {
        name: 'First Day Onboarding',
        Icon: FileStaffOne,
        href: '/my-forms/first-day-onboarding'
      },
      {
        name: 'Personal Information',
        Icon: AddUser,
        href: '/my-forms/personal-information'
      },
      {
        name: 'ATM Applications',
        Icon: Credit,
        href: '/my-forms/atm-applications'
      },
      {
        name: 'Laptop Monitoring',
        Icon: CodeLaptop,
        href: '/my-forms/laptop-monitoring'
      }
    ]
  },
  {
    name: 'Schedule Management',
    Icon: Calendar,
    href: '/schedule-management',
    role: [Roles.HR_ADMIN]
  },
  {
    name: 'Employee Management',
    Icon: EveryUser,
    href: '/employee-management',
    role: [Roles.HR_ADMIN]
  },
  {
    name: 'Leave Management',
    Icon: FileEditingOne,
    href: '/leave-management',
    role: [Roles.HR_ADMIN],
    submenu: true,
    submenuItems: [
      {
        name: 'List of Leave',
        Icon: ListOne,
        href: '/leave-management/list-of-leave'
      },
      {
        name: 'Leave Summary',
        Icon: ListSuccess,
        href: '/leave-management/leave-summary'
      },
      {
        name: 'Yearly Summary',
        Icon: MindmapList,
        href: '/leave-management/yearly-summary'
      }
    ]
  },
  {
    name: 'DTR Management',
    Icon: MedicationTime,
    href: '/dtr-management',
    role: [Roles.HR_ADMIN]
  },
  {
    name: 'Overtime Management',
    Icon: FileDateOne,
    href: '/overtime-management',
    role: [Roles.HR_ADMIN, Roles.MANAGER]
  }
]

export const productionMenu: IMenu[] = [
  {
    name: 'My Leaves',
    Icon: FileStaff,
    href: '/my-leaves',
    role: [Roles.EMPLOYEE, Roles.HR_ADMIN, Roles.MANAGER]
  },
  {
    name: 'My Daily Time Record',
    Icon: Timer,
    href: '/my-daily-time-record',
    role: [Roles.EMPLOYEE, Roles.HR_ADMIN, Roles.MANAGER]
  },
  {
    name: 'My Overtime',
    href: '/my-overtime',
    Icon: Sleep,
    role: [Roles.EMPLOYEE, Roles.HR_ADMIN, Roles.MANAGER]
  },
  {
    name: 'My Schedule',
    Icon: Schedule,
    href: '/my-schedule',
    role: [Roles.EMPLOYEE, Roles.HR_ADMIN, Roles.MANAGER],
    spacing: true,
    submenu: true,
    submenuItems: [
      {
        name: 'Current Schedule',
        Icon: CalendarThirtyTwo,
        href: '/my-schedule/current-schedule'
      },
      {
        name: 'Request New Schedule',
        Icon: SendToBack,
        href: '/my-schedule/request-new-schedule'
      },
      {
        name: 'Filed Schedules',
        Icon: ViewList,
        href: '/my-schedule/filed-schedules'
      }
    ]
  },
  {
    name: 'Schedule Management',
    Icon: Calendar,
    href: '/schedule-management',
    role: [Roles.HR_ADMIN]
  },
  {
    name: 'Employee Management',
    Icon: EveryUser,
    href: '/employee-management',
    role: [Roles.HR_ADMIN]
  },
  {
    name: 'Leave Management',
    Icon: FileEditingOne,
    href: '/leave-management',
    role: [Roles.HR_ADMIN],
    submenu: true,
    submenuItems: [
      {
        name: 'List of Leave',
        Icon: ListOne,
        href: '/leave-management/list-of-leave'
      },
      {
        name: 'Leave Summary',
        Icon: ListSuccess,
        href: '/leave-management/leave-summary'
      },
      {
        name: 'Yearly Summary',
        Icon: MindmapList,
        href: '/leave-management/yearly-summary'
      }
    ]
  },
  {
    name: 'DTR Management',
    Icon: MedicationTime,
    href: '/dtr-management',
    role: [Roles.HR_ADMIN]
  },
  {
    name: 'Overtime Management',
    Icon: FileDateOne,
    href: '/overtime-management',
    role: [Roles.HR_ADMIN, Roles.MANAGER]
  }
]
