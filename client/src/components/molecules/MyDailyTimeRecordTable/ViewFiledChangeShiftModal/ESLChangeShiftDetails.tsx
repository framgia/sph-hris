import moment from 'moment'
import React, { FC } from 'react'

import { IESLChangeShift } from '~/utils/types/timeEntryTypes'

type Props = {
  eslChangeShift: IESLChangeShift
}

const ESLChangeShiftDetails: FC<Props> = ({ eslChangeShift }): JSX.Element => {
  const {
    teamLeader: { name },
    timeIn,
    timeOut,
    description
  } = eslChangeShift

  return (
    <>
      <li className="inline-flex items-center space-x-3">
        <span className="text-slate-600">Team Leader: </span>
        <span className="flex items-center font-medium">{name}</span>
      </li>
      <li className="inline-flex items-center space-x-3 pt-2">
        <span className="text-slate-600">Time In: </span>
        <span className="flex items-center font-medium">
          {moment(timeIn, 'HH:mm:ss').format('hh:mm A')}
        </span>
      </li>
      <li className="inline-flex items-center space-x-3 pt-2">
        <span className="text-slate-600">Time Out: </span>
        <span className="flex items-center font-medium">
          {moment(timeOut, 'HH:mm:ss').format('hh:mm A')}
        </span>
      </li>
      <li className="inline-flex flex-col space-y-2 pt-2">
        <span className="text-slate-600">Description: </span>
        <span className="font-medium">{description}</span>
      </li>
    </>
  )
}

export default ESLChangeShiftDetails
