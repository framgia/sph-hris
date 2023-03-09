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
import { IMyOvertimeTable } from '~/utils/interfaces'

type Props = {
  query: {
    data: IMyOvertimeTable[]
    error: unknown
  }
  table: {
    columns: Array<ColumnDef<IMyOvertimeTable, any>>
    globalFilter: string
    setGlobalFilter: Dispatch<SetStateAction<string>>
  }
}

const MyOvertimeTable: FC<Props> = (props): JSX.Element => {
  const {
    query: { data, error },
    table: { columns, globalFilter, setGlobalFilter }
  } = props

  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
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
            isLoading: false,
            error
          }}
        />
      </div>
      {/* Show on medium size and beyond */}
      <div className="mx-auto mb-8 hidden w-full max-w-fit md:block">
        <DesktopTable
          {...{
            table,
            isLoading: false,
            error
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

export default MyOvertimeTable
