import React from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import Avatar from '~/components/atoms/Avatar'
import CellHeader from '~/components/atoms/CellHeader'
import handleImageError from '~/utils/handleImageError'
import CellTimeValue from '~/components/atoms/CellTimeValue'
import { ITimesheetSummary } from '~/utils/types/timeEntryTypes'

const columnHelper = createColumnHelper<ITimesheetSummary>()

export const columns = [
  columnHelper.accessor('user.name', {
    header: () => <CellHeader label="Name" />,
    footer: (info) => info.column.id,
    cell: (props) => {
      const { avatarLink } = props.row.original.user

      return (
        <div className="flex items-center space-x-2">
          <Avatar
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              handleImageError(e, '/images/default.png')
            }
            src={`${avatarLink}`}
            size="base"
            rounded="full"
          />
          <div className="flex flex-col items-start">
            <h1 className="font-semibold">{props.getValue()}</h1>
            <small className="text-slate-500">Web Developer</small>
          </div>
        </div>
      )
    }
  }),
  columnHelper.display({
    id: 'id',
    header: () => <CellHeader label="Leave(days)" />,
    cell: (props) => {
      const { original: summary } = props.row
      return <span>{Number(summary.leave.toFixed(4))}</span>
    },
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('absences', {
    header: () => <CellHeader label="Absences" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('late', {
    header: () => <CellHeader label="Late" />,
    footer: (info) => info.column.id,
    cell: (props) => <CellTimeValue initialMinutes={props.row.original.late} />
  }),
  columnHelper.accessor('undertime', {
    header: () => <CellHeader label="Undertime(min)" />,
    footer: (info) => info.column.id,
    cell: (props) => <CellTimeValue initialMinutes={props.row.original.undertime} />
  }),
  columnHelper.accessor('overtime', {
    header: () => <CellHeader label="Overtime(min)" />,
    footer: (info) => info.column.id,
    cell: (props) => <CellTimeValue initialMinutes={props.row.original.overtime} />
  })
]
