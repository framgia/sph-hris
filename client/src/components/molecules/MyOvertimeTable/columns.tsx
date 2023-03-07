import moment from 'moment'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { Eye } from 'react-feather'
import React, { Fragment, useState } from 'react'
import { AiOutlineCaretDown } from 'react-icons/ai'
import { Listbox, Transition } from '@headlessui/react'
import { createColumnHelper } from '@tanstack/react-table'

import Chip from './Chip'
import { IMyOvertime } from '~/utils/interfaces'
import ShowRemarksModal from './ShowRemarksModal'
import Button from '~/components/atoms/Buttons/Button'
import CellHeader from '~/components/atoms/CellHeader'

const columnHelper = createColumnHelper<IMyOvertime>()

export const columns = [
  columnHelper.accessor('project', {
    header: () => <CellHeader label="Project" />,
    footer: (info) => info.column.id,
    cell: (props) => {
      const { original: overtime } = props.row

      return (
        <Listbox value={overtime.project[0].value}>
          <div className="relative mt-1">
            <Listbox.Button
              className={classNames(
                'flex items-center space-x-2',
                'text-xs outline-none focus:scale-95'
              )}
            >
              <span className="block truncate">{overtime.project[0].label}</span>
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
                {overtime.project.map(({ label, value }, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        'relative cursor-default select-none py-2 pl-5 pr-4',
                        active ? 'bg-amber-100 text-amber-900' : 'text-slate-800'
                      )
                    }
                    value={value}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={classNames(
                            'block truncate',
                            selected ? 'font-medium' : 'font-normal'
                          )}
                        >
                          {label}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      )
    }
  }),
  columnHelper.display({
    id: 'empty1',
    header: () => '',
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('date', {
    header: () => <CellHeader label="Date" />,
    footer: (info) => info.column.id,
    cell: (props) => (
      <span>{moment(new Date(props.row.original.date)).format('MMMM DD, YYYY')}</span>
    )
  }),
  columnHelper.accessor('overtimeIn', {
    header: () => <CellHeader label="Overtime in" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('overtimeOut', {
    header: () => <CellHeader label="Overtime Out" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('requestedHours', {
    header: () => <CellHeader label="Requested Hours" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('supervisor', {
    header: () => <CellHeader label="Supervisor" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('dateFiled', {
    header: () => <CellHeader label="Date Filed" />,
    footer: (info) => info.column.id,
    cell: (props) => (
      <span>{moment(new Date(props.row.original.dateFiled)).format('MMMM DD, YYYY')}</span>
    )
  }),
  columnHelper.accessor('status', {
    header: () => <CellHeader label="Status" />,
    footer: (info) => info.column.id,
    cell: (props) => <Chip label={props.getValue()} />
  }),
  columnHelper.display({
    id: 'empty2',
    header: () => '',
    footer: (info) => info.column.id
  }),
  columnHelper.display({
    id: 'id',
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
