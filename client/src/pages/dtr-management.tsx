import { NextPage } from 'next'
import classNames from 'classnames'
import React, { useState } from 'react'
import { MoreHorizontal } from 'react-feather'

import FilterIcon from '~/utils/icons/FilterIcon'
import Layout from '~/components/templates/Layout'
import DTRTable from '~/components/molecules/DTRManagementTable'
import LegendTooltip from '~/components/molecules/LegendTooltip'
import GlobalSearchFilter from '~/components/molecules/GlobalSearchFilter'
import { columns } from '~/components/molecules/DTRManagementTable/columns'
import SummaryMenuDropdown from '~/components/molecules/SummaryMenuDropdown'
import TimeSheetFilterDropdown from '~/components/molecules/TimeSheetFilterDropdown'
import { getAllEmployeeTimesheet, IAllTimeSheet } from '~/graphql/queries/timesheetQueries'
import { mapDTRManagement } from '~/utils/mapping/dtrManagementMap'

const DTRManagement: NextPage = (): JSX.Element => {
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const { data, error, isLoading } = getAllEmployeeTimesheet()
  const timesheets: IAllTimeSheet = data as IAllTimeSheet

  if (isLoading) return <h1>Loading...</h1>

  if (error != null) return <h1>Error...</h1>

  return (
    <Layout metaTitle="DTR Management">
      <section className="default-scrollbar relative h-full min-h-full overflow-auto text-xs text-slate-800">
        <div className="block md:hidden">
          <div className="flex items-center space-x-2 border-b border-slate-200 px-4 py-2">
            <h1 className="text-base font-semibold text-slate-700">DTR Management</h1>
            <LegendTooltip
              {...{
                placement: 'bottom'
              }}
            />
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
          <div className="flex items-center space-x-2 text-slate-500">
            <TimeSheetFilterDropdown
              className={classNames(
                'flex items-center space-x-2 rounded border border-slate-200 bg-transparent bg-white',
                'px-3 py-1 shadow-sm outline-none hover:text-slate-600 active:scale-95'
              )}
            >
              <FilterIcon className="h-4 w-4 fill-current" />
              <span>Filters</span>
            </TimeSheetFilterDropdown>
            <SummaryMenuDropdown
              className={classNames(
                'rounded border border-slate-200 bg-white py-0.5 px-2 outline-none',
                'shadow-sm hover:bg-white hover:text-slate-600 active:scale-95'
              )}
            >
              <MoreHorizontal className="h-5 w-5" />
            </SummaryMenuDropdown>
          </div>
        </header>
        <DTRTable
          {...{
            data: mapDTRManagement(timesheets.timeEntries),
            columns,
            globalFilter,
            setGlobalFilter
          }}
        />
      </section>
    </Layout>
  )
}

export default DTRManagement
