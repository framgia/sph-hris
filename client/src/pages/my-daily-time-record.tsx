import { NextPage } from 'next'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import useUserQuery from '~/hooks/useUserQuery'
import Layout from '~/components/templates/Layout'
import BarsLoadingIcon from '~/utils/icons/BarsLoadingIcon'
import { getEmployeeTimesheet } from '~/hooks/useTimesheetQuery'
import MyDTRTable from '~/components/molecules/MyDailyTimeRecordTable'
import GlobalSearchFilter from '~/components/molecules/GlobalSearchFilter'
import { columns } from '~/components/molecules/MyDailyTimeRecordTable/columns'

const MyDailyTimeRecord: NextPage = (): JSX.Element => {
  const router = useRouter()

  const [globalFilter, setGlobalFilter] = useState<string>('')

  const { handleUserQuery } = useUserQuery()
  const user = handleUserQuery()

  const { data, isLoading, error } = getEmployeeTimesheet(user.data?.userById.id as number)

  useEffect(() => {
    const params = new URL(window.location.href).searchParams
    setGlobalFilter(params.get('searchKey') as string)
  }, [])

  useEffect(() => {
    if (router.isReady) {
      void router.replace({
        pathname: '/my-daily-time-record',
        query:
          globalFilter !== ''
            ? {
                searchKey: globalFilter
              }
            : null
      })
    }
  }, [globalFilter])

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
        {!isLoading && data !== undefined ? (
          <MyDTRTable
            {...{
              query: { data: data.timeEntriesByEmployeeId, error },
              table: { columns, globalFilter, setGlobalFilter }
            }}
          />
        ) : (
          <div className="flex min-h-[50vh] items-center justify-center">
            <BarsLoadingIcon className="h-7 w-7 fill-current text-amber-500" />
          </div>
        )}
      </section>
    </Layout>
  )
}

export default MyDailyTimeRecord
