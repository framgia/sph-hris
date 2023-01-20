import React, { FC } from 'react'
import classNames from 'classnames'

import SortIcon from '~/utils/icons/SortIcon'

type Props = {
  label: string
  className?: string
}

const CellHeader: FC<Props> = ({ label, className }): JSX.Element => {
  return (
    <span className={classNames(className, 'group flex items-center font-normal')}>
      {label}
      <SortIcon className="ml-2 h-3 w-3 shrink-0 fill-current group-active:scale-95" />
    </span>
  )
}

CellHeader.defaultProps = {
  className: 'text-slate-500'
}

export default CellHeader
