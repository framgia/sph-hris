import { NextPage } from 'next'
import React, { useState } from 'react'

import { dummyData } from '~/utils/constants/dummyListOfLeaveData'
import ListOfLeaveTable from '~/components/molecules/ListOfLeaveTable'
import { columns } from '~/components/molecules/ListOfLeaveTable/columns'
import LeaveManagementLayout from '~/components/templates/LeaveManagementLayout'

const ListOfLeave: NextPage = (): JSX.Element => {
  const [globalFilter, setGlobalFilter] = useState<string>('')

  return (
    <LeaveManagementLayout metaTitle="List of leave">
      <section className="default-scrollbar relative overflow-auto text-xs text-slate-800">
        <ListOfLeaveTable
          {...{
            query: {
              data: dummyData,
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
