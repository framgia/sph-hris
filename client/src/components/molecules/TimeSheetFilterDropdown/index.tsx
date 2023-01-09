import classNames from 'classnames'
import { Menu } from '@headlessui/react'
import React, { FC, ReactNode } from 'react'

import Text from '~/components/atoms/Text'
import Button from '~/components/atoms/Buttons/Button'
import RadioButton from '~/components/atoms/RadioButton'
import MenuTransition from '~/components/templates/MenuTransition'

type Props = {
  className?: string
  children: ReactNode
}

const TimeSheetFilterDropdown: FC<Props> = (props): JSX.Element => {
  const { children, className = 'shrink-0 outline-none active:scale-95' } = props

  const filterStatusOptions = (statusList: string[]): JSX.Element[] => {
    return statusList.map((item) => <option key={item}>{item}</option>)
  }

  return (
    <Menu as="div" className="relative z-10 flex w-full">
      <Menu.Button className={className}>{children}</Menu.Button>
      <MenuTransition>
        <Menu.Items
          className={classNames(
            'absolute top-8 right-0 flex w-80 flex-col overflow-hidden rounded-md',
            'flex flex-col bg-white shadow-xl ring-1 ring-black',
            'shadow-slate-200 ring-opacity-5 focus:outline-none'
          )}
        >
          <main className="flex flex-col space-y-4 px-5 py-4">
            <Text theme="sm" weight="semibold" className="text-slate-500">
              Timesheet Filters
            </Text>
            <div>
              <select
                className={classNames(
                  'w-full rounded-md border border-slate-300 text-xs shadow-sm',
                  'focus:border-primary focus:ring-1 focus:ring-primary'
                )}
              >
                <option>1-15 Days Timesheet</option>
                <option>16-31 Days Timesheet</option>
              </select>
            </div>
            <div>
              <input
                type="date"
                className={classNames(
                  'w-full rounded-md border border-slate-300 text-xs shadow-sm',
                  'focus:border-primary focus:ring-1 focus:ring-primary'
                )}
                defaultValue={new Date().toISOString().substr(0, 10)}
              />
            </div>
            <label htmlFor="filterStatus" className="flex flex-col space-y-1">
              <span className="text-xs text-slate-500">Filter Status</span>
              <select
                className={`
                  w-full rounded-md border border-slate-300 text-xs shadow-sm 
                focus:border-primary focus:ring-1 focus:ring-primary
                `}
                id="filterStatus"
              >
                {filterStatusOptions(['All', 'On-Duty', 'Sick Leave', 'Vacation Leave', 'Absent'])}
              </select>
            </label>
            <hr />
            <div className="grid grid-cols-2 gap-y-3">
              <RadioButton label="Work Hours" />
              <RadioButton label="Undertime" />
              <RadioButton label="Late" />
              <RadioButton label="Overtime" />
            </div>
          </main>
          <footer className="bg-slate-100 px-5 py-3">
            <Button
              type="button"
              rounded="md"
              className={classNames(
                'w-full border border-dark-primary bg-primary py-2 text-xs text-white',
                'transition duration-150 ease-in-out hover:bg-dark-primary active:bg-primary'
              )}
            >
              Update Results
            </Button>
          </footer>
        </Menu.Items>
      </MenuTransition>
    </Menu>
  )
}

export default TimeSheetFilterDropdown
