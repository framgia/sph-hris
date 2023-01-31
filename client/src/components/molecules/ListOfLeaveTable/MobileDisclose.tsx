import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import React, { FC, useState } from 'react'
import { Table } from '@tanstack/react-table'
import { Disclosure } from '@headlessui/react'
import { ChevronRight, Edit, Eye } from 'react-feather'

import Avatar from '~/components/atoms/Avatar'
import ShowReasonModal from './ShowReasonModal'
import { IListOfLeave } from '~/utils/interfaces'
import Button from '~/components/atoms/Buttons/Button'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
import DisclosureTransition from '~/components/templates/DisclosureTransition'

type Props = {
  table: Table<IListOfLeave>
  isLoading: boolean
  error: unknown
}

const MobileDisclose: FC<Props> = ({ table, isLoading, error }): JSX.Element => {
  const [isOpenListOfLeave, setOpenListOfLeave] = useState<boolean>(false)
  const [rowData, setRowData] = useState<IListOfLeave>()

  const handleListOfLeaveToggle = (row?: IListOfLeave): void => {
    void setOpenListOfLeave(!isOpenListOfLeave)
    setRowData(row)
  }

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
                            open ? 'bg-white' : 'hover:shadow-md hover:shadow-slate-200'
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Avatar
                                src={`https://placeimg.com/640/480/abstract/${row.id}`}
                                size="base"
                                rounded="full"
                              />
                              <div className="flex flex-col items-start">
                                <h1 className="font-semibold">{row.original.name}</h1>
                                <small className="text-slate-500">Web Developer</small>
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
                        <DisclosureTransition>
                          <Disclosure.Panel
                            className={classNames(
                              'text-slate-600',
                              open ? 'bg-white shadow-md shadow-slate-200' : ''
                            )}
                          >
                            <ul className="flex flex-col divide-y divide-slate-200">
                              <li className="px-4 py-2">
                                Project:{' '}
                                <span className="font-semibold">{row.original.project}</span>
                              </li>
                              <li className="px-4 py-2">
                                Leave Date:{' '}
                                <span className="font-semibold">{row.original.leaveDate}</span>
                              </li>
                              <li className="px-4 py-2">
                                Type: <span className="font-semibold">{row.original.type}</span>
                              </li>
                              <li className="px-4 py-2">
                                With Pay:{' '}
                                <span className="font-semibold">
                                  {row.original.isWithPay ? 'Yes' : 'No'}
                                </span>
                              </li>
                              <li className="px-4 py-2">
                                Manager:{' '}
                                <span className="font-semibold">{row.original.manager}</span>
                              </li>
                              <li className="px-4 py-2">
                                Project Leader:{' '}
                                <span className="font-semibold">{row.original.projectLeader}</span>
                              </li>
                              <li className="px-4 py-2">
                                Total Undertime (Mins) :{' '}
                                <span className="font-semibold">{row.original.totalUndertime}</span>
                              </li>
                              <li className="px-4 py-2">
                                Total leaves (Days) :{' '}
                                <span className="font-semibold">{row.original.totalLeaves}</span>
                              </li>
                              <li className="px-4 py-2">
                                Date Filed:{' '}
                                <span className="font-semibold">{row.original.dateFiled}</span>
                              </li>
                              <li className="flex items-center space-x-2 px-4 py-2">
                                <span>Actions:</span>
                                <div className="inline-flex items-center divide-x divide-slate-300 rounded border border-slate-300">
                                  <Tippy
                                    placement="left"
                                    content="View Reason"
                                    className="!text-xs"
                                  >
                                    <Button
                                      onClick={() => handleListOfLeaveToggle(row.original)}
                                      rounded="none"
                                      className="py-0.5 px-1 text-slate-500"
                                    >
                                      <Eye className="h-4 w-4" />
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

                {/* This will show the Remarks Modal */}
                {isOpenListOfLeave ? (
                  <ShowReasonModal
                    {...{
                      isOpen: isOpenListOfLeave,
                      closeModal: handleListOfLeaveToggle,
                      remarks: rowData
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
