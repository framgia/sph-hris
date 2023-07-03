import moment from 'moment'
import React, { FC } from 'react'
import classNames from 'classnames'

import Text from '~/components/atoms/Text'
import Card from '~/components/atoms/Card'
import { Filters } from '~/pages/dtr-management'
import Button from '~/components/atoms/Buttons/ButtonAction'
import FilterDropdownTemplate from '~/components/templates/FilterDropdownTemplate'

type Props = {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<any>>
  handleFilterUpdate: Function
}

const HROvertimeFilterDropdown: FC<Props> = (props): JSX.Element => {
  const { filters, setFilters, handleFilterUpdate } = props
  const monthYearSelectionRef = React.createRef<HTMLInputElement>()

  const daysRangeSelectionRef = React.createRef<HTMLSelectElement>()

  const daysRangeOptions = ['1-15 Days Timesheet', '16-31 Days Timesheet']

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

  return (
    <FilterDropdownTemplate btnText="Filters" menuItemsStyle="w-80">
      <Card shadow-size="xl" rounded="md" className="overflow-visible !bg-white">
        <main className="flex flex-col space-y-4 px-5 py-4">
          <Text theme="sm" weight="semibold" className="text-slate-500">
            Timesheet Filters
          </Text>
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
      </Card>
    </FilterDropdownTemplate>
  )
}

export default HROvertimeFilterDropdown
