import classNames from 'classnames'
import React, { FC, ReactNode } from 'react'
import { AiOutlineLaptop } from 'react-icons/ai'
import { CreditCard, FileText, UserCheck } from 'react-feather'

import Layout from './../Layout'
import TabLink from '~/components/atoms/TabLink'

type Props = {
  children: ReactNode
  metaTitle: string
}

const MyFormsLayout: FC<Props> = ({ children, metaTitle }): JSX.Element => {
  const submenuItems = [
    {
      name: 'First Day Onboarding',
      Icon: FileText,
      href: '/my-forms/first-day-onboarding'
    },
    {
      name: 'Personal Information',
      Icon: UserCheck,
      href: '/my-forms/personal-information'
    },
    {
      name: 'ATM Applications',
      Icon: CreditCard,
      href: '/my-forms/atm-applications'
    },
    {
      name: 'Laptop Monitoring',
      Icon: AiOutlineLaptop,
      href: '/my-forms/laptop-monitoring'
    }
  ]

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
          </nav>
        </header>
        {children}
      </div>
    </Layout>
  )
}

MyFormsLayout.defaultProps = {
  metaTitle: 'My Forms'
}

export default MyFormsLayout
