import moment from 'moment'
import React, { FC } from 'react'
import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'

import Card from '~/components/atoms/Card'
import { TimeEntryWithBreak } from '~/utils/types/formValues'

type Props = {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
  schedule: TimeEntryWithBreak
}

const CustomDayCard: FC<Props> = ({ day, schedule }): JSX.Element => {
  const isButtonEmpty =
    isEmpty(schedule.timeIn) ||
    isEmpty(schedule.timeOut) ||
    isEmpty(schedule.breakFrom) ||
    isEmpty(schedule.breakTo)

  return (
    <Card
      rounded="lg"
      className={classNames(
        'block py-4 hover:shadow-lg hover:shadow-slate-300',
        'w-full transition-all duration-200 ease-in-out',
        isButtonEmpty ? 'h-20' : ''
      )}
    >
      <h1 className="text-center text-sm font-semibold text-slate-700">{day}</h1>
      {!isButtonEmpty ? (
        <ul className="mt-2 flex-grow-0 divide-y divide-slate-200/80 px-4 text-[13px] text-slate-600/90">
          <li className="flex items-start justify-between py-2">
            <span className="line-clamp-1">Time In</span>
            <span className="shrink-0 rounded bg-primary px-2 text-white">
              {moment(schedule.timeIn, 'HH:mm').format('hh:mm A')}
            </span>
          </li>
          <li className="flex items-start justify-between py-2">
            <span className="line-clamp-1">Time Out</span>
            <span className="shrink-0 rounded bg-primary px-2 text-white">
              {moment(schedule.timeOut, 'HH:mm').format('hh:mm A')}
            </span>
          </li>
          <li className="flex items-start justify-between py-2">
            <span className="line-clamp-1">Break From</span>
            <span className="shrink-0 rounded bg-primary px-2 text-white">
              {moment(schedule.breakFrom, 'HH:mm').format('hh:mm A')}
            </span>
          </li>
          <li className="flex items-start justify-between py-2">
            <span className="line-clamp-1">Break To</span>
            <span className="shrink-0 rounded bg-primary px-2 text-white">
              {moment(schedule.breakTo, 'HH:mm').format('hh:mm A')}
            </span>
          </li>
        </ul>
      ) : (
        <span className="mt-2 ml-4 shrink-0 rounded bg-slate-500 px-2 text-[13px] text-white">
          Rest day
        </span>
      )}
    </Card>
  )
}

export default CustomDayCard
