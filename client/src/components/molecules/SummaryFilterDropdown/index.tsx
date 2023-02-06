import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'

import Text from '~/components/atoms/Text'
import RadioButton from '~/components/atoms/RadioButton'
import { WorkStatus } from '~/utils/constants/work-status'
import Button from '~/components/atoms/Buttons/ButtonAction'
import FilterDropdownTemplate from '~/components/templates/FilterDropdownTemplate'

type Props = {}

const SummaryFilterDropdown: FC<Props> = (): JSX.Element => {
  const router = useRouter()
  const currentYear = new Date().getFullYear()
  const range = (start: number, stop: number, step: number): number[] =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)
  const [year, setYear] = useState<number>(2023)

  const isListOfLeaveTabPage = router.pathname === '/leave-management/list-of-leave'

  const handleUpdateResult = (): void => {
    if (router.pathname.includes('/my-leaves')) {
      void router.replace({
        pathname: router.pathname,
        query: {
          year
        }
      })
    }
  }

  return (
    <div>
      <FilterDropdownTemplate btnText="Filters">
        <main className="flex flex-col space-y-3 px-5 py-4">
          <Text theme="sm" weight="semibold" className="text-slate-500">
            {isListOfLeaveTabPage ? 'Leave Filters' : 'Summary Filters'}
          </Text>
          {!isListOfLeaveTabPage && (
            <>
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
                    defaultValue={router.query.year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    id="filterYear"
                  >
                    {range(currentYear, currentYear - 10, -1).map((year, i) => (
                      <option key={i} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </>
          )}
          {isListOfLeaveTabPage && (
            <div className="space-y-4">
              <label htmlFor="filterName" className="flex flex-col space-y-1">
                <span className="text-xs text-slate-500">Filter Type</span>
                <select
                  className={classNames(
                    'w-full rounded-md border border-slate-300 text-xs shadow-sm',
                    'focus:border-primary focus:ring-1 focus:ring-primary'
                  )}
                  id="filterName"
                >
                  <option value="">All</option>
                  <option value="">{WorkStatus.VACATION_LEAVE}</option>
                  <option value="">{WorkStatus.ABSENT}</option>
                  <option value="">{WorkStatus.ON_DUTY}</option>
                  <option value="">{WorkStatus.SICK_LEAVE}</option>
                </select>
              </label>
              <hr />
              <div className="flex items-center justify-between">
                <RadioButton label="With Pay" />
                <RadioButton label="Without Pay" />
              </div>
            </div>
          )}
        </main>
        <footer className="bg-slate-100 px-5 py-3">
          <Button
            onClick={handleUpdateResult}
            type="button"
            variant="primary"
            rounded="md"
            className="w-full py-2"
          >
            Update Results
          </Button>
        </footer>
      </FilterDropdownTemplate>
    </div>
  )
}

SummaryFilterDropdown.defaultProps = {}

export default SummaryFilterDropdown
