import Tooltip from 'rc-tooltip'
import React, { FC } from 'react'
import classNames from 'classnames'
import { Table } from '@tanstack/react-table'
import { Disclosure } from '@headlessui/react'
import { ChevronRight, Clock, Edit } from 'react-feather'

import Avatar from '~/components/atoms/Avatar'
import { IDTRManagement } from '~/utils/interfaces'
import Button from '~/components/atoms/Buttons/Button'
import Chip from '~/components/atoms/Chip'

type Props = {
  table: Table<IDTRManagement>
}

const MobileDisclose: FC<Props> = ({ table }): JSX.Element => {
  return (
    <>
      {table.getPageCount() === 0 ? (
        <div className="h-[50vh] py-3">
          <p className="text-center font-medium text-slate-500">No Available Data</p>
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
                      open ? 'bg-white' : 'hover:shadow-md',
                      row.original.status === 'Vacation Leave'
                        ? 'bg-amber-50 hover:bg-amber-50'
                        : '',
                      row.original.status === 'Absent' ? 'bg-fuchsia-50 hover:bg-fuchsia-50' : ''
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
                            <h1 className="font-semibold">{row.original.name}</h1>
                            <small className="text-slate-500">Web Developer</small>
                          </div>
                        </div>
                        <Chip label={row.original.status} />
                      </div>
                      <ChevronRight
                        className={classNames('h-4 w-4 text-slate-600', open ? 'rotate-90' : '')}
                      />
                    </div>
                  </Disclosure.Button>
                  <Disclosure.Panel
                    className={classNames('text-slate-600', open ? 'bg-white shadow-md' : '')}
                  >
                    <ul className="flex flex-col divide-y divide-slate-200">
                      <li className="px-4 py-2">
                        Time In: <span className="font-semibold">{row.original.time_in}</span>
                      </li>
                      <li className="px-4 py-2">
                        Time Out: <span className="font-semibold">{row.original.time_out}</span>
                      </li>
                      <li className="px-4 py-2">
                        Work Hours: <span className="font-semibold">{row.original.work_hours}</span>
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
}

export default MobileDisclose
