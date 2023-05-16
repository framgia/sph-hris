import classNames from 'classnames'
import React, { FC, ReactNode } from 'react'

import Layout from './../Layout'
import TabLink from '~/components/atoms/TabLink'
import { Menus } from '~/utils/constants/sidebarMenu'

type Props = {
  children: ReactNode
  metaTitle: string
}

const MyScheduleLayout: FC<Props> = ({ children, metaTitle }): JSX.Element => {
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
              'flex w-full min-w-[451px] items-center justify-between',
              'space-x-4 border-b border-slate-200 text-xs'
            )}
          >
            <section className="flex shrink-0 items-center space-x-4 px-4 md:space-x-6">
              {Menus[4].submenuItems?.map(({ name, Icon, href }, i) => (
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

MyScheduleLayout.defaultProps = {
  metaTitle: 'My Schedule'
}

export default MyScheduleLayout
