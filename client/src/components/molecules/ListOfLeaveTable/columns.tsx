import Tippy from '@tippyjs/react'
import React, { useState } from 'react'
import { Edit, Eye } from 'react-feather'
import { createColumnHelper } from '@tanstack/react-table'

import Avatar from '~/components/atoms/Avatar'
import ShowReasonModal from './ShowReasonModal'
import { IListOfLeave } from '~/utils/interfaces'
import CellHeader from '~/components/atoms/CellHeader'
import Button from '~/components/atoms/Buttons/Button'

const columnHelper = createColumnHelper<IListOfLeave>()

export const columns = [
  columnHelper.accessor('name', {
    header: () => <CellHeader label="Name" />,
    footer: (info) => info.column.id,
    cell: (props) => {
      const { avatar } = props.row.original

      return (
        <div className="flex items-center space-x-2">
          <Avatar src={`${avatar}`} size="base" rounded="full" />
          <div className="flex flex-col items-start">
            <h1 className="font-semibold">{props.getValue()}</h1>
            <small className="text-slate-500">Web Developer</small>
          </div>
        </div>
      )
    }
  }),
  columnHelper.accessor('project', {
    id: 'Project',
    header: () => <CellHeader label="Project" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('leaveDate', {
    header: () => <CellHeader label="Leave Date(s)" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('type', {
    header: () => <CellHeader label="Type" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('isWithPay', {
    header: () => <CellHeader label="With Pay" />,
    footer: (info) => info.column.id,
    cell: (props) => <div>{props.row.original.isWithPay ? 'Yes' : 'No'}</div>
  }),
  columnHelper.accessor('manager', {
    header: () => <CellHeader label="Manager" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('projectLeader', {
    header: () => <CellHeader label="Project Leader" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('totalUndertime', {
    header: () => <CellHeader label="Total Undertime (Mins)" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('totalLeaves', {
    header: () => <CellHeader label="Total leaves (Days)" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('dateFiled', {
    header: () => <CellHeader label="Date Filed" />,
    footer: (info) => info.column.id
  }),
  columnHelper.display({
    id: 'id',
    header: () => <span className="font-normal text-slate-500">Actions</span>,
    cell: (props) => {
      const [isOpenListOfLeave, setOpenListOfLeave] = useState<boolean>(false)

      const handleListOfLeaveToggle = (): void => {
        void setOpenListOfLeave(!isOpenListOfLeave)
      }

      return (
        <div className="inline-flex items-center divide-x divide-slate-300 rounded border border-slate-300">
          <Tippy content="View Reason" placement="left" className="!text-xs">
            <Button
              onClick={() => handleListOfLeaveToggle()}
              rounded="none"
              className="py-0.5 px-1 text-slate-500"
            >
              <Eye className="h-4 w-4" />
              {/* This will show the Remarks Modal */}
              {isOpenListOfLeave ? (
                <ShowReasonModal
                  {...{
                    isOpen: isOpenListOfLeave,
                    closeModal: handleListOfLeaveToggle,
                    remarks: props.row.original
                  }}
                />
              ) : null}
            </Button>
          </Tippy>
          <Tippy content="Edit" placement="left" className="!text-xs">
            <Button
              onClick={() => alert(props.row.id)}
              rounded="none"
              className="py-0.5 px-1 text-slate-500"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </Tippy>
        </div>
      )
    },
    footer: (info) => info.column.id
  })
]
