import classNames from 'classnames'
import React, { FC } from 'react'
import { Activity, Hash, Plus } from 'react-feather'

import Card from '~/components/atoms/Card'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'

type Props = {}

const BreakdownOfLeaveCard: FC<Props> = (): JSX.Element => {
  return (
    <MaxWidthContainer maxWidth="md:max-w-[18rem]">
      <Card className="shrink-0 overflow-hidden">
        <header
          className={classNames(
            'flex items-center justify-between border-b border-slate-200',
            'bg-slate-50 px-4 py-2.5 text-slate-500'
          )}
        >
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span className="font-medium">Breakdown of leaves</span>
          </div>
          <Hash className="h-[18px] w-[18px] stroke-1" />
        </header>
        <main>
          <ul className="divide-y divide-slate-100 text-slate-500">
            <li className="flex items-center justify-between py-2 px-4 hover:bg-slate-50">
              <span>Sick Leave</span>
              <span className="pr-2 font-medium">1</span>
            </li>
            <li className="flex items-center justify-between py-2 px-4 hover:bg-slate-50">
              <span>Undertime</span>
              <span className="pr-2 font-medium">0</span>
            </li>
            <li className="flex items-center justify-between py-2 px-4 hover:bg-slate-50">
              <span>Vacation Leave</span>
              <span className="pr-2 font-medium">0</span>
            </li>
            <li className="flex items-center justify-between py-2 px-4 hover:bg-slate-50">
              <span>Emergency Leave</span>
              <span className="pr-2 font-medium">0</span>
            </li>
            <li className="flex items-center justify-between py-2 px-4 hover:bg-slate-50">
              <span>Bereavement Leave</span>
              <span className="pr-2 font-medium">0</span>
            </li>
          </ul>
          <nav
            className={classNames(
              'flex items-center justify-between border-t border-b',
              'border-slate-200 bg-slate-50 px-4 py-2 text-slate-500'
            )}
          >
            <div className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span className="font-medium">Total</span>
            </div>
            <span className="pr-2 font-medium">1</span>
          </nav>
          <ul className="divide-y divide-slate-100 text-slate-500">
            <li className="flex items-center justify-between py-2 px-4 hover:bg-slate-50">
              <span>Without Pay</span>
              <span className="pr-2 font-medium">0</span>
            </li>
            <li className="flex items-center justify-between py-2 px-4 hover:bg-slate-50">
              <span>With Pay</span>
              <span className="pr-2 font-medium">1</span>
            </li>
          </ul>
        </main>
      </Card>
    </MaxWidthContainer>
  )
}

BreakdownOfLeaveCard.defaultProps = {}

export default BreakdownOfLeaveCard
