import React, { FC } from 'react'
import classNames from 'classnames'
import { Bell } from 'react-feather'
import { Popover } from '@headlessui/react'

import Text from '~/components/atoms/Text'
import Avatar from '~/components/atoms/Avatar'
import PopoverTransition from '~/components/templates/PopoverTransition'
import Link from 'next/link'

type Props = {
  className: string
}

const NotificationPopover: FC<Props> = ({ className }): JSX.Element => {
  const panel = classNames(
    'absolute right-0 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden',
    'rounded-md border border-slate-200 bg-white shadow-xl shadow-slate-300 focus:outline-none'
  )
  const main = 'default-scrollbar max-h-[25vh] min-h-[25vh] py-2'

  return (
    <Popover className="relative z-30">
      {({ open }) => (
        <>
          <Popover.Button className="flex cursor-pointer items-center rounded-full p-1 outline-none active:scale-95">
            <Bell
              className="h-[22px] w-[22px] text-slate-400"
              fill={open ? 'currentColor' : 'transparent'}
            />
          </Popover.Button>
          <PopoverTransition>
            <Popover.Panel className={panel}>
              <header className="bg-slate-50 px-3 py-2">
                <Text theme="sm" weight="bold" color="slate">
                  Notifications
                </Text>
              </header>
              <main className={main}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex items-start border-b border-slate-200 px-4 py-3 hover:bg-slate-50"
                  >
                    <Avatar
                      src="https://avatars.githubusercontent.com/u/38458781?v=4"
                      className="mt-1"
                      size="base"
                      rounded="full"
                      alt="avatar"
                    />
                    <p className="mx-2 text-xs text-gray-600">
                      <span className="font-semibold">Anika Franci</span> has requested your
                      approval for <span className="font-semibold">Undertime</span>
                      <span className="font-semibold text-primary">
                        (Dec. 1, 2022 - 13:30-18:30)
                      </span>
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
