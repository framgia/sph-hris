import { NextPage } from 'next'
import classNames from 'classnames'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

import Layout from '~/components/templates/Layout'
import MyDTRTable from '~/components/molecules/MyDailyTimeRecordTable'
import GlobalSearchFilter from '~/components/molecules/GlobalSearchFilter'
import { columns } from '~/components/molecules/MyDailyTimeRecordTable/columns'
import { getEmployeeTimesheet, IEmployeeTimeSheet } from '~/hooks/useTimesheetQuery'
import { mapDTRData } from '~/utils/mapping/myDTRMap'
import useUserQuery from '~/hooks/useUserQuery'

const MyDailyTimeRecord: NextPage = (): JSX.Element => {
  const [globalFilter, setGlobalFilter] = useState<string>('')

  const { handleUserQuery } = useUserQuery()
  const user = handleUserQuery()

  const { data, error, isLoading } = getEmployeeTimesheet(user.data?.userById.id as number)
  const timesheets: IEmployeeTimeSheet = data as IEmployeeTimeSheet

  useEffect(() => {
    let toastId
    if (isLoading) {
      toastId = toast.loading('Loading...')
    } else if (!isLoading) {
      toast.dismiss(toastId)
    }
  }, [isLoading])

  useEffect(() => {
    if (error != null) {
      toast.error('There is an error!', { duration: 3000 })
    }
  }, [error])

  return (
    <Layout metaTitle="My Daily Time Record">
      <section className="default-scrollbar relative h-full min-h-full overflow-auto text-xs text-slate-800">
        <div className="block md:hidden">
          <div className="border-b border-slate-200 px-4 py-2">
            <h1 className="text-base font-semibold text-slate-700">My Daily Time Record</h1>
          </div>
        </div>
        <header
          className={classNames(
            'sticky top-0 left-0 flex items-center justify-between',
            'border-b border-slate-200 bg-slate-100 px-4 py-2'
          )}
        >
          <GlobalSearchFilter
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search"
          />
        </header>
        {!isLoading ? (
          <MyDTRTable
            {...{
              data: mapDTRData(timesheets.timeEntriesByEmployeeId),
              columns,
              globalFilter,
              setGlobalFilter
            }}
          />
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </section>
    </Layout>
  )
}

export default MyDailyTimeRecord
