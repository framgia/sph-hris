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
  const [timeEntryId, setTimeEntryId] = useState<number>(-1)
  const [user, setUser] = useState<string>('')

  const handleIsOpenTimeEntryToggle = (id?: string | undefined, name?: string): void => {
    setIsOpenTimeEntry(!isOpenTimeEntry)
    setTimeEntryId(parseInt(id as string))
    setUser(name as string)
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
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={classNames(
                            'w-full border-b border-slate-200 py-2 px-4 hover:bg-white',
                            open ? 'bg-white' : 'hover:shadow-md hover:shadow-slate-200',
                            row.original.status === WorkStatus.VACATION_LEAVE.toLowerCase()
                              ? 'bg-amber-50 hover:bg-amber-50'
                              : '',
                            row.original.status === WorkStatus.ABSENT.toLowerCase()
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
                                  <h1 className="font-semibold">{row.original.user.name}</h1>
                                  <small className="text-slate-500">Web Developer</small>
                                </div>
                              </div>
                              <Chip label={row.original.status} />
                            </div>
                            <ChevronRight
                              className={classNames(
                                'h-4 w-4 text-slate-600',
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
                                  {row.original.timeIn?.remarks !== undefined &&
                                  row.original.timeIn?.remarks !== '' ? (
                                    <>
                                      <Link
                                        href={`dtr-management/?time_in=${row.original.timeIn?.id}`}
                                        className="relative flex cursor-pointer active:scale-95"
                                      >
                                        {/* Actual Time In Data */}
                                        <span className="font-semibold">
                                          {row.original.timeIn?.timeHour ?? EMPTY}
                                        </span>
                                        {/* Status */}
                                        {row.original.startTime > row.original.timeIn?.timeHour ? (
                                          <span
                                            className={classNames(
                                              'ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500'
                                            )}
                                          />
                                        ) : (
                                          <>
                                            {!Number.isNaN(row.original.timeIn?.id) && (
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
                                        {row.original.timeIn?.timeHour ?? EMPTY}
                                      </span>
                                      {/* Status */}
                                      {row.original.timeIn?.timeHour !== undefined &&
                                      row.original.timeIn?.timeHour !== ''
                                        ? !(
                                            row.original.startTime > row.original.timeIn?.timeHour
                                          ) && (
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
                                  {row.original.timeOut?.remarks !== undefined &&
                                  row.original.timeOut?.remarks !== '' ? (
                                    <Link
                                      href={`dtr-management/?time_out=${row.original.timeOut?.id}`}
                                      className="relative flex cursor-pointer active:scale-95"
                                    >
                                      {/* Actual Time Out Data */}
                                      <span className="font-semibold">
                                        {row.original.timeOut?.timeHour ?? EMPTY}
                                      </span>
                                      {/* Status */}
                                      {!Number.isNaN(row.original.timeOut?.id) && (
                                        <span
                                          className={classNames(
                                            'ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500'
                                          )}
                                        />
                                      )}
                                    </Link>
                                  ) : (
                                    <span className="font-semibold">
                                      {row.original.timeOut?.timeHour ?? EMPTY}
                                    </span>
                                  )}
                                </div>
                              </li>
                              <li className="px-4 py-2">
                                Work Hours:{' '}
                                <span className="font-semibold">{row.original.workedHours}</span>
                              </li>
                              <li className="px-4 py-2">
                                Late(min):{' '}
                                <span className="font-semibold">{row.original.late}</span>
                              </li>
                              <li className="px-4 py-2">
                                Undertime(min):{' '}
                                <span className="font-semibold">{row.original.undertime}</span>
                              </li>
                              <li className="px-4 py-2">
                                Overtime(min):{' '}
                                <span className="font-semibold">{row.original.overtime}</span>
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
                                          row.original.id.toString(),
                                          row.original.user.name
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
                                      onClick={() => alert(row.original.id)}
                                      rounded="none"
                                      className="py-0.5 px-1 text-slate-500"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </Tippy>
                                </div>
                              </li>
                            </ul>
                          </Disclosure.Panel>
                        </DisclosureTransition>
                      </>
                    )}
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
