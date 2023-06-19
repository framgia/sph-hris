import Tippy from '@tippyjs/react'
import React, { useState } from 'react'
import { BsFileEarmarkText } from 'react-icons/bs'
import { createColumnHelper } from '@tanstack/react-table'

import ShowReasonModal from './ShowReasonModal'
import Button from '~/components/atoms/Buttons/Button'
import CellHeader from '~/components/atoms/CellHeader'
import { LeaveCellDetailTable } from '~/utils/types/leaveTypes'

const columnHelper = createColumnHelper<LeaveCellDetailTable>()

export const myLeaveColumns = [
  columnHelper.accessor('id', {
    header: () => <CellHeader label="No." className="!font-medium" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('typeOfLeave', {
    header: () => <CellHeader label="Type of leave" className="!font-medium" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('withPay', {
    header: () => <CellHeader label="Pay?" className="!font-medium" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('numOfLeaves', {
    header: () => <CellHeader label="No. of leaves" className="!font-medium" />,
    footer: (info) => info.column.id
  }),
  columnHelper.display({
    id: 'action',
    header: () => <span className="font-medium">Actions</span>,
    cell: (props) => {
      const [isOpen, setIsOpen] = useState<boolean>(false)

      const handleToggle = (): void => setIsOpen(!isOpen)

      return (
        <div className="inline-flex items-center space-x-1 rounded">
          <Tippy content="Reason" placement="left" className="!text-xs">
            <Button
              type="button"
              onClick={handleToggle}
              rounded="none"
              className="py-0.5 px-1 text-slate-500"
            >
              <BsFileEarmarkText className="h-4 w-4" />
            </Button>
          </Tippy>

          {/* Show The Reason Modal */}
          <ShowReasonModal
            {...{
              isOpen,
              closeModal: handleToggle,
              remarks: props.row.original.reason
            }}
          />
        </div>
      )
    },
    footer: (info) => info.column.id
  })
]

export const leaveManagementColumns = [
  columnHelper.accessor('id', {
    header: () => <CellHeader label="No." className="!font-medium" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('userName', {
    header: () => <CellHeader label="Name" className="!font-medium" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('typeOfLeave', {
    header: () => <CellHeader label="Type of leave" className="!font-medium" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('withPay', {
    header: () => <CellHeader label="Pay?" className="!font-medium" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('numOfLeaves', {
    header: () => <CellHeader label="No. of leaves" className="!font-medium" />,
    footer: (info) => info.column.id
  }),
  columnHelper.display({
    id: 'action',
    header: () => <span className="font-medium">Actions</span>,
    cell: (props) => {
      const [isOpen, setIsOpen] = useState<boolean>(false)

      const handleToggle = (): void => setIsOpen(!isOpen)

      return (
        <div className="inline-flex items-center space-x-1 rounded">
          <Tippy content="Reason" placement="left" className="!text-xs">
            <Button
              type="button"
              onClick={handleToggle}
              rounded="none"
              className="py-0.5 px-1 text-slate-500"
            >
              <BsFileEarmarkText className="h-4 w-4" />
            </Button>
          </Tippy>

          {/* Show The Reason Modal */}
          <ShowReasonModal
            {...{
              isOpen,
              closeModal: handleToggle,
              remarks: props.row.original.reason
            }}
          />
        </div>
      )
    },
    footer: (info) => info.column.id
  })
]
