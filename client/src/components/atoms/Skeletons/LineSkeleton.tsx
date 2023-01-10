import React, { FC } from 'react'
import classNames from 'classnames'

type Props = {
  className?: string
}

const LineSkeleton: FC<Props> = ({ className }): JSX.Element => {
  return (
    <div
      className={classNames(
        'mb-2.5 h-2 w-full rounded-full bg-slate-300',
        'animate-pulse',
        className
      )}
    ></div>
  )
}

export default LineSkeleton
