import moment from 'moment'
import Tippy from '@tippyjs/react'
import { Eye } from 'react-feather'
import React, { useState } from 'react'
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
