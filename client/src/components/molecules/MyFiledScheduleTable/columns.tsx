import moment from 'moment'
import Tippy from '@tippyjs/react'
import { Eye } from 'react-feather'
import React, { useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import ViewScheduleModal from './ViewScheduleModal'
import Button from '~/components/atoms/Buttons/Button'
import CellHeader from '~/components/atoms/CellHeader'
import { IMyFiledScheduleData } from '~/utils/interfaces'
import RequestStatusChip from '~/components/atoms/RequestStatusChip'

const columnHelper = createColumnHelper<IMyFiledScheduleData>()

export const columns = [
  columnHelper.accessor('id', {
    header: () => <CellHeader label="No." />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('dateFiled', {
    header: () => <CellHeader label="Date Filed" />,
    footer: (info) => info.column.id,
    cell: ({ row: { original } }) => moment(original.dateFiled).format('MMMM DD, YYYY')
  }),
  columnHelper.accessor('status', {
    header: () => <CellHeader label="Status" />,
    footer: (info) => info.column.id,
    cell: (props) => <RequestStatusChip label={props.getValue()} />
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <span className="font-normal text-slate-500">Actions</span>,
    cell: (props) => {
      const [isOpen, setIsOpen] = useState<boolean>(false)
      const handleToggle = (): void => setIsOpen(!isOpen)

      return (
        <div className="inline-flex rounded border border-slate-300">
          <Tippy placement="left" content="View Schedule Modal" className="!text-xs">
            <Button onClick={handleToggle} rounded="none" className="py-0.5 px-1 text-slate-500">
              <Eye className="h-4 w-4" />
            </Button>
          </Tippy>

          {isOpen ? (
            <ViewScheduleModal
              {...{
                isOpen,
                closeModal: handleToggle,
                schedule: props.row.original
              }}
            />
          ) : null}
        </div>
      )
    },
    footer: (info) => info.column.id
  })
]
