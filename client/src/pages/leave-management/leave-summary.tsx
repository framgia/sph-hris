import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import React, { useState } from 'react'

import Card from '~/components/atoms/Card'
import { generateData } from '~/utils/generateData'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'
import BreakdownOfLeaveCard from '~/components/molecules/BreakdownOfLeavesCard'
import LeaveManagementLayout from '~/components/templates/LeaveManagementLayout'
import LeaveManagementResultTable from '~/components/molecules/LeaveManagementResultTable'

const ReactApexChart = dynamic(async () => await import('react-apexcharts'), {
  ssr: false
})

const LeaveSummary: NextPage = (): JSX.Element => {
  const [chart] = useState({
    series: [
      {
        name: 'November',
        data: generateData(31, {
          min: 0,
          max: 50
        })
      },
      {
        name: 'October',
        data: generateData(31, {
          min: 0,
          max: 50
        })
      },
      {
        name: 'September',
        data: generateData(31, {
          min: 0,
          max: 50
        })
      },
      {
        name: 'August',
        data: generateData(31, {
          min: 0,
          max: 50
        })
      },
      {
        name: 'July',
        data: generateData(31, {
          min: 0,
          max: 50
        })
      },
      {
        name: 'June',
        data: generateData(31, {
          min: 1,
          max: 50
        })
      },
      {
        name: 'May',
        data: generateData(31, {
          min: 0,
          max: 50
        })
      },
      {
        name: 'April',
        data: generateData(31, {
          min: 0,
          max: 50
        })
      },
      {
        name: 'March',
        data: generateData(31, {
          min: 0,
          max: 50
        })
      },
      {
        name: 'February',
        data: generateData(31, {
          min: 0,
          max: 50
        })
      },
      {
        name: 'January',
        data: generateData(31, {
          min: 0,
          max: 50
        })
      }
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          }
        }
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          radius: 0,
          useFillColorAsStroke: false,
          colorScale: {
            ranges: [
              {
                from: 1,
                to: 6,
                name: 'Undertime',
                color: '#d97706'
              },
              {
                from: 7,
                to: 12,
                name: 'Sick Leave',
                color: '#059669'
              },
              {
                from: 13,
                to: 18,
                name: 'Vacation Leave',
                color: '#2563eb'
              },
              {
                from: 19,
                to: 31,
                name: 'Emergency Leave',
                color: '#e11d48'
              },
              {
                from: 32,
                to: 50,
                name: 'Bereavement Leave',
                color: '#4b5563'
              }
            ]
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 1
      },
      title: {
        text: ''
      }
    }
  })

  return (
    <LeaveManagementLayout metaTitle="Leave Summary">
      <main className="default-scrollbar h-full flex-col space-y-4 overflow-y-auto px-4">
        <MaxWidthContainer>
          <Card className="default-scrollbar mt-4 overflow-x-auto overflow-y-hidden">
            <div className="w-full min-w-[647px] px-5 pt-4 md:max-w-full">
              <ReactApexChart
                options={chart.options}
                series={chart.series}
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
            <BreakdownOfLeaveCard
              data={{
                sickLeave: 0,
                undertime: 0,
                vacationLeave: 0,
                emergencyLeave: 0,
                bereavementLeave: 0,
                maternityLeave: 0,
                withoutPayTotal: 0,
                withPayTotal: 0
              }}
            />
            <LeaveManagementResultTable
              {...{
                query: {
                  data: [],
                  isLoading: false,
                  isError: false
                }
              }}
            />
          </article>
        </MaxWidthContainer>
      </main>
    </LeaveManagementLayout>
  )
}

export default LeaveSummary
