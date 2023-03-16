import React, { FC } from 'react'
import classNames from 'classnames'
import { flexRender, Table } from '@tanstack/react-table'

import TableSkeleton from './../SkeletonTable'
import { ITimeEntry } from '~/utils/types/timeEntryTypes'
import { WorkStatus } from '~/utils/constants/work-status'

type Props = {
  table: Table<ITimeEntry>
  isLoading: boolean
  error: unknown
}

const DesktopTable: FC<Props> = ({ table, isLoading, error }): JSX.Element => {
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
            {headerGroup.headers.map(({ id, colSpan, isPlaceholder, column, getContext }) => (
              <th key={id} colSpan={colSpan} className="px-4 py-3 text-left">
                {isPlaceholder ? null : (
                  <div
                    {...{
                      className: column.getCanSort() ? 'cursor-pointer select-none' : '',
                      onClick: column.getToggleSortingHandler()
                    }}
                  >
                    {flexRender(column.columnDef.header, getContext())}
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
          {error === null ? (
            isLoading ? (
              <TableSkeleton rows={11} column={10} />
            ) : (
              <>
                {table.getPageCount() === 0 ? (
                  <>
                    <TableMesagge message="No Data Available" />
                  </>
                ) : (
                  <>
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className={classNames(
                          'group hover:bg-white hover:shadow-md  hover:shadow-slate-200',
                          row.original.status === WorkStatus.VACATION_LEAVE.toLowerCase()
                            ? 'bg-yellow-50 hover:bg-yellow-50'
                            : '',
                          row.original.status === WorkStatus.ABSENT.toLowerCase()
                            ? 'bg-fuchsia-50 hover:bg-fuchsia-50'
                            : '',
                          row.original.status === WorkStatus.SICK_LEAVE.toLowerCase()
                            ? 'bg-rose-50 hover:bg-rose-50'
                            : '',
                          row.original.status === WorkStatus.BEREAVEMENT_LEAVE.toLowerCase()
                            ? 'bg-gray-50 hover:bg-gray-50'
                            : '',
                          row.original.status === WorkStatus.EMERGENCY_LEAVE.toLowerCase()
                            ? 'bg-red-50 hover:bg-red-50'
                            : '',
                          row.original.status === WorkStatus.MATERNITY_PATERNITY_LEAVE.toLowerCase()
                            ? 'bg-violet-50 hover:bg-violet-50'
                            : '',
                          row.original.status === WorkStatus.UNDERTIME.toLowerCase()
                            ? 'bg-amber-50 hover:bg-amber-50'
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
