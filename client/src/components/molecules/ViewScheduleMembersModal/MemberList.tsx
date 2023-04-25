import React, { FC } from 'react'
import classNames from 'classnames'
import { Menu } from '@headlessui/react'
import { CornerDownRight, MoreVertical } from 'react-feather'

import Button from '~/components/atoms/Buttons/Button'
import MenuTransition from '~/components/templates/MenuTransition'
import { IScheduleMember } from '~/utils/interfaces/scheduleMemberInterface'

type Props = {
  member: IScheduleMember
}

const MemberList: FC<Props> = ({ member }): JSX.Element => {
  return (
    <section
      className={classNames(
        'group flex items-center justify-between px-7 py-2.5 transition',
        'duration-100 ease-in-out hover:bg-slate-100'
      )}
    >
      {/* Member Details */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img src={member.avatarLink} className="h-9 w-9 shrink rounded-md" />
          {/* This will act as online and offline */}
          <span
            className={classNames(
              'absolute right-0 -bottom-1 h-2.5 w-2.5 rounded-full ring-2 ring-white',
              member.isOnline ? 'bg-green-500 ' : 'bg-slate-400'
            )}
          ></span>
        </div>
        <div className="leading-4">
          <h3 className="text-sm font-medium text-slate-800 line-clamp-1">{member.name}</h3>
          <small className="text-xs font-light text-slate-600 line-clamp-1">
            {member.position.name}
          </small>
        </div>
      </div>

      {/* Menu Dropdown Options For Re-assigned Member */}
      <div className="flex items-center text-slate-600">
        <Menu as="div" className="relative z-30 flex w-full text-left">
          {({ open }) => (
            <>
              <Menu.Button
                className={classNames(
                  'border border-slate-200 p-1.5 transition duration-100',
                  'rounded ease-in-out hover:border-slate-400',
                  open ? 'border-slate-400 opacity-100' : 'opacity-0 group-hover:opacity-100'
                )}
              >
                <MoreVertical className="h-4 w-4" />
              </Menu.Button>
              <MenuTransition>
                <Menu.Items
                  className={classNames(
                    'absolute right-0 -bottom-12 flex w-48 flex-col overflow-hidden rounded-md',
                    'bg-white py-1 shadow-xl shadow-slate-200 ring-1 ring-black ring-opacity-5 focus:outline-none'
                  )}
                >
                  <Menu.Item>
                    <Button className="flex items-center space-x-2 px-3 py-2 text-xs hover:text-slate-700">
                      <CornerDownRight className="h-5 w-5 stroke-0.5" aria-hidden="true" />
                      <span className="text-xs">Re-assigned Schedule</span>
                    </Button>
                  </Menu.Item>
                </Menu.Items>
              </MenuTransition>
            </>
          )}
        </Menu>
      </div>
    </section>
  )
}

export default MemberList
