import classNames from 'classnames'
import { useRouter } from 'next/router'
import { Menu } from '@headlessui/react'
import React, { FC, ReactNode } from 'react'

import Text from '~/components/atoms/Text'
import { Filters } from '~/pages/notifications'
import Button from '~/components/atoms/Buttons/Button'
import MenuTransition from '~/components/templates/MenuTransition'
import { STATUS_OPTIONS, TYPE_OPTIONS } from '~/utils/constants/notificationFilter'

type Props = {
  className?: string
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<any>>
  startFilter: () => void
  children: ReactNode
}

const NotificationFilterDropdown: FC<Props> = (props): JSX.Element => {
  const router = useRouter()

  const {
    children,
    className = 'shrink-0 outline-none active:scale-95',
    filters,
    setFilters,
    startFilter
  } = props

  const statusOptions = [
    STATUS_OPTIONS.ALL,
    STATUS_OPTIONS.PENDING,
    STATUS_OPTIONS.APPROVED,
    STATUS_OPTIONS.DISAPPROVED
  ]
  const typeOptions = [
    TYPE_OPTIONS.ALL,
    TYPE_OPTIONS.OVERTIME,
    TYPE_OPTIONS.UNDERTIME,
    TYPE_OPTIONS.LEAVE
  ]

  const filterStatusOptions = (statusList: string[]): JSX.Element[] => {
    return statusList.map((item) => (
      <option key={item} value={item.toLowerCase()}>
        {item}
      </option>
    ))
  }
  const filterTypeOptions = (typeList: string[]): JSX.Element[] => {
    return typeList.map((item) => (
      <option key={item} value={item.toLowerCase()}>
        {item}
      </option>
    ))
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setFilters({
      ...filters,
      status: e.currentTarget.value.toLowerCase()
    })
  }
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setFilters({
      ...filters,
      type: e.currentTarget.value.toLowerCase()
    })
  }

  return (
    <Menu as="div" className="relative z-10 flex w-full">
      <Menu.Button className={className}>{children}</Menu.Button>
      <MenuTransition>
        <Menu.Items
          className={classNames(
            'fixed right-4 top-[138px] flex w-80 flex-col overflow-hidden rounded-md md:top-[102px]',
            'flex flex-col bg-white shadow-xl ring-1 ring-black',
            'shadow-slate-200 ring-opacity-5 focus:outline-none'
          )}
        >
          <main className="flex flex-col space-y-4 px-5 py-4">
            <Text theme="sm" weight="semibold" className="text-slate-500">
              Notification Filters
            </Text>
            <label htmlFor="filterStatus" className="flex flex-col space-y-1">
              <span className="text-xs text-slate-500">Filter Status</span>
              <select
                className={`
                  w-full rounded-md border border-slate-300 text-xs shadow-sm 
                focus:border-primary focus:ring-1 focus:ring-primary
                `}
                id="filterStatus"
                defaultValue={
                  router.query.status !== undefined
                    ? router.query.status
                    : STATUS_OPTIONS.ALL.toLowerCase()
                }
                onChange={(e) => handleStatusChange(e)}
              >
                {filterStatusOptions(statusOptions)}
              </select>
            </label>
            <label htmlFor="filterType" className="flex flex-col space-y-1 border-t">
              <span className="mt-3 text-xs text-slate-500">Filter Type</span>
              <select
                className={`
                  w-full rounded-md border border-slate-300 text-xs shadow-sm 
                focus:border-primary focus:ring-1 focus:ring-primary
                `}
                id="filterType"
                defaultValue={
                  router.query.type !== undefined
                    ? router.query.type
                    : TYPE_OPTIONS.ALL.toLowerCase()
                }
                onChange={(e) => handleTypeChange(e)}
              >
                {filterTypeOptions(typeOptions)}
              </select>
            </label>
          </main>
          <footer className="bg-slate-100 px-5 py-3">
            <Button
              type="button"
              rounded="md"
              className={classNames(
                'w-full border border-dark-primary bg-primary py-2 text-xs text-white',
                'transition duration-150 ease-in-out hover:bg-dark-primary active:bg-primary'
              )}
              onClick={startFilter}
            >
              Update Results
            </Button>
          </footer>
        </Menu.Items>
      </MenuTransition>
    </Menu>
  )
}

export default NotificationFilterDropdown
