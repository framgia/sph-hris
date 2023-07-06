import { NextPage } from 'next'
import isEmpty from 'lodash/isEmpty'
import Alert from '~/components/atoms/Alert'
import React, { useEffect, useState } from 'react'

import useUserQuery from '~/hooks/useUserQuery'
import FadeInOut from '~/components/templates/FadeInOut'
import { WorkingDayTime } from '~/utils/types/userTypes'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'
import MyScheduleLayout from '~/components/templates/MySchedulelayout'
import CustomDayCard from '~/components/templates/MySchedulelayout/CustomDayCard'

const CurrentSchedule: NextPage = (): JSX.Element => {
  const [currentSchedule, setCurrentSchedule] = useState<WorkingDayTime[]>([])
  // CURRENT USER HOOKS
  const { handleUserQuery } = useUserQuery()
  const { data: user, isLoading: isLoadingUser, isError } = handleUserQuery()

  const mySchedules = user?.userById?.employeeSchedule?.workingDayTimes

  useEffect(() => {
    if (!isEmpty(mySchedules)) {
      const empty = {
        id: 0,
        day: '',
        from: '',
        to: '',
        breakFrom: '',
        breakTo: ''
      }
      const mondayData = mySchedules?.find((item) => item?.day === 'Monday') ?? empty
      const tuesdayData = mySchedules?.find((item) => item?.day === 'Tuesday') ?? empty
      const wednesdayData = mySchedules?.find((item) => item?.day === 'Wednesday') ?? empty
      const thursdayData = mySchedules?.find((item) => item?.day === 'Thursday') ?? empty
      const fridayData = mySchedules?.find((item) => item?.day === 'Friday') ?? empty
      const saturdayData = mySchedules?.find((item) => item?.day === 'Saturday') ?? empty
      const sundayData = mySchedules?.find((item) => item?.day === 'Sunday') ?? empty

      const shitdata: WorkingDayTime[] = [
        {
          ...mondayData,
          day: 'Monday'
        },
        {
          ...tuesdayData,
          day: 'Tuesday'
        },
        {
          ...wednesdayData,
          day: 'Wednesday'
        },
        {
          ...thursdayData,
          day: 'Thursday'
        },
        {
          ...fridayData,
          day: 'Friday'
        },
        {
          ...saturdayData,
          day: 'Saturday'
        },
        {
          ...sundayData,
          day: 'Sunday'
        }
      ]

      setCurrentSchedule(shitdata)
    }
  }, [mySchedules])

  return (
    <MyScheduleLayout metaTitle="Current Schedule">
      {/* This will show alert when there is error in fetching data */}
      {isError && (
        <div className="py-2 px-4">
          <Alert type="error" message="Error fetching data" />
        </div>
      )}
      {/* Show Custom Skeleton Loading */}
      {isLoadingUser ? (
        <CustomSkeletonLoading />
      ) : (
        <FadeInOut className="default-scrollbar h-full overflow-y-auto">
          <MaxWidthContainer maxWidth="w-full max-w-4xl" className="my-8 px-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
              {currentSchedule?.map((item, index) => (
                <CustomDayCard
                  key={index}
                  {...{
                    day: item.day,
                    schedule: {
                      timeIn: item.from,
                      timeOut: item.to,
                      breakFrom: item.breakFrom,
                      breakTo: item.breakTo
                    }
                  }}
                />
              ))}
            </div>
          </MaxWidthContainer>
        </FadeInOut>
      )}
    </MyScheduleLayout>
  )
}

const CustomSkeletonLoading = (): JSX.Element => {
  const skeletonItems = [1, 2, 3, 4, 5, 6, 7]
  return (
    <FadeInOut className="default-scrollbar h-full overflow-y-auto">
      <MaxWidthContainer maxWidth="w-full max-w-4xl" className="my-8 px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {skeletonItems.map((_, index) => (
            <div
              key={index}
              className="flex h-48 animate-pulse flex-col space-y-6 rounded bg-white/80 p-8"
              style={{ animationFillMode: 'backwards', animationDelay: `${80 * index}ms` }}
            >
              <div className="h-2.5 w-32 rounded-full bg-slate-200/70"></div>
              <div className="h-2 w-44 rounded-full bg-slate-200/60"></div>
              <div className="h-2 rounded-full bg-slate-200/60"></div>
              <div className="h-2 rounded-full bg-slate-200/60"></div>
            </div>
          ))}
        </div>
      </MaxWidthContainer>
    </FadeInOut>
  )
}

export default CurrentSchedule
