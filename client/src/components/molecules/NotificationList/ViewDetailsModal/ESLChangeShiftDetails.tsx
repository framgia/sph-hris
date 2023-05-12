import moment from 'moment'
import React, { FC } from 'react'

import { INotification } from '~/utils/interfaces'
import { IESLOffset } from '~/utils/interfaces/eslOffsetInterface'

type Props = {
  notification: INotification
}

const ESLChangeShiftDetails: FC<Props> = ({ notification }): JSX.Element => {
  const { requestedTimeIn, requestedTimeOut, date, dateFiled, status, description, offsets } =
    notification

  const renderOffsets = (offset: IESLOffset): string => {
    const timeIn = moment(offset.TimeIn, 'HH:mm:ss')
    const timeOut = moment(offset.TimeOut, 'HH:mm:ss')

    const difference = moment.duration(timeOut.diff(timeIn))
    const diffHours = difference.hours()
    const diffMinutes = difference.minutes()

    let displayDiff = ''
    if (diffHours > 0) {
      displayDiff += `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'}`
    }
    if (diffMinutes > 0) {
      displayDiff += ` ${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'}`
    }
    if (displayDiff === '') {
      displayDiff = '0 minutes'
    }

    return displayDiff
  }

  return (
    <>
      <li className="inline-flex items-center space-x-3">
        <span className="text-slate-600">Requested Time In: </span>
        <span className="flex items-center font-medium">{requestedTimeIn}</span>
      </li>
      <li className="inline-flex items-center space-x-3">
        <span className="text-slate-600">Requested Time Out: </span>
        <span className="flex items-center font-medium">{requestedTimeOut}</span>
      </li>
      <li className="inline-flex items-center space-x-3 pt-2">
        <span className="text-slate-600">Date: </span>
        <span className="flex items-center font-medium">{date}</span>
      </li>
      <li className="inline-flex items-center space-x-3 pt-2">
        <span className="text-slate-600">Date Filed: </span>
        <span className="flex items-center font-medium">
          {moment(new Date(dateFiled)).format('MMM DD, YYYY')} &bull; {``}
          {moment(new Date(dateFiled)).fromNow()}
        </span>
      </li>
      <li className="inline-flex items-center space-x-3 pt-2">
        <span className="text-slate-600">Status: </span>
        <span className="flex items-center font-medium">{status}</span>
      </li>
      <li className="inline-flex flex-col space-y-2 pt-2">
        <span className="text-slate-600">Description: </span>
        <span className="font-medium">{description}</span>
      </li>
      <li className="inline-flex flex-col space-y-2 pt-2">
        <span className="text-slate-600">Offsets: </span>
        {offsets?.map((offset) => (
          <span key={offset.Id} className="ml-4 font-medium">
            {`- ${offset.Title} (${date} - ${renderOffsets(offset)})`}
          </span>
        ))}
      </li>
    </>
  )
}

export default ESLChangeShiftDetails
