import classNames from 'classnames'
import React, { FC } from 'react'
import { Activity, Hash, Plus } from 'react-feather'

import Card from '~/components/atoms/Card'
import { Breakdown } from '~/utils/types/leaveTypes'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'

type Props = {
  data: Breakdown
}

const BreakdownOfLeaveCard: FC<Props> = ({ data }): JSX.Element => {
  return (
    <MaxWidthContainer maxWidth="lg:max-w-[18rem]">
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
              <span className="pr-2 font-medium">{data?.sickLeave}</span>
            </li>
            <li className="flex items-center justify-between py-2 px-4 hover:bg-slate-50">
              <span>Undertime</span>
              <span className="pr-2 font-medium">{data?.undertime}</span>
            </li>
            <li className="flex items-center justify-between py-2 px-4 hover:bg-slate-50">
              <span>Vacation Leave</span>
              <span className="pr-2 font-medium">{data?.vacationLeave}</span>
            </li>
            <li className="flex items-center justify-between py-2 px-4 hover:bg-slate-50">
              <span>Emergency Leave</span>
              <span className="pr-2 font-medium">{data?.emergencyLeave}</span>
            </li>
            <li className="flex items-center justify-between py-2 px-4 hover:bg-slate-50">
              <span>Bereavement Leave</span>
              <span className="pr-2 font-medium">{data?.bereavementLeave}</span>
            </li>
            <li className="flex items-center justify-between py-2 px-4 hover:bg-slate-50">
              <span>Maternity Leave</span>
              <span className="pr-2 font-medium">{data?.maternityLeave}</span>
            </li>
            <li className="flex items-center justify-between py-2 px-4 hover:bg-slate-50">
              <span>Pending</span>
              <span className="pr-2 font-medium">{data?.pending}</span>
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
            <span className="pr-2 font-medium">
              {data?.sickLeave +
                data?.undertime +
                data?.vacationLeave +
                data?.emergencyLeave +
                data?.bereavementLeave +
                data?.maternityLeave}
            </span>
          </nav>
          <ul className="divide-y divide-slate-100 text-slate-500">
            <li className="flex items-center justify-between py-2 px-4 hover:bg-slate-50">
              <span>Without Pay</span>
              <span className="pr-2 font-medium">{data?.withoutPayTotal}</span>
            </li>
            <li className="flex items-center justify-between py-2 px-4 hover:bg-slate-50">
              <span>With Pay</span>
              <span className="pr-2 font-medium">{data?.withPayTotal}</span>
            </li>
          </ul>
        </main>
      </Card>
    </MaxWidthContainer>
  )
}

BreakdownOfLeaveCard.defaultProps = {}

export default BreakdownOfLeaveCard
