import moment from 'moment'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { Menu } from 'react-feather'
import { useRouter } from 'next/router'
import { parse } from 'iso8601-duration'
import React, { FC, useEffect, useState } from 'react'

import Text from '~/components/atoms/Text'
import Avatar from '~/components/atoms/Avatar'
import BreakIcon from '~/utils/icons/BreakIcon'
import useUserQuery from '~/hooks/useUserQuery'
import ClockInIcon from '~/utils/icons/ClockInIcon'
import ClockOutIcon from '~/utils/icons/ClockOutIcon'
import Button from '~/components/atoms/Buttons/Button'
import LegendTooltip from '~/components/molecules/LegendTooltip'
import UserMenuDropDown from '~/components/molecules/UserMenuDropdown'
import NotificationPopover from '~/components/molecules/NotificationPopOver'
import { Menus } from '~/utils/constants/sidebarMenu'

const Tooltip = dynamic(async () => await import('rc-tooltip'), { ssr: false })

type Props = {
  actions: {
    handleToggleDrawer: () => void
    handleToggleSidebar: () => void
    handleToggleTimeInDrawer: () => void
    handleToggleTimeOutDrawer: (workedHours: string) => void
    handleToggleWorkInterruptionDrawer: () => void
  }
}

const Header: FC<Props> = (props): JSX.Element => {
  const router = useRouter()

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
        const temp = moment.utc(moment(new Date(now)).diff(moment(new Date(then))))
        setSeconds(moment.duration(temp as moment.DurationInputArg1).asSeconds())
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

  const onToggleTimeOutDrawerClick = (): void => {
    const hours = `0${Math.floor((time as number) / (60 * 60))}`.slice(-2)
    const min = `0${Math.floor(((time as number) % (60 * 60)) / 60)}`.slice(-2)
    const sec = `0${(time as number) % 60}`.slice(-2)
    handleToggleTimeOutDrawer(`${hours}:${min}:${sec}`)
  }

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
              <>
                {router.pathname === '/' ? 'Home' : ''}
                {Menus.map((item, index) => (
                  <div key={index}>
                    {router.pathname === item.href && router.pathname !== '/' && item.name}
                    {item?.submenu === true &&
                      item?.submenuItems?.map((sub) =>
                        router.pathname.includes(sub.href) ? sub.name : ''
                      )}
                  </div>
                ))}
              </>
            </h1>
            {router.pathname.includes('/dtr-management') && <LegendTooltip />}
            {router.pathname.includes('/my-daily-time-record') && <LegendTooltip />}
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
              onClick={onToggleTimeOutDrawerClick}
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
