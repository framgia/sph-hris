import React, { FC } from 'react'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { Menu } from 'react-feather'
import { useRouter } from 'next/router'

import Text from '~/components/atoms/Text'
import Avatar from '~/components/atoms/Avatar'
import BreakIcon from '~/utils/icons/BreakIcon'
import { sidebarLinks } from '~/utils/constants'
import ClockInIcon from '~/utils/icons/ClockInIcon'
import ClockOutIcon from '~/utils/icons/ClockOutIcon'
import Button from '~/components/atoms/Buttons/Button'
import UserMenuDropDown from '~/components/molecules/UserMenuDropdown'
import NotificationPopover from '~/components/molecules/NotificationPopOver'

const Tooltip = dynamic(() => import('rc-tooltip'), { ssr: false })

type Props = {
  actions: {
    handleToggleDrawer: () => void
    handleToggleSidebar: () => void
  }
}

const Header: FC<Props> = (props): JSX.Element => {
  const {
    actions: { handleToggleSidebar, handleToggleDrawer }
  } = props

  const router = useRouter()

  return (
    <header
      className={classNames(
        'flex w-full items-center justify-between border-b',
        'border-slate-200 bg-white py-3 px-3 md:px-4'
      )}
    >
      {/* Hamber & Title */}
      <section className="flex items-center md:space-x-3">
        {/* Hamburger Menu */}
        <div className="hidden md:flex">
          <Button type="button" onClick={handleToggleSidebar}>
            <Menu className="h-5 w-5 text-slate-600" />
          </Button>
        </div>
        <div className="flex md:hidden">
          <Button type="button" onClick={handleToggleDrawer}>
            <Menu className="h-5 w-5 text-slate-600" />
          </Button>
        </div>
        {/* Header Title */}
        <h1 className="hidden text-lg font-semibold text-slate-700 md:block">
          {sidebarLinks?.my_nav.map((my) => my.href === router.asPath && my.name)}
          {sidebarLinks?.management.map((my) => my.href === router.asPath && my.name)}
        </h1>
      </section>

      {/* User Actions */}
      <section className="flex items-center space-x-10">
        <div className="flex items-center space-x-2">
          {/* Timer */}
          <Text theme="base" color="slate">
            00:00:00
          </Text>
          {/* Clock In Button */}
          <Tooltip
            placement="bottom"
            overlay="Clock In"
            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
          >
            <Button>
              <ClockInIcon className="h-7 w-7 fill-current" />
            </Button>
          </Tooltip>
          {/* Break Button */}
          <Tooltip
            placement="bottom"
            overlay="Break Time"
            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
          >
            <Button>
              <BreakIcon className="h-7 w-7 fill-current" />
            </Button>
          </Tooltip>
          {/* Clock Out Button */}
          <Tooltip
            placement="bottom"
            overlay="Clock Out"
            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
          >
            <Button>
              <ClockOutIcon className="h-7 w-7 fill-current" />
            </Button>
          </Tooltip>
        </div>
        <div className="hidden text-slate-500 sm:block">
          <div className="inline-flex items-center space-x-4">
            <NotificationPopover className="h-5 w-5 text-slate-400" />
            {/* User Avatar */}
            <UserMenuDropDown position="bottom">
              <Avatar
                src="https://avatars.githubusercontent.com/u/38458781?v=4"
                alt="user-avatar"
                size="md"
                rounded="full"
              />
            </UserMenuDropDown>
          </div>
        </div>
      </section>
    </header>
  )
}

export default Header
