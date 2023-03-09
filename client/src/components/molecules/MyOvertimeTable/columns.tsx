import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { Eye } from 'react-feather'
import React, { Fragment, useState } from 'react'
import { AiOutlineCaretDown } from 'react-icons/ai'
import { Listbox, Transition } from '@headlessui/react'
import { createColumnHelper } from '@tanstack/react-table'

import Chip from './Chip'
import ShowRemarksModal from './ShowRemarksModal'
import { IMyOvertimeTable } from '~/utils/interfaces'
import Button from '~/components/atoms/Buttons/Button'
import CellHeader from '~/components/atoms/CellHeader'
import { decimalFormatter } from '~/utils/myOvertimeHelpers'

const columnHelper = createColumnHelper<IMyOvertimeTable>()

export const columns = [
  columnHelper.accessor('projects', {
    header: () => <CellHeader label="Projects" />,
    footer: (info) => info.column.id,
    cell: ({ row: { original } }) => (
      <Listbox>
        <div className="relative mt-1">
          <Listbox.Button
            className={classNames(
              'flex items-center space-x-2',
              'text-xs outline-none focus:scale-95'
            )}
          >
            <span className="block truncate">{original.projects[0].project_name?.label}</span>
            <AiOutlineCaretDown className="h-3 w-3 text-gray-400" aria-hidden="true" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={classNames(
                'absolute z-50 mt-1 max-h-40 w-full overflow-auto rounded-md bg-white',
                'py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
              )}
            >
              {original.projects.map((option, index) => {
                const projectName = option.project_name.label
                const otherProjects =
                  option.project_name.label !== 'Others' && option.project_name.label.split(',')

                return (
                  <div key={index}>
                    {typeof otherProjects === 'object' && projectName !== '' ? (
                      <>
                        {otherProjects.map((val, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              classNames(
                                'relative cursor-default select-none py-2 pl-5 pr-4',
                                active ? 'bg-amber-100 text-amber-900' : 'text-slate-800'
                              )
                            }
                            value={option.project_name.value}
                          >
                            {({ selected }) => (
                              <span
                                className={classNames(
                                  'block',
                                  selected ? 'font-medium' : 'font-normal'
                                )}
                              >
                                {val}
                              </span>
                            )}
                          </Listbox.Option>
                        ))}
                      </>
                    ) : null}
                  </div>
                )
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    )
  }),
  columnHelper.display({
    id: 'empty1',
    header: () => '',
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('date', {
    header: () => <CellHeader label="Date" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('requestedHours', {
    header: () => <CellHeader label="Requested Hours" />,
    footer: (info) => info.column.id,
    cell: ({ row: { original } }) => decimalFormatter(original.requestedHours)
  }),
  columnHelper.accessor('supervisor', {
    header: () => <CellHeader label="Supervisor" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('approvedMinutes', {
    header: () => <CellHeader label="Approved Minutes" />,
    footer: (info) => info.column.id,
    cell: ({ row: { original } }) => (
      <div>
        {original.approvedMinutes ?? (
          <span className="italic text-slate-400">(pending approval)</span>
        )}
      </div>
    )
  }),
  columnHelper.display({
    id: 'empty2',
    header: () => '',
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('dateFiled', {
    header: () => <CellHeader label="Date Filed" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('status', {
    header: () => <CellHeader label="Status" />,
    footer: (info) => info.column.id,
    cell: ({ row: { original } }) => <Chip label={original?.status} />
  }),
  columnHelper.display({
    id: 'empty3',
    header: () => '',
    footer: (info) => info.column.id
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <span className="font-normal text-slate-500">Actions</span>,
    cell: (props) => {
      const [isOpen, setIsOpen] = useState<boolean>(false)

      const handleToggle = (): void => setIsOpen(!isOpen)

      return (
        <div className="inline-flex rounded border border-slate-300">
          <Tippy placement="left" content="View Remarks" className="!text-xs">
            <Button onClick={handleToggle} rounded="none" className="py-0.5 px-1 text-slate-500">
              <Eye className="h-4 w-4" />
            </Button>
          </Tippy>

          {/* This will show the remarks modal */}
          <ShowRemarksModal
            {...{
              isOpen,
              closeModal: () => handleToggle(),
              row: props.row.original
            }}
          />
        </div>
      )
    },
    footer: (info) => info.column.id
  })
]
