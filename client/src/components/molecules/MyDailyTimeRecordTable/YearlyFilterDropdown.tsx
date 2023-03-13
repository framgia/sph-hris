import { useRouter } from 'next/router'
import { Menu } from '@headlessui/react'
import React, { FC, useState } from 'react'

import Text from '~/components/atoms/Text'
import Select from '~/components/atoms/Select'
import { yearSelectOptions } from '~/utils/maps/filterOptions'
import { overtimeStatus } from '~/utils/constants/overtimeStatus'
import FilterDropdownTemplate from '~/components/templates/FilterDropdownTemplate'

type Props = {}

const YearlyFilterDropdown: FC<Props> = (): JSX.Element => {
  const router = useRouter()
  const { year: routerYear } = router.query
  const { status: routerStatus } = router.query
  const currentYear = new Date().getFullYear()

  const range = (start: number, stop: number, step: number): number[] =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

  const YEAR_FIELD = 'year'

  const yearOptions = yearSelectOptions(range(currentYear, 2015, -1))

  const [status, setStatus] = useState('')
  const [year, setYear] = useState<string | undefined>('')

  const handleUpdateResult = (status: string, year: string | undefined): void => {
    void router.replace({
      pathname: '/overtime-management',
      query: {
        status,
        year
      }
    })
  }

  return (
    <div>
      <FilterDropdownTemplate btnText="Filters" cardClassName="overflow-visible">
        <main className="flex flex-col space-y-3 px-5 py-4">
          <Text theme="sm" weight="semibold" className="text-slate-500">
            Overtime Filters
          </Text>
          <label htmlFor="filterYear" className="flex flex-col space-y-1">
            <span className="text-xs text-slate-500">Status</span>
            <Select
              className="text-xs"
              defaultValue={routerStatus ?? status}
              onChange={(e: { target: { value: string } }) => setStatus(e.target.value)}
            >
              {overtimeStatus.map((item) => (
                <option key={item.id} value={item.value}>
                  {item.value}
                </option>
              ))}
            </Select>
          </label>
          <label htmlFor="filterYear" className="flex flex-col space-y-1">
            <span className="text-xs text-slate-500">Year</span>
            <Select
              id="filterYear"
              className="text-xs"
              name={YEAR_FIELD}
              defaultValue={routerYear ?? year}
              onChange={(e: { target: { value: string } }) => setYear(e.target.value)}
            >
              {[
                ...yearOptions.slice(0, 0),
                { label: 'Select...', value: '' },
                ...yearOptions.slice(0)
              ].map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
          </label>
        </main>
        <footer className="rounded-b-md bg-slate-100 px-5 py-3">
          <Menu.Button
            onClick={() => handleUpdateResult(status, year)}
            type="button"
            className="w-full rounded-md bg-primary py-2 text-white"
          >
            Update Results
          </Menu.Button>
        </footer>
      </FilterDropdownTemplate>
    </div>
  )
}

YearlyFilterDropdown.defaultProps = {}

export default YearlyFilterDropdown
