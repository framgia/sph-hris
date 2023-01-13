import React, { FC } from 'react'
import classNames from 'classnames'
import { WorkStatus } from '~/utils/constants/work-status'

type Props = {
  label: string
}

const Chip: FC<Props> = ({ label = WorkStatus.ON_DUTY }): JSX.Element => {
  const styles = classNames(
    'border rounded-full px-1 font-normal select-none capitalize',
    label === WorkStatus.ON_DUTY.toLowerCase()
      ? 'border-green-300 bg-green-50 text-green-600'
      : null,
    label === WorkStatus.VACATION_LEAVE.toLowerCase()
      ? 'border-amber-300 bg-amber-50 text-amber-600'
      : null,
    label === WorkStatus.SICK_LEAVE.toLowerCase()
      ? 'border-rose-300 bg-rose-50 text-rose-600'
      : null,
    label === WorkStatus.ABSENT.toLowerCase()
      ? 'border-fuchsia-300 bg-fuchsia-50 text-fuchsia-600'
      : null
  )
  return <span className={styles}>{label}</span>
}

export default Chip
