import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { Plus } from 'react-feather'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import Card from '~/components/atoms/Card'
import Layout from '~/components/templates/Layout'
import {
  getHeatmapData,
  initialChartOptions,
  initialSeriesData,
  Series
} from '~/utils/generateData'
import useLeave from '~/hooks/useLeave'
import useUserQuery from '~/hooks/useUserQuery'
import BarsLoadingIcon from '~/utils/icons/BarsLoadingIcon'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { getRemainingPaidLeaves } from '~/hooks/useLeaveQuery'
import { Chip } from '~/components/templates/LeaveManagementLayout'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'
import AddNewLeaveModal from '~/components/molecules/AddNewLeaveModal'
import BreakdownOfLeaveCard from '~/components/molecules/BreakdownOfLeavesCard'
import SummaryFilterDropdown from '~/components/molecules/SummaryFilterDropdown'
import { Breakdown, HeatmapDetails, LeaveTable } from '~/utils/types/leaveTypes'
import LeaveManagementResultTable from '~/components/molecules/LeaveManagementResultTable'

const ReactApexChart = dynamic(async () => await import('react-apexcharts'), {
  ssr: false
})

type SeriesData = {
  name: string
  data: Series[]
}

const MyLeaves: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { handleUserQuery } = useUserQuery()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { data: user, isSuccess: isUserSuccess, isLoading: isUserLoading } = handleUserQuery()
  const { getLeaveQuery } = useLeave()
  const {
    data: leaves,
    refetch,
    isSuccess,
    isLoading: isLeavesLoading,
    isError: isLeavesError
  } = getLeaveQuery(user?.userById.id as number, parseInt(router.query.year as string))
  const [series, setSeries] = useState<SeriesData[]>(initialSeriesData)
  const { data: paidLeaves } = getRemainingPaidLeaves(user?.userById?.id as number)

  useEffect(() => {
    if (router.isReady && router.query.year === undefined) {
      void router.replace({
        pathname: router.pathname,
        query: {
          year: new Date().getFullYear()
        }
      })
    }
  }, [router])
  useEffect(() => {
    if (isUserSuccess && user?.userById.id !== undefined && router.query.year !== undefined) {
      void refetch()
    }
  }, [isUserSuccess, user, router])
  useEffect(() => {
    if (isSuccess || isUserSuccess) {
      setSeries([
        {
          name: 'December',
          data: getHeatmapData(31, leaves?.leaves.heatmap.december as HeatmapDetails[])
        },
        {
          name: 'November',
          data: getHeatmapData(31, leaves?.leaves.heatmap.november as HeatmapDetails[])
        },
        {
          name: 'October',
          data: getHeatmapData(31, leaves?.leaves.heatmap.october as HeatmapDetails[])
        },
        {
          name: 'September',
          data: getHeatmapData(31, leaves?.leaves.heatmap.september as HeatmapDetails[])
        },
        {
          name: 'August',
          data: getHeatmapData(31, leaves?.leaves.heatmap.august as HeatmapDetails[])
        },
        {
          name: 'July',
          data: getHeatmapData(31, leaves?.leaves.heatmap.july as HeatmapDetails[])
        },
        {
          name: 'June',
          data: getHeatmapData(31, leaves?.leaves.heatmap.june as HeatmapDetails[])
        },
        {
          name: 'May',
          data: getHeatmapData(31, leaves?.leaves.heatmap.may as HeatmapDetails[])
        },
        {
          name: 'April',
          data: getHeatmapData(31, leaves?.leaves.heatmap.april as HeatmapDetails[])
        },
        {
          name: 'March',
          data: getHeatmapData(31, leaves?.leaves.heatmap.march as HeatmapDetails[])
        },
        {
          name: 'February',
          data: getHeatmapData(31, leaves?.leaves.heatmap.february as HeatmapDetails[])
        },
        {
          name: 'January',
          data: getHeatmapData(31, leaves?.leaves.heatmap.january as HeatmapDetails[])
        }
      ])
    }
  }, [isSuccess, isUserSuccess, leaves?.leaves.heatmap])

  const handleToggle = (): void => setIsOpen(!isOpen)

  return (
    <Layout metaTitle="My Leaves">
      <main className="h-full">
        <header
          className={classNames(
            'flex flex-wrap justify-between space-x-2 border-b',
            'border-slate-200 px-4 py-[7px] text-xs'
          )}
        >
          <div className="flex items-center space-x-1">
            <p className="text-slate-500">Remaining Paid Leaves:</p>
            <Chip count={paidLeaves?.paidLeaves} />
          </div>
          {/* FOR INTEGRATOR: Filter it by shallow route */}
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="primary"
              className="flex items-center space-x-0.5 px-1.5 py-[3px]"
              onClick={handleToggle}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:block">File leave</span>
            </Button>
            <SummaryFilterDropdown />
          </div>

          {/* This will Open New Modal for Filing New Leave */}
          <AddNewLeaveModal
            {...{
              isOpen,
              closeModal: handleToggle
            }}
          />
        </header>
        {!isUserLoading && !isLeavesLoading ? (
          <div className="default-scrollbar h-full space-y-4 overflow-y-auto px-4">
            <MaxWidthContainer>
              <Card className="default-scrollbar mt-4 overflow-x-auto overflow-y-hidden">
                <div className="w-full min-w-[647px] px-5 pt-4 md:max-w-full">
                  <ReactApexChart
                    options={initialChartOptions}
                    series={series}
                    type="heatmap"
                    width={'100%'}
                    height={450}
                  />
                </div>
              </Card>
            </MaxWidthContainer>
            <MaxWidthContainer>
              <article
                className={classNames(
                  'flex flex-col space-y-4 pb-24 text-xs',
                  'lg:flex-row lg:space-y-0 lg:space-x-4'
                )}
              >
                {/* Pass the needed props of these components */}
                <BreakdownOfLeaveCard data={leaves?.leaves.breakdown as Breakdown} />
                <LeaveManagementResultTable
                  {...{
                    query: {
                      data: leaves?.leaves.table as LeaveTable[],
                      isLoading: isLeavesLoading,
                      isError: isLeavesError
                    }
                  }}
                />
              </article>
            </MaxWidthContainer>
          </div>
        ) : (
          <div className="flex min-h-[50vh] items-center justify-center">
            <BarsLoadingIcon className="h-7 w-7 fill-current text-amber-500" />
          </div>
        )}
      </main>
    </Layout>
  )
}

export default MyLeaves
