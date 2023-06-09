import Tippy from '@tippyjs/react'
import React, { useState } from 'react'
import { BsFileEarmarkText } from 'react-icons/bs'
import { createColumnHelper } from '@tanstack/react-table'

import ShowRemarksModal from './ShowRemarksModal'
import { IMyOvertimeTable } from '~/utils/interfaces'
import Button from '~/components/atoms/Buttons/Button'
import CellHeader from '~/components/atoms/CellHeader'
import ProjectChip from '~/components/atoms/ProjectChip'
import CellTimeValue from '~/components/atoms/CellTimeValue'
import { decimalFormatter } from '~/utils/myOvertimeHelpers'
import RequestStatusChip from '~/components/atoms/RequestStatusChip'
import { STATUS_OPTIONS } from '~/utils/constants/notificationFilter'

const columnHelper = createColumnHelper<IMyOvertimeTable>()

export const columns = [
  columnHelper.accessor('projects', {
    header: () => <CellHeader label="Projects" />,
    footer: (info) => info.column.id,
    cell: ({ row: { original } }) => <ProjectChip projects={original.projects} />
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
    cell: ({ row: { original } }) => {
      const { DISAPPROVED } = STATUS_OPTIONS
      const requestStatus = original.status
      const approvedMinutes = original.approvedMinutes

      return (
        <div>
          {requestStatus === DISAPPROVED.toLowerCase() ? (
            0
          ) : approvedMinutes !== null ? (
            <CellTimeValue initialMinutes={approvedMinutes} />
          ) : (
            <span className="italic text-slate-400">(pending approval)</span>
          )}
        </div>
      )
    }
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
    cell: ({ row: { original } }) => <RequestStatusChip label={original?.status} />
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
              <BsFileEarmarkText className="h-4 w-4" />
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
