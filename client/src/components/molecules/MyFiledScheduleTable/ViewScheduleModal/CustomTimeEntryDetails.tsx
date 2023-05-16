import React, { FC } from 'react'
import isEmpty from 'lodash/isEmpty'

type Props = {
  schedule: {
    timeIn: string
    timeOut: string
  }
}

const CustomTimeEntryDetails: FC<Props> = ({ schedule }): JSX.Element => (
  <>
    {!isEmpty(schedule.timeIn) && !isEmpty(schedule.timeOut) ? (
      <div className="ml-4 flex flex-col space-y-1 text-slate-500">
        <div>
          In:{' '}
          <span className="rounded-lg bg-amber-500 px-2 font-semibold text-white">
            {schedule.timeIn}
          </span>
        </div>
        <div>
          Out:{' '}
          <span className="rounded-lg bg-amber-500 px-2 font-semibold text-white">
            {schedule.timeOut}
          </span>
        </div>
      </div>
    ) : (
      <div>
        <span className="ml-5 rounded-lg bg-slate-500 px-2 italic text-white">Rest Day</span>
      </div>
    )}
  </>
)

export default CustomTimeEntryDetails
