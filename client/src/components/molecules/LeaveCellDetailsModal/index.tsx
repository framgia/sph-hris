import { Calendar } from 'react-feather'
import React, { FC, useState } from 'react'
import {
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'

import { columns } from './columns'
import FooterTable from './../FooterTable'
import LeaveCellDetailsTable from './Table'
import { fuzzyFilter } from '~/utils/fuzzyFilter'
import GlobalSearchFilter from './../GlobalSearchFilter'
import ModalTemplate from '~/components/templates/ModalTemplate'
import { Chip } from '~/components/templates/LeaveManagementLayout'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import { dummyCellDetailsData } from '~/utils/constants/dummyMyLeaveCellDetails'

type Props = {
  isOpen: boolean
  closeModal: () => void
  selectedDate: {
    month: string
    day: number
    year: number
  }
}

const LeaveCellDetailsModal: FC<Props> = (props): JSX.Element => {
  const {
    isOpen,
    closeModal,
    selectedDate: { month, day, year }
  } = props

  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState<string>('')

  const table = useReactTable({
    data: dummyCellDetailsData ?? [],
    columns,
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
      className="w-full max-w-3xl"
    >
      <ModalHeader
        {...{
          title: `Leave for ${month} ${day}, ${year}`,
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
        <main className="border-t border-slate-200">
          <div className="default-scrollbar overflow-auto">
            <LeaveCellDetailsTable
              {...{
                table,
                query: {
                  isLoading: false,
                  isError: false
                }
              }}
            />
          </div>
          <FooterTable {...{ table }} className="!bg-white text-xs" />
        </main>
      </div>
    </ModalTemplate>
  )
}

export default LeaveCellDetailsModal
