import React, { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import Select from 'react-select'

import useUserQuery from '~/hooks/useUserQuery'
import { customStyles } from '~/utils/customReactSelectStyles'
import Text from '~/components/atoms/Text'
import RadioButton from '~/components/atoms/RadioButton'
import { WorkStatus } from '~/utils/constants/work-status'
import Button from '~/components/atoms/Buttons/ButtonAction'
import FilterDropdownTemplate from '~/components/templates/FilterDropdownTemplate'
import { optionType, usersSelectOptions, yearSelectOptions } from '~/utils/maps/filterOptions'

type Props = {}

const SummaryFilterDropdown: FC<Props> = (): JSX.Element => {
  const router = useRouter()
  const currentYear = new Date().getFullYear()
  const { handleAllUsersQuery } = useUserQuery()

  const range = (start: number, stop: number, step: number): number[] =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

  const NAME_FIELD = 'name'
  const YEAR_FIELD = 'year'

  // filter states
  const [year, setYear] = useState<number>(currentYear)
  const [selectedUser, setSelectedUser] = useState<number>()

  // filter options
  const [nameOptions, setNameOptions] = useState<optionType[]>([])
  const yearOptions = yearSelectOptions(range(currentYear, 2015, -1))

  const isListOfLeaveTabPage = router.pathname === '/leave-management/list-of-leave'
  const isLeaveSummaryTabPage = router.pathname === '/leave-management/leave-summary'
  const isYearlySummaryTabPage = router.pathname === '/leave-management/yearly-summary'

  const { data, isSuccess, isLoading } = handleAllUsersQuery(
    router.isReady && isLeaveSummaryTabPage
  )

  const handleUpdateResult = (): void => {
    if (
      router.pathname.includes('/my-leaves') ||
      router.pathname.includes('/leave-management/yearly-summary')
    ) {
      void router.replace({
        pathname: router.pathname,
        query: {
          year
        }
      })
    } else if (router.pathname.includes('/leave-management/leave-summary')) {
      void router.replace({
        pathname: router.pathname,
        query: {
          id: selectedUser,
          year
        }
      })
    }
  }

  const handleDefaultValues = (field: string): optionType | null => {
    let defaultValue: optionType | null = null

    switch (field) {
      case YEAR_FIELD:
        defaultValue = yearOptions[0]
        break
      case NAME_FIELD:
        defaultValue = nameOptions[0]
        break
    }

    if (isLeaveSummaryTabPage) {
      if (field === YEAR_FIELD && router.query.year !== undefined)
        return yearOptions.find((option) => option.value === year) ?? null

      if (field === NAME_FIELD && router.query.id !== undefined)
        return nameOptions.find((option) => option.value === selectedUser) ?? null
    }

    if (isYearlySummaryTabPage && router.query.year !== undefined) {
      return yearOptions.find((option) => option.value === year) ?? null
    }

    return defaultValue
  }

  useEffect(() => {
    if (isSuccess) {
      setNameOptions(usersSelectOptions(data.allUsers))
      setSelectedUser(
        router.query.id === undefined || router.query.id === ''
          ? data.allUsers[0].id
          : parseInt(router.query.id as string)
      )
    }
  }, [isSuccess])

  useEffect(() => {
    if (router.isReady) {
      setYear(
        router.query.year === undefined || router.query.year === ''
          ? currentYear
          : parseInt(router.query.year as string)
      )
    }
  }, [router])

  return (
    <div>
      <FilterDropdownTemplate btnText="Filters" cardClassName="overflow-visible">
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
                    <Select
                      id="filterName"
                      styles={customStyles}
                      defaultValue={handleDefaultValues(NAME_FIELD)}
                      isLoading={isLoading}
                      name={NAME_FIELD}
                      onChange={(e) => (e !== null ? setSelectedUser(e.value) : null)}
                      options={nameOptions}
                    />
                  </label>
                  <label htmlFor="filterYear" className="flex flex-col space-y-1">
                    <span className="text-xs text-slate-500">Year</span>
                    <Select
                      id="filterYear"
                      styles={customStyles}
                      defaultValue={handleDefaultValues(YEAR_FIELD)}
                      isLoading={isLoading}
                      name={YEAR_FIELD}
                      onChange={(e) => (e !== null ? setYear(e.value) : null)}
                      options={yearOptions}
                    />
                  </label>
                </>
              ) : (
                <label htmlFor="filterYear" className="flex flex-col space-y-1">
                  <span className="text-xs text-slate-500">Year</span>
                  <Select
                    id="filterYear"
                    styles={customStyles}
                    defaultValue={handleDefaultValues('year')}
                    name="year"
                    onChange={(e) => (e !== null ? setYear(e.value) : null)}
                    options={yearOptions}
                  />
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
