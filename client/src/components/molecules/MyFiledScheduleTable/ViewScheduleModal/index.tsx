import React, { FC } from 'react'
import { Calendar } from 'react-feather'

import { IMyFiledScheduleData } from '~/utils/interfaces'
import Button from '~/components/atoms/Buttons/ButtonAction'
import ModalTemplate from '~/components/templates/ModalTemplate'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import CustomDayCard from '~/components/templates/MySchedulelayout/CustomDayCard'

type Props = {
  isOpen: boolean
  closeModal: () => void
  schedule: IMyFiledScheduleData | undefined
}

const ViewScheduleModal: FC<Props> = ({ isOpen, closeModal, schedule }): JSX.Element => {
  const empty = {
    timeIn: '',
    timeOut: '',
    breakFrom: '',
    breakTo: ''
  }

  return (
    <ModalTemplate
      {...{
        isOpen,
        closeModal
      }}
      className="w-full max-w-3xl"
    >
      {/* Custom Modal Header */}
      <ModalHeader
        {...{
          title: 'View Schedule',
          Icon: Calendar,
          closeModal
        }}
      />
      {/* Actual Remarks data */}
      <main className="py-7 px-6 text-xs leading-relaxed tracking-wide text-slate-700">
        <ul className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 md:grid-cols-3">
          <CustomDayCard
            {...{
              day: 'Monday',
              schedule: schedule?.schedule?.monday ?? empty
            }}
          />
          <CustomDayCard
            {...{
              day: 'Tuesday',
              schedule: schedule?.schedule?.tuesday ?? empty
            }}
          />
          <CustomDayCard
            {...{
              day: 'Wednesday',
              schedule: schedule?.schedule?.wednesday ?? empty
            }}
          />
          <CustomDayCard
            {...{
              day: 'Thursday',
              schedule: schedule?.schedule?.thursday ?? empty
            }}
          />
          <CustomDayCard
            {...{
              day: 'Friday',
              schedule: schedule?.schedule?.friday ?? empty
            }}
          />
          <CustomDayCard
            {...{
              day: 'Saturday',
              schedule: schedule?.schedule?.saturday ?? empty
            }}
          />
          <CustomDayCard
            {...{
              day: 'Sunday',
              schedule: schedule?.schedule?.sunday ?? empty
            }}
          />
        </ul>
      </main>

      {/* Custom Modal Footer Style */}
      <ModalFooter>
        <Button onClick={closeModal} variant="secondary" className="px-5 py-1 text-sm">
          Close
        </Button>
      </ModalFooter>
    </ModalTemplate>
  )
}

export default ViewScheduleModal
