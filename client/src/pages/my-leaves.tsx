import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { Plus } from 'react-feather'
import { useRouter } from 'next/router'
import { PulseLoader } from 'react-spinners'
import React, { useEffect, useState } from 'react'

import useLeave from '~/hooks/useLeave'
import Card from '~/components/atoms/Card'
import useUserQuery from '~/hooks/useUserQuery'
import Layout from '~/components/templates/Layout'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { getRemainingPaidLeaves } from '~/hooks/useLeaveQuery'
import { Chip } from '~/components/templates/LeaveManagementLayout'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'
import AddNewLeaveModal from '~/components/molecules/AddNewLeaveModal'
import BreakdownOfLeaveCard from '~/components/molecules/BreakdownOfLeavesCard'
import { Breakdown, HeatmapDetails, LeaveTable } from '~/utils/types/leaveTypes'
import SummaryFilterDropdown from '~/components/molecules/SummaryFilterDropdown'
import LeaveCellDetailsModal from '~/components/molecules/LeaveCellDetailsModal'
import LeaveManagementResultTable from '~/components/molecules/LeaveManagementResultTable'
import {
  Series,
  getHeatmapData,
  ConfigApexChart,
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

const MyLeaves: NextPage = (): JSX.Element => {
  const router = useRouter()
  const [selectedMonth, setSelectedMonth] = useState<string>('')
  const [selectedDay, setSelectedDay] = useState<number>(0)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenCellDetails, setIsOpenCellDetails] = useState<boolean>(false)

  const handleToggleCellDetails = (): void => setIsOpenCellDetails(!isOpenCellDetails)

  // CURRENT USER HOOKS
  const { handleUserQuery } = useUserQuery()
  const { data: user, isSuccess: isUserSuccess, isLoading: isUserLoading } = handleUserQuery()

  // GET MY LEAVE HOOKS
  const { getLeaveQuery } = useLeave()
  const {
    data: leaves,
    refetch,
    isSuccess,
    isLoading: isLeavesLoading,
    isError: isLeavesError
  } = getLeaveQuery(
    user?.userById.id as number,
    parseInt(router.query.year as string),
    parseInt(router.query.leave as string)
  )
  const [series, setSeries] = useState<SeriesData[]>(initialSeriesData)
  const { data: paidLeaves } = getRemainingPaidLeaves(user?.userById?.id as number)

  useEffect(() => {
    if (router.isReady && router.query.year === undefined && router.query.leave === undefined) {
      void router.replace({
        pathname: router.pathname,
        query: {
          year: new Date().getFullYear(),
          leave: 0
        }
      })
    }
  }, [router])

  useEffect(() => {
    if (
      isUserSuccess &&
      user?.userById.id !== undefined &&
      router.query.year !== undefined &&
      router.query.leave !== undefined
    ) {
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

  const updatedInitialChartOptions = {
    ...initialChartOptions, // Replace with your existing initialChartOptions variable
    chart: {
      ...initialChartOptions.chart, // Merge the previous chart configuration
      events: {
        click: (event: MouseEvent, chartContext: ApexCharts, config: ConfigApexChart) => {
          const selectedMonth = config?.config?.series[config.seriesIndex]?.name
          const selectedDay = config?.dataPointIndex + 1

          if (config.seriesIndex !== -1) {
            setSelectedMonth(selectedMonth)
            setSelectedDay(selectedDay)
            handleToggleCellDetails()
          }
        }
      }
    }
  }

  return (
    <Layout metaTitle="My Leaves">
      <main className="default-scrollbar h-full overflow-y-auto">
        <header className="mt-4 flex flex-wrap justify-between space-x-2 px-4 text-xs">
          <div className="flex items-center space-x-1">
            <p className="text-sm text-slate-500">Available Paid Leaves:</p>
            <Chip count={paidLeaves?.paidLeaves} />
          </div>
          <Button
            type="button"
            variant="primary"
            className="flex items-center space-x-0.5 px-1.5 py-[3px]"
            onClick={handleToggle}
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:block">File leave</span>
          </Button>
          {/* This will Open New Modal for Filing New Leave */}
          <AddNewLeaveModal
            {...{
              isOpen,
              closeModal: handleToggle
            }}
          />
        </header>
        {/* This will trigger filter */}
        <div className="px-4">
          <SummaryFilterDropdown />
        </div>
        {!isUserLoading && !isLeavesLoading ? (
          <div className="space-y-4 px-4">
            <MaxWidthContainer>
              <Card className="default-scrollbar mt-4 overflow-x-auto overflow-y-hidden">
                <div className="w-full min-w-[647px] px-5 pt-4 md:max-w-full">
                  <ReactApexChart
                    options={updatedInitialChartOptions}
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
            <PulseLoader color="#ffb40b" size={10} />
          </div>
        )}

        {/* For Leave Cell Details Modal */}
        <LeaveCellDetailsModal
          {...{
            isOpen: isOpenCellDetails,
            closeModal: handleToggleCellDetails,
            selectedDate: {
              month: selectedMonth,
              day: selectedDay,
              year: parseInt(router.query.year as string)
            }
          }}
        />
      </main>
    </Layout>
  )
}

export default MyLeaves
