import React, { FC } from 'react'
import { Table } from '@tanstack/react-table'

type Props = {
  table: Table<any>
}

const PageCount: FC<Props> = ({ table }): JSX.Element => {
  return (
    <span className="flex items-center gap-1 text-slate-500">
      <div>Page</div>
      {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
    </span>
  )
}

export default PageCount
