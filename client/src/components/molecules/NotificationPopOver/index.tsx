import Link from 'next/link'
import React, { FC } from 'react'
import classNames from 'classnames'
import { Bell } from 'react-feather'
import { Popover } from '@headlessui/react'

import Text from '~/components/atoms/Text'
import Avatar from '~/components/atoms/Avatar'
import { INotification } from '~/utils/interfaces'
import useNotificationMutation from '~/hooks/useNotificationMutation'
import PopoverTransition from '~/components/templates/PopoverTransition'

type Props = {
  className: string
  notificationsData: INotification[] | undefined
  checkNotification: (open: boolean) => void
}

const NotificationPopover: FC<Props> = ({
  className,
  notificationsData,
  checkNotification
}): JSX.Element => {
  const panel = classNames(
    `${
      notificationsData?.length === 0 ? 'h-24' : ''
    } absolute right-0 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden`,
    'rounded-md border border-slate-200 bg-white shadow-xl shadow-slate-300 focus:outline-none'
  )
  const main = 'default-scrollbar max-h-[25vh] min-h-[25vh] py-2'
  const { handleNotificationMutation } = useNotificationMutation()
  const notificationMutations = handleNotificationMutation()

  const handleLink = (id: number, open: boolean): void => {
    void notificationMutations.mutate({ id }, { onSuccess: () => checkNotification(open) })
  }

  return (
    <Popover className="relative z-30">
      {({ open }) => (
        <>
          <Popover.Button className="flex cursor-pointer items-center rounded-full p-1 outline-none active:scale-95">
            <Bell
              onClick={() => {
                checkNotification(open)
              }}
              className="h-[22px] w-[22px] text-slate-400"
              fill={open ? 'currentColor' : 'transparent'}
            />
          </Popover.Button>
          <PopoverTransition>
            <Popover.Panel className={panel}>
              {({ close }) => (
                <>
                  <header className="bg-slate-50 px-3 py-2">
                    <Text theme="sm" weight="bold" color="slate">
                      Notifications
                    </Text>
                  </header>
                  {notificationsData?.length === 0 && (
                    <div className="h-[50vh]">
                      <DiscloseMessage message="No Notification Available" />
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
                          className={`${
                            !i.isRead || i.readAt == null ? 'bg-slate-300' : ''
                          } flex cursor-pointer items-start border-b border-slate-200 px-4 py-3 hover:bg-slate-50`}
                        >
                          <Avatar
                            src={`${i.userAvatarLink}`}
                            className="mt-1"
                            size="base"
                            rounded="full"
                            alt="avatar"
                          />
                          <p className="mx-2 text-xs">
                            <span className="font-semibold">{i.name}</span> has requested your
                            approval for <span className="font-semibold">{i.type} </span>
                            <span className="font-semibold text-primary">({i.date})</span>
                          </p>
                        </Link>
                      ))}
                  </main>
                  <footer className="block bg-amber-500 py-2 text-center text-sm font-semibold text-white">
                    <Link href="/notifications">See all notifications</Link>
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

const DiscloseMessage = ({
  message,
  type = 'default'
}: {
  message: string
  type?: string
}): JSX.Element => {
  return (
    <p
      className={classNames(
        'py-2 text-center text-sm font-medium',
        type === 'default' && 'text-slate-500',
        type === 'error' && 'bg-rose-50 text-rose-500'
      )}
    >
      {message}
    </p>
  )
}
