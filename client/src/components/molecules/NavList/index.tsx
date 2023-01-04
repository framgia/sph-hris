import React, { FC } from 'react'

import NavItem from './NavItem'
import { ISidebarLink } from '~/utils/interfaces'

type Props = {
  lists: ISidebarLink[]
  isOpen: boolean
}

const NavList: FC<Props> = ({ lists, isOpen }): JSX.Element => {
  return (
    <>
      {lists?.map((item, i) => (
        <NavItem
          key={i}
          {...{
            isOpen,
            item
          }}
        />
      ))}
    </>
  )
}

export default NavList
