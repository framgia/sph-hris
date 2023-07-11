import isEmpty from 'lodash/isEmpty'
import React, { FC, useEffect, useState } from 'react'

import { INotification } from '~/utils/interfaces'
import { IWorkDayData } from '~/utils/types/notificationTypes'
import CustomDayCard from '~/components/templates/MySchedulelayout/CustomDayCard'

type Props = {
  notification: INotification
}

const ChangeScheduleDetails: FC<Props> = ({ notification }): JSX.Element => {
  const [requestedSchedule, setRequestedSchedule] = useState<IWorkDayData[]>([])

  const myRequestedWorkingDays = notification?.workingDays

  useEffect(() => {
    if (!isEmpty(notification)) {
      const empty = {
        Day: '',
        From: '',
        To: '',
        BreakFrom: '',
        BreakTo: ''
      }
      const mondayData =
        myRequestedWorkingDays?.find((item) => item?.Day === 'Monday' || item?.Day === 'monday') ??
        empty
      const tuesdayData =
        myRequestedWorkingDays?.find(
          (item) => item?.Day === 'Tuesday' || item?.Day === 'tuesday'
        ) ?? empty
      const wednesdayData =
        myRequestedWorkingDays?.find(
          (item) => item?.Day === 'Wednesday' || item?.Day === 'wednesday'
        ) ?? empty
      const thursdayData =
        myRequestedWorkingDays?.find(
          (item) => item?.Day === 'Thursday' || item?.Day === 'thursday'
        ) ?? empty
      const fridayData =
        myRequestedWorkingDays?.find((item) => item?.Day === 'Friday' || item?.Day === 'friday') ??
        empty
      const saturdayData =
        myRequestedWorkingDays?.find(
          (item) => item?.Day === 'Saturday' || item?.Day === 'saturday'
        ) ?? empty
      const sundayData =
        myRequestedWorkingDays?.find((item) => item?.Day === 'Sunday' || item?.Day === 'sunday') ??
        empty

      const shiftData: IWorkDayData[] = [
        {
          ...mondayData,
          Day: 'Monday'
        },
        {
          ...tuesdayData,
          Day: 'Tuesday'
        },
        {
          ...wednesdayData,
          Day: 'Wednesday'
        },
        {
          ...thursdayData,
          Day: 'Thursday'
        },
        {
          ...fridayData,
          Day: 'Friday'
        },
        {
          ...saturdayData,
          Day: 'Saturday'
        },
        {
          ...sundayData,
          Day: 'Sunday'
        }
      ]

      setRequestedSchedule(shiftData)
    }
  }, [notification])

  return (
    <main className="py-7 px-6 text-xs leading-relaxed tracking-wide text-slate-700">
      <ul className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 md:grid-cols-3">
        {requestedSchedule?.map((item, index) => (
          <CustomDayCard
            key={index}
            {...{
              day: item.Day,
              schedule: {
                timeIn: item.From,
                timeOut: item.To,
                breakFrom: item.BreakFrom,
                breakTo: item.BreakTo
              }
            }}
          />
        ))}
      </ul>
    </main>
  )
}

export default ChangeScheduleDetails
