import { Clock, FileText, Home, Layers, Sunrise, Users } from 'react-feather'

import { ISidebarLink } from './../interfaces'
import MyOvertimeIcon from './../icons/MyOvertimeIcon'

export const sidebarLinks = {
  my_nav: [
    {
      name: 'Home',
      Icon: Home,
      href: '/'
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
    }
  ] as ISidebarLink[],
  management: [
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
      href: '/leave-management'
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
  ] as ISidebarLink[]
}
