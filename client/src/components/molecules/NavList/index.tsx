import Link from 'next/link'
import Tooltip from 'rc-tooltip'
import React, { FC } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { ChevronRight } from 'react-feather'
import { motion, AnimatePresence } from 'framer-motion'
import useLocalStorageState from 'use-local-storage-state'

import useUserQuery from '~/hooks/useUserQuery'
import SkeletonNavList from './SkeletonNavList'
import { IMenu } from '~/utils/constants/sidebarMenu'
import ButtonLink from '~/components/atoms/Buttons/ButtonLink'

type Props = {
  lists: IMenu[]
  isOpenSidebar: boolean
}

const NavList: FC<Props> = ({ lists, isOpenSidebar }): JSX.Element => {
  const router = useRouter()
  const { handleUserQuery } = useUserQuery()

  const { data: user, isLoading } = handleUserQuery()

  const [openIndexes, setOpenIndexes] = useLocalStorageState<number[]>('openIndexes', {
    defaultValue: [0]
  })

  const toggleSubmenu = (index: number): void => {
    setOpenIndexes((prevOpenIndexes: number[]) => {
      if (prevOpenIndexes.includes(index)) {
        return prevOpenIndexes.filter((i: number) => i !== index)
      } else {
        return [...prevOpenIndexes, index]
      }
    })
  }

  return (
    <>
      {!isLoading ? (
        <>
          {lists.map((item, index) => (
            <div key={index}>
              {item.role?.map((r) => r).includes(user?.userById.role.name as string) ? (
                <Tooltip
                  placement="right"
                  overlay={item.name}
                  overlayClassName={classNames(isOpenSidebar ? '!opacity-0' : '!opacity-100')}
                  arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                >
                  <div>
                    {item.submenu === true && isOpenSidebar ? (
                      <div
                        onClick={() => toggleSubmenu(index)}
                        className={classNames(
                          'relative flex cursor-pointer items-center transition',
                          'duration-75 ease-in-out hover:bg-slate-100 hover:text-slate-700'
                        )}
                      >
                        <div className="flex w-full items-center space-x-3 py-1.5 pr-8 pl-7">
                          <item.Icon className="h-5 w-5 shrink-0 stroke-0.5" />
                          <span
                            className={`${
                              isOpenSidebar ? 'line-clamp-1' : 'hidden'
                            } select-none duration-300`}
                          >
                            {item.name}
                          </span>
                        </div>
                        <ChevronRight
                          className={classNames(
                            'mr-4 h-4 w-4 shrink-0 stroke-1 duration-200 group-hover:stroke-2',
                            openIndexes.includes(index) ? 'rotate-90' : ''
                          )}
                        />
                      </div>
                    ) : (
                      <ButtonLink
                        {...{
                          item: {
                            name: item.name,
                            href: item.href,
                            Icon: item.Icon,
                            submenu: item?.submenu
                          },
                          state: {
                            isOpenSidebar
                          }
                        }}
                      />
                    )}
                  </div>
                </Tooltip>
              ) : null}
              {/* If submenu exist in an object */}
              <AnimatePresence initial={false}>
                {item?.submenu === true &&
                  // If submenu button trigger individual submenu index
                  openIndexes.includes(index) &&
                  // Show only based on the role
                  item.role?.map((r) => r).includes(user?.userById.role.name as string) && (
                    <motion.div
                      animate={{ height: 'auto' }}
                      initial={{ height: 0 }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div
                        className={classNames(
                          'flex flex-col space-y-1.5',
                          !isOpenSidebar ? 'hidden' : ''
                        )}
                      >
                        {item?.submenuItems?.map(
                          (
                            { name, href, Icon }: { name: string; href: string; Icon: any },
                            i: number
                          ) => (
                            <Link
                              key={i}
                              href={href}
                              className="relative mt-2 flex items-center space-x-2 py-2 pl-10 hover:bg-slate-100"
                            >
                              <span
                                className={classNames(
                                  'absolute inset-y-0 left-0 z-20 border-r-[4px]',
                                  router.pathname === href
                                    ? 'rounded-r-lg border-slate-600'
                                    : 'border-transparent'
                                )}
                              />
                              <Icon
                                className={classNames(
                                  'h-4 w-4 stroke-1',
                                  !isOpenSidebar && 'hidden',
                                  router.pathname === href
                                    ? 'font-medium text-slate-800'
                                    : 'subpixel-antialiased'
                                )}
                              />
                              <span
                                className={classNames(
                                  'select-none duration-300',
                                  router.pathname === href
                                    ? 'font-medium text-slate-800'
                                    : 'subpixel-antialiased',
                                  isOpenSidebar ? 'line-clamp-1' : 'hidden'
                                )}
                              >
                                {name}
                              </span>
                            </Link>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>
              {/* This will not show if the role is Employee */}
              {item?.spacing === true && user?.userById?.role.name !== 'Employee' && (
                <hr className="mt-4 h-px w-full border-slate-200 pb-2" />
              )}
            </div>
          ))}
        </>
      ) : (
        <SkeletonNavList
          {...{
            isOpenSidebar
          }}
        />
      )}
    </>
  )
}

export default NavList
