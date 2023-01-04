import * as Icons from 'react-feather'

export type IconName = keyof typeof Icons

export interface ISidebarLink {
  name: string
  href: string
  Icon: IconName | any
}
