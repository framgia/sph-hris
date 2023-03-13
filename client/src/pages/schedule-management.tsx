import { NextPage } from 'next'
import { Info } from 'react-feather'
import React, { useState } from 'react'

import Input from '~/components/atoms/Input'
import Button from '~/components/atoms/Buttons/Button'
import ScheduleManagementLayout from '~/components/templates/ScheduleManagementLayout'
import classNames from 'classnames'
import FadeInOut from '~/components/templates/FadeInOut'

interface DayButtonProps {
  day: string
  selected: boolean
  onClick: () => void
}

const DayButton: React.FC<DayButtonProps> = ({ day, selected, onClick }) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      rounded="none"
      className={classNames('px-6 py-3 focus:outline-none', selected ? 'bg-amber-50' : '')}
    >
      {day}
    </Button>
  )
}

const ScheduleManagement: NextPage = (): JSX.Element => {
  const [selectedDays, setSelectedDays] = useState<string[]>([])

  const toggleDay = (day: string): void => {
    const isSelected = selectedDays.includes(day)
    if (isSelected) {
      setSelectedDays(selectedDays.filter((d) => d !== day))
    } else {
      setSelectedDays([...selectedDays, day])
    }
  }

  return (
    <ScheduleManagementLayout metaTitle="Schedule Management">
      <FadeInOut className="default-scrollbar h-full min-h-full overflow-auto ">
        <form className="p-5 text-sm font-normal text-slate-800">
          <header className="flex items-center space-x-2">
            <h1 className="font-medium uppercase">Schedule</h1>
            <Info className="h-4 w-4" />
          </header>
          <main className="mx-auto mt-8 flex w-full max-w-lg flex-col space-y-4 text-[13px]">
            <section>
              <label
                htmlFor="schedule-name"
                className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2"
              >
                <span className="shrink-0">Schedule Name</span>
                <Input
                  type="text"
                  className="py-2 px-4 text-[13px]"
                  placeholder="Schedule Name"
                  rounded="lg"
                  color="warning"
                />
              </label>
            </section>
            <section>
              <label
                htmlFor="schedule-name"
                className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0"
              >
                <span className="shrink-0">Days of the week</span>
                <div className="flex items-center overflow-hidden rounded-lg">
                  <DayButton
                    day="M"
                    selected={selectedDays.includes('M')}
                    onClick={() => toggleDay('M')}
                  />
                  <DayButton
                    day="T"
                    selected={selectedDays.includes('T')}
                    onClick={() => toggleDay('T')}
                  />
                  <DayButton
                    day="W"
                    selected={selectedDays.includes('W')}
                    onClick={() => toggleDay('W')}
                  />
                  <DayButton
                    day="T"
                    selected={selectedDays.includes('Th')}
                    onClick={() => toggleDay('Th')}
                  />
                  <DayButton
                    day="F"
                    selected={selectedDays.includes('F')}
                    onClick={() => toggleDay('F')}
                  />
                  <DayButton
                    day="S"
                    selected={selectedDays.includes('S')}
                    onClick={() => toggleDay('S')}
                  />
                  <DayButton
                    day="S"
                    selected={selectedDays.includes('Su')}
                    onClick={() => toggleDay('Su')}
                  />
                </div>
              </label>
            </section>
          </main>
          <footer></footer>
        </form>
      </FadeInOut>
    </ScheduleManagementLayout>
  )
}

export default ScheduleManagement
