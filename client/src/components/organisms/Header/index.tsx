import moment from 'moment'
import dynamic from 'next/dynamic'
import toast from 'react-hot-toast'
import classNames from 'classnames'
import { Menu } from 'react-feather'
import { useRouter } from 'next/router'
import { parse } from 'iso8601-duration'
import { createClient } from 'graphql-ws'
import { useQueryClient } from '@tanstack/react-query'
import React, { FC, useEffect, useMemo, useState } from 'react'

import Text from '~/components/atoms/Text'
import Avatar from '~/components/atoms/Avatar'
import BreakIcon from '~/utils/icons/BreakIcon'
import useUserQuery from '~/hooks/useUserQuery'
import { INotification } from '~/utils/interfaces'
import ClockInIcon from '~/utils/icons/ClockInIcon'
import ClockOutIcon from '~/utils/icons/ClockOutIcon'
import { Menus } from '~/utils/constants/sidebarMenu'
import Button from '~/components/atoms/Buttons/Button'
import { getDuration } from '~/utils/notificationHelpers'
import LegendTooltip from '~/components/molecules/LegendTooltip'
import { NotificationData } from '~/utils/types/notificationTypes'
import UserMenuDropDown from '~/components/molecules/UserMenuDropdown'
import NotificationPopover from '~/components/molecules/NotificationPopOver'
import useNotification, { updateIsRead } from '~/hooks/useNotificationQuery'
import {
  getChangeShiftNotificationSubQuery,
  getLeaveNotificationSubQuery,
  getOvertimeNotificationSubQuery
} from '~/graphql/subscriptions/leaveSubscription'
import { getESLOffsetNotificationSubscription } from '~/graphql/subscriptions/eslOffsetSubscription'
import { getFileOffsetNotificationSubscription } from '~/graphql/subscriptions/fileOffsetSubscription'

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
  const queryClient = useQueryClient()
  const [notifications, setNotifications] = useState<INotification[]>()
  const [newNotificationCount, setNewNotificationCount] = useState(0)

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
  const { getUserNotificationsQuery } = useNotification()
  const {
    data: notificationsData,
    isLoading: notificationLoading,
    refetch
  } = getUserNotificationsQuery(data?.userById.id as number)
  const [seconds, setSeconds] = useState(0)
  const [ready, setReady] = useState(false)
  const [running, setRunning] = useState(false)
  const [time, setTime] = useState<string | number>(() => {
    return '0 UTC'
  })
  updateIsRead(data?.userById.id as number, ready)

  useEffect(() => {
    if (notificationsData != null && !notificationLoading) {
      let count = 0
      const mappedNotifications = notificationsData.notificationByRecipientId.map((notif) => {
        if (!notif.isRead) {
          count++
        }
        const parsedData: NotificationData = JSON.parse(notif.data)
        const mapped: INotification = {
          id: notif.id,
          name: parsedData.User.Name,
          project: parsedData.Projects?.join(', '),
          type: notif.type.charAt(0).toUpperCase() + notif.type.slice(1),
          specificType: parsedData.Type,
          date: moment(parsedData.DateRequested).format('MMMM D, YYYY'),
          remarks: parsedData.Remarks,
          duration: getDuration(parsedData, notif.type),
          dateFiled: parsedData.DateFiled,
          status: parsedData.Status,
          readAt: notif.readAt,
          isRead: notif.isRead,
          requestedTimeIn: moment(parsedData.RequestedTimeIn, 'HH:mm:ss').format('hh:mm A'),
          requestedTimeOut: moment(parsedData.RequestedTimeOut, 'HH:mm:ss').format('hh:mm A'),
          description: parsedData.Description,
          userAvatarLink: parsedData.User.AvatarLink,
          createdAt: notif.createdAt
        }
        return mapped
      })
      setNewNotificationCount(count)
      setNotifications(mappedNotifications)
    }
  }, [notificationsData])

  useEffect(() => {
    setRunning(false)
    setTime(0)
    if (status === 'success') startNotificationService(data.userById.id)
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

  useMemo(() => {
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

  // Notification
  const startNotificationService = (userId: number): void => {
    const clientWebsocket = createClient({
      url: process.env.NEXT_PUBLIC_BACKEND_WEBSOCKET_URL as string
    })

    clientWebsocket.subscribe(
      {
        query: getLeaveNotificationSubQuery(userId)
      },
      {
        next: ({ data }: any) => {
          // TO DO: change implementation when integrating with notification modal
          void queryClient.invalidateQueries({ queryKey: ['GET_ALL_USER_NOTIFICATION'] })
        },
        error: () => toast.error('There was a network error'),
        complete: () => null
      }
    )

    clientWebsocket.subscribe(
      {
        query: getOvertimeNotificationSubQuery(userId)
      },
      {
        next: ({ data }: any) => {
          void queryClient.invalidateQueries({ queryKey: ['GET_ALL_USER_NOTIFICATION'] })
        },
        error: () => null,
        complete: () => null
      }
    )

    clientWebsocket.subscribe(
      {
        query: getChangeShiftNotificationSubQuery(userId)
      },
      {
        next: ({ data }: any) => {
          void queryClient.invalidateQueries({ queryKey: ['GET_ALL_USER_NOTIFICATION'] })
        },
        error: () => null,
        complete: () => null
      }
    )

    clientWebsocket.subscribe(
      {
        query: getESLOffsetNotificationSubscription(userId)
      },
      {
        next: ({ data }: any) => {
          void queryClient.invalidateQueries({ queryKey: ['GET_ALL_USER_NOTIFICATION'] })
        },
        error: () => null,
        complete: () => null
      }
    )

    clientWebsocket.subscribe(
      {
        query: getFileOffsetNotificationSubscription(userId)
      },
      {
        next: ({ data }: any) => {
          void queryClient.invalidateQueries({ queryKey: ['GET_ALL_USER_NOTIFICATION'] })
        },
        error: () => null,
        complete: () => null
      }
    )
  }

  const handleCheckNotifications = (state: boolean): void => {
    setReady(state)
    void refetch()
    setNewNotificationCount(0)
  }

  const NOTIFICATION_LIMIT = 9

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
        {status !== 'loading' ? (
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              <h1 className="font-inter text-lg font-semibold text-slate-700 line-clamp-1">
                <>
                  {router.pathname.includes('/notification') && 'Notifications'}
                  {Menus.map((item, index) => (
                    <div key={index}>
                      {router.pathname === item.href && item.name}
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
        ) : (
          <div className="w-full animate-pulse">
            <div className="h-3 w-32 rounded bg-slate-200/70"></div>
          </div>
        )}
      </section>

      {/* User Actions */}
      <section className="flex items-center space-x-5 md:space-x-10">
        {status !== 'loading' ? (
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
        ) : (
          <div className="inline-flex w-full animate-pulse items-center space-x-2">
            <div className="flex-shrink-0">
              <div className="h-7 w-7 rounded-full bg-gray-100"></div>
            </div>
            <div className="flex-shrink-0">
              <div className="h-7 w-7 rounded-full bg-gray-100"></div>
            </div>
            <div className="flex-shrink-0">
              <div className="h-7 w-7 rounded-full bg-gray-100"></div>
            </div>
          </div>
        )}
        {status !== 'loading' ? (
          <div className="text-slate-500 sm:block">
            <div className="inline-flex items-center space-x-4">
              <div className="relative">
                {newNotificationCount > 0 ? (
                  <>
                    <span
                      className={classNames(
                        'shrink-0 animate-ping rounded-full border border-rose-600 bg-rose-500 !text-[10px] font-semibold text-white',
                        'absolute -right-1 -top-1 z-50 flex h-4 w-4 select-none items-center justify-center ring-4 ring-white',
                        newNotificationCount > 9 ? 'px-2 py-0.5' : ' px-1.5'
                      )}
                    >
                      {newNotificationCount > NOTIFICATION_LIMIT ? '9+' : newNotificationCount}
                    </span>
                    <span
                      className={classNames(
                        'shrink-0 rounded-full border border-rose-600 bg-rose-500 !text-[10px] font-semibold text-white',
                        'absolute -right-1 -top-1 z-50 flex h-4 w-4 select-none items-center justify-center ring-4 ring-white',
                        newNotificationCount > NOTIFICATION_LIMIT ? 'px-2 py-0.5' : ' px-1.5'
                      )}
                    >
                      {newNotificationCount > NOTIFICATION_LIMIT ? '9+' : newNotificationCount}
                    </span>
                  </>
                ) : null}
                <NotificationPopover
                  className="h-5 w-5 text-slate-400"
                  notificationsData={notifications}
                  checkNotification={(state: boolean) => handleCheckNotifications(state)}
                />
              </div>
              {/* User Avatar */}
              <span className="hidden text-slate-500 sm:block">
                <UserMenuDropDown position="bottom">
                  <Avatar
                    src={data?.userById.avatarLink}
                    alt="user-avatar"
                    size="md"
                    rounded="full"
                  />
                </UserMenuDropDown>
              </span>
            </div>
          </div>
        ) : (
          <div className="animate-pulse">
            <div className="flex-shrink-0">
              <div className="h-7 w-7 rounded-full bg-gray-100"></div>
            </div>
          </div>
        )}
      </section>
    </header>
  )
}

export default Header
