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
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
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
  const [totNumFiledLeaves, setTotNumFiledLeaves] = useState<number>()
  const [leaveData, setLeaveData] = useState<LeaveCellDetailTable[]>()

  const dateCell: string = `${month} ${day}, ${year}`
  const isReady = !isEmpty(month) && day !== 0 && isMyLeave === true // Query will enable on My Leaves Page
  const isReadyYearly = isMyLeave === false // Query will enable on Leave Summary and Yearly Summary

  // LEAVE HOOKS -> getLeavesByDate
  const { getLeaveByDateQuery } = useLeave()
  const {
    data: leavesByDate,
    isLoading: isLeavesLoading,
    isError: isLeavesError,
    isFetching
  } = getLeaveByDateQuery(userId as number, dateCell, isOpen)

  // LEAVE HOOKS -> getLeavesByDateYearly
  const { getYearlyLeaveByDateQuery } = useLeave()
  const {
    data: leavesByDateYearly,
    isLoading: isLeavesLoadingYearly,
    isError: isLeavesErrorYearly,
    isFetching: isFetchingYearly
  } = getYearlyLeaveByDateQuery(dateCell, isReadyYearly)

  const fetchStatus = isMyLeave === true ? !isFetching : !isFetchingYearly

  useEffect(() => {
    if (isReady && isOpen && fetchStatus) {
      const leaveData = leavesByDate?.leavesByDate?.table.map((item, index) => ({
        id: index + 1,
        userName: item.userName,
        typeOfLeave: getLeaveLabel(item.leaveTypeId),
        withPay: item.isWithPay ? 'With Pay' : 'Without Pay',
        numOfLeaves: parseFloat(item.numLeaves.toFixed(3)).toString(),
        reason: item.reason
      }))

      setTotNumFiledLeaves(leavesByDate?.leavesByDate?.totalNumberOfFiledLeaves)
      setLeaveData(leaveData ?? [])
    }
  }, [isLeavesLoading, isOpen, fetchStatus])

  useEffect(() => {
    if (isReadyYearly && isOpen && fetchStatus) {
      const leaveDatayearly = leavesByDateYearly?.yearlyAllLeavesByDate?.table.map(
        (item, index) => ({
          id: index + 1,
          userName: item.userName,
          typeOfLeave: getLeaveLabel(item.leaveTypeId),
          withPay: item.isWithPay ? 'With Pay' : 'Without Pay',
          numOfLeaves: parseFloat(item.numLeaves.toFixed(3)).toString(),
          reason: item.reason
        })
      )
      setTotNumFiledLeaves(leavesByDateYearly?.yearlyAllLeavesByDate?.totalNumberOfFiledLeaves ?? 0)
      setLeaveData(leaveDatayearly ?? [])
    }
  }, [isLeavesLoadingYearly, isOpen, fetchStatus])

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
        isOpen: isOpen && fetchStatus,
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
            <p className="text-slate-700">Total number of filed leaves</p>
            {isLeavesLoading && isLeavesLoadingYearly ? (
              <SpinnerIcon className="h-4 w-4 fill-amber-500" />
            ) : (
              <Chip count={totNumFiledLeaves} />
            )}
          </div>
        </header>
        {isLeavesLoading && isLeavesLoadingYearly ? (
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
