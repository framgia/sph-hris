import React from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import CellHeader from '~/components/atoms/CellHeader'
import { ILeaveManagementSummaryTable } from '~/utils/interfaces'

const columnHelper = createColumnHelper<ILeaveManagementSummaryTable>()

export const columns = [
  columnHelper.accessor('date', {
    header: () => <CellHeader label="Date" className="text-xs text-slate-500" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('typeOfLeave', {
    header: () => <CellHeader label="Type of leave" className="text-xs text-slate-500" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('pay', {
    header: () => <span className="text-xs font-normal text-slate-500">Pay?</span>,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('reason', {
    header: () => <CellHeader label="Reason" className="text-xs text-slate-500" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('numOfLeaves', {
    header: () => <CellHeader label="No. of leaves" className="text-xs text-slate-500" />,
    footer: (info) => info.column.id
  })
]
