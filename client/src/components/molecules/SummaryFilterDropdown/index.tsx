import React, { FC } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'

import Text from '~/components/atoms/Text'
import Button from '~/components/atoms/Buttons/ButtonAction'
import FilterDropdownTemplate from '~/components/templates/FilterDropdownTemplate'

type Props = {}

const SummaryFilterDropdown: FC<Props> = (): JSX.Element => {
  const router = useRouter()

  return (
    <div>
      <FilterDropdownTemplate btnText="Filters">
        <main className="flex flex-col space-y-3 px-5 py-4">
          <Text theme="sm" weight="semibold" className="text-slate-500">
            Summary Filters
          </Text>
          {router.pathname === '/leave-management/leave-summary' ? (
            <>
              <label htmlFor="filterName" className="flex flex-col space-y-1">
                <span className="text-xs text-slate-500">Name</span>
                <select
                  className={classNames(
                    'w-full rounded-md border border-slate-300 text-xs shadow-sm',
                    'focus:border-primary focus:ring-1 focus:ring-primary'
                  )}
                  id="filterName"
                >
                  <option value="">Joshua Galit</option>
                  <option value="">Nilo</option>
                  <option value="">AJ</option>
                  <option value="">RJ</option>
                  <option value="">Alden</option>
                  <option value="">Paul Eric</option>
                </select>
              </label>
              <label htmlFor="filterYear" className="flex flex-col space-y-1">
                <span className="text-xs text-slate-500">Year</span>
                <select
                  className={classNames(
                    'w-full rounded-md border border-slate-300 text-xs shadow-sm',
                    'focus:border-primary focus:ring-1 focus:ring-primary'
                  )}
                  id="filterYear"
                >
                  <option value="">2017</option>
                  <option value="">2018</option>
                  <option value="">2019</option>
                  <option value="">2020</option>
                  <option value="">2021</option>
                  <option value="">2022</option>
                  <option value="">2023</option>
                </select>
              </label>
            </>
          ) : (
            <label htmlFor="filterYear" className="flex flex-col space-y-1">
              <span className="text-xs text-slate-500">Year</span>
              <select
                className={classNames(
                  'w-full rounded-md border border-slate-300 text-xs shadow-sm',
                  'focus:border-primary focus:ring-1 focus:ring-primary'
                )}
                id="filterYear"
              >
                <option value="">2017</option>
                <option value="">2018</option>
                <option value="">2019</option>
                <option value="">2020</option>
                <option value="">2021</option>
                <option value="">2022</option>
                <option value="">2023</option>
              </select>
            </label>
          )}
        </main>
        <footer className="bg-slate-100 px-5 py-3">
          <Button type="button" variant="primary" rounded="md" className="w-full py-2">
            Update Results
          </Button>
        </footer>
      </FilterDropdownTemplate>
    </div>
  )
}

SummaryFilterDropdown.defaultProps = {}

export default SummaryFilterDropdown
