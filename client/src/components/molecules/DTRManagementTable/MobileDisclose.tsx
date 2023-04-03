import Link from 'next/link'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import React, { FC, useState } from 'react'
import { Table } from '@tanstack/react-table'
import { Disclosure, Menu } from '@headlessui/react'
import { ChevronRight, MoreVertical } from 'react-feather'

import Chip from '~/components/atoms/Chip'
import Avatar from '~/components/atoms/Avatar'
import EditTimeEntriesModal from '../EditTimeEntryModal'
import { ITimeEntry } from '~/utils/types/timeEntryTypes'
import { WorkStatus } from '~/utils/constants/work-status'
import { variants } from '~/utils/constants/animationVariants'
import MenuTransition from '~/components/templates/MenuTransition'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
import InterruptionTimeEntriesModal from '../InterruptionTimeEntriesModal'
import DisclosureTransition from '~/components/templates/DisclosureTransition'

type Props = {
  table: Table<ITimeEntry>
  isLoading: boolean
  error: unknown
}

const MobileDisclose: FC<Props> = ({ table, isLoading, error }): JSX.Element => {
  const [isOpenTimeEntry, setIsOpenTimeEntry] = useState<boolean>(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const [timeEntryId, setTimeEntryId] = useState<number>(-1)
  const [user, setUser] = useState<string>('')

  const handleIsOpenTimeEntryToggle = (id?: string | undefined, name?: string): void => {
    setIsOpenTimeEntry(!isOpenTimeEntry)
    setTimeEntryId(parseInt(id as string))
    setUser(name as string)
  }

  const handleIsOpenEditModalToggle = (): void => {
    setIsOpenEditModal(!isOpenEditModal)
  }

  const menuItemButton = 'px-3 py-2 text-left text-xs hover:text-slate-700 text-slate-500'
  const EMPTY = 'N/A'

  return (
    <>
      {error == null ? (
        isLoading ? (
          <div className="flex flex-col px-4 py-3">
            {Array.from({ length: 30 }, (_, i) => (
              <LineSkeleton key={i} className="py-1" />
            ))}
          </div>
        ) : (
          <>
            {table.getPageCount() === 0 ? (
              <div className="h-[50vh]">
                <DiscloseMessage message="No Available Data" />
              </div>
            ) : (
              <>
                {table.getRowModel().rows.map((row) => (
                  <Disclosure key={row.id}>
                    {({ open }) => {
                      const { original: timeEntry } = row
                      const { avatarLink, name } = row.original.user

                      return (
                        <motion.div
                          variants={variants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                        >
                          <Disclosure.Button
                            className={classNames(
                              'w-full border-b border-slate-200 py-2 px-4 hover:bg-white',
                              open ? 'bg-white' : 'hover:shadow-md hover:shadow-slate-200',
                              timeEntry.status === WorkStatus.VACATION_LEAVE.toLowerCase()
                                ? 'bg-amber-50 hover:bg-amber-50'
                                : '',
                              timeEntry.status === WorkStatus.ABSENT.toLowerCase()
                                ? 'bg-fuchsia-50 hover:bg-fuchsia-50'
                                : ''
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-2">
                                  <Avatar src={`${avatarLink}`} size="base" rounded="full" />
                                  <div className="flex flex-col items-start">
                                    <h1 className="font-semibold">{name}</h1>
                                    <small className="text-slate-500">Web Developer</small>
                                  </div>
                                </div>
                                <Chip label={timeEntry.status} />
                              </div>
                              <ChevronRight
                                className={classNames(
                                  'h-4 w-4 text-slate-600 duration-300',
                                  open ? 'rotate-90' : ''
                                )}
                              />
                            </div>
                          </Disclosure.Button>
                          <DisclosureTransition>
                            <Disclosure.Panel
                              className={classNames(
                                'text-slate-600',
                                open ? 'bg-white shadow-md shadow-slate-200' : ''
                              )}
                            >
                              <ul className="flex flex-col divide-y divide-slate-200">
                                <li className="flex items-center space-x-1 px-4 py-2">
                                  <p>Time In:</p>
                                  <div className="relative flex">
                                    {timeEntry.timeIn?.remarks !== undefined &&
                                    timeEntry.timeIn?.remarks !== '' ? (
                                      <>
                                        <Link
                                          href={`dtr-management/?time_in=${timeEntry.timeIn?.id}`}
                                          className="relative flex cursor-pointer active:scale-95"
                                        >
                                          {/* Actual Time In Data */}
                                          <span className="font-semibold">
                                            {timeEntry.timeIn?.timeHour ?? EMPTY}
                                          </span>
                                          {/* Status */}
                                          {timeEntry.startTime > timeEntry.timeIn?.timeHour ? (
                                            <span
                                              className={classNames(
                                                'ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500'
                                              )}
                                            />
                                          ) : (
                                            <>
                                              {!Number.isNaN(timeEntry.timeIn?.id) && (
                                                <span
                                                  className={classNames(
                                                    'ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500'
                                                  )}
                                                />
                                              )}
                                            </>
                                          )}
                                        </Link>
                                      </>
                                    ) : (
                                      <>
                                        {/* Actual Time In Data */}
                                        <span className="font-semibold">
                                          {timeEntry.timeIn?.timeHour ?? EMPTY}
                                        </span>
                                        {/* Status */}
                                        {timeEntry.timeIn?.timeHour !== undefined &&
                                        timeEntry.timeIn?.timeHour !== ''
                                          ? !(timeEntry.startTime > timeEntry.timeIn?.timeHour) && (
                                              <span
                                                className={classNames(
                                                  'ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500'
                                                )}
                                              />
                                            )
                                          : ''}
                                      </>
                                    )}
                                  </div>
                                </li>
                                <li className="flex items-center space-x-2 px-4 py-2">
                                  <p>Time Out:</p>
                                  <div className="relative flex">
                                    {timeEntry.timeOut?.remarks !== undefined &&
                                    timeEntry.timeOut?.remarks !== '' ? (
                                      <Link
                                        href={`dtr-management/?time_out=${timeEntry.timeOut?.id}`}
                                        className="relative flex cursor-pointer active:scale-95"
                                      >
                                        {/* Actual Time Out Data */}
                                        <span className="font-semibold">
                                          {timeEntry.timeOut?.timeHour ?? EMPTY}
                                        </span>
                                        {/* Status */}
                                        {!Number.isNaN(timeEntry.timeOut?.id) && (
                                          <span
                                            className={classNames(
                                              'ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500'
                                            )}
                                          />
                                        )}
                                      </Link>
                                    ) : (
                                      <span className="font-semibold">
                                        {timeEntry.timeOut?.timeHour ?? EMPTY}
                                      </span>
                                    )}
                                  </div>
                                </li>
                                <li className="px-4 py-2">
                                  Work Hours:{' '}
                                  <span className="font-semibold">{timeEntry.workedHours}</span>
                                </li>
                                <li className="px-4 py-2">
                                  Late(min): <span className="font-semibold">{timeEntry.late}</span>
                                </li>
                                <li className="px-4 py-2">
                                  Undertime(min):{' '}
                                  <span className="font-semibold">{timeEntry.undertime}</span>
                                </li>
                                <li className="px-4 py-2">
                                  Overtime(min):{' '}
                                  <span className="font-semibold">
                                    {timeEntry.overtime != null
                                      ? timeEntry.overtime.approvedMinutes ?? 0
                                      : 0}
                                  </span>
                                </li>
                                <li className="group flex items-center space-x-2 px-4 py-2">
                                  <span>Actions:</span>
                                  <div
                                    className={classNames(
                                      'inline-flex divide-x divide-slate-300 rounded border',
                                      'border-transparent group-hover:border-slate-300'
                                    )}
                                  >
                                    <Menu as="div" className="relative w-full">
                                      {/* This is for Work Interruption Modal */}
                                      {isOpenTimeEntry ? (
                                        <InterruptionTimeEntriesModal
                                          {...{
                                            isOpen: isOpenTimeEntry,
                                            user: timeEntry.user.name,
                                            timeEntryId: timeEntry.id,
                                            closeModal: handleIsOpenTimeEntryToggle
                                          }}
                                        />
                                      ) : null}

                                      {/* This is for Edit Time Entries modal */}
                                      {isOpenEditModal ? (
                                        <EditTimeEntriesModal
                                          {...{
                                            isOpen: isOpenEditModal,
                                            user: timeEntry.user,
                                            timeEntry: {
                                              id: timeEntry.id,
                                              timeIn: timeEntry.timeIn?.timeHour,
                                              timeOut: timeEntry.timeOut?.timeHour
                                            },
                                            closeModal: handleIsOpenEditModalToggle
                                          }}
                                        />
                                      ) : null}

                                      <Tippy
                                        placement="left"
                                        content="Vertical Ellipsis"
                                        className="!text-xs"
                                      >
                                        <Menu.Button className="p-0.5 text-slate-500 outline-none">
                                          <MoreVertical className="h-4" />
                                        </Menu.Button>
                                      </Tippy>
                                      <MenuTransition>
                                        <Menu.Items
                                          className={classNames(
                                            'absolute bottom-7 z-50 flex w-44 flex-col divide-y divide-slate-200 overflow-hidden rounded-md',
                                            'bg-white py-0.5 shadow-xl shadow-slate-200 ring-1 ring-black ring-opacity-5 focus:outline-none'
                                          )}
                                        >
                                          <Menu.Item>
                                            <button
                                              className={menuItemButton}
                                              onClick={() => handleIsOpenTimeEntryToggle(row.id)}
                                            >
                                              <span>Work Interruption</span>
                                            </button>
                                          </Menu.Item>
                                          <Menu.Item>
                                            <button
                                              className={menuItemButton}
                                              onClick={handleIsOpenEditModalToggle}
                                            >
                                              <span>Edit DTR</span>
                                            </button>
                                          </Menu.Item>
                                        </Menu.Items>
                                      </MenuTransition>
                                    </Menu>
                                  </div>
                                </li>
                              </ul>
                            </Disclosure.Panel>
                          </DisclosureTransition>
                        </motion.div>
                      )
                    }}
                  </Disclosure>
                ))}

                {isOpenTimeEntry ? (
                  <InterruptionTimeEntriesModal
                    {...{
                      isOpen: isOpenTimeEntry,
                      timeEntryId,
                      user,
                      closeModal: handleIsOpenTimeEntryToggle
                    }}
                  />
                ) : null}
              </>
            )}
          </>
        )
      ) : (
        <DiscloseMessage message="Something went wrong" type="error" />
      )}
    </>
  )
}

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
        'py-2 text-center font-medium',
        type === 'default' && 'text-slate-500',
        type === 'error' && 'bg-rose-50 text-rose-500'
      )}
    >
      {message}
    </p>
  )
}

export default MobileDisclose
