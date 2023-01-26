import classNames from 'classnames'
import React, { FC, ReactNode } from 'react'

interface Props {
  maxWidth?: string
  children: ReactNode
  className?: string
}

const MaxWidthContainer: FC<Props> = ({ children, maxWidth, className }) => {
  return <div className={classNames('mx-auto w-full', maxWidth, className)}>{children}</div>
}

MaxWidthContainer.defaultProps = {
  maxWidth: 'max-w-7xl',
  className: ''
}

export default MaxWidthContainer
