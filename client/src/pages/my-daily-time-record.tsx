import { NextPage } from 'next'
import classNames from 'classnames'
import React, { useState } from 'react'

import { myDTRData } from '~/utils/constants'
import Layout from '~/components/templates/Layout'
import MyDTRTable from '~/components/molecules/MyDailyTimeRecordTable'
import GlobalSearchFilter from '~/components/molecules/GlobalSearchFilter'
import { columns } from '~/components/molecules/MyDailyTimeRecordTable/columns'

const MyDailyTimeRecord: NextPage = (): JSX.Element => {
  const [globalFilter, setGlobalFilter] = useState<string>('')

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
        <MyDTRTable
          {...{
            data: myDTRData,
            columns,
            globalFilter,
            setGlobalFilter
          }}
        />
      </section>
    </Layout>
  )
}

export default MyDailyTimeRecord
