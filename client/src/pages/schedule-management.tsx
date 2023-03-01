import { NextPage } from 'next'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { Info } from 'react-feather'
import React, { useState } from 'react'

import Input from '~/components/atoms/Input'
import Button from '~/components/atoms/Buttons/Button'
import FadeInOut from '~/components/templates/FadeInOut'
import ScheduleManagementLayout from '~/components/templates/ScheduleManagementLayout'

interface DayButtonProps {
  day: string
  selected: boolean
  onClick: () => void
  title: string
}

const DayButton: React.FC<DayButtonProps> = ({ day, selected, onClick, title }) => {
  return (
    <Tippy placement="bottom" content={title} className="!text-xs">
      <Button
        type="button"
        onClick={onClick}
        rounded="none"
        className={classNames(
          'h-12 w-12 shrink-0 select-none rounded-full border focus:outline-none',
          selected ? 'border-amber-500 bg-amber-50 text-amber-500' : 'border-slate-300'
        )}
      >
        {day}
      </Button>
    </Tippy>
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
          <main className="mx-auto mt-8 flex w-full max-w-lg flex-col space-y-5 text-[13px]">
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
                className="flex min-w-[440px] flex-col space-y-2 overflow-x-auto sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0"
              >
                <span className="shrink-0">Days of the week</span>
                <div className="flex items-center space-x-2 overflow-hidden rounded-lg">
                  <DayButton
                    day="M"
                    selected={selectedDays.includes('M')}
                    onClick={() => toggleDay('M')}
                    title="Monday"
                  />
                  <DayButton
                    day="T"
                    selected={selectedDays.includes('T')}
                    onClick={() => toggleDay('T')}
                    title="Tuesday"
                  />
                  <DayButton
                    day="W"
                    selected={selectedDays.includes('W')}
                    onClick={() => toggleDay('W')}
                    title="Wednesday"
                  />
                  <DayButton
                    day="T"
                    selected={selectedDays.includes('Th')}
                    onClick={() => toggleDay('Th')}
                    title="Thursday"
                  />
                  <DayButton
                    day="F"
                    selected={selectedDays.includes('F')}
                    onClick={() => toggleDay('F')}
                    title="Friday"
                  />
                  <DayButton
                    day="S"
                    selected={selectedDays.includes('S')}
                    onClick={() => toggleDay('S')}
                    title="Saturday"
                  />
                  <DayButton
                    day="S"
                    selected={selectedDays.includes('Su')}
                    onClick={() => toggleDay('Su')}
                    title="Sunday"
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
