import React, { FC } from 'react'
import classNames from 'classnames'
import { Bell, ChevronRight, X } from 'react-feather'

import Logo from '~/components/atoms/Logo'
import Avatar from '~/components/atoms/Avatar'
import NavList from '~/components/molecules/NavList'
import { Menus } from '~/utils/constants/sidebarMenu'
import UserMenuDropDown from '~/components/molecules/UserMenuDropdown'

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
          'flex h-screen max-w-[250px] shrink-0 flex-col border-r border-slate-200',
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
            <NavList
              {...{
                isOpenSidebar: isOpenDrawer,
                lists: Menus
              }}
            />
          </ul>
        </nav>
        {/* Footer Options */}
        <section className="mt-auto text-slate-500">
          <button
            className={classNames(
              'flex w-full items-center space-x-3 border-t border-slate-200',
              'px-6 py-2 text-xs text-slate-500 outline-none active:scale-95',
              'hover:bg-slate-100'
            )}
          >
            <Bell className="h-5 w-5 stroke-0.5" />
            <span>Notifications</span>
          </button>
          <UserMenuDropDown
            position="top"
            className="flex w-full items-center border-t border-slate-200 outline-none"
          >
            <div className="flex items-start space-x-3 py-2.5 px-6">
              <Avatar
                src="https://avatars.githubusercontent.com/u/38458781?v=4"
                alt="user-avatar"
                rounded="full"
              />
              <div
                className={classNames(
                  'text-left text-xs duration-200',
                  !isOpenDrawer ? 'hidden' : null
                )}
              >
                <h3 className="font-semibold line-clamp-1">Joshua Galit</h3>
                <small className="subpixel-antialiased line-clamp-1">
                  Sun Asterisk Philippines
                </small>
              </div>
            </div>
            <ChevronRight
              className={classNames(
                'h-7 w-7 shrink-0 stroke-0.5 duration-200',
                !isOpenDrawer ? 'hidden' : null
              )}
            />
          </UserMenuDropDown>
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
