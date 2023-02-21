import React, { FC } from 'react'
import classNames from 'classnames'
import { ChevronsLeft } from 'react-feather'

import Logo from '~/components/atoms/Logo'
import NavList from '~/components/molecules/NavList'
import { Menus } from '~/utils/constants/sidebarMenu'

type Props = {
  isOpenSidebar: boolean
  actions: {
    handleToggleSidebar: () => void
  }
}

const Sidebar: FC<Props> = (props): JSX.Element => {
  const {
    isOpenSidebar,
    actions: { handleToggleSidebar }
  } = props

  return (
    <aside
      className={classNames(
        'flex h-screen shrink-0 flex-col border-r border-slate-200',
        'w-full bg-white transition-all duration-300',
        isOpenSidebar ? 'max-w-0 md:max-w-[253px]' : 'max-w-0 md:max-w-[80px]'
      )}
    >
      {/* Business Logo */}
      <Logo
        {...{
          isOpen: isOpenSidebar
        }}
      />
      {/* Navigation Links */}
      <nav className="default-scrollbar hidden md:block">
        <div className="space-y-1.5 text-xs text-slate-500 overflow-x-hidden">
          <NavList
            {...{
              isOpenSidebar,
              lists: Menus
            }}
          />
        </div>
      </nav>
      {/* Footer Ooptions */}
      <section className="mt-auto hidden text-slate-500 md:block">
        <button
          type="button"
          onClick={handleToggleSidebar}
          className={classNames(
            'flex w-full items-center justify-center space-x-2 border-t border-slate-200',
            'py-2 outline-none hover:text-slate-700'
          )}
        >
          <ChevronsLeft
            className={classNames('stroke-0.5', !isOpenSidebar ? 'rotate-180' : null)}
          />
          {isOpenSidebar && <p className="text-xs uppercase">collapse</p>}
        </button>
      </section>
    </aside>
  )
}

export default Sidebar
