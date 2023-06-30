import classNames from 'classnames'
import React, { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

const ModalFooter: FC<Props> = ({ children, className }): JSX.Element => {
  return (
    <footer
      className={classNames(
        'flex w-full items-center justify-end space-x-2',
        'border-t border-slate-200 bg-slate-100 px-5 py-2.5',
        className
      )}
    >
      {children}
    </footer>
  )
}

ModalFooter.defaultProps = {
  className: ''
}

export default ModalFooter
