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

import FooterTable from '../FooterTable'
import { fuzzyFilter } from '~/utils/fuzzyFilter'
import { INotification } from '~/utils/interfaces'
import NotificationItem from './NotificationItem'

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

const NotificationList: FC<Props> = (props): JSX.Element => {
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
      <div className="mx-auto min-h-[80vh] w-full max-w-4xl">
        <NotificationItem
          {...{
            table,
            isLoading: false
          }}
        />
        {/* Table Pagination & Filtering */}
        {table.getPageCount() >= 1 && (
          <FooterTable
            {...{
              table
            }}
          />
        )}
      </div>
    </>
  )
}

export default NotificationList
