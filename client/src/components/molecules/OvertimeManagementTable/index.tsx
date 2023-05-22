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
import useScreenCondition from '~/hooks/useScreenCondition'
import { IOvertimeManagement, IOvertimeManagementManager } from '~/utils/interfaces'

type Props = {
  query: {
    data: IOvertimeManagement[] | IOvertimeManagementManager[]
    error: unknown
  }
  table: {
    columns: Array<ColumnDef<IOvertimeManagement | IOvertimeManagementManager, any>>
    globalFilter: string
    setGlobalFilter: Dispatch<SetStateAction<string>>
  }
}

const OvertimeManagementTable: FC<Props> = (props): JSX.Element => {
  // SCREEN SIZE CONDITION HOOKS
  const isMediumScreen = useScreenCondition('(max-width: 768px)')

  const {
    query: { data: overtimeData, error },
    table: { columns, globalFilter, setGlobalFilter }
  } = props

  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: overtimeData,
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
      {isMediumScreen ? (
        <MobileDisclose
          {...{
            table,
            isLoading: false,
            error
          }}
        />
      ) : (
        <div className="mx-auto w-full max-w-fit">
          <DesktopTable
            {...{
              table,
              isLoading: false,
              error
            }}
          />
        </div>
      )}

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

export default OvertimeManagementTable
