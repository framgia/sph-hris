import React, { FC } from 'react'
import classNames from 'classnames'

import { RequestStatus } from '~/utils/constants/requestStatus'

type Props = {
  label: string
}

const RequestStatusChip: FC<Props> = ({ label }): JSX.Element => {
  const styles = classNames(
    'border rounded-full px-1 font-normal select-none capitalize',
    label === RequestStatus.APPROVED.toLowerCase()
      ? 'border-green-300 bg-green-50 text-green-600'
      : '',
    label === RequestStatus.PENDING.toLowerCase()
      ? 'border-amber-300 bg-amber-50 text-amber-600'
      : '',
    label === RequestStatus.DISAPPROVED.toLowerCase()
      ? 'border-rose-300 bg-rose-50 text-rose-600'
      : '',
    label === RequestStatus.CANCELLED.toLocaleLowerCase()
      ? 'border-red-300 bg-red-50 text-red-600'
      : ''
  )
  return <span className={styles}>{label}</span>
}

RequestStatusChip.defaultProps = {
  label: RequestStatus.PENDING
}

export default RequestStatusChip
