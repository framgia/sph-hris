import classNames from 'classnames'
import { Menu } from '@headlessui/react'
import React, { FC, ReactNode } from 'react'

import MenuTransition from './../MenuTransition'
import FilterIcon from '~/utils/icons/FilterIcon'
import useScreenCondition from '~/hooks/useScreenCondition'

type Props = {
  btnStyle?: string
  Icon?: any
  btnText?: string
  children: ReactNode
  menuItemsStyle?: string
  hideText?: boolean | undefined
}

const FilterDropdownTemplate: FC<Props> = (props): JSX.Element => {
  const { btnStyle, children, btnText, Icon, menuItemsStyle, hideText, ...rest } = props

  // SCREEN SIZE CONDITION HOOKS
  const isMediumScreen = useScreenCondition('(max-width: 768px)')

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button
            {...rest}
            className={classNames(
              'flex items-center space-x-2 rounded border border-slate-200 bg-transparent bg-white',
              'px-3 py-1 text-slate-500 shadow-sm outline-none hover:text-slate-600 active:scale-95',
              'shadow-slate-200 transition duration-150 ease-in-out hover:bg-white',
              open ? '!bg-white shadow-md' : '',
              btnStyle
            )}
          >
            <Icon className="h-4 w-4 fill-current" />
            {hideText === false && <>{!isMediumScreen ? <span>{btnText}</span> : null}</>}
          </Menu.Button>
          <MenuTransition>
            <Menu.Items
              static
              className={classNames('absolute right-0 top-8 outline-none', menuItemsStyle)}
            >
              {children}
            </Menu.Items>
          </MenuTransition>
        </>
      )}
    </Menu>
  )
}

FilterDropdownTemplate.defaultProps = {
  btnText: 'Filters',
  Icon: FilterIcon,
  hideText: false
}

export default FilterDropdownTemplate
