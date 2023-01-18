import Head from 'next/head'
import dynamic from 'next/dynamic'
import React, { FC, ReactNode, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'

import Drawer from '~/components/organisms/Drawer'
import Header from '~/components/organisms/Header'

const Sidebar = dynamic(async () => await import('~/components/organisms/Sidebar'), { ssr: false })
const TimeInDrawer = dynamic(async () => await import('~/components/organisms/TimeInDrawer'), {
  ssr: false
})
const WorkInterruptionDrawer = dynamic(
  async () => await import('~/components/organisms/WorkInterruptionDrawer'),
  {
    ssr: false
  }
)
const TimeOutDrawer = dynamic(async () => await import('~/components/organisms/TimeOutDrawer'), {
  ssr: false
})

type Props = {
  metaTitle: string
  children: ReactNode
}

const Layout: FC<Props> = ({ metaTitle, children }): JSX.Element => {
  const [isOpenSidebar, setIsOpenSidebar] = useLocalStorageState('sidebarToggle', {
    defaultValue: true
  })
  const [isOpenTimeInDrawer, setIsOpenTimeInDrawer] = useLocalStorageState('timeInDrawerToggle', {
    defaultValue: false
  })
  const [isOpenWorkInterruptionDrawer, setIsOpenWorkInterruptionDrawer] = useLocalStorageState(
    'workInterruptionDrawerToggle',
    {
      defaultValue: false
    }
  )
  const [isOpenTimeOutDrawer, setIsOpenTimeOutDrawer] = useLocalStorageState(
    'timeOutDrawerToggle',
    {
      defaultValue: false
    }
  )
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)

  const handleToggleDrawer = (): void => setIsOpenDrawer(!isOpenDrawer)
  const handleToggleSidebar = (): void => setIsOpenSidebar(!isOpenSidebar)
  const handleToggleTimeInDrawer = (): void => setIsOpenTimeInDrawer(!isOpenTimeInDrawer)
  const handleToggleWorkInterruptionDrawer = (): void =>
    setIsOpenWorkInterruptionDrawer(!isOpenWorkInterruptionDrawer)
  const handleToggleTimeOutDrawer = (): void => setIsOpenTimeOutDrawer(!isOpenTimeOutDrawer)

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
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* Header navigation */}
          <Header
            {...{
              isOpenSidebar,
              actions: {
                handleToggleDrawer,
                handleToggleSidebar,
                handleToggleTimeInDrawer,
                handleToggleWorkInterruptionDrawer,
                handleToggleTimeOutDrawer
              }
            }}
          />
          {/* Dynamic Content */}
          <div className="overflow-hidden">{children}</div>
        </main>
        {/* Time In Drawer */}
        <TimeInDrawer
          {...{
            isOpenTimeInDrawer,
            actions: {
              handleToggleTimeInDrawer
            }
          }}
        />
        <WorkInterruptionDrawer
          {...{
            isOpenWorkInterruptionDrawer,
            actions: {
              handleToggleWorkInterruptionDrawer
            }
          }}
        />
        <TimeOutDrawer
          {...{
            isOpenTimeOutDrawer,
            actions: {
              handleToggleTimeOutDrawer
            }
          }}
        />
      </Wrapper>
    </>
  )
}

// Main Wrapper of Home Authenticated User
const Wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <div className="flex h-screen min-h-screen overflow-hidden bg-slate-100 text-slate-800">
    {children}
  </div>
)

export default Layout
