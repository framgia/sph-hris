import isEmpty from 'lodash/isEmpty'
import { useRouter } from 'next/router'
import Select, { SingleValue } from 'react-select'
import React, { FC, useEffect, useState } from 'react'

import Text from '~/components/atoms/Text'
import Card from '~/components/atoms/Card'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { customStyles } from '~/utils/customReactSelectStyles'
import { optionType, yearSelectOptions } from '~/utils/maps/filterOptions'
import FilterDropdownTemplate from '~/components/templates/FilterDropdownTemplate'

type Props = {}

type StatusOption = {
  label: string
  value: string
}

const YearlyFilterDropdown: FC<Props> = (): JSX.Element => {
  const router = useRouter()
  const currentYear = new Date().getFullYear()

  const range = (start: number, stop: number, step: number): number[] =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

  const YEAR_FIELD = 'year'
  const statusOptions: StatusOption[] = [
    { label: 'All', value: '' },
    { label: 'Pending', value: 'pending' },
    { label: 'Disapproved', value: 'disapproved' },
    { label: 'Approved', value: 'approved' }
  ]

  const [selectedStatus, setSelectedStatus] = useState<StatusOption>(statusOptions[0])

  // filter states
  const [year, setYear] = useState<number>(currentYear)

  // Filter Options
  const yearOptions = yearSelectOptions(range(currentYear, 2015, -1))

  const handleUpdateResult = (): void => {
    void router.replace({
      pathname: router.pathname,
      query: {
        status: selectedStatus.value,
        year
      }
    })
  }

  const handleDefaultValues = (field: string): optionType | null => {
    let defaultValue: optionType | null = null

    switch (field) {
      case YEAR_FIELD:
        defaultValue = yearOptions[0]
        break
    }

    return defaultValue
  }

  const handleStatusChange = (selectedOption: SingleValue<StatusOption>): void => {
    setSelectedStatus(selectedOption as StatusOption)
  }

  useEffect(() => {
    if (router.isReady) {
      setYear(isEmpty(router.query.year) ? currentYear : parseInt(router.query.year as string))
    }
  }, [router])

  return (
    <FilterDropdownTemplate btnText="Filters" menuItemsStyle="w-72">
      <Card shadow-size="xl" rounded="md" className="overflow-visible !bg-white">
        <main className="flex flex-col space-y-3 px-5 py-4">
          <Text theme="sm" weight="semibold" className="text-slate-500">
            Overtime Filters
          </Text>
          <label htmlFor="filterYear" className="flex flex-col space-y-1">
            <span className="text-xs text-slate-500">Status</span>
            <Select
              options={statusOptions}
              value={selectedStatus}
              onChange={handleStatusChange}
              isClearable={false}
              isSearchable={false}
              placeholder="Select status"
              styles={customStyles}
            />
          </label>
          <label htmlFor="filterYear" className="flex flex-col space-y-1">
            <span className="text-xs text-slate-500">Year</span>
            <Select
              id="filterYear"
              styles={customStyles}
              defaultValue={handleDefaultValues(YEAR_FIELD)}
              onChange={(e) => (e !== null ? setYear(e.value) : null)}
              name={YEAR_FIELD}
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
      </Card>
    </FilterDropdownTemplate>
  )
}

export default YearlyFilterDropdown
