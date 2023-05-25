import React from 'react'
import classNames from 'classnames'

import { isUsedStatus } from '~/utils/constants/isUsedStatus'

const IsUsedStatusChip = ({ label }: { label: string }): JSX.Element => {
  const styles = classNames(
    'border rounded-full px-1 font-normal select-none capitalize',
    label.toLocaleLowerCase() === isUsedStatus.NO.toLowerCase()
      ? 'border-red-300 bg-red-50 text-red-600'
      : null,
    label.toLocaleLowerCase() === isUsedStatus.YES.toLowerCase()
      ? 'border-green-300 bg-green-50 text-green-600'
      : null
  )
  return <span className={styles}>{label}</span>
}

IsUsedStatusChip.defaultProps = {
  label: isUsedStatus.NO
}

export default IsUsedStatusChip
