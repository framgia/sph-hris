import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { Plus } from 'react-feather'
import { useRouter } from 'next/router'
import { BsCalendar2Plus } from 'react-icons/bs'
import React, { FC, ReactNode, useState } from 'react'

import Layout from './../Layout'
import ScheduleList from './ScheduleList'
import CustomSearch from './CustomSearch'
import Card from '~/components/atoms/Card'
import ScheduleListModal from './ScheduleListModal'
import Button from '~/components/atoms/Buttons/Button'
import useScreenCondition from '~/hooks/useScreenCondition'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'

type Props = {
  children: ReactNode
  metaTitle: string
}

const ScheduleManagementLayout: FC<Props> = ({ children, metaTitle }): JSX.Element => {
  const router = useRouter()
  const [isOpenScheduleList, setIsOpenScheduleList] = useState<boolean>(false)
  const [searchedVal, setSearchedVal] = useState<string>('')

  // SCREEN SIZE CONDITION HOOKS
  const isMediumScreen = useScreenCondition('(max-width: 768px)')

  const handleIsOpenScheduleListToggle = (): void => setIsOpenScheduleList(!isOpenScheduleList)

  return (
    <Layout
      {...{
        metaTitle
      }}
    >
      <div className="flex h-full min-h-full flex-col text-xs text-slate-500 md:flex-row">
        {isMediumScreen ? (
          <aside className="flex items-center space-x-2 border-b border-slate-200 bg-white">
            <Button
              type="button"
              className={classNames(
                'flex w-full items-center space-x-2 px-4 py-3.5',
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
            <div className="py-2 pl-2 pr-5">
              <Tippy content="List of Schedules" placement="left" className="!text-xs">
                <Button
                  type="button"
                  onClick={handleIsOpenScheduleListToggle}
                  className="text-slate-400 hover:text-amber-500"
                >
                  <BsCalendar2Plus className="h-5 w-5" />
                </Button>
              </Tippy>

              {/* This will show the Schedule List Modal During Mobile */}
              <ScheduleListModal
                {...{
                  isOpen: isOpenScheduleList,
                  closeModal: handleIsOpenScheduleListToggle
                }}
              />
            </div>
          </aside>
        ) : (
          <aside className="flex h-full min-h-screen w-full shrink-0 flex-col border-b border-r border-slate-200 bg-white pb-16 md:w-[240px]">
            <div className="border-b border-slate-200 px-4">
              <CustomSearch
                {...{
                  setSearchedVal
                }}
              />
            </div>
            <div className="default-scrollbar flex flex-col overflow-y-auto">
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
                <ScheduleList
                  {...{
                    searchedVal
                  }}
                />
              </ul>
            </div>
          </aside>
        )}
        <div className="default-scrollbar h-full flex-1 overflow-y-auto">
          <MaxWidthContainer maxWidth="max-w-[900px]" className="mx-auto px-4 py-4 lg:py-5">
            <Card className="mb-5">{children}</Card>
          </MaxWidthContainer>
        </div>
      </div>
    </Layout>
  )
}

ScheduleManagementLayout.defaultProps = {
  metaTitle: 'Schedule Management'
}

export default ScheduleManagementLayout
