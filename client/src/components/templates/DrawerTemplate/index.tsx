import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'

type Props = {
  children: ReactNode
  isOpen: boolean
  actions: {
    handleToggle: () => void
  }
}

const DrawerTemplate: FC<Props> = (props): JSX.Element => {
  const {
    children,
    isOpen,
    actions: { handleToggle }
  } = props

  return (
    <aside className="h-screen">
      <div
        className={classNames(
          'flex h-full max-w-[280px] shrink-0 flex-col border-r border-slate-200',
          'fixed top-0 z-50 w-full bg-white shadow-lg shadow-slate-300 transition-all duration-300',
          isOpen ? 'z-50 translate-x-0' : '-translate-x-full'
        )}
      >
        {children}
      </div>
      <>
        {/* This will served as the background of the drawer */}
        {!isOpen && (
          <div
            onClick={handleToggle}
            className="fixed inset-0 z-40 cursor-default bg-slate-900/10"
          ></div>
        )}
      </>
    </aside>
  )
}

export default DrawerTemplate
