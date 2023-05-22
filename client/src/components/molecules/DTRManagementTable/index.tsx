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
import { ITimeEntry } from '~/utils/types/timeEntryTypes'
import useScreenCondition from '~/hooks/useScreenCondition'

type Props = {
  query: {
    data: ITimeEntry[]
    isLoading: boolean
    error: unknown
  }
  table: {
    columns: Array<ColumnDef<ITimeEntry, any>>
    globalFilter: string
    setGlobalFilter: Dispatch<SetStateAction<string>>
  }
}

const DTRTable: FC<Props> = (props): JSX.Element => {
  // SCREEN SIZE CONDITION HOOKS
  const isMediumScreen = useScreenCondition('(max-width: 768px)')

  const {
    query: { data: dtrManagementData, isLoading, error },
    table: { columns, globalFilter, setGlobalFilter }
  } = props

  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: dtrManagementData,
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
            isLoading,
            error
          }}
        />
      ) : (
        <div className="mx-auto mb-12 w-full max-w-fit">
          <DesktopTable
            {...{
              table,
              query: {
                isLoading,
                error
              }
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

export default DTRTable
