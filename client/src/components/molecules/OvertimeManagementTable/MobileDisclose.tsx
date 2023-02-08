import moment from 'moment'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import React, { FC, useState } from 'react'
import { Table } from '@tanstack/react-table'
import { Disclosure } from '@headlessui/react'
import { Check, ChevronRight, Edit, Eye, X } from 'react-feather'

import Chip from './Chip'
import Avatar from '~/components/atoms/Avatar'
import ShowRemarksModal from './ShowRemarksModal'
import Button from '~/components/atoms/Buttons/Button'
import { IOvertimeManagement } from '~/utils/interfaces'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
import DisclosureTransition from '~/components/templates/DisclosureTransition'

type Props = {
  table: Table<IOvertimeManagement>
  isLoading: boolean
  error: unknown
}

const MobileDisclose: FC<Props> = ({ table, isLoading, error }): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleToggle = (): void => setIsOpen(!isOpen)

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
                                  <h1 className="font-semibold">{row.original.user.name}</h1>
                                  <small className="text-slate-500">
                                    {row.original.user.role.name}
                                  </small>
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
                              open ? 'bg-white shadow-md' : ''
                            )}
                          >
                            <ul className="flex flex-col divide-y divide-slate-200">
                              <li className="px-4 py-2.5">
                                Date:{' '}
                                <span className="font-semibold">
                                  {moment(new Date(row.original.date)).format('MMMM DD, YYYY')}
                                </span>
                              </li>
                              <li className="px-4 py-2.5">
                                Requested hours:{' '}
                                <span className="font-semibold">{row.original.requestedHours}</span>
                              </li>
                              <li className="px-4 py-2.5">
                                Date Filed:{' '}
                                <span className="font-semibold">
                                  {moment(new Date(row.original.dateFiled)).format('MMMM DD, YYYY')}
                                </span>
                              </li>
                              <li className="flex flex-col space-y-2 px-4 py-3">
                                <span> Remarks:</span>
                                <span className="font-medium leading-relaxed tracking-wide">
                                  {row.original.remarks}
                                </span>
                              </li>
                              <li className="flex items-center space-x-2 px-4 py-2">
                                <span>Actions:</span>
                                <div className="inline-flex items-center divide-x divide-slate-300 rounded border border-slate-300">
                                  <Tippy placement="left" content="Approved" className="!text-xs">
                                    <Button
                                      onClick={() => alert(JSON.stringify(row.original, null, 2))}
                                      rounded="none"
                                      className="py-0.5 px-1 text-slate-500"
                                    >
                                      <Check className="h-4 w-4" />
                                    </Button>
                                  </Tippy>
                                  <Tippy
                                    placement="left"
                                    content="Disapproved"
                                    className="!text-xs"
                                  >
                                    <Button
                                      onClick={() => alert(JSON.stringify(row.original, null, 2))}
                                      rounded="none"
                                      className="py-0.5 px-1 text-slate-500"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </Tippy>
                                  <Tippy placement="left" content="Edit" className="!text-xs">
                                    <Button
                                      onClick={() => alert(JSON.stringify(row.original, null, 2))}
                                      rounded="none"
                                      className="py-0.5 px-1 text-slate-500"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </Tippy>
                                  <Tippy
                                    placement="left"
                                    className="!text-xs"
                                    content="View Remarks"
                                  >
                                    <Button
                                      onClick={handleToggle}
                                      rounded="none"
                                      className="py-0.5 px-1 text-slate-500"
                                    >
                                      <Eye className="h-4 w-4" />

                                      {/* This will show the remarks modal */}
                                      {isOpen ? (
                                        <ShowRemarksModal
                                          {...{
                                            isOpen,
                                            closeModal: () => handleToggle(),
                                            row: row.original
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
