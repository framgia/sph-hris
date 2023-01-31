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
import LeaveManagementTable from './Table'
import Card from '~/components/atoms/Card'
import { ILeaveManagementSummaryTable } from '~/utils/interfaces'

type Props = {
  query: {
    data: ILeaveManagementSummaryTable[]
    isLoading: boolean
    isError: boolean
  }
}

const LeaveManagementResultTable: FC<Props> = (props): JSX.Element => {
  const {
    query: { isLoading, isError, data }
  } = props

  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    // Options
    state: {
      sorting
    },
    onSortingChange: setSorting,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <div className="flex flex-1 flex-col space-y-1">
      <Card className="overflow-hidden" shadow-size="sm">
        <LeaveManagementTable
          {...{
            query: {
              isLoading,
              isError
            },
            table
          }}
        />
      </Card>
      {/* Table Pagination & Filtering */}
      <div className="-mx-4">
        {table.getPageCount() >= 1 && (
          <FooterTable
            {...{
              table
            }}
          />
        )}
      </div>
    </div>
  )
}

LeaveManagementResultTable.defaultProps = {}

export default LeaveManagementResultTable
