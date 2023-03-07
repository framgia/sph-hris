import React, { FC } from 'react'
import classNames from 'classnames'
import { Table } from '@tanstack/react-table'
import { Disclosure } from '@headlessui/react'
import { ChevronRight } from 'react-feather'

import Avatar from '~/components/atoms/Avatar'
import { ITimesheetSummary } from '~/utils/types/timeEntryTypes'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
import DisclosureTransition from '~/components/templates/DisclosureTransition'

type Props = {
  table: Table<ITimesheetSummary>
  isLoading: boolean
  error: unknown
}

const MobileDisclose: FC<Props> = ({ table, isLoading, error }): JSX.Element => {
  return (
    <>
      {isLoading ? (
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
          ) : error !== null ? (
            <DiscloseMessage message="Something went wrong" />
          ) : (
            <>
              {table.getRowModel().rows.map((row) => (
                <Disclosure key={row.id}>
                  {({ open }) => {
                    const { original: timesheetSummary } = row

                    return (
                      <>
                        <Disclosure.Button
                          className={classNames(
                            'w-full border-b border-slate-200 py-2 px-4 hover:bg-white',
                            open ? 'bg-white' : 'hover:shadow-md hover:shadow-slate-200'
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
                                  <h1 className="font-semibold">{timesheetSummary.user.name}</h1>
                                  <small className="text-slate-500">Web Developer</small>
                                </div>
                              </div>
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
                              <li className="px-4 py-2">
                                Leave:{' '}
                                <span className="font-semibold">{timesheetSummary.leave}</span>
                              </li>
                              <li className="px-4 py-2">
                                Absences:{' '}
                                <span className="font-semibold">{timesheetSummary.absences}</span>
                              </li>
                              <li className="px-4 py-2">
                                Late: <span className="font-semibold">{timesheetSummary.late}</span>
                              </li>
                              <li className="px-4 py-2">
                                Undertime:{' '}
                                <span className="font-semibold">{timesheetSummary.undertime}</span>
                              </li>
                              <li className="px-4 py-2">
                                Overtime:{' '}
                                <span className="font-semibold">{timesheetSummary.overtime}</span>
                              </li>
                            </ul>
                          </Disclosure.Panel>
                        </DisclosureTransition>
                      </>
                    )
                  }}
                </Disclosure>
              ))}
            </>
          )}
        </>
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
