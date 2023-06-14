import {
  ColumnDef,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'
import classNames from 'classnames'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'

import DesktopTable from './DesktopTable'
import FooterTable from './../FooterTable'
import MobileDisclose from './MobileDisclose'
import useUserQuery from '~/hooks/useUserQuery'
import { fuzzyFilter } from '~/utils/fuzzyFilter'
import useScreenCondition from '~/hooks/useScreenCondition'
import { USER_POSITIONS } from '~/utils/constants/userPositions'
import { IEmployeeTimeEntry } from '~/utils/types/timeEntryTypes'

type Props = {
  query: {
    data: IEmployeeTimeEntry[]
    error: unknown
  }
  table: {
    columns: Array<ColumnDef<IEmployeeTimeEntry, any>>
    globalFilter: string
    setGlobalFilter: Dispatch<SetStateAction<string>>
  }
}

const MyDTRTable: FC<Props> = (props): JSX.Element => {
  // SCREEN SIZE CONDITION HOOKS
  const isMediumScreen = useScreenCondition('(max-width: 768px)')

  const {
    query: { data: myDailyTimeData, error },
    table: { columns, globalFilter, setGlobalFilter }
  } = props

  const [sorting, setSorting] = useState<SortingState>([])
  const { handleUserQuery } = useUserQuery()
  const { data: user } = handleUserQuery()

  const table = useReactTable({
    data: myDailyTimeData,
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
        <div
          className={classNames(
            user?.userById.position.id === USER_POSITIONS.ESL_TEACHER ? ' mb-12' : 'mb-3'
          )}
        >
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

export default MyDTRTable
