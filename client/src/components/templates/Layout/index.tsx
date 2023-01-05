import Head from 'next/head'
import dynamic from 'next/dynamic'
import React, { FC, ReactNode, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'

import Drawer from '~/components/organisms/Drawer'
import Header from '~/components/organisms/Header'

const Sidebar = dynamic(async () => await import('~/components/organisms/Sidebar'), { ssr: false })

type Props = {
  metaTitle: string
  children: ReactNode
}

const Layout: FC<Props> = ({ metaTitle, children }): JSX.Element => {
  const [isOpenSidebar, setIsOpenSidebar] = useLocalStorageState('sidebarToggle', {
    defaultValue: true
  })
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)

  const handleToggleDrawer = (): void => setIsOpenDrawer(!isOpenDrawer)
  const handleToggleSidebar = (): void => setIsOpenSidebar(!isOpenSidebar)

  return (
    <>
      <Head>
        <title>{`Sun* HRIS - ${metaTitle}`}</title>
      </Head>
      <Wrapper>
        {/* Sidebar navigation */}
        <Sidebar
          {...{
            isOpenSidebar,
            actions: {
              handleToggleSidebar
            }
          }}
        />
        {/* This will show on mobile size drawer */}
        <div className="block md:hidden">
          <Drawer
            {...{
              isOpenDrawer,
              actions: {
                handleToggleDrawer
              }
            }}
          />
        </div>
        <main className="flex flex-1 flex-col">
          {/* Header navigation */}
          <Header
            {...{
              isOpenSidebar,
              actions: {
                handleToggleDrawer,
                handleToggleSidebar
              }
            }}
          />
          {/* Dynamic Content */}
          {children}
        </main>
      </Wrapper>
    </>
  )
}

// Main Wrapper of Home Authenticated User
const Wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <div className="flex min-h-screen overflow-hidden bg-slate-100 text-slate-800">{children}</div>
)

export default Layout
