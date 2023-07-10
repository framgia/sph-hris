import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'

import Card from '~/components/atoms/Card'
import useUserQuery from '~/hooks/useUserQuery'
import FadeInOut from '~/components/templates/FadeInOut'
import { IMyFiledScheduleData } from '~/utils/interfaces'
import useEmployeeSchedule from '~/hooks/useEmployeeSchedule'
import { getApprovalStatus } from '~/utils/myDailyTimeHelpers'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'
import MyScheduleLayout from '~/components/templates/MySchedulelayout'
import GlobalSearchFilter from '~/components/molecules/GlobalSearchFilter'
import UnderConstructionPage from '~/components/pages/UnderContructionPage'
import { columns } from '~/components/molecules/MyFiledScheduleTable/columns'
import MyFiledScheduleTable from '~/components/molecules/MyFiledScheduleTable'

const FiledSchedules: NextPage = (): JSX.Element => {
  const { handleUserQuery } = useUserQuery()
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const { getAllScheduleRequestsQuery } = useEmployeeSchedule()

  const { data: user } = handleUserQuery()
  const { data: MyFiledScheduleData } = getAllScheduleRequestsQuery(Number(user?.userById.id))
  const FiledSchedule = MyFiledScheduleData?.employeeChangeScheduleRequest
  const [filedRequestDataTable, setFiledRequestDataTable] = useState<IMyFiledScheduleData[]>()

  const getFiledScheduleRequestMappedData = (): IMyFiledScheduleData[] | undefined => {
    return FiledSchedule?.map((item) => {
      const parsedData = JSON.parse(item.data)
      const status =
        item.isLeaderApproved === null || item.isManagerApproved === null
          ? null
          : item.isLeaderApproved && item.isManagerApproved

      const schedule = {
        monday: { timeIn: '', timeOut: '', breakFrom: '', breakTo: '' },
        tuesday: { timeIn: '', timeOut: '', breakFrom: '', breakTo: '' },
        wednesday: { timeIn: '', timeOut: '', breakFrom: '', breakTo: '' },
        thursday: { timeIn: '', timeOut: '', breakFrom: '', breakTo: '' },
        friday: { timeIn: '', timeOut: '', breakFrom: '', breakTo: '' },
        saturday: { timeIn: '', timeOut: '', breakFrom: '', breakTo: '' },
        sunday: { timeIn: '', timeOut: '', breakFrom: '', breakTo: '' }
      }

      const scheduleList = parsedData.reduce(
        (
          acc: Record<
            string,
            {
              breakFrom: string
              timeOut: string
              timeIn: string
              breakTo: string
            }
          >,
          data: { Day: string; From: string; To: string; BreakFrom: string; BreakTo: string }
        ) => {
          const day = data.Day.toLowerCase()
          acc[day].timeIn = data.From
          acc[day].timeOut = data.To
          acc[day].breakFrom = data.BreakFrom
          acc[day].breakTo = data.BreakTo

          return acc
        },
        schedule
      )

      return {
        id: item.id,
        dateFiled: item.createdAt,
        status: getApprovalStatus(status),
        schedule: scheduleList
      }
    })
  }

  useEffect(() => {
    if (FiledSchedule !== null || FiledSchedule !== undefined) {
      const mappedOffsets = getFiledScheduleRequestMappedData()
      setFiledRequestDataTable(mappedOffsets)
    }
  }, [FiledSchedule])

  if (process.env.NEXT_PUBLIC_DISPLAY_MY_SCHEDULE_PAGE === 'false') {
    return <UnderConstructionPage />
  }

  return (
    <MyScheduleLayout metaTitle="Filed Schedules">
      <FadeInOut className="default-scrollbar h-full overflow-auto">
        <MaxWidthContainer maxWidth="w-full max-w-[868px]" className="relative my-8 px-4 text-xs">
          <Card className="overflow-hidden">
            <header className="py-2 px-4">
              <GlobalSearchFilter
                value={globalFilter ?? ''}
                onChange={(value) => setGlobalFilter(String(value))}
                placeholder="Search"
              />
            </header>
            <MyFiledScheduleTable
              {...{
                query: {
                  data: filedRequestDataTable ?? [],
                  error: null
                },
                table: {
                  columns,
                  globalFilter,
                  setGlobalFilter
                }
              }}
            />
          </Card>
        </MaxWidthContainer>
      </FadeInOut>
    </MyScheduleLayout>
  )
}

export default FiledSchedules
