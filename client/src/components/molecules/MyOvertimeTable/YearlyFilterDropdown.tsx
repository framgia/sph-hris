import React, { FC } from 'react'
import Select from '~/components/atoms/Select'
import CreatableSelect from 'react-select/creatable'

import Text from '~/components/atoms/Text'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { customStyles } from '~/utils/customReactSelectStyles'
import { yearSelectOptions } from '~/utils/maps/filterOptions'
import { overtimeStatus } from '~/utils/constants/overtimeStatus'
import FilterDropdownTemplate from '~/components/templates/FilterDropdownTemplate'

type Props = {}

const YearlyFilterDropdown: FC<Props> = (): JSX.Element => {
  const currentYear = new Date().getFullYear()

  const range = (start: number, stop: number, step: number): number[] =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

  const YEAR_FIELD = 'year'

  const yearOptions = yearSelectOptions(range(currentYear, 2015, -1))

  const handleUpdateResult = (): void => {}

  return (
    <div>
      <FilterDropdownTemplate btnText="Filters" cardClassName="overflow-visible">
        <main className="flex flex-col space-y-3 px-5 py-4">
          <Text theme="sm" weight="semibold" className="text-slate-500">
            Overtime Filters
          </Text>
          <label htmlFor="filterYear" className="flex flex-col space-y-1">
            <span className="text-xs text-slate-500">Status</span>
            <Select className="text-xs" defaultValue={overtimeStatus[0].value}>
              {overtimeStatus.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.value}
                </option>
              ))}
            </Select>
          </label>
          <label htmlFor="filterYear" className="flex flex-col space-y-1">
            <span className="text-xs text-slate-500">Year</span>
            <CreatableSelect
              id="filterYear"
              name={YEAR_FIELD}
              styles={customStyles}
              options={yearOptions}
            />
          </label>
        </main>
        <footer className="rounded-b-md bg-slate-100 px-5 py-3">
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

YearlyFilterDropdown.defaultProps = {}

export default YearlyFilterDropdown
