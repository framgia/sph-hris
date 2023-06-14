import Select from 'react-select'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'

import useUserQuery from '~/hooks/useUserQuery'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { customStyles } from '~/utils/customReactSelectStyles'
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
    <div className="flex flex-col items-center gap-y-4 text-xs sm:flex-row sm:items-end sm:space-x-2">
      {!isListOfLeaveTabPage && (
        <div className="flex w-full flex-col items-center sm:w-auto sm:flex-row sm:space-x-2">
          {/* ===== PAGE FOR: LEAVE SUMMARY ===== */}
          {router.pathname === '/leave-management/leave-summary' && (
            <div className="mt-4 w-full sm:w-64">
              <label htmlFor="leaveSummaryFilterName" className="flex flex-col space-y-1">
                <span className="text-xs text-slate-500">Name</span>
                <Select
                  id="leaveSummaryFilterName"
                  styles={customStyles}
                  defaultValue={handleDefaultValues(NAME_FIELD)}
                  isLoading={isLoading}
                  name={NAME_FIELD}
                  className="w-full"
                  classNames={{
                    control: (state) => (state.isFocused ? 'border-primary' : 'border-slate-300')
                  }}
                  onChange={(e) => (e !== null ? setSelectedUser(e.value) : null)}
                  options={nameOptions}
                />
              </label>
            </div>
          )}

          {/* ===== PAGE FOR: MY LEAVE PAGE AND YEARLY SUMMARY ===== */}
          <div className="mt-4 w-full sm:w-64">
            <label htmlFor="myleaveFilterYear" className="flex flex-col space-y-1">
              <span className="text-xs text-slate-500">Filter By Year</span>
              <Select
                id="myleaveFilterYear"
                styles={customStyles}
                defaultValue={handleDefaultValues(YEAR_FIELD)}
                name={YEAR_FIELD}
                classNames={{
                  control: (state) => (state.isFocused ? 'border-primary' : 'border-slate-300')
                }}
                className="w-full text-xs"
                onChange={(e) => (e !== null ? setYear(e.value) : null)}
                options={yearOptions}
              />
            </label>
          </div>
        </div>
      )}

      <div className="mb-[1px] w-full">
        <Button
          onClick={handleUpdateResult}
          type="button"
          variant="primary"
          className="w-full py-[9px] px-4 sm:w-auto"
        >
          Filter
        </Button>
      </div>
    </div>
  )
}

SummaryFilterDropdown.defaultProps = {}

export default SummaryFilterDropdown
