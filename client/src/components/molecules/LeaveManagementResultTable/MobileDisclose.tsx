import moment from 'moment'
import React, { FC } from 'react'
import classNames from 'classnames'
import { Table } from '@tanstack/react-table'
import { Disclosure } from '@headlessui/react'
import { Calendar, ChevronRight } from 'react-feather'

import { getLeaveType } from '~/utils/getLeaveType'
import { LeaveTable } from '~/utils/types/leaveTypes'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
import DisclosureTransition from '~/components/templates/DisclosureTransition'

type Props = {
  table: Table<LeaveTable>
  query: {
    isLoading: boolean
    isError: boolean
  }
}

const MobileDisclose: FC<Props> = ({ table, query: { isLoading, isError } }): JSX.Element => {
  return (
    <>
      {isError === null || !isError ? (
        isLoading ? (
          <div className="flex flex-col px-4 py-3">
            {Array.from({ length: 30 }, (_, i) => (
              <LineSkeleton key={i} className="py-1" />
            ))}
          </div>
        ) : (
          <>
            {table.getPageCount() === 0 ? (
              <DiscloseMessage message="No Available Data" />
            ) : (
              <>
                {table.getRowModel().rows.map((row) => (
                  <Disclosure key={row.id}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={classNames(
                            'w-full border-b border-slate-200 py-3 px-4 hover:bg-white',
                            open ? 'bg-white' : 'hover:shadow-md hover:shadow-slate-200'
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-slate-500">
                              <Calendar className="h-4 w-4" />
                              <span className="font-medium">
                                {moment(new Date(row.original.date)).format('MMMM DD, YYYY')}
                              </span>
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
                              'text-slate-500',
                              open ? 'bg-white shadow-md' : ''
                            )}
                          >
                            <ul
                              className={classNames(
                                'flex flex-col divide-y divide-slate-100',
                                'transition duration-150 ease-in-out'
                              )}
                            >
                              <li className="px-4 py-2 font-normal hover:bg-slate-50">
                                Type of leave:{' '}
                                <span className="font-medium">
                                  {getLeaveType(row.original.leaveTypeId)}
                                </span>
                              </li>
                              <li className="px-4 py-2 font-normal hover:bg-slate-50">
                                Pay?:{' '}
                                <span className="font-medium">
                                  {row.original.isWithPay ? 'With Pay' : 'Without Pay'}
                                </span>
                              </li>
                              <li className="px-4 py-2  font-normal hover:bg-slate-50">
                                Reason: <span className="font-medium">{row.original.reason}</span>
                              </li>
                              <li className="px-4 py-2 font-normal hover:bg-slate-50">
                                No. of leaves:{' '}
                                <span className="font-medium">{row.original.numLeaves}</span>
                              </li>
                            </ul>
                          </Disclosure.Panel>
                        </DisclosureTransition>
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
