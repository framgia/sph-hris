import { NextPage } from 'next'
import classNames from 'classnames'
import React, { useState } from 'react'

import FilterIcon from '~/utils/icons/FilterIcon'
import { dummyNotificationData } from '~/utils/constants/dummyNotificationData'
import Layout from '~/components/templates/Layout'
import NotificationTable from '~/components/molecules/NotificationTable'
import GlobalSearchFilter from '~/components/molecules/GlobalSearchFilter'
import { columns } from '~/components/molecules/NotificationTable/columns'
import NotificationFilterDropdown from '~/components/molecules/NotificationFilterDropdown'

export type Filters = {
  type: string
  status: string
}

export type QueryVariablesType = {
  type: string | null
  status: string | null
}

const NotificationManagement: NextPage = (): JSX.Element => {
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [filters, setFilters] = useState({
    type: '',
    status: ''
  })

  return (
    <Layout metaTitle="Notification Management">
      <section className="default-scrollbar relative h-full min-h-full overflow-auto text-xs text-slate-800">
        <div className="sticky top-0 z-20 block bg-slate-100 md:hidden">
          <div className="flex items-center space-x-2 border-b border-slate-200 px-4 py-2">
            <h1 className="text-base font-semibold text-slate-700">Notification Management</h1>
          </div>
        </div>
        <header
          className={classNames(
            'sticky top-[41px] left-0 z-20 flex items-center justify-between md:top-0',
            'border-b border-slate-200 bg-slate-100 px-4 py-2'
          )}
        >
          <GlobalSearchFilter
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search"
          />
          <div className="flex items-center space-x-2 text-slate-500">
            <NotificationFilterDropdown
              className={classNames(
                'flex items-center space-x-2 rounded border border-slate-200 bg-transparent bg-white',
                'px-3 py-1 shadow-sm outline-none hover:text-slate-600 active:scale-95'
              )}
              filters={filters}
              setFilters={setFilters}
            >
              <FilterIcon className="h-4 w-4 fill-current" />
              <span>Filters</span>
            </NotificationFilterDropdown>
          </div>
        </header>
        <NotificationTable
          {...{
            query: {
              data: dummyNotificationData
            },
            table: {
              columns,
              globalFilter,
              setGlobalFilter
            }
          }}
        />
      </section>
    </Layout>
  )
}

export default NotificationManagement
