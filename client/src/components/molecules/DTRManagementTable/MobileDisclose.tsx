import Link from 'next/link'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import React, { FC, useState } from 'react'
import { Table } from '@tanstack/react-table'
import { Disclosure } from '@headlessui/react'
import { ChevronRight, Clock, Edit } from 'react-feather'

import Chip from '~/components/atoms/Chip'
import Avatar from '~/components/atoms/Avatar'
import Button from '~/components/atoms/Buttons/Button'
import EditTimeEntriesModal from '../EditTimeEntryModal'
import { ITimeEntry } from '~/utils/types/timeEntryTypes'
import { WorkStatus } from '~/utils/constants/work-status'
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

                      return (
                        <>
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
                                  <Avatar
                                    src={`https://placeimg.com/640/480/abstract/${row.id}`}
                                    size="base"
                                    rounded="full"
                                  />
                                  <div className="flex flex-col items-start">
                                    <h1 className="font-semibold">{timeEntry.user.name}</h1>
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
                                  <span className="font-semibold">{timeEntry.overtime}</span>
                                </li>
                                <li className="flex items-center space-x-2 px-4 py-2">
                                  <span>Actions:</span>
                                  <div className="inline-flex items-center divide-x divide-slate-300 rounded border border-slate-300">
                                    <Tippy
                                      placement="left"
                                      content="Time Entries"
                                      className="!text-xs"
                                    >
                                      <Button
                                        onClick={() =>
                                          handleIsOpenTimeEntryToggle(
                                            timeEntry.id.toString(),
                                            timeEntry.user.name
                                          )
                                        }
                                        rounded="none"
                                        className="py-0.5 px-1 text-slate-500"
                                      >
                                        <Clock className="h-4 w-4" />
                                      </Button>
                                    </Tippy>
                                    <Tippy placement="left" content="Edit" className="!text-xs">
                                      <Button
                                        onClick={handleIsOpenEditModalToggle}
                                        rounded="none"
                                        className="py-0.5 px-1 text-slate-500"
                                      >
                                        <Edit className="h-4 w-4" />
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
                                      </Button>
                                    </Tippy>
                                  </div>
                                </li>
                              </ul>
                            </Disclosure.Panel>
                          </DisclosureTransition>
                        </>
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
