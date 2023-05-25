import Tippy from '@tippyjs/react'
import { Eye } from 'react-feather'
import React, { useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import ShowRemarksModal from './ShowRemarksModal'
import Button from '~/components/atoms/Buttons/Button'
import CellHeader from '~/components/atoms/CellHeader'
import IsUsedChip from '~/components/atoms/IsUsedChip'
import { IFiledOffsetTable } from '~/utils/interfaces'
import RequestStatusChip from '~/components/atoms/RequestStatusChip'

const columnHelper = createColumnHelper<IFiledOffsetTable>()

export const columns = [
  columnHelper.accessor('title', {
    header: () => <CellHeader label="Title" className="!font-medium" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('timeOut', {
    header: () => <CellHeader label="Time Out" className="!font-medium" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('timeIn', {
    header: () => <CellHeader label="Time In" className="!font-medium" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('teamLeader', {
    header: () => <CellHeader label="Team Leader" className="!font-medium" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('status', {
    header: () => <CellHeader label="Status" className="!font-medium" />,
    footer: (info) => info.column.id,
    cell: (props) => <RequestStatusChip label={props.getValue()} />
  }),
  columnHelper.accessor('isUsed', {
    header: () => <CellHeader label="Is used" className="w-max !font-medium" />,
    footer: (info) => info.column.id,
    cell: (props) => <IsUsedChip label={props.getValue() ? 'true' : 'false'} />
  }),
  columnHelper.display({
    id: 'action',
    header: () => <span className="font-medium">Actions</span>,
    cell: (props) => {
      const [isOpen, setIsOpen] = useState<boolean>(false)

      const handleToggle = (): void => setIsOpen(!isOpen)

      return (
        <div className="inline-flex items-center space-x-1 rounded">
          <Tippy content="View" placement="left" className="!text-xs">
            <Button rounded="none" className="py-0.5 px-1 text-slate-500" onClick={handleToggle}>
              <Eye className="h-4 w-4" />

              {/* This will show the remarks modal */}
              {isOpen ? (
                <ShowRemarksModal
                  {...{
                    isOpen,
                    closeModal: () => handleToggle(),
                    row: props.row.original
                  }}
                />
              ) : null}
            </Button>
          </Tippy>
        </div>
      )
    },
    footer: (info) => info.column.id
  })
]
