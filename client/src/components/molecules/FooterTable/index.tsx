import React, { FC } from 'react'
import classNames from 'classnames'
import { Table } from '@tanstack/react-table'

import PageCount from './PageCount'
import Pagination from './Pagination'

type Props = {
  table: Table<any>
}

const FooterTable: FC<Props> = ({ table }): JSX.Element => {
  return (
    <footer className="sticky left-0 flex w-full items-center justify-between px-4 py-3">
      <div className="flex flex-wrap items-center md:space-x-2">
        <div className="hidden md:block">
          <PageCount
            {...{
              table
            }}
          />
        </div>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
          className={classNames(
            'rounded-md bg-white text-xs font-medium',
            'select-none text-slate-600 shadow-sm focus:ring-0',
            'border border-slate-200 focus:border-slate-200'
          )}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <Pagination
        {...{
          table
        }}
      />
    </footer>
  )
}

export default FooterTable
