import moment from 'moment'
import Tippy from '@tippyjs/react'
import React, { useState } from 'react'
import { Check, Edit, Eye, X } from 'react-feather'
import { createColumnHelper } from '@tanstack/react-table'

import Chip from './Chip'
import Avatar from '~/components/atoms/Avatar'
import ShowRemarksModal from './ShowRemarksModal'
import Button from '~/components/atoms/Buttons/Button'
import CellHeader from '~/components/atoms/CellHeader'
import { IOvertimeManagement } from '~/utils/interfaces'
import ApproveConfirmationModal from './ApproveConfirmationModal'

const columnHelper = createColumnHelper<IOvertimeManagement>()

export const columns = [
  columnHelper.accessor('user.name', {
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
          <h1 className="font-semibold">{props.row.original.user.name}</h1>
          <small className="text-slate-500">{props.row.original.user.role.name}</small>
        </div>
      </div>
    )
  }),
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
      const [isOpenRemarksModal, setIsOpenRemarksModal] = useState<boolean>(false)
      const [isOpenApproveConfirmationModal, setIsOpenApproveConfirmationModal] =
        useState<boolean>(false)

      const handleShowRemarksToggle = (): void => setIsOpenRemarksModal(!isOpenRemarksModal)
      const handleApproveConfirmationToggle = (): void =>
        setIsOpenApproveConfirmationModal(!isOpenApproveConfirmationModal)

      return (
        <div className="inline-flex items-center divide-x divide-slate-300 rounded border border-slate-300">
          <Tippy placement="left" content="Approved" className="!text-xs">
            <Button
              onClick={handleApproveConfirmationToggle}
              rounded="none"
              className="py-0.5 px-1 text-slate-500"
            >
              <Check className="h-4 w-4" />
            </Button>
          </Tippy>
          <Tippy placement="left" content="Disapproved" className="!text-xs">
            <Button
              onClick={() => alert(JSON.stringify(props.row.original, null, 2))}
              rounded="none"
              className="py-0.5 px-1 text-slate-500"
            >
              <X className="h-4 w-4" />
            </Button>
          </Tippy>
          <Tippy placement="left" content="Edit" className="!text-xs">
            <Button
              onClick={() => alert(JSON.stringify(props.row.original, null, 2))}
              rounded="none"
              className="py-0.5 px-1 text-slate-500"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </Tippy>
          <Tippy placement="left" content="View Remarks" className="!text-xs">
            <Button
              onClick={handleShowRemarksToggle}
              rounded="none"
              className="py-0.5 px-1 text-slate-500"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </Tippy>

          {/* This will show the remarks modal */}
          <ShowRemarksModal
            {...{
              isOpen: isOpenRemarksModal,
              closeModal: () => handleShowRemarksToggle(),
              row: props.row.original
            }}
          />

          {/* This will show the Approve Confirmation Modal */}
          <ApproveConfirmationModal
            {...{
              isOpen: isOpenApproveConfirmationModal,
              closeModal: () => handleApproveConfirmationToggle(),
              row: props.row.original
            }}
          />
        </div>
      )
    },
    footer: (info) => info.column.id
  })
]
