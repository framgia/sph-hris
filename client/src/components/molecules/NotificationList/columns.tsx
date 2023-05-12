import React from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import SortIcon from '~/utils/icons/SortIcon'
import Avatar from '~/components/atoms/Avatar'
import { INotification } from '~/utils/interfaces'
import handleImageError from '~/utils/handleImageError'

const columnHelper = createColumnHelper<INotification>()

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
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
            handleImageError(e, '/images/default.png')
          }
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
  columnHelper.accessor('type', {
    header: () => <CellHeader label="Type" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('date', {
    header: () => <CellHeader label="Date" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('duration', {
    header: () => <CellHeader label="Duration" />,
    footer: (info) => info.column.id
  })
]
