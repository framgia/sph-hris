import React, { FC } from 'react'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { Table } from '@tanstack/react-table'
import { Disclosure } from '@headlessui/react'
import { ChevronRight, Edit, Trash2 } from 'react-feather'

import Avatar from '~/components/atoms/Avatar'
import Button from '~/components/atoms/Buttons/Button'
import handleImageError from '~/utils/handleImageError'
import { IEmployeeManagement } from '~/utils/interfaces'
import { WorkStatus } from '~/utils/constants/work-status'
import { variants } from '~/utils/constants/animationVariants'
import DisclosureTransition from '~/components/templates/DisclosureTransition'

type Props = {
  table: Table<IEmployeeManagement>
}

const MobileDisclose: FC<Props> = ({ table }): JSX.Element => {
  return (
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
                <motion.div variants={variants} initial="initial" animate="animate" exit="exit">
                  <Disclosure.Button
                    className={classNames(
                      'w-full border-b border-slate-200 py-2 px-4 hover:bg-white',
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
                        <div className="flex items-center space-x-2">
                          <Avatar
                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
                              handleImageError(e, '/images/default.png')
                            }
                            src={`https://placeimg.com/640/480/abstract/${row.id}`}
                            size="base"
                            rounded="full"
                          />
                          <div className="flex flex-col items-start">
                            <h1 className="font-semibold">{row.original.name}</h1>
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
                        open ? 'bg-white shadow-md shadow-slate-200' : ''
                      )}
                    >
                      <ul className="flex flex-col divide-y divide-slate-200">
                        <li className="px-4 py-2">
                          Email: <span className="font-semibold">{row.original.email}</span>
                        </li>
                        <li className="px-4 py-2">
                          Position: <span className="font-semibold">{row.original.position}</span>
                        </li>
                        <li className="px-4 py-2">
                          Date Joined:{' '}
                          <span className="font-semibold">{row.original.date_joined}</span>
                        </li>
                        <li className="inline-flex items-center px-4 py-2 md:py-3">
                          Status:{' '}
                          <span
                            className={classNames(
                              'py-0.25  ml-1 rounded-full border  px-1.5',
                              row.original.status === 'Active' &&
                                'border-green-200 bg-green-50 text-green-600',
                              row.original.status === 'Inactive' &&
                                'border-rose-200 bg-rose-50 text-rose-600'
                            )}
                          >
                            {row.original.status}
                          </span>
                        </li>
                        <li className="flex items-center space-x-2 px-4 py-2">
                          <span>Actions:</span>
                          <div className="inline-flex items-center divide-x divide-slate-300 rounded border border-slate-300">
                            <Tippy placement="left" content="Time Entries" className="!text-xs">
                              <Button rounded="none" className="py-0.5 px-1 text-slate-500">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </Tippy>
                            <Tippy placement="left" content="Edit" className="!text-xs">
                              <Button rounded="none" className="py-0.5 px-1 text-slate-500">
                                <Edit className="h-4 w-4" />
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
