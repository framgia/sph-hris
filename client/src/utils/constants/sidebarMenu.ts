import { Clock, FileText, Filter, Home, Layers, Layout, Sunrise, Users } from 'react-feather'

import MyOvertimeIcon from './../icons/MyOvertimeIcon'

export interface IMenu {
  name: string
  Icon: any
  href: string
  isMenu?: boolean
  spacing?: boolean
  submenu?: boolean
  submenuItems?: ISubMenu
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
    isMenu: true
  },
  {
    name: 'My Leaves',
    Icon: FileText,
    href: '/my-leaves'
  },
  {
    name: 'My Daily Time Record',
    Icon: Clock,
    href: '/my-daily-time-record'
  },
  {
    name: 'My Overtime',
    href: '/my-overtime',
    Icon: MyOvertimeIcon
  },
  {
    name: 'My Forms',
    Icon: Layout,
    href: '/my-forms',
    spacing: true,
    isMenu: true
  },
  {
    name: 'Schedule Management',
    Icon: Sunrise,
    href: '/schedule-management'
  },
  {
    name: 'Employee Management',
    Icon: Users,
    href: '/employee-management'
  },
  {
    name: 'Leave Management',
    Icon: FileText,
    href: '/leave-management',
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
    href: '/dtr-management'
  },
  {
    name: 'Overtime Management',
    Icon: Layers,
    href: '/overtime-management'
  }
]
