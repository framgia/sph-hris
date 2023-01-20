import React, { FC, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { Menu } from 'react-feather'
import { useRouter } from 'next/router'
import moment from 'moment'
import { parse } from 'iso8601-duration'

import Text from '~/components/atoms/Text'
import Avatar from '~/components/atoms/Avatar'
import BreakIcon from '~/utils/icons/BreakIcon'
import useUserQuery from '~/hooks/useUserQuery'
import { sidebarLinks } from '~/utils/constants'
import ClockInIcon from '~/utils/icons/ClockInIcon'
import ClockOutIcon from '~/utils/icons/ClockOutIcon'
import Button from '~/components/atoms/Buttons/Button'
import LegendTooltip from '~/components/molecules/LegendTooltip'
import UserMenuDropDown from '~/components/molecules/UserMenuDropdown'
import NotificationPopover from '~/components/molecules/NotificationPopOver'

const Tooltip = dynamic(async () => await import('rc-tooltip'), { ssr: false })

type Props = {
  actions: {
    handleToggleDrawer: () => void
    handleToggleSidebar: () => void
    handleToggleTimeInDrawer: () => void
    handleToggleTimeOutDrawer: () => void
    handleToggleWorkInterruptionDrawer: () => void
  }
}

const Header: FC<Props> = (props): JSX.Element => {
  const {
    actions: {
      handleToggleSidebar,
      handleToggleDrawer,
      handleToggleTimeInDrawer,
      handleToggleWorkInterruptionDrawer,
      handleToggleTimeOutDrawer
    }
  } = props

  const { handleUserQuery } = useUserQuery()
  const { data, status } = handleUserQuery()

  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    setRunning(false)
    setTime(0)
    if (
      status === 'success' &&
      data.userById?.timeEntry?.timeIn !== null &&
      data.userById?.timeEntry?.timeOut === null
    ) {
      setRunning(true)
      const now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      setSeconds(0)
      if (data.userById.timeEntry.timeIn !== null) {
        const timeObj = parse(data?.userById.timeEntry.timeIn?.timeHour)
        const then = `${moment(new Date(data?.userById.timeEntry.date)).format('YYYY-MM-DD')} ${
          timeObj.hours as number
        }:${timeObj.minutes as number}:${timeObj.seconds as number}`
        const temp = moment
          .utc(moment(new Date(now)).diff(moment(new Date(then))))
          .format('HH:mm:ss')
        setSeconds(moment.duration(temp).asSeconds())
      }
    }
  }, [status, data])
  const [time, setTime] = useState<string | number>(() => {
    return '0 UTC'
  })
  const [running, setRunning] = useState(false)
  useEffect(() => {
    setTime(seconds)
  }, [seconds])

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime as number) + 1)
      }, 1000)
    } else if (!running) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [running])

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
        <div className="hidden md:block">
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-semibold text-slate-700">
              {sidebarLinks?.my_nav.map((my) => my.href === router.asPath && my.name)}
              {sidebarLinks?.management.map((my) => my.href === router.asPath && my.name)}
            </h1>
            {router.pathname === '/dtr-management' && <LegendTooltip />}
          </div>
        </div>
      </section>

      {/* User Actions */}
      <section className="flex items-center space-x-10">
        <div className="flex items-center space-x-2">
          {/* Timer */}
          <Text
            className={`${time.toString().includes('UTC') ? 'invisible' : 'visible'}`}
            theme="base"
            color="slate"
          >
            <span>{`0${Math.floor((time as number) / (60 * 60))}`.slice(-2)}:</span>
            <span>{`0${Math.floor(((time as number) % (60 * 60)) / 60)}`.slice(-2)}:</span>
            <span>{`0${(time as number) % 60}`.slice(-2)}</span>
          </Text>
          {/* Clock In Button */}
          <Tooltip
            placement="bottom"
            overlay="Clock In"
            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
          >
            <Button
              disabled={
                data?.userById.timeEntry?.timeIn !== null ||
                data.userById.employeeSchedule.workingDayTimes.length < 1
              }
              className="disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
              onClick={handleToggleTimeInDrawer}
            >
              <ClockInIcon className="h-7 w-7 fill-current" />
            </Button>
          </Tooltip>
          {/* Break Button */}
          <Tooltip
            placement="bottom"
            overlay="Break Time"
            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
          >
            <Button
              disabled={
                data?.userById.timeEntry?.timeIn === null ||
                data?.userById?.timeEntry?.timeOut !== null
              }
              className="disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
              onClick={handleToggleWorkInterruptionDrawer}
            >
              <BreakIcon className="h-7 w-7 fill-current" />
            </Button>
          </Tooltip>
          {/* Clock Out Button */}
          <Tooltip
            placement="bottom"
            overlay="Clock Out"
            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
          >
            <Button
              disabled={
                data?.userById?.timeEntry?.timeIn === null ||
                (data?.userById?.timeEntry?.timeIn !== null &&
                  data?.userById?.timeEntry?.timeOut !== null)
              }
              className="disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
              onClick={handleToggleTimeOutDrawer}
            >
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
