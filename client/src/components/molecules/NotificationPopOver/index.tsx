import moment from 'moment'
import Link from 'next/link'
import React, { FC } from 'react'
import classNames from 'classnames'
import { Bell, Mail } from 'react-feather'
import { Popover } from '@headlessui/react'

import Text from '~/components/atoms/Text'
import Avatar from '~/components/atoms/Avatar'
import { INotification } from '~/utils/interfaces'
import useNotificationMutation from '~/hooks/useNotificationMutation'
import PopoverTransition from '~/components/templates/PopoverTransition'
import { switchMessage } from '~/utils/notificationHelpers'
import { NOTIFICATION_TYPE } from '~/utils/constants/notificationTypes'

type Props = {
  className: string
  notificationsData: INotification[] | undefined
  checkNotification: (open: boolean) => void
}

const NotificationPopover: FC<Props> = (props): JSX.Element => {
  const { notificationsData, checkNotification } = props
  const panel = classNames(
    `${
      notificationsData?.length === 0 ? 'h-24' : ''
    } absolute right-0 mt-2 w-80 origin-top-right divide-y divide-gray-200 overflow-hidden`,
    'rounded-lg border border-slate-200 shadow-xl shadow-slate-300 focus:outline-none bg-white'
  )
  const main =
    'default-scrollbar max-h-[25vh] min-h-[25vh] divide-y divide-slate-200 bg-white scrollbar-thumb-slate-300'
  const { handleNotificationMutation } = useNotificationMutation()
  const notificationMutations = handleNotificationMutation()

  const handleLink = (id: number, open: boolean): void => {
    void notificationMutations.mutate({ id }, { onSuccess: () => checkNotification(open) })
  }

  return (
    <Popover className="relative z-30">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              'flex cursor-pointer items-center rounded-full p-1',
              'outline-none hover:bg-slate-100 active:scale-95',
              open ? 'bg-slate-100' : ''
            )}
            onClick={() => checkNotification(open)}
          >
            <Bell
              className={classNames(
                'h-[22px] w-[22px] rounded-full',
                open ? 'bg-slate-100' : ' text-slate-400'
              )}
              fill={open ? 'currentColor' : 'transparent'}
            />
          </Popover.Button>
          <PopoverTransition>
            <Popover.Panel className={panel}>
              {({ close }) => (
                <>
                  <header className="flex items-center justify-between bg-white px-3 py-2">
                    <Text theme="sm" weight="semibold" color="slate" className="!text-slate-600">
                      Notifications
                    </Text>
                    <Mail className="h-4 w-4 stroke-1 text-slate-400" />
                  </header>
                  {notificationsData?.length === 0 && (
                    <div className="h-[50vh] py-2 text-center">
                      <span className="text-xs tracking-wide text-slate-400">
                        No notification yet
                      </span>
                    </div>
                  )}
                  <main className={main}>
                    {notificationsData
                      ?.sort(
                        (a: INotification, b: INotification) =>
                          (a.isRead as unknown as number) - (b.isRead as unknown as number)
                      )
                      .map((i) => (
                        <Link
                          key={i.id}
                          href={`/notifications/?id=${i.id}`}
                          onClick={() => {
                            handleLink(i.id, open)
                            close()
                          }}
                          className={classNames(
                            'flex w-full cursor-pointer border-l-2 py-2 pl-4 text-xs',
                            !i.isRead || i.readAt == null
                              ? '!border-l-amber-400 bg-amber-50 hover:bg-amber-100'
                              : '!border-l-white bg-white hover:bg-slate-50'
                          )}
                        >
                          <Avatar
                            src={`${i.userAvatarLink}`}
                            className="mt-1"
                            size="md"
                            rounded="lg"
                            alt="avatar"
                          />
                          <div
                            className={classNames(
                              'mt-1 flex flex-col space-y-1 px-3 text-xs',
                              !i.isRead || i.readAt == null ? 'text-slate-600' : 'text-slate-500/70'
                            )}
                          >
                            <p>
                              <span className="font-semibold">{i.name}</span>{' '}
                              {switchMessage(i.specificType)}{' '}
                              <span className="font-semibold">{i.type.split('_')[0]} </span>
                            </p>
                            <small>
                              {moment(i.createdAt).fromNow()} &bull;{' '}
                              {i.type.split('_')[0].toLowerCase() === NOTIFICATION_TYPE.OVERTIME ? (
                                <>
                                  {moment(new Date(i.date)).format('MMM DD, YY')} -{' '}
                                  <span className="font-medium">
                                    {i.duration}{' '}
                                    {i.type.split('_')[0].toLowerCase() ===
                                    NOTIFICATION_TYPE.OVERTIME
                                      ? 'Mins'
                                      : 'Hrs'}
                                  </span>
                                </>
                              ) : (
                                <>{moment(new Date(i.date)).format('MMM DD, YY')}</>
                              )}
                            </small>
                          </div>
                        </Link>
                      ))}
                  </main>
                  <footer className="block bg-white py-1.5 text-center">
                    <Link
                      href="/notifications"
                      className="text-sm font-medium text-amber-500 hover:underline"
                    >
                      See more
                    </Link>
                  </footer>
                </>
              )}
            </Popover.Panel>
          </PopoverTransition>
        </>
      )}
    </Popover>
  )
}

export default NotificationPopover
