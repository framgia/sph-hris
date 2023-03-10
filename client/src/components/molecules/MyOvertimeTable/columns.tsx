import moment from 'moment'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { Eye } from 'react-feather'
import React, { Fragment, useState } from 'react'
import { AiOutlineCaretDown } from 'react-icons/ai'
import { Listbox, Transition } from '@headlessui/react'
import { createColumnHelper } from '@tanstack/react-table'

import Chip from './Chip'
import ShowRemarksModal from './ShowRemarksModal'
import Button from '~/components/atoms/Buttons/Button'
import CellHeader from '~/components/atoms/CellHeader'
import { IMyOvertime } from '~/utils/types/overtimeTypes'
import {
  decimalFormatter,
  getApprovalStatus,
  getProjectWithNameDisplay,
  getInitialProjectNameAndLeader
} from '~/utils/myOvertimeHelpers'

const columnHelper = createColumnHelper<IMyOvertime>()

export const columns = [
  columnHelper.accessor('multiProjects', {
    header: () => <CellHeader label="Project with Leader" />,
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
            <span className="block truncate">{getInitialProjectNameAndLeader(original)}</span>
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
              {original?.multiProjects.map((option, index) => {
                return (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        'relative cursor-default select-none py-1.5 pl-5 pr-4',
                        active ? 'bg-amber-100 text-amber-900' : 'text-slate-800'
                      )
                    }
                    value={option?.id}
                  >
                    <span className="block truncate">
                      {getProjectWithNameDisplay(option, original)}
                    </span>
                  </Listbox.Option>
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
  columnHelper.accessor('overtimeDate', {
    header: () => <CellHeader label="Date" />,
    footer: (info) => info.column.id,
    cell: ({ row: { original } }) => (
      <span>{moment(new Date(original.overtimeDate)).format('MMMM DD, YYYY')}</span>
    )
  }),
  columnHelper.display({
    id: 'empty2',
    header: () => '',
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('requestedMinutes', {
    header: () => <CellHeader label="Requested Hours" />,
    footer: (info) => info.column.id,
    cell: ({ row: { original } }) => decimalFormatter(original.requestedMinutes)
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
    id: 'empty3',
    header: () => '',
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('createdAt', {
    header: () => <CellHeader label="Date Filed" />,
    footer: (info) => info.column.id,
    cell: ({ row: { original } }) => (
      <span>{moment(new Date(original.createdAt)).format('MMMM DD, YYYY')}</span>
    )
  }),
  columnHelper.accessor('isManagerApproved', {
    header: () => <CellHeader label="Status" />,
    footer: (info) => info.column.id,
    cell: ({ row: { original } }) => (
      <Chip label={getApprovalStatus(original.isLeaderApproved, original.isManagerApproved)} />
    )
  }),
  columnHelper.display({
    id: 'empty4',
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
