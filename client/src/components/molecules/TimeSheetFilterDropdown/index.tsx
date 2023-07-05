import moment from 'moment'
import React, { FC } from 'react'
import classNames from 'classnames'

import Text from '~/components/atoms/Text'
import { Filters } from '~/pages/dtr-management'
import Button from '~/components/atoms/Buttons/ButtonAction'
import FilterDropdownTemplate from '~/components/templates/FilterDropdownTemplate'

type Props = {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<any>>
  handleFilterUpdate: Function
  isOpenSummaryTable: boolean
}

const TimeSheetFilterDropdown: FC<Props> = (props): JSX.Element => {
  const { filters, setFilters, handleFilterUpdate, isOpenSummaryTable } = props

  const dateSelectionRef = React.createRef<HTMLInputElement>()

  const monthYearSelectionRef = React.createRef<HTMLInputElement>()

  const daysRangeSelectionRef = React.createRef<HTMLSelectElement>()

  const statusOptions = ['All', 'Present', 'Sick Leave', 'Vacation Leave', 'Absent']

  const daysRangeOptions = ['1-15 Days Timesheet', '16-31 Days Timesheet']

  const filterStatusOptions = (statusList: string[]): JSX.Element[] => {
    return statusList.map((item) => <option key={item}>{item}</option>)
  }

  const handleDateChange = (): void => {
    const selectedDate =
      dateSelectionRef.current != null ? new Date(dateSelectionRef.current.value) : new Date()

    setFilters({ ...filters, date: moment(selectedDate).format('YYYY-MM-DD') })
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setFilters({
      ...filters,
      status: e.currentTarget.value !== 'All' ? e.currentTarget.value.toLowerCase() : ''
    })
  }

  const handleSummaryFilterChange = (): void => {
    if (monthYearSelectionRef.current !== null) {
      const monthyear = monthYearSelectionRef.current.value
      daysRangeSelectionRef.current?.value === daysRangeOptions[0]
        ? setFilters({
            ...filters,
            startDate: moment(`${monthyear}` + '-01').format('YYYY-MM-DD'),
            endDate: moment(`${monthyear}` + '-15').format('YYYY-MM-DD')
          })
        : setFilters({
            ...filters,
            startDate: moment(`${monthyear}` + '-16').format('YYYY-MM-DD'),
            endDate: moment(`${monthyear}` + '-16')
              .endOf('month')
              .format('YYYY-MM-DD')
          })
    }
  }

  const getDefaultStatus = (statusFilter: string): string => {
    for (let i = 0; i < statusOptions.length; i++) {
      if (statusOptions[i].toLowerCase() === statusFilter) return statusOptions[i]
    }
    return 'All'
  }

  const menuItems = classNames(
    'w-80 rounded-md  ring-opacity-5 focus:outline-none top-8 right-0',
    'bg-white py-1 shadow-xl shadow-slate-200 ring-1 ring-black'
  )

  return (
    <FilterDropdownTemplate btnText="Filters" menuItemsStyle={menuItems}>
      <main className="flex flex-col space-y-4 px-5 py-4">
        <Text theme="sm" weight="semibold" className="text-slate-500">
          Timesheet Filters
        </Text>
        {isOpenSummaryTable ? (
          <>
            <input
              type="month"
              className={classNames(
                'w-full rounded-md border border-slate-300 text-xs shadow-sm',
                'focus:border-primary focus:ring-1 focus:ring-primary'
              )}
              ref={monthYearSelectionRef}
              defaultValue={moment(filters.startDate).format('YYYY-MM')}
              onChange={handleSummaryFilterChange}
            ></input>
            <select
              className={classNames(
                'w-full rounded-md border border-slate-300 text-xs shadow-sm',
                'focus:border-primary focus:ring-1 focus:ring-primary'
              )}
              ref={daysRangeSelectionRef}
              onChange={handleSummaryFilterChange}
              defaultValue={
                new Date(filters.endDate).getDate() > 15 ? daysRangeOptions[1] : daysRangeOptions[0]
              }
            >
              <option>{daysRangeOptions[0]}</option>
              <option>{daysRangeOptions[1]}</option>
            </select>
          </>
        ) : (
          <>
            <div>
              <input
                type="date"
                className={classNames(
                  'w-full rounded-md border border-slate-300 text-xs shadow-sm',
                  'focus:border-primary focus:ring-1 focus:ring-primary'
                )}
                defaultValue={filters.date}
                ref={dateSelectionRef}
                onChange={handleDateChange}
              />
            </div>
            <label htmlFor="filterStatus" className="flex flex-col space-y-1">
              <span className="text-xs text-slate-500">Filter Status</span>
              <select
                className={`
                  w-full rounded-md border border-slate-300 text-xs shadow-sm
                focus:border-primary focus:ring-1 focus:ring-primary
                `}
                id="filterStatus"
                defaultValue={getDefaultStatus(filters.status)}
                onChange={(e) => handleStatusChange(e)}
              >
                {filterStatusOptions(statusOptions)}
              </select>
            </label>
          </>
        )}
      </main>
      <footer className="bg-slate-100 px-5 py-3">
        <Button
          type="button"
          variant="primary"
          rounded="md"
          className="w-full py-2 text-xs"
          onClick={(): React.MouseEvent<HTMLInputElement> => handleFilterUpdate()}
        >
          Update Results
        </Button>
      </footer>
    </FilterDropdownTemplate>
  )
}

export default TimeSheetFilterDropdown
