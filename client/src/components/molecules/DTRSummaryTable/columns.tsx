import React from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import SortIcon from '~/utils/icons/SortIcon'
import Avatar from '~/components/atoms/Avatar'
import { IDTRSummary } from '~/utils/interfaces'

const columnHelper = createColumnHelper<IDTRSummary>()

const CellHeader = ({ label }: { label: string }): JSX.Element => {
  return (
    <span className="group flex w-[13vw] items-center font-normal text-slate-500">
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
          <small className="text-slate-500">Web Developer</small>
        </div>
      </div>
    )
  }),
  columnHelper.accessor('leave', {
    header: () => <CellHeader label="Leave" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('absences', {
    header: () => <CellHeader label="Absences" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('late', {
    header: () => <CellHeader label="Late" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('undertime', {
    header: () => <CellHeader label="Undertime" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('overtime', {
    header: () => <CellHeader label="Overtime" />,
    footer: (info) => info.column.id
  })
]
