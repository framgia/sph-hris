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
import { fuzzyFilter } from '~/utils/fuzzyFilter'
import { INotification } from '~/utils/interfaces'

type Props = {
  query: {
    data: INotification[]
  }
  table: {
    columns: Array<ColumnDef<INotification, any>>
    globalFilter: string
    setGlobalFilter: Dispatch<SetStateAction<string>>
  }
}

const NotificationTable: FC<Props> = (props): JSX.Element => {
  const {
    query: { data: dummyNotificationData },
    table: { columns, globalFilter, setGlobalFilter }
  } = props

  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: dummyNotificationData,
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
      {/* Show on mobile size and beyond */}
      <div>
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

export default NotificationTable
