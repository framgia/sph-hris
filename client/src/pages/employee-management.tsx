import { NextPage } from 'next'
import classNames from 'classnames'
import React, { useState } from 'react'

import { dummyEmployeeManagement } from '~/utils/constants/dummyEmployeeManagement'
import Layout from '~/components/templates/Layout'
import EmployeeManagementTable from '~/components/molecules/EmployeeManagementTable'
import GlobalSearchFilter from '~/components/molecules/GlobalSearchFilter'
import { columns } from '~/components/molecules/EmployeeManagementTable/columns'
import Button from '~/components/atoms/Buttons/Button'
import { Plus } from 'react-feather'

export type Filters = {
  type: string
  status: string
}

export type QueryVariablesType = {
  type: string | null
  status: string | null
}

const EmployeeManagement: NextPage = (): JSX.Element => {
  const [globalFilter, setGlobalFilter] = useState<string>('')

  return (
    <Layout metaTitle="Employee Management">
      <section className="default-scrollbar relative h-full min-h-full overflow-auto text-xs text-slate-800">
        <div className="sticky top-0 z-20 block bg-slate-100 md:hidden">
          <div className="flex items-center space-x-2 border-b border-slate-200 px-4 py-2">
            <h1 className="text-base font-semibold text-slate-700">Employee Management</h1>
          </div>
        </div>
        <header
          className={classNames(
            'sticky top-[41px] left-0 z-20 flex items-center justify-between md:top-0',
            'border-b border-slate-200 bg-slate-100 px-4 py-2'
          )}
        >
          <GlobalSearchFilter
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search"
          />
          <div className="flex items-center space-x-2 text-slate-500">
            <Button
              rounded="none"
              position="center"
              className="flex bg-primary py-1.5 px-2 text-white"
            >
              <Plus className="h-4 w-4" /> {''}
              Add Employee
            </Button>
          </div>
        </header>
        <EmployeeManagementTable
          {...{
            query: {
              data: dummyEmployeeManagement
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

export default EmployeeManagement
