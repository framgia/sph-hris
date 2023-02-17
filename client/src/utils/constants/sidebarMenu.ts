import { Clock, FileText, Filter, Home, Layers, Layout, Sunrise, Users } from 'react-feather'

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
    spacing: true,
    isMenu: true
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
