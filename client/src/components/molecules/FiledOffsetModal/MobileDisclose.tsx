import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import React, { FC, useState } from 'react'
import { Table } from '@tanstack/react-table'
import { Disclosure } from '@headlessui/react'
import { ChevronRight, Eye } from 'react-feather'

import Chip from './Chip'
import ShowRemarksModal from './ShowRemarksModal'
import Button from '~/components/atoms/Buttons/Button'
import { IFiledOffsetTable } from '~/utils/interfaces'
import { variants } from '~/utils/constants/animationVariants'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
import DisclosureTransition from '~/components/templates/DisclosureTransition'

type Props = {
  table: Table<IFiledOffsetTable>
  isLoading: boolean
  error: unknown
}

const MobileDisclose: FC<Props> = ({ table, isLoading, error }): JSX.Element => {
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
                    {({ open }) => {
                      const { original: filedOffset } = row
                      const [isOpen, setIsOpen] = useState<boolean>(false)

                      const handleToggle = (): void => setIsOpen(!isOpen)
                      const EMPTY = 'N/A'

                      return (
                        <motion.div
                          variants={variants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                        >
                          <Disclosure.Button
                            className={classNames(
                              'w-full border-b border-slate-200 py-2 px-4 text-xs hover:bg-white',
                              open ? 'bg-white' : 'hover:shadow-md hover:shadow-slate-200'
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 text-slate-600">
                                <span className="font-medium">{filedOffset.title}</span>
                                <Chip label={filedOffset.status} />
                              </div>
                              <ChevronRight
                                className={classNames(
                                  'h-4 w-4 text-slate-600 duration-300',
                                  open ? 'rotate-90' : ''
                                )}
                              />

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
                            </div>
                          </Disclosure.Button>
                          <DisclosureTransition>
                            <Disclosure.Panel
                              className={classNames(
                                'text-xs text-slate-600',
                                open ? 'bg-white shadow-md shadow-slate-200' : ''
                              )}
                            >
                              <ul className="flex flex-col divide-y divide-slate-200">
                                <li className="px-4 py-2.5">
                                  Time Out:{' '}
                                  <span className="font-semibold">
                                    {filedOffset.timeOut ?? EMPTY}
                                  </span>
                                </li>
                                <li className="px-4 py-2.5">
                                  Time In:{' '}
                                  <span className="font-semibold">
                                    {filedOffset.timeIn ?? EMPTY}
                                  </span>
                                </li>
                                <li className="px-4 py-2.5">
                                  Team Leader:{' '}
                                  <span className="font-semibold">
                                    {filedOffset.teamLeader ?? EMPTY}
                                  </span>
                                </li>
                                <li className="flex items-center space-x-1 px-4 py-2.5">
                                  <span>Actions:</span>
                                  <Tippy content="View" placement="left" className="!text-xs">
                                    <Button
                                      rounded="none"
                                      className="py-0.5 px-1 text-slate-500"
                                      onClick={handleToggle}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </Tippy>
                                </li>
                              </ul>
                            </Disclosure.Panel>
                          </DisclosureTransition>
                        </motion.div>
                      )
                    }}
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
        'py-2 text-center text-xs font-medium',
        type === 'default' && 'text-slate-500',
        type === 'error' && 'bg-rose-50 text-rose-500'
      )}
    >
      {message}
    </p>
  )
}

export default MobileDisclose
