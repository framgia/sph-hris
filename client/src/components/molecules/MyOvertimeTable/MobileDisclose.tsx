import moment from 'moment'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import React, { FC, useState } from 'react'
import { Table } from '@tanstack/react-table'
import { Disclosure } from '@headlessui/react'
import { BsFileEarmarkText } from 'react-icons/bs'
import { Calendar, ChevronRight } from 'react-feather'

import ShowRemarksModal from './ShowRemarksModal'
import { IMyOvertimeTable } from '~/utils/interfaces'
import Button from '~/components/atoms/Buttons/Button'
import ProjectChip from '~/components/atoms/ProjectChip'
import { decimalFormatter } from '~/utils/myOvertimeHelpers'
import { variants } from '~/utils/constants/animationVariants'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
import RequestStatusChip from '~/components/atoms/RequestStatusChip'
import DisclosureTransition from '~/components/templates/DisclosureTransition'

type Props = {
  table: Table<IMyOvertimeTable>
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
                      <motion.div
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <Disclosure.Button
                          className={classNames(
                            'w-full border-b border-slate-200 py-3 px-4 hover:bg-white',
                            open ? 'bg-white' : 'hover:shadow-md hover:shadow-slate-200'
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-slate-600">
                              <Calendar className="h-4 w-4" />
                              <span className="font-medium">
                                {moment(new Date(row.original.date)).format('MMMM DD, YYYY')}
                              </span>
                              <RequestStatusChip label={row.original.status} />
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
                              <li className="flex flex-col space-y-2 px-4 py-2.5">
                                <span>Projects:</span>
                                <ProjectChip projects={row.original.projects} />
                              </li>
                              <li className="px-4 py-2.5">
                                Date:{' '}
                                <span className="font-semibold">
                                  {moment(new Date(row.original.date)).format('MMMM DD, YYYY')}
                                </span>
                              </li>
                              <li className="px-4 py-2.5">
                                Requested hours:{' '}
                                <span className="font-semibold">
                                  {decimalFormatter(row?.original?.requestedHours)}
                                </span>
                              </li>
                              <li className="px-4 py-2.5">
                                Supervisor:{' '}
                                <span className="font-semibold">{row.original.supervisor}</span>
                              </li>
                              <li className="px-4 py-2.5">
                                Approved Minutes:{' '}
                                <span className="font-semibold">
                                  {row.original.approvedMinutes ?? (
                                    <span className="italic text-slate-400">
                                      (pending approval)
                                    </span>
                                  )}
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
                                      <BsFileEarmarkText className="h-4 w-4" />

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
                      </motion.div>
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
