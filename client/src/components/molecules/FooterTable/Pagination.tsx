import React, { FC } from 'react'
import { Table } from '@tanstack/react-table'
import { ChevronsLeft, ChevronsRight } from 'react-feather'

import Button from '~/components/atoms/Buttons/Button'

type Props = {
  table: Table<any>
}

const Pagination: FC<Props> = ({ table }): JSX.Element => {
  const btnStyle =
    'select-none px-1.5 py-1.5 text-slate-600 disabled:text-slate-400 disabled:active:scale-100'

  return (
    <div className="flex items-center divide-x divide-slate-200 rounded-md border bg-white shadow-sm">
      <Button
        rounded="none"
        className={btnStyle}
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronsLeft className="h-5 w-5 stroke-0.5" />
      </Button>
      <Button
        rounded="none"
        className={btnStyle}
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        rounded="none"
        className={btnStyle}
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
      <Button
        rounded="none"
        className={btnStyle}
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <ChevronsRight className="h-5 w-5 stroke-0.5" />
      </Button>
    </div>
  )
}

export default Pagination
