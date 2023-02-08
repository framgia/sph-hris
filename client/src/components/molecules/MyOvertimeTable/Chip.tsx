import React from 'react'
import classNames from 'classnames'

import { OvertimeStatus } from '~/utils/constants/overtimeStatus'

const Chip = ({ label }: { label: string }): JSX.Element => {
  const styles = classNames(
    'border rounded-full px-1 font-normal select-none capitalize',
    label === OvertimeStatus.APPROVED.toLowerCase()
      ? 'border-green-300 bg-green-50 text-green-600'
      : null,
    label === OvertimeStatus.PENDING.toLowerCase()
      ? 'border-amber-300 bg-amber-50 text-amber-600'
      : null,
    label === OvertimeStatus.DISAPPROVED.toLowerCase()
      ? 'border-rose-300 bg-rose-50 text-rose-600'
      : null
  )
  return <span className={styles}>{label}</span>
}

Chip.defaultProps = {
  label: OvertimeStatus.PENDING
}

export default Chip
