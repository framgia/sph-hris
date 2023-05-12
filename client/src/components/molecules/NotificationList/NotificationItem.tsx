import moment from 'moment'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { Eye } from 'react-feather'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { Table } from '@tanstack/react-table'

import Avatar from '~/components/atoms/Avatar'
import useUserQuery from '~/hooks/useUserQuery'
import ViewDetailsModal from './ViewDetailsModal'
import { INotification } from '~/utils/interfaces'
import Button from '~/components/atoms/Buttons/Button'
import handleImageError from '~/utils/handleImageError'
import useNotification from '~/hooks/useNotificationQuery'
import { switchMessage } from '~/utils/notificationHelpers'
import { NOTIFICATION_TYPE } from '~/utils/constants/notificationTypes'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
import useNotificationMutation from '~/hooks/useNotificationMutation'
import { User } from '~/utils/types/userTypes'

type Props = {
  table: Table<INotification>
  isLoading: boolean
}

const NotificationItem: FC<Props> = ({ table, isLoading }): JSX.Element => {
  const router = useRouter()
  const id = Number(router.query.id)

  const { handleNotificationMutation } = useNotificationMutation()
  const notificationMutations = handleNotificationMutation()

  const { handleUserQuery } = useUserQuery()
  const { data } = handleUserQuery()
  const { getUserNotificationsQuery } = useNotification()
  const { refetch } = getUserNotificationsQuery(data?.userById.id as number)

  useEffect(() => {
    if (router.query.id !== undefined) {
      void table.options.data.forEach((row, index) => {
        if (row.id === Number(router.query.id)) {
          void table.setPageIndex(~~(index / 10))
        }
      })
    }
  }, [id])

  const handleViewDetails = (row: INotification): void => {
    void router.push(`/notifications/?id=${row.id}`)
  }

  const handleLink = (row: INotification): void => {
    void notificationMutations.mutate(
      { id: row.id },
      {
        // eslint-disable-next-line @typescript-eslint/promise-function-async
        onSuccess: () => {
          if (!row.isRead || row.readAt == null) {
            void refetch()
          }
        }
      }
    )
  }

  const variants = {
    initial: { opacity: 0, y: -5 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 5, transition: { duration: 0.2 } }
  }

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col px-4 py-3">
          {Array.from({ length: 30 }, (_, i) => (
            <LineSkeleton key={i} className="py-1" />
          ))}
        </div>
      ) : (
        <>
          {table.getPageCount() === 0 ? (
            <div className="h-[50vh]">
              <Message message="No Notification Available" />
            </div>
          ) : (
            <>
              {table.getRowModel().rows.map((row) => {
                const isActive = !row.original.isRead || row.original.readAt == null
                return (
                  <motion.div
                    key={row.original.id}
                    className="my-2 px-4"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants}
                  >
                    <div
                      className={classNames(
                        'group rounded-md border border-slate-200',
                        'py-2.5 px-3 shadow-slate-200 hover:shadow',
                        'transition duration-75 ease-in-out ',
                        isActive || row.original.id === id
                          ? 'border-l-4 border-l-amber-300 bg-white'
                          : 'bg-transparent pl-4',
                        row.original.id === id ? 'bg-amber-50' : ''
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex w-full items-start space-x-2 md:items-center">
                          <Avatar
                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
                              handleImageError(e, '/images/default.png')
                            }
                            src={`${row.original.userAvatarLink}`}
                            size="md"
                            rounded="full"
                          />
                          <div
                            className={classNames(
                              'flex flex-col space-y-0.5',
                              isActive ? 'text-slate-700' : 'text-slate-500'
                            )}
                          >
                            <p className="flex flex-wrap items-center space-x-2">
                              <span className="font-semibold">{row.original.name}</span>
                              <span>{switchMessage(row.original.specificType)}</span>
                              <span className="font-semibold">
                                {row.original.type.split('_')[0]}
                              </span>
                            </p>
                            <p>
                              <span className={`font-medium ${isActive ? 'text-amber-500' : ''}`}>
                                {row.original.type.split('_')[0].toLowerCase() ===
                                NOTIFICATION_TYPE.OVERTIME ? (
                                  <>
                                    {moment(row.original.createdAt).fromNow()} &bull;{' '}
                                    {row.original.date} -{' '}
                                    <span className="font-medium">
                                      {row.original.duration}{' '}
                                      {row.original.type.split('_')[0].toLowerCase() ===
                                      NOTIFICATION_TYPE.OVERTIME
                                        ? 'Mins'
                                        : 'Hrs'}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    {moment(row.original.createdAt).fromNow()} &bull;{' '}
                                    {row.original.date}{' '}
                                  </>
                                )}
                              </span>
                            </p>
                          </div>
                        </div>
                        <Tippy content="View Details" placement="left" className="!text-xs">
                          <Button
                            type="button"
                            className="text-slate-400 group-hover:text-slate-500"
                            onClick={() => {
                              handleLink(row.original)
                              handleViewDetails(row.original)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Tippy>

                        {/* This will handle view details */}
                        <ViewDetailsModal
                          {...{
                            isOpen: row.original.id === id,
                            row: row.original,
                            user: data?.userById as User
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </>
          )}
        </>
      )}
    </>
  )
}

const Message = ({
  message,
  type = 'default'
}: {
  message: string
  type?: string
}): JSX.Element => {
  return (
    <p
      className={classNames(
        'py-2 text-center font-medium',
        type === 'default' && 'text-slate-500',
        type === 'error' && 'bg-rose-50 text-rose-500'
      )}
    >
      {message}
    </p>
  )
}

export default NotificationItem
