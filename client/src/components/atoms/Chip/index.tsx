import React, { FC } from 'react'
import classNames from 'classnames'

type Props = {
  label: string
}

const Chip: FC<Props> = ({ label = '' }): JSX.Element => {
  const status = label.toLowerCase()

  const styles = classNames(
    'border rounded-full px-1 font-normal select-none',
    status.startsWith('on-duty') ? 'border-green-300 bg-green-50 text-green-600' : null,
    status.startsWith('vacation leave') ? 'border-amber-300 bg-amber-50 text-amber-600' : null,
    status.startsWith('sick leave') ? 'border-rose-300 bg-rose-50 text-rose-600' : null,
    status.startsWith('absent') ? 'border-fuchsia-300 bg-fuchsia-50 text-fuchsia-600' : null
  )
  return <span className={styles}>{label}</span>
}

export default Chip
