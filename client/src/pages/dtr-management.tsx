import moment from 'moment'
import { NextPage } from 'next'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { MoreHorizontal } from 'react-feather'
import React, { useEffect, useState } from 'react'

import FilterIcon from '~/utils/icons/FilterIcon'
import Layout from '~/components/templates/Layout'
import BarsLoadingIcon from '~/utils/icons/BarsLoadingIcon'
import LegendTooltip from '~/components/molecules/LegendTooltip'
import DTRTable from '~/components/molecules/DTRManagementTable'
import DTRSummaryTable from '~/components/molecules/DTRSummaryTable'
import GlobalSearchFilter from '~/components/molecules/GlobalSearchFilter'
import { columns } from '~/components/molecules/DTRManagementTable/columns'
import SummaryMenuDropdown from '~/components/molecules/SummaryMenuDropdown'
import TimeSheetFilterDropdown from '~/components/molecules/TimeSheetFilterDropdown'
import { getAllEmployeeTimesheet, getTimesheetSummary } from '~/hooks/useTimesheetQuery'
import { columns as dtrSummaryColumns } from '~/components/molecules/DTRSummaryTable/columns'

export type Filters = {
  date: string
  status: string
  startDate: string
  endDate: string
}

export type QueryVariablesType = {
  date: string
  status: string | null
  startDate: string | null
  endDate: string | null
}

const DTRManagement: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { query } = router

  const [isOpenSummaryTable, setIsOpenSummaryTable] = useState<boolean>(false)
  const [fetchReady, setFetchReady] = useState<boolean>(false)
  const handleToggleSummaryTable = (): void => {
    void router.replace({
      pathname: '/dtr-management',
      query: !isOpenSummaryTable
        ? {
            startDate: filters.startDate,
            endDate: filters.endDate,
            summary: true
          }
        : {
            date: filters.date,
            status: filters.status,
            summary: false
          }
    })
    setIsOpenSummaryTable(!isOpenSummaryTable)
  }
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [filters, setFilters] = useState({
    date: moment().format('YYYY-MM-DD'),
    status: '',
    startDate:
      new Date().getDate() > 15 ? moment().format('YYYY-MM-16') : moment().format('YYYY-MM-01'),
    endDate:
      new Date().getDate() > 15
        ? moment().endOf('month').format('YYYY-MM-DD')
        : moment().format('YYYY-MM-15')
  })

  const queryVariables: QueryVariablesType = {
    date: filters.date,
    status: filters.status !== '' ? filters.status : null,
    startDate: filters.startDate,
    endDate: filters.endDate
  }

  const allEmployee = getAllEmployeeTimesheet(
    '$date: String, $status: String',
    'date: $date, status: $status',
    queryVariables,
    fetchReady
  )

  const summary = getTimesheetSummary(
    '$startDate: String, $endDate:String',
    'startDate: $startDate, endDate: $endDate',
    queryVariables,
    fetchReady
  )

  const [fetchedAllEmployeeData, setFetchedAllEmployeeData] = useState({
    data: allEmployee.data,
    error: allEmployee.error,
    isLoading: allEmployee.isLoading
  })

  const [fetchedSummaryData, setFetchedSummaryData] = useState({
    data: summary.data,
    error: summary.error,
    isLoading: summary.isLoading
  })

  const handleFilterUpdate = (): void => {
    if (isOpenSummaryTable) {
      void router.replace({
        pathname: '/dtr-management',
        query: {
          startDate: filters.startDate,
          endDate: filters.endDate,
          summary: true
        }
      })
      setFetchedSummaryData({ ...fetchedSummaryData, isLoading: true })
      void summary.refetch().then((response) => {
        setFetchedSummaryData({
          data: response.data,
          error: response.error,
          isLoading: response.isLoading
        })
      })
    } else {
      void router.replace({
        pathname: '/dtr-management',
        query: {
          date: filters.date,
          status: filters.status,
          summary: false
        }
      })
      setFetchedAllEmployeeData({ ...fetchedAllEmployeeData, isLoading: true })
      void allEmployee.refetch().then((response) => {
        setFetchedAllEmployeeData({
          data: response.data,
          error: response.error,
          isLoading: response.isLoading
        })
      })
    }
  }

  useEffect(() => {
    if (router.isReady) {
      setFilters({
        ...filters,
        date: query.date !== undefined ? (query.date as string) : filters.date,
        status: query.status !== undefined ? (query.status as string) : filters.status,
        startDate: query.startDate !== undefined ? (query.startDate as string) : filters.startDate,
        endDate: query.endDate !== undefined ? (query.endDate as string) : filters.endDate
      })
      setIsOpenSummaryTable(query.summary === 'true')
    }
  }, [router.isReady])

  useEffect(() => {
    if (router.isReady) setFetchReady(true)
  }, [router.isReady, filters])

  useEffect(() => {
    if (allEmployee.data !== undefined)
      setFetchedAllEmployeeData({
        data: allEmployee.data,
        error: allEmployee.error,
        isLoading: allEmployee.isLoading
      })
  }, [allEmployee.data])

  useEffect(() => {
    if (summary.data !== undefined) {
      setFetchedSummaryData({
        data: summary.data,
        error: summary.error,
        isLoading: summary.isLoading
      })
    }
  }, [summary.data])

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
              isOpenSummaryTable={isOpenSummaryTable}
            >
              <FilterIcon className="h-4 w-4 fill-current" />
              <span>Filters</span>
            </TimeSheetFilterDropdown>
            <SummaryMenuDropdown
              {...{
                isOpenSummaryTable,
                actions: {
                  handleToggleSummaryTable
                }
              }}
              className={classNames(
                'rounded border border-slate-200 bg-white py-0.5 px-2 outline-none',
                'shadow-sm hover:bg-white hover:text-slate-600 active:scale-95'
              )}
            >
              <MoreHorizontal className="h-5 w-5" />
            </SummaryMenuDropdown>
          </div>
        </header>
        {!fetchedAllEmployeeData.isLoading &&
        fetchedAllEmployeeData.data !== undefined &&
        !fetchedSummaryData.isLoading ? (
          <>
            {!isOpenSummaryTable ? (
              <DTRTable
                {...{
                  query: {
                    data: fetchedAllEmployeeData.data.timeEntries,
                    isLoading: fetchedAllEmployeeData.isLoading,
                    error: fetchedAllEmployeeData.error
                  },
                  table: {
                    columns,
                    globalFilter,
                    setGlobalFilter
                  }
                }}
              />
            ) : (
              fetchedSummaryData.data !== undefined && (
                <DTRSummaryTable
                  {...{
                    query: {
                      data: fetchedSummaryData.data.timesheetSummary,
                      isLoading: fetchedAllEmployeeData.isLoading,
                      error: fetchedAllEmployeeData.error
                    },
                    table: {
                      columns: dtrSummaryColumns,
                      globalFilter,
                      setGlobalFilter
                    }
                  }}
                />
              )
            )}
          </>
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
