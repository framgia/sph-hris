import * as Icons from 'react-feather'

export type IconName = keyof typeof Icons

export interface ISidebarLink {
  name: string
  href: string
  Icon: IconName | any
}

export interface IDTRManagement {
  id: number
  name: string
  time_in: string
  time_out: string
  start_time: string
  end_time: string
  work_hours: number
  late: number
  undertime: number
  overtime: number
  status: string
}

export interface IMyDTR {
  id: number
  date: string
  time_in: string
  time_out: string
  start_time: string
  end_time: string
  work_hours: number
  late: number
  undertime: number
  overtime: number
  status: string
}
