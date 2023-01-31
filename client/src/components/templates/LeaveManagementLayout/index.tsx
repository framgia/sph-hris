import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { FC, ReactNode } from 'react'
import { FileText, Filter } from 'react-feather'

import Layout from './../Layout'
import TabLink from '~/components/atoms/TabLink'
import SummaryFilterDropdown from '~/components/molecules/SummaryFilterDropdown'

type Props = {
  children: ReactNode
  metaTitle: string
}

const LeaveManagementLayout: FC<Props> = ({ children, metaTitle }): JSX.Element => {
  const router = useRouter()

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

  return (
    <Layout
      {...{
        metaTitle
      }}
    >
      <header className="default-scrollbar overflow-x-auto">
        <nav
          className={classNames(
            'flex w-full min-w-[451px] items-center justify-between',
            'shrink-0 space-x-4 border-b border-slate-200 px-4 text-xs'
          )}
        >
          <section className="flex shrink-0 items-center space-x-4 md:space-x-6">
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
          <section className="flex space-x-2">
            {router.pathname === '/leave-management/leave-summary' ? (
              <div className="flex items-center space-x-1">
                <p className="hidden text-slate-500 sm:block">Remaining Paid Leaves:</p>
                <Chip count={12} />
              </div>
            ) : null}
            {/* FOR INTEGRATOR: Filter it by shallow route */}
            <SummaryFilterDropdown />
          </section>
        </nav>
      </header>
      {children}
    </Layout>
  )
}

export const Chip = ({ count }: { count: number }): JSX.Element => {
  return (
    <span
      className={classNames(
        'shrink-0 rounded-full border border-green-600 bg-green-500',
        'flex h-5 w-5 items-center justify-center font-semibold text-white'
      )}
    >
      {count}
    </span>
  )
}

LeaveManagementLayout.defaultProps = {
  metaTitle: 'Leave Management'
}

export default LeaveManagementLayout
