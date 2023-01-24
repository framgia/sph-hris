import {
  ColumnDef,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'

import DesktopTable from './DesktopTable'
import FooterTable from './../FooterTable'
import MobileDisclose from './MobileDisclose'
import { fuzzyFilter } from '~/utils/fuzzyFilter'
import { IDTRSummary } from '~/utils/interfaces'

type Props = {
  query: {
    data: IDTRSummary[]
    isLoading: boolean
    error: unknown
  }
  table: {
    columns: Array<ColumnDef<IDTRSummary, any>>
    globalFilter: string
    setGlobalFilter: Dispatch<SetStateAction<string>>
  }
}

const DTRSummaryTable: FC<Props> = (props): JSX.Element => {
  const {
    query: { data: dtrSummaryData },
    table: { columns, globalFilter, setGlobalFilter }
  } = props

  const [sorting, setSorting] = useState<SortingState>([])
  // const [data] = useState(() => [...dtrSummaryData])

  const table = useReactTable({
    data: dtrSummaryData,
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
    getPaginationRowModel: getPaginationRowModel(),
    // Debugger
    debugTable: false,
    debugHeaders: false,
    debugColumns: false
  })

  return (
    <>
      {/* Show only on mobile size */}
      <div className="block md:hidden">
        <MobileDisclose
          {...{
            table,
            isLoading: false
          }}
        />
      </div>
      {/* Show on medium size and beyond */}
      <div className="mx-auto hidden w-full max-w-fit md:block">
        <DesktopTable
          {...{
            table,
            isLoading: false
          }}
        />
      </div>
      {/* Table Pagination & Filtering */}
      {table.getPageCount() >= 1 && (
        <FooterTable
          {...{
            table
          }}
        />
      )}
    </>
  )
}

export default DTRSummaryTable
