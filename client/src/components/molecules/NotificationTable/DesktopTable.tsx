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

const DesktopDisclose: FC<Props> = ({ table, isLoading }): JSX.Element => {
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
                                <h1 className="font-semibold">{row.original.name}</h1>
                                <p className="mx-1 text-slate-500">
                                  has requested for your approval for
                                </p>
                                <h1 className="font-semibold">
                                  {row.original.type}({row.original.date} - {row.original.duration}{' '}
                                  Hours)
                                </h1>
                                <p className="absolute right-10 text-slate-500">1m</p>
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
                        <ul>
                          <li className="flex w-full px-5 py-3">
                            <div className="w-5/6">
                              <div className="mb-2 flex items-center justify-between">
                                <p>
                                  <span className="font-semibold">Project: </span>
                                  {row.original.project}
                                </p>
                                <p>
                                  <span className="font-semibold">Type: </span>
                                  {row.original.type}
                                </p>
                                <p>
                                  <span className="font-semibold">Date: </span>
                                  {row.original.date}
                                </p>
                                <p>
                                  <span className="font-semibold">Requested Hours: </span>
                                  {row.original.duration}
                                </p>
                                <p>
                                  <span className="font-semibold">Date Filed: </span>
                                  {row.original.dateFiled}
                                </p>
                                <p className="flex items-center">
                                  <span className="font-semibold">Status: </span>
                                  <div
                                    className={classNames(
                                      'py-0.25  ml-1 rounded-full border  px-1.5',
                                      row.original.status === 'Pending' &&
                                        'border-amber-200 bg-amber-50 text-amber-600',
                                      row.original.status === 'Approved' &&
                                        'border-green-200 bg-green-50 text-green-600',
                                      row.original.status === 'Disapproved' &&
                                        'border-rose-200 bg-rose-50 text-rose-600'
                                    )}
                                  >
                                    {row.original.status}
                                  </div>
                                </p>
                              </div>
                              <div>
                                <p>
                                  <span className="font-semibold">Remarks: </span>
                                  {row.original.remarks}
                                </p>
                              </div>
                            </div>
                            <div className="flex w-1/6 flex-col items-end">
                              <span className="mb-2 font-semibold">Actions: </span>
                              <div>
                                <button className="mr-2 border">
                                  <Check className="h-5 w-5 p-0.5 text-slate-500" />
                                </button>
                                <button className="border">
                                  <X className="h-5 w-5 p-0.5 text-slate-500" />
                                </button>
                              </div>
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

export default DesktopDisclose
