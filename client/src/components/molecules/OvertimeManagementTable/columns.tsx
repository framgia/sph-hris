import moment from 'moment'
import Tippy from '@tippyjs/react'
import React, { useState } from 'react'
import { BsFileEarmarkText } from 'react-icons/bs'
import { ThumbsDown, ThumbsUp } from 'react-feather'
import { createColumnHelper } from '@tanstack/react-table'

import Avatar from '~/components/atoms/Avatar'
import useUserQuery from '~/hooks/useUserQuery'
import ShowRemarksModal from './ShowRemarksModal'
import { Position } from '~/utils/constants/position'
import Button from '~/components/atoms/Buttons/Button'
import CellHeader from '~/components/atoms/CellHeader'
import handleImageError from '~/utils/handleImageError'
import UpdateOvertimeModal from './UpdateOvertimeModal'
import ProjectChip from '~/components/atoms/ProjectChip'
import CellTimeValue from '~/components/atoms/CellTimeValue'
import ApproveConfirmationModal from './ApproveConfirmationModal'
import RequestStatusChip from '~/components/atoms/RequestStatusChip'
import DisapproveConfirmationModal from './DisapproveConfirmationModal'
import { IOvertimeManagement, IOvertimeManagementManager } from '~/utils/interfaces'

const columnHelper = createColumnHelper<IOvertimeManagement | IOvertimeManagementManager>()

// =====  FOR HR COLUMNS ======
export const hrColumns = [
  columnHelper.accessor('user.name', {
    header: () => <CellHeader label="Requester" />,
    footer: (info) => info.column.id,
    cell: (props) => {
      const { original: overtimeManagement } = props.row
      return (
        <div className="flex items-center space-x-2">
          <Avatar
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              handleImageError(e, '/images/default.png')
            }
            src={`${overtimeManagement.user.link}`}
            size="base"
            rounded="full"
          />
          <div className="flex flex-col items-start">
            <h1 className="font-semibold">{overtimeManagement.user.name}</h1>
            <small className="text-slate-500">{overtimeManagement.user.role.name}</small>
          </div>
        </div>
      )
    }
  }),
  columnHelper.accessor('projects', {
    header: () => <CellHeader label="Project" />,
    footer: (info) => info.column.id,
    cell: ({ row: { original } }) => <ProjectChip projects={original.projects} />
  }),
  columnHelper.accessor('date', {
    header: () => <CellHeader label="Date" />,
    footer: (info) => info.column.id,
    cell: (props) => (
      <span>{moment(new Date(props.row.original.date)).format('MMMM DD, YYYY')}</span>
    )
  }),
  columnHelper.accessor('approvedMinutes', {
    header: () => <CellHeader label="Approved Minutes" />,
    footer: (info) => info.column.id,
    cell: (props) => <CellTimeValue initialMinutes={props.row.original.approvedMinutes} />
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
    cell: (props) => <RequestStatusChip label={props.getValue()} />
  }),
  columnHelper.display({
    id: 'id',
    header: () => <span className="font-normal text-slate-500">Actions</span>,
    cell: (props) => {
      const { original: overtimeManagement } = props.row
      const [isOpenRemarksModal, setIsOpenRemarksModal] = useState<boolean>(false)
      const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false)

      const handleShowRemarksToggle = (): void => setIsOpenRemarksModal(!isOpenRemarksModal)
      const handleUpdateToggle = (): void => setIsOpenUpdateModal(!isOpenUpdateModal)

      return (
        <div className="inline-flex items-center divide-x divide-slate-300 rounded border border-slate-300">
          {/* This will be used in the future
          <Tippy placement="left" content="Edit" className="!text-xs">
            <Button
              onClick={handleUpdateToggle}
              rounded="none"
              className="py-0.5 px-1 text-slate-500"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </Tippy> */}
          <Tippy placement="left" content="View Remarks" className="!text-xs">
            <Button
              onClick={handleShowRemarksToggle}
              rounded="none"
              className="py-0.5 px-1 text-slate-500"
            >
              <BsFileEarmarkText className="h-4 w-4" />
            </Button>
          </Tippy>

          {/* This will show the remarks modal */}
          <ShowRemarksModal
            {...{
              isOpen: isOpenRemarksModal,
              closeModal: () => handleShowRemarksToggle(),
              row: overtimeManagement
            }}
          />

          {/* This will show the Update Overtime Modal */}
          <UpdateOvertimeModal
            {...{
              isOpen: isOpenUpdateModal,
              closeModal: () => handleUpdateToggle(),
              row: overtimeManagement
            }}
          />
        </div>
      )
    },
    footer: (info) => info.column.id
  })
]

// =====  FOR MANAGER COLUMNS =====
export const managerColumns = [
  columnHelper.accessor('user.name', {
    header: () => <CellHeader label="Requester" />,
    footer: (info) => info.column.id,
    cell: (props) => {
      const { original: overtimeManagement } = props.row

      return (
        <div className="flex items-center space-x-2">
          <Avatar
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              handleImageError(e, '/images/default.png')
            }
            src={`${overtimeManagement.user.link}`}
            size="base"
            rounded="full"
          />
          <div className="flex flex-col items-start">
            <h1 className="font-semibold">{overtimeManagement.user.name}</h1>
            <small className="text-slate-500">{overtimeManagement.user.role.name}</small>
          </div>
        </div>
      )
    }
  }),
  columnHelper.accessor('projects', {
    header: () => <CellHeader label="Project" />,
    footer: (info) => info.column.id,
    cell: ({ row: { original } }) => <ProjectChip projects={original.projects} />
  }),
  columnHelper.display({
    id: 'empty1',
    header: () => '',
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('date', {
    header: () => <CellHeader label="Date" />,
    footer: (info) => info.column.id,
    cell: (props) => (
      <span>{moment(new Date(props.row.original.date)).format('MMMM DD, YYYY')}</span>
    )
  }),
  columnHelper.display({
    id: 'empty2',
    header: () => '',
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('approvedMinutes', {
    header: () => <CellHeader label="Approved Minutes" />,
    footer: (info) => info.column.id
  }),
  columnHelper.display({
    id: 'empty3',
    header: () => '',
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
    cell: (props) => <RequestStatusChip label={props.getValue()} />
  }),
  columnHelper.display({
    id: 'empty4',
    header: () => '',
    footer: (info) => info.column.id
  }),
  columnHelper.display({
    id: 'id',
    header: () => <span className="font-normal text-slate-500">Actions</span>,
    cell: (props) => {
      const { original: overtimeManagement } = props.row
      const [isOpenRemarksModal, setIsOpenRemarksModal] = useState<boolean>(false)
      const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState<boolean>(false)
      const [isOpenDisapproveConfirmationModal, setIsOpenDisapproveConfirmationModal] =
        useState<boolean>(false)
      const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false)
      const { isManagerApproved } = props.row.original

      const handleUpdateToggle = (): void => setIsOpenUpdateModal(!isOpenUpdateModal)
      const handleShowRemarksToggle = (): void => setIsOpenRemarksModal(!isOpenRemarksModal)
      const handleConfirmationToggle = (): void =>
        setIsOpenConfirmationModal(!isOpenConfirmationModal)
      const handleDisapproveConfirmationToggle = (): void =>
        setIsOpenDisapproveConfirmationModal(!isOpenDisapproveConfirmationModal)

      const { handleUserQuery } = useUserQuery()
      const { data: user } = handleUserQuery()

      const positionId = user?.userById.position.id as number

      const isManager = positionId === Position.MANAGER

      const isAssistantManager = positionId === Position.ASSISTANT_MANAGER

      return (
        <div className="inline-flex items-center divide-x divide-slate-300 rounded border border-slate-300">
          {isManager && (
            <>
              <Tippy placement="left" content="Approve" className="!text-xs">
                <Button
                  rounded="none"
                  onClick={handleConfirmationToggle}
                  className="py-0.5 px-1 text-slate-500"
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
              </Tippy>
              <Tippy placement="left" content="Disapprove" className="!text-xs">
                <Button
                  rounded="none"
                  onClick={handleDisapproveConfirmationToggle}
                  className="py-0.5 px-1 text-slate-500"
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </Tippy>
            </>
          )}

          {isAssistantManager && isManagerApproved === null && (
            <>
              <Tippy placement="left" content="Approve" className="!text-xs">
                <Button
                  rounded="none"
                  onClick={handleConfirmationToggle}
                  className="py-0.5 px-1 text-slate-500"
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
              </Tippy>
              <Tippy placement="left" content="Disapprove" className="!text-xs">
                <Button
                  rounded="none"
                  onClick={handleDisapproveConfirmationToggle}
                  className="py-0.5 px-1 text-slate-500"
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </Tippy>
            </>
          )}

          <Tippy placement="left" content="View Remarks" className="!text-xs">
            <Button
              rounded="none"
              onClick={handleShowRemarksToggle}
              className="py-0.5 px-1 text-slate-500"
            >
              <BsFileEarmarkText className="h-4 w-4" />
            </Button>
          </Tippy>

          {/* This will be used in the future
          {!isManager() && isManagerApproved && (
            <>
              <Tippy placement="left" content="Edit" className="!text-xs">
                <Button
                  onClick={handleConfirmationToggle}
                  rounded="none"
                  className="py-0.5 px-1 text-slate-500"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </Tippy>
            </>
          )} */}

          {/* This will show the Approve Confirmation Modal */}
          <ApproveConfirmationModal
            {...{
              isOpen: isOpenConfirmationModal,
              closeModal: () => handleConfirmationToggle(),
              row: overtimeManagement
            }}
          />
          {/* This will show the Disapprove Confirmation Modal */}
          <DisapproveConfirmationModal
            {...{
              isOpen: isOpenDisapproveConfirmationModal,
              closeModal: () => handleDisapproveConfirmationToggle(),
              row: overtimeManagement
            }}
          />
          {/* This will show the remarks modal */}
          <ShowRemarksModal
            {...{
              isOpen: isOpenRemarksModal,
              closeModal: () => handleShowRemarksToggle(),
              row: overtimeManagement
            }}
          />
          {/* This will show the Update Overtime Modal */}
          <UpdateOvertimeModal
            {...{
              isOpen: isOpenUpdateModal,
              closeModal: () => handleUpdateToggle(),
              row: overtimeManagement
            }}
          />
        </div>
      )
    },
    footer: (info) => info.column.id
  })
]
