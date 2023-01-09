import classNames from 'classnames'
import { Menu } from '@headlessui/react'
import { LogOut, User } from 'react-feather'
import React, { FC, ReactNode } from 'react'

import MenuTransition from '~/components/templates/MenuTransition'

type Props = {
  position: string
  className?: string
  children: ReactNode
}

const UserMenuDropDown: FC<Props> = (props): JSX.Element => {
  const {
    position = 'right',
    children,
    className = 'shrink-0 outline-none active:scale-95'
  } = props

  const menu = 'relative z-20 flex w-full text-left'
  const menuItems = classNames(
    'absolute flex w-44 flex-col divide-y divide-slate-200 overflow-hidden rounded-md',
    'bg-white py-1 shadow-xl shadow-slate-200 ring-1 ring-black ring-opacity-5 focus:outline-none',
    position === 'bottom' && 'top-10 right-0',
    position === 'right' && 'bottom-0 -right-48 origin-bottom-right',
    position === 'top' && '-top-20 right-8 origin-top'
  )
  const menuItemButton = 'flex items-center space-x-2 px-3 py-2 text-xs hover:text-slate-700'
  const menuItemButtonIcon = 'h-4 w-4 stroke-0.5'

  return (
    <Menu as="div" className={menu}>
      <Menu.Button className={className}>{children}</Menu.Button>
      <MenuTransition>
        <Menu.Items className={menuItems}>
          <Menu.Item>
            <button className={menuItemButton}>
              <User className={menuItemButtonIcon} aria-hidden="true" />
              <span>Your account settings</span>
            </button>
          </Menu.Item>
          <Menu.Item>
            <button className={menuItemButton}>
              <LogOut className={menuItemButtonIcon} aria-hidden="true" />
              <span>Logout</span>
            </button>
          </Menu.Item>
        </Menu.Items>
      </MenuTransition>
    </Menu>
  )
}

export default UserMenuDropDown
