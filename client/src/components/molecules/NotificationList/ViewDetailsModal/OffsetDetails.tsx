import moment from 'moment'
import React, { FC } from 'react'

import { INotification } from '~/utils/interfaces'
import RequestStatusChip from '~/components/atoms/RequestStatusChip'

type Props = {
  notification: INotification
}

const OffsetDetails: FC<Props> = ({ notification }): JSX.Element => {
  const { requestedTimeIn, requestedTimeOut, date, dateFiled, status, description } = notification

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
        <RequestStatusChip label={status.toLocaleLowerCase()} />
      </li>
      <li className="inline-flex flex-col space-y-2 pt-2">
        <span className="text-slate-600">Description: </span>
        <span className="font-medium">{description}</span>
      </li>
    </>
  )
}

export default OffsetDetails
