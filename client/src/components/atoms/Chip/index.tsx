import React, { FC } from 'react'
import classNames from 'classnames'

import { WorkStatus } from '~/utils/constants/work-status'
import { LeaveStatus } from '~/utils/constants/leaveStatus'

type Props = {
  label: string
}

const Chip: FC<Props> = ({ label }): JSX.Element => {
  const styles = classNames(
    'border rounded-full px-1 font-normal select-none capitalize',
    label === WorkStatus.ON_DUTY.toLowerCase()
      ? 'border-green-300 bg-green-50 text-green-600'
      : null,
    label === WorkStatus.VACATION_LEAVE.toLowerCase()
      ? 'border-yellow-300 bg-yellow-50 text-yellow-600'
      : null,
    label === WorkStatus.SICK_LEAVE.toLowerCase()
      ? 'border-rose-300 bg-rose-50 text-rose-600'
      : null,
    label === WorkStatus.ABSENT.toLowerCase()
      ? 'border-fuchsia-300 bg-fuchsia-50 text-fuchsia-600'
      : null,
    label === WorkStatus.BEREAVEMENT_LEAVE.toLowerCase()
      ? 'border-gray-300 bg-gray-100 text-gray-600'
      : null,
    label === WorkStatus.EMERGENCY_LEAVE.toLowerCase()
      ? 'border-red-300 bg-red-50 text-red-600'
      : null,
    label === WorkStatus.MATERNITY_PATERNITY_LEAVE.toLowerCase()
      ? 'border-violet-300 bg-violet-50 text-violet-600'
      : null,
    label === WorkStatus.UNDERTIME.toLowerCase()
      ? 'border-amber-300 bg-amber-50 text-amber-600'
      : null,
    label === LeaveStatus.PENDING.toLowerCase()
      ? 'border-amber-300 bg-amber-50 text-amber-600'
      : null,
    label === LeaveStatus.APPROVED.toLowerCase()
      ? 'border-green-300 bg-green-50 text-green-600'
      : null,
    label === LeaveStatus.DISAPPROVED.toLowerCase()
      ? 'border-rose-300 bg-rose-50 text-rose-600'
      : null
  )
  return <span className={styles}>{label}</span>
}

Chip.defaultProps = {
  label: WorkStatus.ON_DUTY
}

export default Chip
