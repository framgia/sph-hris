import React, { FC } from 'react'
import classNames from 'classnames'
import { Table } from '@tanstack/react-table'
import { Disclosure } from '@headlessui/react'
import { Check, ChevronRight, X } from 'react-feather'

import Avatar from '~/components/atoms/Avatar'
import { IDTRNotificationManagement } from '~/utils/interfaces'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'

type Props = {
  table: Table<IDTRNotificationManagement>
  isLoading: boolean
}

const MobileDisclose: FC<Props> = ({ table, isLoading }): JSX.Element => {
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
              <DiscloseMessage message="Something went wrong" type="error" />
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
                              <div className="flex items-start">
                                <p className="text-slate-500">
                                  {row.original.name} has requested for your approval for{' '}
                                  {row.original.type}({row.original.date} - {row.original.duration}{' '}
                                  Hours) 1m
                                </p>
                              </div>
                            </div>
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
                          <li className="px-4 py-2">
                            Project: <span className="font-semibold">{row.original.project}</span>
                          </li>
                          <li className="px-4 py-2">
                            Type: <span className="font-semibold">{row.original.type}</span>
                          </li>
                          <li className="px-4 py-2">
                            Date: <span className="font-semibold">{row.original.date}</span>
                          </li>
                          <li className="px-4 py-2">
                            Requested Hours:{' '}
                            <span className="font-semibold">{row.original.duration}</span>
                          </li>
                          <li className="px-4 py-2">
                            Date Filed:{' '}
                            <span className="font-semibold">{row.original.dateFiled}</span>
                          </li>
                          <li className="px-4 py-2">
                            Status:{' '}
                            <span className="py-0.25 rounded-full border border-amber-200 bg-amber-50 px-1.5 text-amber-600">
                              {row.original.status}
                            </span>
                          </li>
                          <li className="px-4 py-2">
                            Remarks: <span className="font-semibold">{row.original.remarks}</span>
                          </li>
                          <li className="px-4 py-2">
                            Actions:{' '}
                            <span>
                              <button className="mx-2 border">
                                <Check className="h-4 w-4 p-0.5 text-slate-500" />
                              </button>
                              <button className="border">
                                <X className="h-4 w-4 p-0.5 text-slate-500" />
                              </button>
                            </span>
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
