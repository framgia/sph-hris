import moment from 'moment'
import { NextPage } from 'next'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { PulseLoader } from 'react-spinners'
import React, { useEffect, useState } from 'react'

import useUserQuery from '~/hooks/useUserQuery'
import FilterIcon from '~/utils/icons/FilterIcon'
import Layout from '~/components/templates/Layout'
import { INotification } from '~/utils/interfaces'
import FadeInOut from '~/components/templates/FadeInOut'
import { getDuration } from '~/utils/notificationHelpers'
import useNotification from '~/hooks/useNotificationQuery'
import { NotificationData } from '~/utils/types/notificationTypes'
import NotificationList from '~/components/molecules/NotificationList'
import { columns } from '~/components/molecules/NotificationList/columns'
import GlobalSearchFilter from '~/components/molecules/GlobalSearchFilter'
import { STATUS_OPTIONS, TYPE_OPTIONS } from '~/utils/constants/notificationFilter'
import NotificationFilterDropdown from '~/components/molecules/NotificationFilterDropdown'

export type Filters = {
  type: string
  status: string
}

export type QueryVariablesType = {
  type: string
  status: string
}

const Notifications: NextPage = (): JSX.Element => {
  const { getUserNotificationsQuery } = useNotification()
  const { handleUserQuery } = useUserQuery()

  const router = useRouter()
  const { query } = router

  const { data: user } = handleUserQuery()
  const { data: notificationsData, isLoading: notificationLoading } = getUserNotificationsQuery(
    user?.userById.id as number
  )

  const [notifications, setNotifications] = useState<INotification[]>([])
  const [filteredNotifications, setFilteredNotifications] = useState<INotification[]>([])
  const [loading, setLoading] = useState(true)
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [filters, setFilters] = useState({
    type: TYPE_OPTIONS.ALL.toLowerCase(),
    status: STATUS_OPTIONS.ALL.toLowerCase()
  })

  useEffect(() => {
    if (notificationsData != null && !notificationLoading) {
      const mappedNotifications = notificationsData.notificationByRecipientId.map((notif) => {
        const parsedData: NotificationData = JSON.parse(notif.data)
        const mapped: INotification = {
          id: notif.id,
          name: parsedData.User.Name,
          project: parsedData?.Projects?.join(', '),
          type: notif.type.charAt(0).toUpperCase() + notif.type.slice(1),
          specificType: parsedData.Type,
          date: moment(parsedData.DateRequested).format('MMMM D, YYYY'),
          remarks: parsedData.Remarks,
          duration: getDuration(parsedData, notif.type),
          dateFiled: parsedData.DateFiled,
          status: parsedData.Status,
          isRead: notif.isRead,
          readAt: notif.readAt,
          requestedTimeIn: moment(parsedData.RequestedTimeIn, 'HH:mm:ss').format('hh:mm A'),
          requestedTimeOut: moment(parsedData.RequestedTimeOut, 'HH:mm:ss').format('hh:mm A'),
          description: parsedData.Description,
          userAvatarLink: parsedData.User.AvatarLink,
          createdAt: notif.createdAt,
          offsets: parsedData.Offsets,
          managerRemarks: parsedData.ManagerRemarks,
          startDate: parsedData.StartDate,
          endDate: parsedData.EndDate
        }
        return mapped
      })
      setNotifications(mappedNotifications)
      setFilteredNotifications(mappedNotifications)
      if (query.status !== undefined && query.type !== undefined)
        setFilters(query as QueryVariablesType)
    }
  }, [notificationsData])

  useEffect(() => {
    if (router.isReady) {
      if (query.status !== undefined && query.type !== undefined) {
        setFilters(query as QueryVariablesType)
        startFilter()
      }
      if (
        router.asPath === '/notifications' ||
        router.asPath === `/notifications?id=${router.query.id as string}`
      )
        setLoading(false)
    }
  }, [router, notifications])

  const startFilter = (): void => {
    if (notifications !== undefined) {
      const filtered = notifications.filter(
        (x) =>
          (x.status.toLowerCase() === (query.status as string).toLowerCase() ||
            (query.status as string) === STATUS_OPTIONS.ALL.toLowerCase()) &&
          (x.type.toLowerCase() === (query.type as string).toLowerCase() ||
            x.type.toLowerCase() === (query.type as string).toLowerCase() + '_resolved' ||
            (query.type as string) === TYPE_OPTIONS.ALL.toLowerCase())
      )

      setFilteredNotifications(filtered)
      setLoading(false)
    }
  }

  const handleURLParameterChange = (): void => {
    void router.replace({
      pathname: '/notifications',
      query: {
        status: filters.status,
        type: filters.type
      }
    })
  }

  return (
    <Layout metaTitle="Notifications">
      <FadeInOut className="default-scrollbar relative h-full min-h-full overflow-auto text-xs text-slate-800">
        <div className="sticky top-0 z-20 mx-auto block w-full max-w-4xl border-b border-slate-200 bg-slate-100 md:hidden">
          <div className="flex items-center space-x-2 px-4 py-2">
            <h1 className="text-base font-semibold text-slate-700">Notifications</h1>
          </div>
        </div>
        <header
          className={classNames(
            'sticky top-[41px] left-0 z-20 flex items-center justify-between md:top-1',
            'mx-auto w-full max-w-4xl bg-slate-100 px-4 py-2'
          )}
        >
          <GlobalSearchFilter
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search"
          />
          <div className="flex items-center space-x-2 text-slate-500">
            <NotificationFilterDropdown
              className={classNames(
                'flex items-center space-x-2 rounded border border-slate-200 bg-transparent bg-white',
                'px-3 py-1 shadow-sm outline-none hover:text-slate-600 active:scale-95'
              )}
              filters={filters}
              setFilters={setFilters}
              startFilter={handleURLParameterChange}
            >
              <FilterIcon className="h-4 w-4 fill-current" />
              <span>Filters</span>
            </NotificationFilterDropdown>
          </div>
        </header>
        {!loading && !notificationLoading && notificationsData !== undefined ? (
          <NotificationList
            {...{
              query: {
                data: filteredNotifications
              },
              table: {
                columns,
                globalFilter,
                setGlobalFilter
              }
            }}
          />
        ) : (
          <div className="flex min-h-[50vh] items-center justify-center">
            <PulseLoader color="#ffb40b" size={10} />
          </div>
        )}
      </FadeInOut>
    </Layout>
  )
}

export default Notifications
