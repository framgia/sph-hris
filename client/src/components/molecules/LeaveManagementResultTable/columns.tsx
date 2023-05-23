import React from 'react'
import moment from 'moment'
import { createColumnHelper } from '@tanstack/react-table'

import { getLeaveType } from '~/utils/getLeaveType'
import { LeaveTable } from '~/utils/types/leaveTypes'
import CellHeader from '~/components/atoms/CellHeader'
import WorkStatusChip from '~/components/atoms/WorkStatusChip'

const columnHelper = createColumnHelper<LeaveTable>()

export const columns = [
  columnHelper.accessor('date', {
    header: () => <CellHeader label="Date" className="text-xs text-slate-500" />,
    cell: (props) => moment(props.getValue()).format('MMMM D, YYYY'),
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('status', {
    header: () => <CellHeader label="Status" className="text-xs text-slate-500" />,
    cell: (props) => <WorkStatusChip label={props.getValue()?.toLowerCase()} />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('leaveTypeId', {
    header: () => <CellHeader label="Type of leave" className="text-xs text-slate-500" />,
    cell: (props) => getLeaveType(props.getValue()),
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('isWithPay', {
    header: () => <span className="text-xs font-normal text-slate-500">Pay?</span>,
    cell: (props) => (props.getValue() ? 'With Pay' : 'Without Pay'),
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('reason', {
    header: () => <CellHeader label="Reason" className="text-xs text-slate-500" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('numLeaves', {
    header: () => <CellHeader label="No. of leaves" className="text-xs text-slate-500" />,
    cell: (props) => parseFloat(props.getValue().toFixed(3)) * 1,
    footer: (info) => info.column.id
  })
]
