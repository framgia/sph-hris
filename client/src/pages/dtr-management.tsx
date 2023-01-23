import moment from 'moment'
import { NextPage } from 'next'
import classNames from 'classnames'
import { MoreHorizontal } from 'react-feather'
import React, { useEffect, useState } from 'react'

import FilterIcon from '~/utils/icons/FilterIcon'
import Layout from '~/components/templates/Layout'
import BarsLoadingIcon from '~/utils/icons/BarsLoadingIcon'
import DTRTable from '~/components/molecules/DTRManagementTable'
import LegendTooltip from '~/components/molecules/LegendTooltip'
import { getAllEmployeeTimesheet } from '~/hooks/useTimesheetQuery'
import GlobalSearchFilter from '~/components/molecules/GlobalSearchFilter'
import { columns } from '~/components/molecules/DTRManagementTable/columns'
import SummaryMenuDropdown from '~/components/molecules/SummaryMenuDropdown'
import TimeSheetFilterDropdown from '~/components/molecules/TimeSheetFilterDropdown'

export type Filters = {
  date: string
  status: string
}

export type QueryVariablesType = {
  date: string
  status: string | null
}

const DTRManagement: NextPage = (): JSX.Element => {
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [filters, setFilters] = useState({
    date: moment().format('YYYY-MM-DD'),
    status: ''
  })

  const queryInput = '$date: String, $status: String'
  const queryArgument = 'date: $date, status: $status'
  const queryVariables: QueryVariablesType = {
    date: filters.date,
    status: filters.status !== '' ? filters.status : null
  }

  const { data, error, isLoading, refetch } = getAllEmployeeTimesheet(
    queryInput,
    queryArgument,
    queryVariables
  )

  const [fetchedData, setFetchedData] = useState({
    data,
    error,
    isLoading
  })

  const handleFilterUpdate = (): void => {
    setFetchedData({ ...fetchedData, isLoading: true })
    void refetch().then((response) => {
      setFetchedData({
        data: response.data,
        error: response.error,
        isLoading: response.isLoading
      })
    })
  }

  useEffect(() => {
    if (data !== undefined) setFetchedData({ data, error, isLoading })
  }, [data])

  return (
    <Layout metaTitle="DTR Management">
      <section className="default-scrollbar relative h-full min-h-full overflow-auto text-xs text-slate-800">
        <div className="sticky top-0 z-20 block bg-slate-100 md:hidden">
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
            <TimeSheetFilterDropdown
              className={classNames(
                'flex items-center space-x-2 rounded border border-slate-200 bg-transparent bg-white',
                'px-3 py-1 shadow-sm outline-none hover:text-slate-600 active:scale-95'
              )}
              filters={filters}
              setFilters={setFilters}
              handleFilterUpdate={handleFilterUpdate}
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
        {!fetchedData.isLoading && fetchedData.data !== undefined ? (
          <DTRTable
            {...{
              query: {
                data: fetchedData.data.timeEntries,
                isLoading: fetchedData.isLoading,
                error
              },
              table: {
                columns,
                globalFilter,
                setGlobalFilter
              }
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

export default DTRManagement
