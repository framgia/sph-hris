import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import { Calendar } from 'react-feather'
import { PulseLoader } from 'react-spinners'
import React, { FC, useEffect, useState } from 'react'
import {
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'

import useLeave from '~/hooks/useLeave'
import FooterTable from './../FooterTable'
import LeaveCellDetailsTable from './Table'
import { fuzzyFilter } from '~/utils/fuzzyFilter'
import GlobalSearchFilter from './../GlobalSearchFilter'
import { getLeaveLabel } from '~/utils/createLeaveHelpers'
import { LeaveCellDetailTable } from '~/utils/types/leaveTypes'
import ModalTemplate from '~/components/templates/ModalTemplate'
import { leaveManagementColumns, myLeaveColumns } from './columns'
import { Chip } from '~/components/templates/LeaveManagementLayout'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'

type Props = {
  isOpen: boolean
  closeModal: () => void
  selectedDate: {
    month: string
    day: number
    year: number
  }
  isMyLeave?: boolean
  userId?: number | undefined
}

const LeaveCellDetailsModal: FC<Props> = (props): JSX.Element => {
  const {
    isOpen,
    closeModal,
    selectedDate: { month, day, year },
    isMyLeave,
    userId
  } = props

  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [leaveData, setLeaveData] = useState<LeaveCellDetailTable[]>()

  const dateCell: string = `${month} ${day}, ${year}`
  const isReady = !isEmpty(month) && day !== 0

  // LEAVE HOOKS -> getLeavesByDate
  const { getLeaveByDateQuery } = useLeave()
  const {
    data: leavesByDate,
    isLoading: isLeavesLoading,
    isError: isLeavesError
  } = getLeaveByDateQuery(userId as number, dateCell, isReady)

  // LEAVE HOOKS -> getLeavesByDate
  const { getYearlyLeaveByDateQuery } = useLeave()
  const {
    data: leavesByDateYearly,
    isLoading: isLeavesLoadingYearly,
    isError: isLeavesErrorYearly
  } = getYearlyLeaveByDateQuery(dateCell, isReady)

  useEffect(() => {
    if ((!isLeavesLoading && !isLeavesError) || (!isLeavesLoadingYearly && !isLeavesErrorYearly)) {
      const leaveData = leavesByDate?.leavesByDate?.table.map((item, index) => ({
        id: index + 1,
        userName: item.userName,
        typeOfLeave: getLeaveLabel(item.leaveTypeId),
        withPay: item.isWithPay ? 'With Pay' : 'WiThout Pay',
        numOfLeaves: item.numLeaves.toString(),
        reason: item.reason
      }))

      const leaveDatayearly = leavesByDateYearly?.yearlyAllLeavesByDate?.table.map(
        (item, index) => ({
          id: index + 1,
          userName: item.userName,
          typeOfLeave: getLeaveLabel(item.leaveTypeId),
          withPay: item.isWithPay ? 'With Pay' : 'WiThout Pay',
          numOfLeaves: item.numLeaves.toString(),
          reason: item.reason
        })
      )

      setLeaveData(isMyLeave === true ? leaveData : leaveDatayearly ?? [])
    }
  }, [isLeavesLoading, isLeavesLoadingYearly])

  const table = useReactTable({
    data: leaveData ?? [],
    columns: isMyLeave === true ? myLeaveColumns : leaveManagementColumns,
    // Options
    state: {
      sorting,
      globalFilter
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <ModalTemplate
      {...{
        isOpen,
        closeModal
      }}
      className={classNames('w-full', isMyLeave === true ? 'max-w-3xl' : 'max-w-4xl')}
    >
      <ModalHeader
        {...{
          title: `Leave for ${dateCell}`,
          closeModal,
          Icon: Calendar
        }}
      />
      <div className="text-sm">
        <header className="flex flex-wrap items-center justify-between gap-y-2 bg-slate-50 px-4 py-2">
          <GlobalSearchFilter
            {...{
              value: globalFilter ?? '',
              onChange: (value) => setGlobalFilter(String(value)),
              placeholder: 'Search'
            }}
          />
          <div className="inline-flex items-center space-x-2">
            <p className="text-slate-700">Total number of leaves</p>
            <Chip count={26} />
          </div>
        </header>
        {isLeavesLoading || isLeavesLoadingYearly ? (
          <div className="flex min-h-[10vh] items-center justify-center">
            <PulseLoader color="#ffb40b" size={8} />
          </div>
        ) : (
          <main className="border-t border-slate-200">
            <div className="default-scrollbar overflow-auto">
              <LeaveCellDetailsTable
                {...{
                  table,
                  query: {
                    isLoading: isLeavesLoading && isLeavesLoadingYearly,
                    isError: isLeavesError && isLeavesErrorYearly
                  },
                  isMyLeave
                }}
              />
            </div>
            <FooterTable {...{ table }} className="!bg-white text-xs" />
          </main>
        )}
      </div>
    </ModalTemplate>
  )
}

LeaveCellDetailsModal.defaultProps = {
  isMyLeave: false
}

export default LeaveCellDetailsModal
