import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { FC, ReactNode } from 'react'

import Layout from './../Layout'
import TabLink from '~/components/atoms/TabLink'
import { Menus } from '~/utils/constants/sidebarMenu'

type Props = {
  children: ReactNode
  metaTitle: string
}

const LeaveManagementLayout: FC<Props> = ({ children, metaTitle }): JSX.Element => {
  const router = useRouter()
  const isListOfLeaveTabPage = router.pathname === '/leave-management/list-of-leave'

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
              {Menus[8].submenuItems?.map(({ name, Icon, href }, i) => (
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
          </nav>
        </header>
        {children}
      </div>
    </Layout>
  )
}

export const Chip = ({ count }: { count: number | undefined }): JSX.Element => {
  const decimalFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  })

  const formattedNumber = decimalFormatter.format(count as number)
  const parsedNumber = parseFloat(formattedNumber)

  return (
    <Tippy
      content="Remaining Paid Leaves"
      placement="left"
      className="!text-xs opacity-100 sm:opacity-0"
    >
      <span
        className={classNames(
          'w-fit shrink-0 rounded-full border border-green-600 bg-green-500 px-1',
          'flex h-5 w-5 items-center justify-center font-semibold text-white'
        )}
      >
        {isNaN(parsedNumber) ? 0 : parsedNumber}
      </span>
    </Tippy>
  )
}

LeaveManagementLayout.defaultProps = {
  metaTitle: 'Leave Management'
}

export default LeaveManagementLayout
