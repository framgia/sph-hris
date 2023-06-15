import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { PulseLoader } from 'react-spinners'
import React, { useEffect, useState } from 'react'

import NotFound from './../404'
import Card from '~/components/atoms/Card'
import useLeave from '~/hooks/useLeave'
import useUserQuery from '~/hooks/useUserQuery'
import { Roles } from '~/utils/constants/roles'
import FadeInOut from '~/components/templates/FadeInOut'
import { Breakdown, LeaveTable } from '~/utils/types/leaveTypes'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'
import BreakdownOfLeaveCard from '~/components/molecules/BreakdownOfLeavesCard'
import SummaryFilterDropdown from '~/components/molecules/SummaryFilterDropdown'
import LeaveManagementLayout, { Chip } from '~/components/templates/LeaveManagementLayout'
import LeaveManagementResultTable from '~/components/molecules/LeaveManagementResultTable'
import {
  Series,
  getHeatmapData,
  initialSeriesData,
  initialChartOptions
} from '~/utils/generateData'

const ReactApexChart = dynamic(async () => await import('react-apexcharts'), {
  ssr: false
})

type SeriesData = {
  name: string
  data: Series[]
}

const LeaveSummary: NextPage = (): JSX.Element => {
  const router = useRouter()

  // CURRENT USER HOOKS
  const { getLeaveQuery } = useLeave()
  const { handleUserQuery } = useUserQuery()
  const { data: user, isSuccess: isUserSuccess } = handleUserQuery()

  // GET USERS LEAVE HOOKS
  const {
    data: leaves,
    refetch,
    isSuccess,
    isLoading: isLeavesLoading,
    isError: isLeavesError
  } = getLeaveQuery(
    router.query.id !== undefined
      ? parseInt(router.query.id as string)
      : (user?.userById.id as number),
    router.query.year !== undefined
      ? parseInt(router.query.year as string)
      : new Date().getFullYear(),
    router.query.leave !== undefined ? parseInt(router.query.leave as string) : 0
  )
  const [series, setSeries] = useState<SeriesData[]>(initialSeriesData)

  useEffect(() => {
    if (isSuccess) {
      setSeries([
        {
          name: 'December',
          data: getHeatmapData(31, leaves?.leaves.heatmap.december)
        },
        {
          name: 'November',
          data: getHeatmapData(31, leaves?.leaves.heatmap.november)
        },
        {
          name: 'October',
          data: getHeatmapData(31, leaves?.leaves.heatmap.october)
        },
        {
          name: 'September',
          data: getHeatmapData(31, leaves?.leaves.heatmap.september)
        },
        {
          name: 'August',
          data: getHeatmapData(31, leaves?.leaves.heatmap.august)
        },
        {
          name: 'July',
          data: getHeatmapData(31, leaves?.leaves.heatmap.july)
        },
        {
          name: 'June',
          data: getHeatmapData(31, leaves?.leaves.heatmap.june)
        },
        {
          name: 'May',
          data: getHeatmapData(31, leaves?.leaves.heatmap.may)
        },
        {
          name: 'April',
          data: getHeatmapData(31, leaves?.leaves.heatmap.april)
        },
        {
          name: 'March',
          data: getHeatmapData(31, leaves?.leaves.heatmap.march)
        },
        {
          name: 'February',
          data: getHeatmapData(31, leaves?.leaves.heatmap.february)
        },
        {
          name: 'January',
          data: getHeatmapData(31, leaves?.leaves.heatmap.january)
        }
      ])
    }
  }, [isSuccess, leaves?.leaves.heatmap])

  useEffect(() => {
    if (router.isReady && isUserSuccess) void refetch()
  }, [router, isUserSuccess])

  if (process.env.NODE_ENV === 'production' && user?.userById.role.name !== Roles.HR_ADMIN) {
    return <NotFound />
  }

  return (
    <LeaveManagementLayout metaTitle="Leave Summary">
      <FadeInOut className="default-scrollbar h-full overflow-y-auto px-4">
        <header className="mt-4 flex flex-wrap justify-between space-x-2 text-xs">
          <div className="flex items-center space-x-1">
            <p className="text-sm text-slate-500">Available Paid Leaves:</p>
            <Chip count={leaves?.leaves.user.paidLeaves} />
          </div>
        </header>
        <SummaryFilterDropdown />

        {!isLeavesLoading ? (
          <main className="flex flex-col space-y-4">
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
          </main>
        ) : (
          <div className="flex min-h-[50vh] items-center justify-center">
            <PulseLoader color="#ffb40b" size={10} />
          </div>
        )}
      </FadeInOut>
    </LeaveManagementLayout>
  )
}

export default LeaveSummary
