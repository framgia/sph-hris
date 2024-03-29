import React, { FC } from 'react'
import classNames from 'classnames'

import { WorkStatus } from '~/utils/constants/work-status'
import { LeaveStatus } from '~/utils/constants/leaveStatus'

type Props = {
  label: string
}

const WorkStatusChip: FC<Props> = ({ label }): JSX.Element => {
  const styles = classNames(
    'border rounded-full px-1 font-normal select-none capitalize',
    label.toLowerCase() === WorkStatus.ON_DUTY.toLowerCase()
      ? 'border-green-300 bg-green-50 text-green-600'
      : null,
    label.toLowerCase() === WorkStatus.VACATION_LEAVE.toLowerCase()
      ? 'border-yellow-300 bg-yellow-50 text-yellow-600'
      : null,
    label.toLowerCase() === WorkStatus.SICK_LEAVE.toLowerCase()
      ? 'border-rose-300 bg-rose-50 text-rose-600'
      : null,
    label.toLowerCase() === WorkStatus.ABSENT.toLowerCase()
      ? 'border-fuchsia-300 bg-fuchsia-50 text-fuchsia-600'
      : null,
    label.toLowerCase() === WorkStatus.BEREAVEMENT_LEAVE.toLowerCase()
      ? 'border-gray-300 bg-gray-100 text-gray-600'
      : null,
    label.toLowerCase() === WorkStatus.EMERGENCY_LEAVE.toLowerCase()
      ? 'border-red-300 bg-red-50 text-red-600'
      : null,
    label.toLowerCase() === WorkStatus.MATERNITY_PATERNITY_LEAVE.toLowerCase()
      ? 'border-violet-300 bg-violet-50 text-violet-600'
      : null,
    label.toLowerCase() === WorkStatus.UNDERTIME.toLowerCase()
      ? 'border-amber-300 bg-amber-50 text-amber-600'
      : null,
    label.toLowerCase() === WorkStatus.REST.toLowerCase()
      ? 'border-sky-300 bg-sky-50 text-sky-600'
      : null,
    label.toLowerCase() === WorkStatus.AWAITING.toLowerCase() ? 'invisible' : null,
    label.toLowerCase() === LeaveStatus.PENDING.toLowerCase()
      ? 'border-amber-300 bg-amber-50 text-amber-600'
      : null,
    label.toLowerCase() === LeaveStatus.APPROVED.toLowerCase()
      ? 'border-green-300 bg-green-50 text-green-600'
      : null,
    label.toLowerCase() === LeaveStatus.DISAPPROVED.toLowerCase()
      ? 'border-rose-300 bg-rose-50 text-rose-600'
      : null
  )
  return <span className={styles}>{label}</span>
}

WorkStatusChip.defaultProps = {
  label: WorkStatus.ON_DUTY
}

export default WorkStatusChip
