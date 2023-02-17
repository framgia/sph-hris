import { NextPage } from 'next'
import classNames from 'classnames'
import React, { useState } from 'react'

import useUserQuery from '~/hooks/useUserQuery'
import { Roles } from '~/utils/constants/roles'
import Layout from '~/components/templates/Layout'
import GlobalSearchFilter from '~/components/molecules/GlobalSearchFilter'
import OvertimeManagementTable from '~/components/molecules/OvertimeManagementTable'
import { dummyOvertimeManagementData } from '~/utils/constants/dummyOvertimeManagementData'
import { hrColumns, managerColumns } from '~/components/molecules/OvertimeManagementTable/columns'
import YearlyFilterDropdown from '~/components/molecules/MyDailyTimeRecordTable/YearlyFilterDropdown'

const OvertimeManagement: NextPage = (): JSX.Element => {
  const { handleUserQuery } = useUserQuery()
  const { data: user } = handleUserQuery()

  const [globalFilter, setGlobalFilter] = useState<string>('')

  return (
    <Layout metaTitle="Overtime Management">
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
        <OvertimeManagementTable
          {...{
            query: {
              data: dummyOvertimeManagementData,
              error: null
            },
            table: {
              columns: user?.userById.role.name === Roles.HR_ADMIN ? hrColumns : managerColumns,
              globalFilter,
              setGlobalFilter
            }
          }}
        />
      </section>
    </Layout>
  )
}

export default OvertimeManagement
