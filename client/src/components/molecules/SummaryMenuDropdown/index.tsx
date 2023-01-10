import classNames from 'classnames'
import { FileText } from 'react-feather'
import { Menu } from '@headlessui/react'
import React, { FC, ReactNode } from 'react'

import MenuTransition from '~/components/templates/MenuTransition'

type Props = {
  className?: string
  children: ReactNode
}

const SummaryMenuDropdown: FC<Props> = (props): JSX.Element => {
  const { children, className = 'shrink-0 outline-none active:scale-95' } = props

  const menuItems = classNames(
    'absolute flex w-44 flex-col divide-y divide-slate-200 overflow-hidden rounded-md',
    'bg-white py-1 shadow-xl shadow-slate-200 ring-1 ring-black ring-opacity-5 focus:outline-none top-8 right-0'
  )

  return (
    <Menu as="div" className="relative z-10 flex w-full text-left">
      <Menu.Button className={className}>{children}</Menu.Button>
      <MenuTransition>
        <Menu.Items className={menuItems}>
          <Menu.Item>
            <button className="relative flex items-center justify-center space-x-2 px-3 py-2 text-xs hover:text-slate-700">
              <FileText className="absolute left-3 h-4 w-4 stroke-0.5" aria-hidden="true" />
              <span>Summary</span>
            </button>
          </Menu.Item>
        </Menu.Items>
      </MenuTransition>
    </Menu>
  )
}

export default SummaryMenuDropdown
