import moment from 'moment'
import { omit } from 'lodash'
import classNames from 'classnames'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Menu } from '@headlessui/react'
import { createColumnHelper } from '@tanstack/react-table'

import toast from 'react-hot-toast'
import useLeave from '~/hooks/useLeave'
import Card from '~/components/atoms/Card'
import { queryClient } from '~/lib/queryClient'
import { confirmAlert } from 'react-confirm-alert'
import { getLeaveType } from '~/utils/getLeaveType'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import { Edit, MoreVertical, X } from 'react-feather'
import { LeaveTable } from '~/utils/types/leaveTypes'
import { Pathname } from '~/utils/constants/pathnames'
import CellHeader from '~/components/atoms/CellHeader'
import { LeaveStatus } from '~/utils/constants/leaveStatus'
import WorkStatusChip from '~/components/atoms/WorkStatusChip'
import MenuTransition from '~/components/templates/MenuTransition'
import EditLeaveModal from '~/components/molecules/EditLeaveModal'
import ButtonAction from '~/components/atoms/Buttons/ButtonAction'

const columnHelper = createColumnHelper<LeaveTable>()

export const columns = [
  columnHelper.accessor('date', {
    header: () => <CellHeader label="Date" className="text-xs text-slate-500" />,
    cell: (props) => moment(props.getValue()).format('MMMM D, YYYY'),
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('status', {
    header: () => <CellHeader label="Status" className="text-xs text-slate-500" />,
    cell: (props) => <WorkStatusChip label={props.getValue()?.toLowerCase()} />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('userName', {
    header: () => {
      const router = useRouter()
      const { pathname } = router
      const isYearlyPage = pathname === Pathname.YearlySummaryLeavesPath

      if (isYearlyPage) {
        return <CellHeader label="Name" className="text-xs text-slate-500" />
      }

      return null
    },
    cell: (props) => {
      const router = useRouter()
      const { pathname } = router
      const isYearlyPage = pathname === Pathname.YearlySummaryLeavesPath

      if (isYearlyPage) {
        return props.getValue()
      }

      return null
    },
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('leaveTypeId', {
    header: () => <CellHeader label="Type of leave" className="text-xs text-slate-500" />,
    cell: (props) => getLeaveType(props.getValue()),
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('isWithPay', {
    header: () => <span className="text-xs font-normal text-slate-500">Pay?</span>,
    cell: (props) => (props.getValue() ? 'With Pay' : 'Without Pay'),
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('reason', {
    header: () => <CellHeader label="Reason" className="text-xs text-slate-500" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('numLeaves', {
    header: () => <CellHeader label="No. of leaves" className="text-xs text-slate-500" />,
    cell: (props) => parseFloat(props.getValue().toFixed(3)) * 1,
    footer: (info) => info.column.id
  }),
  columnHelper.display({
    id: 'id',
    header: () => {
      const router = useRouter()
      const { pathname } = router
      const isMyLeavePage = pathname === Pathname.MyLeavesPath

      if (isMyLeavePage) {
        return <span className="text-xs font-normal text-slate-500">Actions</span>
      }

      return null
    },
    cell: (props) => {
      const router = useRouter()
      const { pathname } = router
      const { year } = router.query
      const { userId } = props.row.original
      const leaveId = props.row.original.leaveId
      const { handleCancelLeaveMutation } = useLeave()
      const [isOpen, setIsOpen] = useState<boolean>(false)
      const isMyLeavePage = pathname === Pathname.MyLeavesPath
      const useCancelLeaveMutation = handleCancelLeaveMutation(userId, leaveId)
      const menuItemButton = 'flex px-3 py-2 text-left text-xs hover:text-slate-700 text-slate-500'

      const isPending =
        props.row.original.status.toLowerCase() === LeaveStatus.PENDING.toLowerCase()

      // Close the Edit Modal
      const handleToggle = (): void => {
        setIsOpen(!isOpen)
        removeQueryParam('leaveId')
      }

      // Open the Edit Modal
      const handleEdit = (): void => {
        setIsOpen(!isOpen)
        addOrUpdateQueryParam('leaveId', `${leaveId}`)
      }

      // Function to remove query parameter
      const removeQueryParam = (key: string): void => {
        const { pathname, query } = router
        const updatedQuery = omit(query, key)
        void router.push({ pathname, query: updatedQuery })
      }

      const handleConfirmCancelLeave = (userId: number, leaveId: number): void => {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <Card className="w-full max-w-[350px] px-8 py-6 shadow-none" rounded="lg">
                <h1 className="text-center text-xl font-bold text-rose-500">Confirmation</h1>
                <p className="mt-4 text-sm font-normal text-slate-600">
                  Are you sure you want to cancel this leave request?
                </p>
                <div className="mt-6 flex items-center justify-center space-x-2 text-white">
                  <ButtonAction
                    disabled={useCancelLeaveMutation.isLoading}
                    onClick={() => {
                      void useCancelLeaveMutation.mutate(
                        { userId, leaveId },
                        {
                          onSuccess: ({ cancelLeave }) => {
                            void queryClient
                              .invalidateQueries({
                                queryKey: ['GET_MY_LEAVES_QUERY', userId, Number(year)]
                              })
                              .then(() => {
                                toast.success(cancelLeave)
                              })
                          }
                        }
                      )
                      return onClose()
                    }}
                    variant="danger"
                    className="w-full py-1 px-4"
                  >
                    {useCancelLeaveMutation.isLoading && (
                      <SpinnerIcon className=" mr-2 fill-gray-500" />
                    )}
                    Yes
                  </ButtonAction>
                  <ButtonAction
                    onClick={onClose}
                    variant="secondary"
                    className="w-full py-1 px-4 text-slate-500"
                  >
                    No
                  </ButtonAction>
                </div>
              </Card>
            )
          }
        })
      }

      // Function to update query parameter
      const addOrUpdateQueryParam = (key: string, value: string): void => {
        const { pathname, query } = router
        query[key] = value
        void router.push({ pathname, query })
      }

      if (isMyLeavePage) {
        return (
          <div
            className={classNames(
              'inline-flex divide-x divide-slate-300 rounded border',
              'border-transparent group-hover:border-slate-300'
            )}
          >
            <EditLeaveModal
              {...{
                isOpen,
                closeModal: handleToggle
              }}
            />
            <Menu as="div" className="relative w-full">
              {isPending && (
                <Menu.Button className="p-0.5 text-slate-500 outline-none">
                  <MoreVertical className="h-4" />
                </Menu.Button>
              )}
              <MenuTransition>
                <Menu.Items
                  className={classNames(
                    'absolute top-7 right-0 z-50 flex w-fit flex-col divide-y divide-slate-200 overflow-hidden rounded-md',
                    'bg-white py-0.5 shadow-xl shadow-slate-200 ring-1 ring-black ring-opacity-5 focus:outline-none'
                  )}
                >
                  <Menu.Item>
                    <button
                      className={`${menuItemButton} space-x-1 pl-2`}
                      onClick={() => handleEdit()}
                    >
                      <Edit className="jw-3.5 h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      className={`${menuItemButton} space-x-1 pl-2`}
                      onClick={() => handleConfirmCancelLeave(userId, leaveId)}
                    >
                      <X className=" h-3.5 w-3.5" />
                      <span>Cancel</span>
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </MenuTransition>
            </Menu>
          </div>
        )
      }

      return null
    },
    footer: (info) => info.column.id
  })
]
