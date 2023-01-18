import moment from 'moment'
import Tooltip from 'rc-tooltip'
import React, { FC } from 'react'
import classNames from 'classnames'
import { Table } from '@tanstack/react-table'
import { Disclosure } from '@headlessui/react'
import { ChevronRight, Clock, Edit } from 'react-feather'

import Chip from '~/components/atoms/Chip'
import Button from '~/components/atoms/Buttons/Button'
import { WorkStatus } from '~/utils/constants/work-status'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
import { IEmployeeTimeEntry } from '~/utils/types/timeEntryTypes'

type Props = {
  table: Table<IEmployeeTimeEntry>
  isLoading: boolean
  error: unknown
}

const MobileDisclose: FC<Props> = ({ table, isLoading, error }): JSX.Element => {
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
                            row.original.status === WorkStatus.VACATION_LEAVE
                              ? 'bg-amber-50 hover:bg-amber-50'
                              : '',
                            row.original.status === WorkStatus.ABSENT
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
                                'h-4 w-4 text-slate-600',
                                open ? 'rotate-90' : ''
                              )}
                            />
                          </div>
                        </Disclosure.Button>
                        <Disclosure.Panel
                          className={classNames('text-slate-600', open ? 'bg-white shadow-md' : '')}
                        >
                          <ul className="flex flex-col divide-y divide-slate-200">
                            <li className="flex items-center space-x-1 px-4 py-2">
                              <p>Time In:</p>
                              <div className="relative flex">
                                <span className="font-semibold">
                                  {row.original.timeIn?.timeHour ?? EMPTY}
                                </span>
                                <span
                                  className={classNames(
                                    'ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500'
                                  )}
                                />
                              </div>
                            </li>
                            <li className="flex items-center space-x-2 px-4 py-2">
                              <p>Time Out:</p>
                              <div className="relative flex">
                                <span className="font-semibold">
                                  {row.original.timeOut?.timeHour ?? EMPTY}
                                </span>
                                <span
                                  className={classNames(
                                    'ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500'
                                  )}
                                />
                              </div>
                            </li>
                            <li className="px-4 py-2">
                              Work Hours:{' '}
                              <span className="font-semibold">{row.original.workedHours}</span>
                            </li>
                            <li className="px-4 py-2">
                              Late(min): <span className="font-semibold">{row.original.late}</span>
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
                                <Tooltip
                                  placement="left"
                                  overlay="Time Entries"
                                  arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                                >
                                  <Button
                                    onClick={() => alert(row.original.id)}
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
                      </>
                    )}
                  </Disclosure>
                ))}
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
