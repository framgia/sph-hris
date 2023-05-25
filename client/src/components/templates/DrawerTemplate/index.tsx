import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  isOpen: boolean
  actions: {
    handleToggle: () => void
  }
}

const DrawerTemplate: FC<Props> = (props): JSX.Element => {
  const router = useRouter()
  const timeIdExists = router.query.time_out !== undefined || router.query.time_in !== undefined

  const {
    children,
    isOpen,
    actions: { handleToggle }
  } = props

  const handleTimeIdExists = (): void => {
    if (timeIdExists) {
      void router.replace(router.pathname, undefined, { shallow: false })
    } else {
      handleToggle()
    }
  }

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
            onClick={() => handleTimeIdExists()}
            className="fixed inset-0 z-40 cursor-default bg-slate-900/10 backdrop-blur-sm"
          ></div>
        )}
      </>
    </aside>
  )
}

export default DrawerTemplate
