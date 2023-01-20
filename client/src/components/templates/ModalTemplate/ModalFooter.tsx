import React, { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const ModalFooter: FC<Props> = ({ children }): JSX.Element => {
  return (
    <footer className="flex w-full items-center justify-end space-x-2 border-t border-slate-200 bg-slate-100 px-5 py-2.5">
      {children}
    </footer>
  )
}

ModalFooter.defaultProps = {}

export default ModalFooter
