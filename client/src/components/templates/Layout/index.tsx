import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { FC, ReactNode, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'

import FadeInOut from './../FadeInOut'
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
const ViewDetailsDrawer = dynamic(
  async () => await import('~/components/organisms/ViewDetailsDrawer'),
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
  const router = useRouter()

  const [isOpenSidebar, setIsOpenSidebar] = useLocalStorageState('sidebarToggle', {
    defaultValue: true
  })
  const [isOpenTimeInDrawer, setIsOpenTimeInDrawer] = useLocalStorageState('timeInDrawerToggle', {
    defaultValue: true
  })
  const [isOpenViewDetailsDrawer, setIsOpenViewDetailsDrawer] = useLocalStorageState(
    'viewDetailsDrawerToggle',
    {
      defaultValue: true
    }
  )
  const [isOpenWorkInterruptionDrawer, setIsOpenWorkInterruptionDrawer] = useLocalStorageState(
    'workInterruptionDrawerToggle',
    {
      defaultValue: true
    }
  )
  const [isOpenTimeOutDrawer, setIsOpenTimeOutDrawer] = useLocalStorageState(
    'timeOutDrawerToggle',
    {
      defaultValue: true
    }
  )
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)
  const [workedHours, setWorkedHours] = useState<string>('')

  const handleToggleDrawer = (): void => setIsOpenDrawer(!isOpenDrawer)
  const handleToggleSidebar = (): void => setIsOpenSidebar(!isOpenSidebar)
  const handleToggleTimeInDrawer = (): void => setIsOpenTimeInDrawer(!isOpenTimeInDrawer)
  const handleToggleViewDetailsDrawer = (): void =>
    setIsOpenViewDetailsDrawer(!isOpenViewDetailsDrawer)
  const handleToggleWorkInterruptionDrawer = (): void =>
    setIsOpenWorkInterruptionDrawer(!isOpenWorkInterruptionDrawer)
  const handleToggleTimeOutDrawer = (workedHours: string = ''): void => {
    setIsOpenTimeOutDrawer(!isOpenTimeOutDrawer)
    setWorkedHours(workedHours)
  }

  const isTabPages =
    router.pathname.includes('/my-schedule') ||
    router.pathname.includes('/my-forms') ||
    router.pathname.includes('/leave-management')

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
          {isTabPages ? (
            <div className="overflow-hidden">{children}</div>
          ) : (
            <FadeInOut className="overflow-hidden">{children}</FadeInOut>
          )}
        </main>
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
            workedHours,
            actions: {
              handleToggleTimeOutDrawer
            }
          }}
        />
        <ViewDetailsDrawer
          {...{
            isOpenViewDetailsDrawer,
            actions: {
              handleToggleViewDetailsDrawer
            }
          }}
        />
      </Wrapper>
    </>
  )
}

Layout.defaultProps = {
  metaTitle: 'Home'
}

// Main Wrapper of Home Authenticated User
const Wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <div className="flex h-screen min-h-screen overflow-hidden bg-slate-100 text-slate-800">
    {children}
  </div>
)

export default Layout
