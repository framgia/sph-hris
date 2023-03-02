import moment from 'moment'
import Link from 'next/link'
import Tooltip from 'rc-tooltip'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { HiFire } from 'react-icons/hi'
import React, { FC, useState } from 'react'
import { Table } from '@tanstack/react-table'
import { Disclosure } from '@headlessui/react'
import { Check, ChevronRight, Clock, Edit, RefreshCw, ThumbsDown } from 'react-feather'

import Chip from '~/components/atoms/Chip'
import useUserQuery from '~/hooks/useUserQuery'
import Button from '~/components/atoms/Buttons/Button'
import AddNewOvertimeModal from '../AddNewOvertimeModal'
import { WorkStatus } from '~/utils/constants/work-status'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
import { IEmployeeTimeEntry } from '~/utils/types/timeEntryTypes'
import InterruptionTimeEntriesModal from '../InterruptionTimeEntriesModal'
import DisclosureTransition from '~/components/templates/DisclosureTransition'

type Props = {
  table: Table<IEmployeeTimeEntry>
  isLoading: boolean
  error: unknown
}

const MobileDisclose: FC<Props> = ({ table, isLoading, error }): JSX.Element => {
  const [isOpenTimeEntry, setIsOpenTimeEntry] = useState<boolean>(false)
  const [isOpenNewOvertime, setIsOpenNewOvertime] = useState<boolean>(false)
  const [timeEntryId, setTimeEntryId] = useState<number>(-1)
  const { handleUserQuery } = useUserQuery()
  const { data: user } = handleUserQuery()

  const handleIsOpenTimeEntryToggle = (id?: string | undefined): void => {
    setIsOpenTimeEntry(!isOpenTimeEntry)
    setTimeEntryId(parseInt(id as string))
  }

  const handleIsOpenNewOvertime = (): void => setIsOpenNewOvertime(!isOpenNewOvertime)

  const EMPTY = 'N/A'

  return (
    <>
      {error === null ? (
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
                            'w-full border-b border-slate-200 py-3 px-4 hover:bg-white',
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
                              <span className="font-medium">
                                {moment(new Date(row.original.date)).format('MMMM DD, YYYY')}
                              </span>
                              <Chip label={row.original.status} />
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
                              open ? 'bg-white shadow-md' : ''
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
                                        href={`my-daily-time-record/?time_in=${row.original.timeIn?.id}`}
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
                                      href={`my-daily-time-record/?time_out=${row.original.timeOut?.id}`}
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
                              <li className="flex flex-wrap items-center space-x-2 px-4 py-2">
                                <span>Overtime(min):</span>
                                <div className="flex items-center space-x-2">
                                  {/* If the user has an overtime */}
                                  <Button
                                    type="button"
                                    className="flex items-center"
                                    onClick={handleIsOpenNewOvertime}
                                  >
                                    <span>60</span>
                                    <HiFire className="h-4 w-4 text-red-500" />

                                    {/* File New Overtime Modal */}
                                    {isOpenNewOvertime ? (
                                      <AddNewOvertimeModal
                                        {...{
                                          isOpen: isOpenNewOvertime,
                                          closeModal: handleIsOpenNewOvertime,
                                          overtime: row.original
                                        }}
                                      />
                                    ) : null}
                                  </Button>

                                  {/* If Approved Request */}
                                  <Tippy
                                    placement="left"
                                    content="Approved request"
                                    className="!text-xs"
                                  >
                                    <Button
                                      type="button"
                                      className="inline-flex items-center rounded border-y border-r border-slate-300 group-hover:bg-white"
                                    >
                                      <Check className="h-4 w-5 rounded-l bg-green-500 text-white" />
                                      <span className="px-1 text-green-600">20</span>
                                    </Button>
                                  </Tippy>

                                  {/* If Pending Request */}
                                  <Tippy
                                    placement="left"
                                    content="Pending request"
                                    className="!text-xs"
                                  >
                                    <Button
                                      type="button"
                                      className="inline-flex items-center rounded border-y border-r border-slate-300 group-hover:bg-white"
                                    >
                                      <RefreshCw className="h-4 w-5 rounded-l bg-amber-500 px-1 text-white" />
                                      <span className="px-1 text-amber-600">16</span>
                                    </Button>
                                  </Tippy>

                                  {/* If Pending Request */}
                                  <Tippy
                                    placement="left"
                                    content="Disapproved request"
                                    className="!text-xs"
                                  >
                                    <Button
                                      type="button"
                                      className="inline-flex items-center rounded border-y border-r border-slate-300 group-hover:bg-white"
                                    >
                                      <ThumbsDown className="h-4 w-5 rounded-l bg-rose-500 px-1 text-white" />
                                      <span className="px-1 text-rose-600">120</span>
                                    </Button>
                                  </Tippy>

                                  {/* Just a normal number */}
                                  <span className="font-semibold">{row.original.workedHours}</span>
                                </div>
                              </li>
                              <li className="flex items-center space-x-2 px-4 py-2">
                                <span>Actions:</span>
                                <div className="inline-flex items-center divide-x divide-slate-300 rounded border border-slate-300">
                                  <Tooltip
                                    placement="left"
                                    overlay="Time Entries"
                                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                                  >
                                    <Button
                                      onClick={() =>
                                        handleIsOpenTimeEntryToggle(row.original.id.toString())
                                      }
                                      rounded="none"
                                      className="py-0.5 px-1 text-slate-500"
                                    >
                                      <Clock className="h-4 w-4" />
                                    </Button>
                                  </Tooltip>
                                  <Tooltip
                                    placement="left"
                                    overlay="Edit"
                                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                                  >
                                    <Button
                                      onClick={() => alert(row.original.id)}
                                      rounded="none"
                                      className="py-0.5 px-1 text-slate-500"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </Tooltip>
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
                      user: user?.userById.name as string,
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
