import React from 'react'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { Edit, Trash2 } from 'react-feather'
import { createColumnHelper } from '@tanstack/react-table'

import SortIcon from '~/utils/icons/SortIcon'
import Avatar from '~/components/atoms/Avatar'
import { IEmployeeManagement } from '~/utils/interfaces'
import Button from '~/components/atoms/Buttons/Button'

const columnHelper = createColumnHelper<IEmployeeManagement>()

const CellHeader = ({ label }: { label: string }): JSX.Element => {
  return (
    <span className="group flex w-[14.7vw] items-center font-normal text-slate-500">
      {label}
      <SortIcon className="ml-2 h-3 w-3 shrink-0 fill-current group-active:scale-95" />
    </span>
  )
}

export const columns = [
  columnHelper.accessor('name', {
    header: () => <CellHeader label="Name" />,
    footer: (info) => info.column.id,
    cell: (props) => (
      <div className="flex items-center space-x-2">
        <Avatar
          src={`https://placeimg.com/640/480/abstract/${props.row.id}`}
          size="base"
          rounded="full"
        />
        <div className="flex flex-col items-start">
          <h1 className="font-semibold">{props.getValue()}</h1>
          <small className="text-slate-500">Member</small>
        </div>
      </div>
    )
  }),
  columnHelper.accessor('email', {
    header: () => <CellHeader label="Email" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('position', {
    header: () => <CellHeader label="Position" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('date_joined', {
    header: () => <CellHeader label="Date Joined" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('status', {
    id: 'Status',
    header: () => <CellHeader label="Status" />,
    footer: (info) => info.column.id,
    cell: (props) => {
      const { original: employee } = props.row

      return (
        <>
          <div className="relative flex">
            <span
              className={classNames(
                'py-0.25  ml-1 rounded-full border  px-1.5',
                employee.status === 'Active' && 'border-green-200 bg-green-50 text-green-600',
                employee.status === 'Inactive' && 'border-rose-200 bg-rose-50 text-rose-600'
              )}
            >
              {employee.status}
            </span>
          </div>
        </>
      )
    }
  }),
  columnHelper.display({
    id: 'id',
    header: () => <span className="font-normal text-slate-500">Actions</span>,
    cell: () => {
      return (
        <div className="inline-flex items-center divide-x divide-slate-300 rounded border border-slate-300">
          <Tippy content="Delete" className="!text-xs">
            <Button rounded="none" className="py-0.5 px-1 text-slate-500">
              <Trash2 className="h-4 w-4" />
            </Button>
          </Tippy>
          <Tippy content="Edit" className="!text-xs">
            <Button rounded="none" className="py-0.5 px-1 text-slate-500">
              <Edit className="h-4 w-4" />
            </Button>
          </Tippy>
        </div>
      )
    },
    footer: (info) => info.column.id
  })
]
