import { NextPage } from 'next'
import classNames from 'classnames'
import { Plus } from 'react-feather'
import React, { useState } from 'react'

import Layout from '~/components/templates/Layout'
import Button from '~/components/atoms/Buttons/ButtonAction'
import GlobalSearchFilter from '~/components/molecules/GlobalSearchFilter'
import AddNewEmployeeModal from '~/components/molecules/AddNewEmployeeModal'
import { columns } from '~/components/molecules/EmployeeManagementTable/columns'
import { dummyEmployeeManagement } from '~/utils/constants/dummyEmployeeManagement'
import EmployeeManagementTable from '~/components/molecules/EmployeeManagementTable'

export type Filters = {
  type: string
  status: string
}

export type QueryVariablesType = {
  type: string | null
  status: string | null
}

const EmployeeManagement: NextPage = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [globalFilter, setGlobalFilter] = useState<string>('')

  const handleToggle = (): void => setIsOpen(!isOpen)

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
              type="button"
              variant="primary"
              onClick={handleToggle}
              className="flex items-center space-x-0.5 px-1.5 py-[3px]"
            >
              <Plus className="h-4 w-4" /> {''}
              Add Employee
            </Button>
          </div>
          {/* File New Overtime Modal */}
          <AddNewEmployeeModal
            {...{
              isOpen,
              closeModal: handleToggle
            }}
          />
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
