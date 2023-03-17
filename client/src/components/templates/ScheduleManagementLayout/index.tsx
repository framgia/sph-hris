import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { FC, ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ChevronDown, Plus } from 'react-feather'

import Layout from './../Layout'
import CustomSearch from './CustomSearch'
import Card from '~/components/atoms/Card'
import Button from '~/components/atoms/Buttons/Button'
import { ISchedule } from '~/utils/types/scheduleTypes'
import { scheduleList } from '~/utils/constants/dummyScheduleData'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'

type Props = {
  children: ReactNode
  metaTitle: string
}

const ScheduleManagementLayout: FC<Props> = ({ children, metaTitle }): JSX.Element => {
  const router = useRouter()
  const [searchedVal, setSearchedVal] = useState<string>('')
  const [isOpenSchedule, setIsOpenSchedule] = useState<boolean>(false)

  const handleOpenScheduleToggle = (): void => setIsOpenSchedule(!isOpenSchedule)

  return (
    <Layout
      {...{
        metaTitle
      }}
    >
      <div className="flex h-full min-h-screen flex-col text-xs text-slate-500 lg:flex-row">
        <aside className="w-full shrink-0 border-b border-r border-slate-200 bg-white lg:w-[240px]">
          <div
            className={classNames(
              'flex items-center px-4',
              !isOpenSchedule ? 'border-b border-slate-200' : ''
            )}
          >
            <CustomSearch
              {...{
                setSearchedVal
              }}
            />
            <Button
              type="button"
              onClick={handleOpenScheduleToggle}
              className={classNames(
                'text-slate-400 opacity-100 transition duration-75',
                'ease-in-out hover:text-slate-600 lg:opacity-0'
              )}
            >
              <ChevronDown
                className={`h-4 w-4 duration-300 ${isOpenSchedule ? '-rotate-90' : ''}`}
              />
            </Button>
          </div>
          <AnimatePresence initial={false}>
            {!isOpenSchedule ? (
              <motion.nav animate={{ height: 'auto' }} initial={{ height: 0 }} exit={{ height: 0 }}>
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
                <ul className="flex flex-col space-y-1">
                  {scheduleList
                    ?.filter(
                      (row) =>
                        searchedVal?.length === 0 ||
                        row?.scheduleName
                          .toString()
                          .toLowerCase()
                          .includes(searchedVal.toString().toLowerCase())
                    )
                    ?.map((item) => (
                      <ScheduleItem
                        key={item.id}
                        {...{
                          ...item
                        }}
                      />
                    ))}
                </ul>
              </motion.nav>
            ) : null}
          </AnimatePresence>
        </aside>
        <div className="default-scrollbar h-full flex-1 overflow-y-auto">
          <MaxWidthContainer maxWidth="max-w-[900px]" className="mx-auto px-4 py-4 lg:py-5">
            <Card className="mb-24">{children}</Card>
          </MaxWidthContainer>
        </div>
      </div>
    </Layout>
  )
}

ScheduleManagementLayout.defaultProps = {
  metaTitle: 'Schedule Management'
}

const ScheduleItem = (item: ISchedule): JSX.Element => {
  const router = useRouter()
  const id = Number(router.query.id)

  return (
    <li
      className={classNames(
        'flex w-full cursor-pointer items-center space-x-2 px-4',
        'select-none py-2 transition duration-75 ease-in-out',
        'hover:bg-amber-50',
        item.id === id ? 'bg-amber-50 text-amber-600 hover:text-amber-600' : ''
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
      <span>{item.scheduleName}</span>
    </li>
  )
}

export default ScheduleManagementLayout
