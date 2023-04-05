import moment from 'moment'
import React, { FC } from 'react'

import { INotification } from '~/utils/interfaces'

type Props = {
  row: INotification
}

const OffsetResolvedDetails: FC<Props> = ({ row }): JSX.Element => {
  return (
    <>
      <li className="inline-flex items-center space-x-3">
        <span className="text-slate-600">Requested Time In: </span>
        <span className="flex items-center font-medium">{row.requestedTimeIn}</span>
      </li>
      <li className="inline-flex items-center space-x-3">
        <span className="text-slate-600">Requested Time Out: </span>
        <span className="flex items-center font-medium">{row.requestedTimeOut}</span>
      </li>
      <li className="inline-flex items-center space-x-3 pt-2">
        <span className="text-slate-600">Date: </span>
        <span className="flex items-center font-medium">{row.date}</span>
      </li>
      <li className="inline-flex items-center space-x-3 pt-2">
        <span className="text-slate-600">Date Filed: </span>
        <span className="flex items-center font-medium">
          {moment(new Date(row.dateFiled)).format('MMM DD, YYYY')} &bull; {``}
          {moment(new Date(row.dateFiled)).fromNow()}
        </span>
      </li>
      <li className="inline-flex items-center space-x-3 pt-2">
        <span className="text-slate-600">Status: </span>
        <span className="flex items-center font-medium">{row.status}</span>
      </li>
      <li className="inline-flex flex-col space-y-2 pt-2">
        <span className="text-slate-600">Description: </span>
        <span className="font-medium">{row.description}</span>
      </li>
    </>
  )
}

export default OffsetResolvedDetails
