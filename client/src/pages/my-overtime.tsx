import { NextPage } from 'next'
import classNames from 'classnames'
import { Plus } from 'react-feather'
import React, { useState } from 'react'

import Layout from '~/components/templates/Layout'
import Button from '~/components/atoms/Buttons/ButtonAction'
import MyOvertimeTable from '~/components/molecules/MyOvertimeTable'
import { columns } from '~/components/molecules/MyOvertimeTable/columns'
import GlobalSearchFilter from '~/components/molecules/GlobalSearchFilter'
import { dummyMyOvertimeData } from '~/utils/constants/dummyMyOvertimeData'
import YearlyFilterDropdown from '~/components/molecules/MyOvertimeTable/YearlyFilterDropdown'

const MyOverTime: NextPage = (): JSX.Element => {
  const [globalFilter, setGlobalFilter] = useState<string>('')

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
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="primary"
              className="flex items-center space-x-0.5 px-1.5 py-[3px]"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:block">File Overtime</span>
            </Button>
            <YearlyFilterDropdown />
          </div>
        </header>
        <MyOvertimeTable
          {...{
            query: {
              data: dummyMyOvertimeData,
              error: null
            },
            table: {
              columns,
              globalFilter,
              setGlobalFilter
            }
          }}
        />
      </section>
    </Layout>
  )
}

export default MyOverTime
