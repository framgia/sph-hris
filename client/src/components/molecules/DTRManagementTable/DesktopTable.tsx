import React, { FC } from 'react'
import classNames from 'classnames'
import { flexRender, Table } from '@tanstack/react-table'

import TableSkeleton from './../SkeletonTable'
import { WorkStatus } from '~/utils/constants/work-status'
import { ITimeEntry } from '~/utils/types/timeEntryTypes'

type Props = {
  table: Table<ITimeEntry>
  query: {
    isLoading: boolean
    error: unknown
  }
}

const DesktopTable: FC<Props> = (props): JSX.Element => {
  const {
    table,
    query: { isLoading, error }
  } = props

  return (
    <table
      {...{
        style: {
          width: table.getCenterTotalSize()
        }
      }}
    >
      <thead className="border-b border-slate-200">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} colSpan={header.colSpan} className="px-4 py-3 text-left">
                {header.isPlaceholder ? null : (
                  <div
                    {...{
                      className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                      onClick: header.column.getToggleSortingHandler()
                    }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody
        className={classNames(
          'w-full divide-y divide-slate-200 border-b border-slate-200',
          table.getPageCount() === 0 ? 'h-[50vh]' : ''
        )}
      >
        <>
          {error == null ? (
            isLoading ? (
              <TableSkeleton rows={11} column={10} />
            ) : (
              <>
                {table.getPageCount() === 0 ? (
                  <TableMesagge message="No Data Available" />
                ) : (
                  <>
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className={classNames(
                          'group hover:bg-white hover:shadow-md hover:shadow-slate-200',
                          row.original.status === WorkStatus.VACATION_LEAVE.toLowerCase()
                            ? 'bg-amber-50 hover:bg-amber-50'
                            : '',
                          row.original.status === WorkStatus.ABSENT.toLowerCase()
                            ? 'bg-fuchsia-50 hover:bg-fuchsia-50'
                            : ''
                        )}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="flex-wrap px-4 py-2 capitalize">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                )}
              </>
            )
          ) : (
            <TableError message="Something went wrong" />
          )}
        </>
      </tbody>
    </table>
  )
}

const TableMesagge = ({ message }: { message: string }): JSX.Element => {
  return (
    <tr className="absolute inset-x-0 left-0 right-0 w-full flex-1">
      <td className="py-2"></td>
      <td className="w-full py-2 text-center font-medium text-slate-500">{message}</td>
      <td className="py-2"></td>
    </tr>
  )
}

const TableError = ({ message }: { message: string }): JSX.Element => {
  return (
    <tr className="absolute inset-x-0 left-0 right-0 w-full flex-1 bg-rose-50">
      <td className="py-2"></td>
      <td className="w-full py-2 text-center font-medium  text-rose-500">{message}</td>
      <td className="py-2"></td>
    </tr>
  )
}

export default DesktopTable
