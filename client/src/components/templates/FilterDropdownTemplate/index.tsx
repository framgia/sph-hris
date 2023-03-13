import classNames from 'classnames'
import { Menu } from '@headlessui/react'
import React, { FC, ReactNode } from 'react'

import Card from '~/components/atoms/Card'
import MenuTransition from './../MenuTransition'
import FilterIcon from '~/utils/icons/FilterIcon'

type Props = {
  btnStyle?: string
  Icon?: any
  btnText?: string
  cardClassName?: string
  children: ReactNode
  className?: string
}

const FilterDropdownTemplate: FC<Props> = (props): JSX.Element => {
  const { btnStyle, children, btnText, Icon, cardClassName, className, ...rest } = props

  return (
    <Menu as="div" className="relative z-10 flex w-full">
      <Menu.Button
        {...rest}
        className={classNames(
          'flex items-center space-x-2 rounded border border-slate-200 bg-transparent bg-white',
          'px-3 py-1 text-slate-500 shadow-sm outline-none hover:text-slate-600 active:scale-95',
          btnStyle
        )}
      >
        <Icon className="h-4 w-4 fill-current" />
        <span className="hidden sm:block">{btnText}</span>
      </Menu.Button>
      <MenuTransition>
        <Menu.Items
          static
          className={classNames(
            'fixed right-4 top-[94px] flex w-80 flex-col outline-none md:top-[97px]',
            className
          )}
        >
          <Card shadow-size="xl" rounded="md" className={cardClassName}>
            {children}
          </Card>
        </Menu.Items>
      </MenuTransition>
    </Menu>
  )
}

FilterDropdownTemplate.defaultProps = {
  btnText: 'Filters',
  Icon: FilterIcon,
  cardClassName: 'overflow-hidden'
}

export default FilterDropdownTemplate
