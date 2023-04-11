import React, { FC } from 'react'

import { IChangeShift } from '~/utils/types/timeEntryTypes'

type Props = {
  timeEntry: IChangeShift | undefined
}

const ChangeShiftDetails: FC<Props> = ({ timeEntry }): JSX.Element => {
  return (
    <>
      <li className="inline-flex items-center space-x-3">
        <span className="text-slate-600">Manager: </span>
        <span className="flex items-center font-medium">{timeEntry?.manager.name}</span>
      </li>
      <li className="inline-flex items-center space-x-3 pt-2">
        <span className="text-slate-600">Time In: </span>
        <span className="flex items-center font-medium">{timeEntry?.timeIn}</span>
      </li>
      <li className="inline-flex items-center space-x-3 pt-2">
        <span className="text-slate-600">Time Out: </span>
        <span className="flex items-center font-medium">{timeEntry?.timeOut}</span>
      </li>
      <li className="inline-flex flex-col space-y-2 pt-2">
        <span className="text-slate-600">Description: </span>
        <span className="font-medium">{timeEntry?.description}</span>
      </li>
    </>
  )
}

export default ChangeShiftDetails
