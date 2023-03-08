import { NextPage } from 'next'
import classNames from 'classnames'
import React, { useState } from 'react'

import useUserQuery from '~/hooks/useUserQuery'
import Layout from '~/components/templates/Layout'
import { getOvertimeQuery } from '~/hooks/useOvertimeQuery'
import BarsLoadingIcon from '~/utils/icons/BarsLoadingIcon'
import MyOvertimeTable from '~/components/molecules/MyOvertimeTable'
import { columns } from '~/components/molecules/MyOvertimeTable/columns'
import GlobalSearchFilter from '~/components/molecules/GlobalSearchFilter'
import YearlyFilterDropdown from '~/components/molecules/MyOvertimeTable/YearlyFilterDropdown'

const MyOverTime: NextPage = (): JSX.Element => {
  const [globalFilter, setGlobalFilter] = useState<string>('')

  // From User Query Hooks
  const { handleUserQuery } = useUserQuery()
  const { data: user, isLoading: isUserLoading } = handleUserQuery()

  // From Overtime Query Hooks
  const {
    data: overtime,
    isLoading: isOvertimeLoading,
    error: errorOvertime
  } = getOvertimeQuery(user?.userById?.id as number)

  return (
    <Layout metaTitle="My Overtime">
      <section
        className={classNames(
          'default-scrollbar relative h-full min-h-full',
          'overflow-auto text-xs text-slate-800'
        )}
      >
        <header
          className={classNames(
            'sticky left-0 top-0 z-20 flex items-center justify-between',
            'border-b border-slate-200 bg-slate-100 px-4 py-2'
          )}
        >
          <GlobalSearchFilter
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search"
          />
          <YearlyFilterDropdown />
        </header>
        {!isUserLoading && !isOvertimeLoading && user !== undefined && overtime !== undefined ? (
          <MyOvertimeTable
            {...{
              query: {
                data: overtime?.overtime,
                error: errorOvertime
              },
              table: {
                columns,
                globalFilter,
                setGlobalFilter
              }
            }}
          />
        ) : (
          <div className="flex min-h-[50vh] items-center justify-center">
            <BarsLoadingIcon className="h-7 w-7 fill-current text-amber-500" />
          </div>
        )}
      </section>
    </Layout>
  )
}

export default MyOverTime
