import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { FC, ReactNode } from 'react'
import { Calendar, Plus, Search } from 'react-feather'

import Layout from './../Layout'
import Card from '~/components/atoms/Card'
import Button from '~/components/atoms/Buttons/Button'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'
import { ISchedule, scheduleList } from '~/utils/constants/dummyScheduleData'

type Props = {
  children: ReactNode
  metaTitle: string
}

const ScheduleManagementLayout: FC<Props> = ({ children, metaTitle }): JSX.Element => {
  const router = useRouter()

  return (
    <Layout
      {...{
        metaTitle
      }}
    >
      <div className="flex h-full min-h-screen flex-col text-xs text-slate-500 lg:flex-row">
        <aside className="w-full shrink-0 border-b border-r border-slate-200 bg-white lg:w-[240px]">
          <CustomSearch />
          <nav>
            <div className="py-2">
              <Button
                type="button"
                className={classNames(
                  'flex w-full items-center space-x-2 px-4 py-2',
                  'text-amber-600 transition duration-75',
                  'ease-in-out hover:bg-amber-50'
                )}
                onClick={() => {
                  void router.replace({
                    pathname: router.pathname
                  })
                }}
              >
                <Plus className="h-5 w-5" />
                <span>Add New Schedule</span>
              </Button>
            </div>
            <ul className="flex flex-col">
              {scheduleList.map((item) => (
                <ScheduleItem
                  key={item.id}
                  {...{
                    ...item
                  }}
                />
              ))}
            </ul>
          </nav>
        </aside>
        <MaxWidthContainer maxWidth="max-w-[924px]" className="px-4 py-4 lg:py-5">
          <Card>{children}</Card>
        </MaxWidthContainer>
      </div>
    </Layout>
  )
}

ScheduleManagementLayout.defaultProps = {
  metaTitle: 'Schedule Management'
}

const CustomSearch = (): JSX.Element => {
  return (
    <div
      className={classNames(
        'group flex w-full items-center space-x-2',
        'border-b border-slate-200 py-2 pl-4 pr-10'
      )}
    >
      <Search
        className={classNames('h-4 w-4 text-slate-400', 'group-focus-within:text-amber-500')}
      />
      <input
        placeholder="Search schedule"
        className={classNames(
          'w-full py-2 text-[13px] placeholder:font-normal',
          'placeholder:text-slate-400 focus:outline-none'
        )}
      />
    </div>
  )
}

const ScheduleItem = (item: ISchedule): JSX.Element => {
  const router = useRouter()
  const id = Number(router.query.id)

  return (
    <li
      className={classNames(
        'flex w-full cursor-pointer items-center space-x-2 px-4',
        'select-none py-2 transition duration-75 ease-in-out',
        'hover:bg-amber-50 hover:text-amber-600',
        item.id === id ? 'bg-amber-50 text-amber-600' : ''
      )}
      onClick={() => {
        void router.replace({
          pathname: router.pathname,
          query: {
            id: item.id
          }
        })
      }}
    >
      <Calendar className="h-5 w-5 stroke-1" />
      <span>{item.name}</span>
    </li>
  )
}

export default ScheduleManagementLayout
