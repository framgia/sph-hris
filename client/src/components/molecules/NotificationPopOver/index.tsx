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
  checkNotification: () => void
  setReady: (state: boolean) => void
}

const NotificationPopover: FC<Props> = ({
  className,
  notificationsData,
  checkNotification,
  setReady
}): JSX.Element => {
  const panel = classNames(
    'absolute right-0 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden',
    'rounded-md border border-slate-200 bg-white shadow-xl shadow-slate-300 focus:outline-none'
  )
  const main = 'default-scrollbar max-h-[25vh] min-h-[25vh] py-2'
  const { handleNotificationMutation } = useNotificationMutation()
  const notificationMutations = handleNotificationMutation()

  const handleLink = (id: number): void => {
    void notificationMutations.mutate({ id })
  }
  return (
    <Popover className="relative z-30">
      {({ open }) => (
        <>
          {setReady(open)}
          <Popover.Button className="flex cursor-pointer items-center rounded-full p-1 outline-none active:scale-95">
            <Bell
              onClick={() => {
                checkNotification()
              }}
              className="h-[22px] w-[22px] text-slate-400"
              fill={open ? 'currentColor' : 'transparent'}
            />
          </Popover.Button>
          <PopoverTransition>
            <Popover.Panel className={panel}>
              <header className="bg-slate-50 px-3 py-2">
                <Text theme="sm" weight="bold" className="font-inter !text-slate-600">
                  Notifications
                </Text>
              </header>
              <main className={main}>
                {notificationsData
                  ?.sort(
                    (a: INotification, b: INotification) =>
                      (a.isRead as unknown as number) - (b.isRead as unknown as number)
                  )
                  .map((i, index) => (
                    <a
                      key={index}
                      href={'#'}
                      target={'_blank'}
                      onClick={() => handleLink(i.id)}
                      className={`${
                        !i.isRead || i.readAt == null ? 'bg-slate-300' : ''
                      } flex cursor-pointer items-start border-b border-slate-200 px-4 py-3 hover:bg-slate-50`}
                      rel="noreferrer"
                    >
                      <Avatar
                        src={`${i.userAvatarLink}`}
                        className="mt-1"
                        size="base"
                        rounded="full"
                        alt="avatar"
                      />
                      <p className="mx-2 text-xs text-gray-600">
                        <span className="font-semibold">{i.name}</span> has requested your approval
                        for <span className="font-semibold">{i.type} </span>
                        <span className="font-semibold text-primary">({i.date})</span>
                      </p>
                    </a>
                  ))}
              </main>
              <footer className="block bg-amber-500 py-2 text-center text-sm font-semibold text-white">
                <Link href="/notifications">See all notifications</Link>
              </footer>
            </Popover.Panel>
          </PopoverTransition>
        </>
      )}
    </Popover>
  )
}

export default NotificationPopover
