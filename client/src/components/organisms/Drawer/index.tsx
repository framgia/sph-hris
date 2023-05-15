import React, { FC } from 'react'
import { X } from 'react-feather'
import classNames from 'classnames'

import Logo from '~/components/atoms/Logo'
import NavList from '~/components/molecules/NavList'
import { Menus, productionMenu } from '~/utils/constants/sidebarMenu'

type Props = {
  isOpenDrawer: boolean
  actions: {
    handleToggleDrawer: () => void
  }
}

const Drawer: FC<Props> = (props): JSX.Element => {
  const {
    isOpenDrawer,
    actions: { handleToggleDrawer }
  } = props

  return (
    <aside>
      <div
        className={classNames(
          'flex h-screen w-[254px] shrink-0 flex-col border-r border-slate-200',
          'fixed top-0 left-0 z-50 w-full bg-white shadow-lg transition-all duration-300',
          isOpenDrawer ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Business Logo */}
        <Logo
          {...{
            isOpen: isOpenDrawer
          }}
        />
        {/* Navigation Links */}
        <nav className="default-scrollbar">
          <ul className="space-y-1.5 text-xs text-slate-500">
            {process.env.NODE_ENV !== 'production' ? (
              <>
                {' '}
                <NavList
                  {...{
                    isOpenSidebar: isOpenDrawer,
                    lists: Menus
                  }}
                />
              </>
            ) : (
              <>
                {' '}
                <NavList
                  {...{
                    isOpenSidebar: isOpenDrawer,
                    lists: productionMenu
                  }}
                />
              </>
            )}
          </ul>
        </nav>
        {/* Footer Options */}
        <section className="mt-auto text-slate-500">
          <button
            type="button"
            onClick={handleToggleDrawer}
            className={classNames(
              'flex w-full items-center justify-center space-x-2 border-t border-slate-200',
              'py-2.5 outline-none hover:text-slate-700'
            )}
          >
            <X className="h-5 w-5 stroke-0.5" />
            <p className="text-xs uppercase">close</p>
          </button>
        </section>
      </div>
      <>
        {/* This will served as the background of the drawer */}
        {isOpenDrawer && (
          <div
            onClick={handleToggleDrawer}
            className="fixed inset-0 z-40 cursor-default backdrop-blur-sm"
          ></div>
        )}
      </>
    </aside>
  )
}

export default Drawer
