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
import MobileDisclose from './MobileDisclose'
import { LeaveTable } from '~/utils/types/leaveTypes'
import useScreenCondition from '~/hooks/useScreenCondition'

type Props = {
  query: {
    data: LeaveTable[]
    isLoading: boolean
    isError: boolean
  }
}

const LeaveManagementResultTable: FC<Props> = (props): JSX.Element => {
  const {
    query: { isLoading, isError, data }
  } = props

  // SCREEN SIZE CONDITION HOOKS
  const isMediumScreen = useScreenCondition('(max-width: 768px)')

  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: data?.sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) return -1
      else if (new Date(a.date) < new Date(b.date)) return 1
      else return 0
    }),
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
      {/* Show on Desktop */}
      {!isMediumScreen ? (
        <Card className="overflow-visible" shadow-size="sm">
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
      ) : (
        // Shows on Mobile
        <Card className="overflow-hidden" shadow-size="sm">
          <MobileDisclose
            {...{
              query: {
                isLoading,
                isError
              },
              table
            }}
          />
        </Card>
      )}

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

export default LeaveManagementResultTable
