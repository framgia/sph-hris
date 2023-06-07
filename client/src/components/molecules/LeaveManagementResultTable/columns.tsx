import moment from 'moment'
import { omit } from 'lodash'
import classNames from 'classnames'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Menu } from '@headlessui/react'
import { createColumnHelper } from '@tanstack/react-table'

import { Edit, MoreVertical, X } from 'react-feather'
import { getLeaveType } from '~/utils/getLeaveType'
import { LeaveTable } from '~/utils/types/leaveTypes'
import { Pathname } from '~/utils/constants/pathnames'
import CellHeader from '~/components/atoms/CellHeader'
import WorkStatusChip from '~/components/atoms/WorkStatusChip'
import MenuTransition from '~/components/templates/MenuTransition'
import EditLeaveModal from '~/components/molecules/EditLeaveModal'
import { LeaveStatus } from '~/utils/constants/leaveStatus'

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
      const menuItemButton = 'flex px-3 py-2 text-left text-xs hover:text-slate-700 text-slate-500'
      const [isOpen, setIsOpen] = useState<boolean>(false)
      const leaveId = props.row.original.leaveId
      const router = useRouter()
      const { pathname } = router
      const isMyLeavePage = pathname === Pathname.MyLeavesPath

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
                    'absolute top-7 right-0 z-50 flex w-44 flex-col divide-y divide-slate-200 overflow-hidden rounded-md',
                    'bg-white py-0.5 shadow-xl shadow-slate-200 ring-1 ring-black ring-opacity-5 focus:outline-none'
                  )}
                >
                  <Menu.Item>
                    <button className={menuItemButton} onClick={() => handleEdit()}>
                      <Edit className="mr-0.5 h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button className={menuItemButton} onClick={() => alert('Cancel')}>
                      <X className="mr-1 h-4 w-4" />
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
