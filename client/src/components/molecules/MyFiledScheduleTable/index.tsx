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
import { IMyFiledScheduleData } from '~/utils/interfaces'
import useScreenCondition from '~/hooks/useScreenCondition'

type Props = {
  query: {
    data: IMyFiledScheduleData[]
    error: unknown
  }
  table: {
    columns: Array<ColumnDef<IMyFiledScheduleData, any>>
    globalFilter: string
    setGlobalFilter: Dispatch<SetStateAction<string>>
  }
}

const MyFiledScheduleTable: FC<Props> = (props): JSX.Element => {
  // SCREEN SIZE CONDITION HOOKS
  const isTabletSize = useScreenCondition('(max-width: 800px)')

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
      {isTabletSize ? (
        <MobileDisclose
          {...{
            table,
            isLoading: false,
            error
          }}
        />
      ) : (
        <div className="mx-auto w-full max-w-full bg-white">
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
          className="!bg-white"
        />
      )}
    </>
  )
}

export default MyFiledScheduleTable
