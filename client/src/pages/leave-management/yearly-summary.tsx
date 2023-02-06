import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'

import Card from '~/components/atoms/Card'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'
import BreakdownOfLeaveCard from '~/components/molecules/BreakdownOfLeavesCard'
import LeaveManagementLayout from '~/components/templates/LeaveManagementLayout'
import LeaveManagementResultTable from '~/components/molecules/LeaveManagementResultTable'

import {
  getHeatmapData,
  initialChartOptions,
  initialSeriesData,
  Series
} from '~/utils/generateData'
import useLeave from '~/hooks/useLeave'
import { Breakdown, LeaveTable } from '~/utils/types/leaveTypes'
import BarsLoadingIcon from '~/utils/icons/BarsLoadingIcon'
import moment from 'moment'
import { useRouter } from 'next/router'

const ReactApexChart = dynamic(async () => await import('react-apexcharts'), {
  ssr: false
})

type SeriesData = {
  name: string
  data: Series[]
}

const YearlySummary: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { handleYearlyAllLeaveQuery } = useLeave()
  const {
    data: leaves,
    isSuccess,
    isLoading: isLeavesLoading,
    isError: isLeavesError
  } = handleYearlyAllLeaveQuery(
    isNaN(parseInt(router.query.year as string))
      ? moment().year()
      : parseInt(router.query.year as string),
    router.isReady
  )

  const [series, setSeries] = useState<SeriesData[]>(initialSeriesData)

  useEffect(() => {
    if (isSuccess) {
      setSeries([
        {
          name: 'December',
          data: getHeatmapData(31, leaves?.yearlyAllLeaves.heatmap.december)
        },
        {
          name: 'November',
          data: getHeatmapData(31, leaves?.yearlyAllLeaves.heatmap.november)
        },
        {
          name: 'October',
          data: getHeatmapData(31, leaves?.yearlyAllLeaves.heatmap.october)
        },
        {
          name: 'September',
          data: getHeatmapData(31, leaves?.yearlyAllLeaves.heatmap.september)
        },
        {
          name: 'August',
          data: getHeatmapData(31, leaves?.yearlyAllLeaves.heatmap.august)
        },
        {
          name: 'July',
          data: getHeatmapData(31, leaves?.yearlyAllLeaves.heatmap.july)
        },
        {
          name: 'June',
          data: getHeatmapData(31, leaves?.yearlyAllLeaves.heatmap.june)
        },
        {
          name: 'May',
          data: getHeatmapData(31, leaves?.yearlyAllLeaves.heatmap.may)
        },
        {
          name: 'April',
          data: getHeatmapData(31, leaves?.yearlyAllLeaves.heatmap.april)
        },
        {
          name: 'March',
          data: getHeatmapData(31, leaves?.yearlyAllLeaves.heatmap.march)
        },
        {
          name: 'February',
          data: getHeatmapData(31, leaves?.yearlyAllLeaves.heatmap.february)
        },
        {
          name: 'January',
          data: getHeatmapData(31, leaves?.yearlyAllLeaves.heatmap.january)
        }
      ])
    }
  }, [isSuccess, leaves?.yearlyAllLeaves.heatmap])

  return (
    <LeaveManagementLayout metaTitle="Yearly Summary">
      {!isLeavesLoading ? (
        <main className="default-scrollbar h-full flex-col space-y-4 overflow-y-auto px-4">
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
                'md:flex-row md:space-y-0 md:space-x-4'
              )}
            >
              {/* Pass the needed props of these components */}
              <BreakdownOfLeaveCard data={leaves?.yearlyAllLeaves.breakdown as Breakdown} />
              <LeaveManagementResultTable
                {...{
                  query: {
                    data: leaves?.yearlyAllLeaves.table as LeaveTable[],
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
          <BarsLoadingIcon className="h-7 w-7 fill-current text-amber-500" />
        </div>
      )}
    </LeaveManagementLayout>
  )
}

export default YearlySummary
