import React from 'react'
import { NextPage } from 'next'

import FadeInOut from '~/components/templates/FadeInOut'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'
import MyScheduleLayout from '~/components/templates/MySchedulelayout'
import UnderConstructionPage from '~/components/pages/UnderContructionPage'
import CustomDayCard from '~/components/templates/MySchedulelayout/CustomDayCard'

const CurrentSchedule: NextPage = (): JSX.Element => {
  if (process.env.NEXT_PUBLIC_DISPLAY_MY_SCHEDULE_PAGE === 'false') {
    return <UnderConstructionPage />
  }

  return (
    <MyScheduleLayout metaTitle="Current Schedule">
      <FadeInOut className="default-scrollbar h-full overflow-y-auto">
        <MaxWidthContainer maxWidth="w-full max-w-4xl" className="my-8 px-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            <CustomDayCard
              {...{
                day: 'Monday',
                schedule: {
                  timeIn: '09:30',
                  timeOut: '18:30',
                  breakFrom: '12:00',
                  breakTo: '13:00'
                }
              }}
            />
            <CustomDayCard
              {...{
                day: 'Tuesday',
                schedule: {
                  timeIn: '09:30',
                  timeOut: '18:30',
                  breakFrom: '12:00',
                  breakTo: '13:00'
                }
              }}
            />
            <CustomDayCard
              {...{
                day: 'Wednesday',
                schedule: {
                  timeIn: '09:30',
                  timeOut: '18:30',
                  breakFrom: '12:00',
                  breakTo: '13:00'
                }
              }}
            />
            <CustomDayCard
              {...{
                day: 'Thursday',
                schedule: {
                  timeIn: '09:30',
                  timeOut: '18:30',
                  breakFrom: '12:00',
                  breakTo: '13:00'
                }
              }}
            />
            <CustomDayCard
              {...{
                day: 'Friday',
                schedule: {
                  timeIn: '09:30',
                  timeOut: '18:30',
                  breakFrom: '12:00',
                  breakTo: '13:00'
                }
              }}
            />
            <CustomDayCard
              {...{
                day: 'Saturday',
                schedule: {
                  timeIn: '',
                  timeOut: '',
                  breakFrom: '',
                  breakTo: ''
                }
              }}
            />
            <CustomDayCard
              {...{
                day: 'Sunday',
                schedule: {
                  timeIn: '',
                  timeOut: '',
                  breakFrom: '',
                  breakTo: ''
                }
              }}
            />
          </div>
        </MaxWidthContainer>
      </FadeInOut>
    </MyScheduleLayout>
  )
}

export default CurrentSchedule
