import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FileText, Filter } from 'react-feather'
import React, { FC, ReactNode, useEffect, useState } from 'react'

import Layout from './../Layout'
import useUserQuery from '~/hooks/useUserQuery'
import TabLink from '~/components/atoms/TabLink'
import { getRemainingPaidLeaves } from '~/hooks/useLeaveQuery'
import GlobalSearchFilter from '~/components/molecules/GlobalSearchFilter'
import SummaryFilterDropdown from '~/components/molecules/SummaryFilterDropdown'

type Props = {
  children: ReactNode
  metaTitle: string
}

const LeaveManagementLayout: FC<Props> = ({ children, metaTitle }): JSX.Element => {
  const router = useRouter()
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const { handleUserQuery } = useUserQuery()
  const { data: user } = handleUserQuery()
  const { data: paidLeaves } = getRemainingPaidLeaves(user?.userById?.id as number)

  const isListOfLeaveTabPage = router.pathname === '/leave-management/list-of-leave'
  const isLeaveSummaryTabPage = router.pathname === '/leave-management/leave-summary'

  const submenuItems = [
    {
      name: 'List of Leave',
      Icon: FileText,
      href: '/leave-management/list-of-leave'
    },
    {
      name: 'Leave Summary',
      Icon: Filter,
      href: '/leave-management/leave-summary'
    },
    {
      name: 'Yearly Summary',
      Icon: Filter,
      href: '/leave-management/yearly-summary'
    }
  ]

  useEffect(() => {
    if (router.isReady) {
      if (isListOfLeaveTabPage) {
        void router.replace({
          pathname: '/leave-management/list-of-leave/',
          query:
            globalFilter !== ''
              ? {
                  searchKey: globalFilter
                }
              : null
        })
      }
    }
  }, [globalFilter])

  return (
    <Layout
      {...{
        metaTitle
      }}
    >
      <div className="flex h-full flex-col">
        <header className="default-scrollbar shrink-0 overflow-x-auto">
          <nav
            className={classNames(
              'flex w-full items-center justify-between',
              'space-x-4 border-b border-slate-200 text-xs',
              isListOfLeaveTabPage ? 'min-w-[612px]' : 'min-w-[451px]'
            )}
          >
            <section className="flex shrink-0 items-center space-x-4 px-4 md:space-x-6">
              {submenuItems.map(({ name, Icon, href }, i) => (
                <TabLink
                  key={i}
                  {...{
                    name,
                    Icon,
                    href
                  }}
                />
              ))}
            </section>
            <section className="flex space-x-2 px-4">
              {isListOfLeaveTabPage ? (
                <GlobalSearchFilter
                  value={globalFilter ?? ''}
                  onChange={(value) => setGlobalFilter(String(value))}
                  placeholder="Search"
                />
              ) : null}
              {isLeaveSummaryTabPage ? (
                <div className="flex items-center space-x-1">
                  <div className="hidden sm:block">
                    <span className="text-slate-500 line-clamp-1">Remaining Paid Leaves:</span>
                  </div>
                  <Chip count={paidLeaves?.paidLeaves} />
                </div>
              ) : null}
              {/* FOR INTEGRATOR: Filter it by shallow route */}
              <SummaryFilterDropdown />
            </section>
          </nav>
        </header>
        {children}
      </div>
    </Layout>
  )
}

export const Chip = ({ count }: { count: number | undefined }): JSX.Element => {
  return (
    <Tippy content="Remaining Paid Leaves" placement="left" className="!text-xs">
      <span
        className={classNames(
          'w-fit shrink-0 rounded-full border border-green-600 bg-green-500 px-1',
          'flex h-5 w-5 items-center justify-center font-semibold text-white'
        )}
      >
        {count}
      </span>
    </Tippy>
  )
}

LeaveManagementLayout.defaultProps = {
  metaTitle: 'Leave Management'
}

export default LeaveManagementLayout
