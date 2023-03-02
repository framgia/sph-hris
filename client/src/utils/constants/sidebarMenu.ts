import {
  Home,
  Clock,
  Users,
  Filter,
  Layers,
  Layout,
  Sunrise,
  FileText,
  UserCheck,
  CreditCard
} from 'react-feather'
import { AiOutlineLaptop } from 'react-icons/ai'

import { Roles } from './roles'
import MyOvertimeIcon from './../icons/MyOvertimeIcon'

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
    name: 'Home',
    Icon: Home,
    href: '/',
    role: [Roles.EMPLOYEE, Roles.HR_ADMIN, Roles.MANAGER]
  },
  {
    name: 'My Leaves',
    Icon: FileText,
    href: '/my-leaves',
    role: [Roles.EMPLOYEE, Roles.HR_ADMIN, Roles.MANAGER]
  },
  {
    name: 'My Daily Time Record',
    Icon: Clock,
    href: '/my-daily-time-record',
    role: [Roles.EMPLOYEE, Roles.HR_ADMIN, Roles.MANAGER]
  },
  {
    name: 'My Overtime',
    href: '/my-overtime',
    Icon: MyOvertimeIcon,
    role: [Roles.EMPLOYEE, Roles.HR_ADMIN, Roles.MANAGER]
  },
  {
    name: 'My Forms',
    Icon: Layout,
    href: '/my-forms',
    role: [Roles.EMPLOYEE, Roles.HR_ADMIN, Roles.MANAGER],
    submenu: true,
    spacing: true,
    submenuItems: [
      {
        name: 'First Day Onboarding',
        Icon: FileText,
        href: '/my-forms/first-day-onboarding'
      },
      {
        name: 'Personal Information',
        Icon: UserCheck,
        href: '/my-forms/personal-information'
      },
      {
        name: 'ATM Applications',
        Icon: CreditCard,
        href: '/my-forms/atm-applications'
      },
      {
        name: 'Laptop Monitoring',
        Icon: AiOutlineLaptop,
        href: '/my-forms/laptop-monitoring'
      }
    ]
  },
  {
    name: 'Schedule Management',
    Icon: Sunrise,
    href: '/schedule-management',
    role: [Roles.HR_ADMIN]
  },
  {
    name: 'Employee Management',
    Icon: Users,
    href: '/employee-management',
    role: [Roles.HR_ADMIN]
  },
  {
    name: 'Leave Management',
    Icon: FileText,
    href: '/leave-management',
    role: [Roles.HR_ADMIN],
    submenu: true,
    submenuItems: [
      {
        name: 'List of Leave',
        Icon: FileText,
        href: '/leave-management/list-of-leave'
      },
      {
        name: 'Leave Summary',
        Icon: Filter,
        href: '/leave-management/leave-summary'
      },
      {
        name: 'Yearly Summary',
        Icon: Filter,
        href: '/leave-management/yearly-summary'
      }
    ]
  },
  {
    name: 'DTR Management',
    Icon: Clock,
    href: '/dtr-management',
    role: [Roles.HR_ADMIN]
  },
  {
    name: 'Overtime Management',
    Icon: Layers,
    href: '/overtime-management',
    role: [Roles.HR_ADMIN, Roles.MANAGER]
  }
]
