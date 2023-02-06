import moment from 'moment'
import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'

import { getLeave } from '~/hooks/useLeaveQuery'
import ListOfLeaveTable from '~/components/molecules/ListOfLeaveTable'
import { columns } from '~/components/molecules/ListOfLeaveTable/columns'
import LeaveManagementLayout from '~/components/templates/LeaveManagementLayout'
import { IListOfLeave } from '~/utils/interfaces'

const ListOfLeave: NextPage = (): JSX.Element => {
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const { data } = getLeave()
  const [mappedLeave, setMappedLeave] = useState<IListOfLeave[]>([])

  useEffect(() => {
    const temp = [...mappedLeave]
    data?.allLeaves?.forEach((i) => {
      temp.push({
        id: i?.id,
        name: i?.user?.name,
        project: i?.projects[0]?.name,
        leaveDate: moment(i?.leaveDate).format('MM/DD/YYYY'),
        type: i?.leaveType?.name,
        isWithPay: i?.isWithPay,
        manager: i?.manager?.name,
        projectLeader: i?.projects[0]?.projectLeader?.name,
        totalUndertime: i?.leaveType?.name === 'Undertime' ? i?.days : 0,
        totalLeaves: i?.leaveType?.name === 'Undertime' ? 0 : i?.days,
        dateFiled: moment(i?.createdAt).format('MM/DD/YYYY'),
        reason: i?.reason
      })
    })
    setMappedLeave(temp)
  }, [data])

  return (
    <LeaveManagementLayout metaTitle="List of leave">
      <section className="default-scrollbar relative overflow-auto text-xs text-slate-800">
        <ListOfLeaveTable
          {...{
            query: {
              data: mappedLeave,
              isLoading: false,
              error: null
            },
            table: {
              columns,
              globalFilter,
              setGlobalFilter
            }
          }}
        />
      </section>
    </LeaveManagementLayout>
  )
}

export default ListOfLeave
