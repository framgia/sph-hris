import Link from 'next/link'
import React, { FC } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import useLocalStorageState from 'use-local-storage-state'

import NavItem from './NavItem'
import useUserQuery from '~/hooks/useUserQuery'
import { IMenu } from '~/utils/constants/sidebarMenu'

type Props = {
  lists: IMenu[]
  isOpenSidebar: boolean
}

const NavList: FC<Props> = ({ lists, isOpenSidebar }): JSX.Element => {
  const { handleUserQuery } = useUserQuery()

  const { data: user } = handleUserQuery()

  const [isOpenSubMenu, setIsOpenSubMenu] = useLocalStorageState('submenu', {
    defaultValue: true
  })

  const handleOpenSubMenu = (): void => setIsOpenSubMenu(!isOpenSubMenu)

  return (
    <>
      {lists.map((item, index) => (
        <div key={index}>
          {item.role?.map((r) => r).includes(user?.userById.role.name as string) ? (
            <NavItem
              {...{
                state: {
                  isOpenSidebar,
                  isOpenSubMenu
                },
                actions: {
                  handleOpenSubMenu
                },
                item
              }}
            />
          ) : null}
          {item?.spacing === true && user?.userById?.role.name !== 'Employee' && (
            <hr className="mt-4 h-px w-full border-slate-200 pb-2" />
          )}
          {item?.submenu === true &&
            isOpenSubMenu &&
            item.role?.map((r) => r).includes(user?.userById.role.name as string) && (
              <div
                className={classNames('flex flex-col space-y-1.5', !isOpenSidebar ? 'hidden' : '')}
              >
                {item?.submenuItems?.map(
                  ({ name, href, Icon }: { name: string; href: string; Icon: any }, i: number) => (
                    <SubMenuItem
                      key={i}
                      {...{
                        item: {
                          name,
                          href,
                          Icon
                        },
                        state: {
                          isOpenSidebar
                        }
                      }}
                    />
                  )
                )}
              </div>
            )}
        </div>
      ))}
    </>
  )
}

type SubMenuItemProps = {
  item: {
    name: string
    href: string
    Icon: any
  }
  state: {
    isOpenSidebar: boolean
  }
}

const SubMenuItem: FC<SubMenuItemProps> = (props): JSX.Element => {
  const router = useRouter()
  const {
    item: { name, href, Icon },
    state: { isOpenSidebar }
  } = props

  return (
    <Link
      href={href}
      className="relative flex items-center space-x-2 py-2 pl-10 hover:bg-slate-100"
    >
      <span
        className={classNames(
          'absolute inset-y-0 left-0 z-20 border-r-[4px]',
          router.pathname === href ? 'rounded-r-lg border-slate-600' : 'border-transparent'
        )}
      />
      <Icon
        className={classNames(
          'h-4 w-4 stroke-1',
          !isOpenSidebar && 'hidden',
          router.pathname === href ? 'font-medium text-slate-800' : 'subpixel-antialiased'
        )}
      />
      <span
        className={classNames(
          'select-none duration-300',
          router.pathname === href ? 'font-medium text-slate-800' : 'subpixel-antialiased',
          isOpenSidebar ? 'line-clamp-1' : 'hidden'
        )}
      >
        {name}
      </span>
    </Link>
  )
}

export default NavList
