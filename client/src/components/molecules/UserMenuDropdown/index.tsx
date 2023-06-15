import { Menu } from '@headlessui/react'
import { signOut } from 'next-auth/react'
import { deleteCookie } from 'cookies-next'
import React, { FC, ReactNode } from 'react'
import { LogOut, Settings } from 'react-feather'

import handleImageError from '~/utils/handleImageError'
import useLogoutMutation from '~/hooks/useLogOutMutation'
import { User as CurrentUser } from '~/utils/types/userTypes'
import MenuTransition from '~/components/templates/MenuTransition'

type Props = {
  currentUser: CurrentUser | undefined
  children: ReactNode
}

const UserMenuDropDown: FC<Props> = ({ currentUser, children }): JSX.Element => {
  const { handleLogoutMutation } = useLogoutMutation()
  const LogoutMutation = handleLogoutMutation()

  const handleSignOut = async (): Promise<void> => {
    await signOut({ callbackUrl: '/sign-in' }).then(() => {
      deleteCookie('authorization')
      deleteCookie('access_token')
    })
    LogoutMutation.mutate({ token: localStorage.getItem('cookies') as string })
    localStorage.removeItem('cookies')
  }

  const handleClickSignOut = (): void => {
    void handleSignOut()
  }

  return (
    <Menu as="div" className="relative z-30 flex w-full text-left">
      <Menu.Button className="shrink-0 outline-none active:scale-95">{children}</Menu.Button>
      <MenuTransition>
        <Menu.Items className="menu-items">
          <header className="flex items-center space-x-3 px-4 py-2">
            <section className="relative shrink-0 rounded-full shadow shadow-slate-200">
              <div className="rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-500 p-1">
                <img
                  src={currentUser?.avatarLink}
                  onError={(e) => handleImageError(e, '/images/default.png')}
                  className="block h-9 w-9 rounded-full bg-white p-0.5 shadow-sm ring-1 ring-white"
                />
              </div>
              <span className="online"></span>
            </section>
            <section>
              <h2 className="text-sm font-medium line-clamp-1">{currentUser?.name}</h2>
              <span className="font-light">{currentUser?.position.name}</span>
            </section>
          </header>
          <hr className="mx-4 border-slate-100" />
          <Menu.Item>
            <button type="button" className="menu-item mt-1">
              <Settings className="h-4 w-4" aria-hidden="true" />
              <span>Settings & Security</span>
            </button>
          </Menu.Item>
          <Menu.Item>
            <button type="button" className="menu-item mb-1" onClick={handleClickSignOut}>
              <LogOut className="h-4 w-4" aria-hidden="true" />
              <span>Logout</span>
            </button>
          </Menu.Item>
        </Menu.Items>
      </MenuTransition>
    </Menu>
  )
}

export default UserMenuDropDown
