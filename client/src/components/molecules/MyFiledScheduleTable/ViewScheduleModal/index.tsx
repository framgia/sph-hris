import classNames from 'classnames'
import { Calendar } from 'react-feather'
import React, { FC, ReactNode } from 'react'

import { IMyFiledScheduleData } from '~/utils/interfaces'
import Button from '~/components/atoms/Buttons/ButtonAction'
import CustomTimeEntryDetails from './CustomTimeEntryDetails'
import ModalTemplate from '~/components/templates/ModalTemplate'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'

type Props = {
  isOpen: boolean
  closeModal: () => void
  schedule: IMyFiledScheduleData | undefined
}

const ViewScheduleModal: FC<Props> = ({ isOpen, closeModal, schedule }): JSX.Element => {
  return (
    <ModalTemplate
      {...{
        isOpen,
        closeModal
      }}
      className="w-full max-w-2xl"
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
      <main className="py-7 px-6 text-sm leading-relaxed tracking-wide text-slate-700">
        <ul className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 md:grid-cols-3">
          <CustomCard>
            <span className="font-medium">Monday</span>
            <CustomTimeEntryDetails
              {...{
                schedule: {
                  timeIn: schedule?.schedule.monday.timeIn ?? '',
                  timeOut: schedule?.schedule.monday.timeOut ?? ''
                }
              }}
            />
          </CustomCard>
          <CustomCard>
            <span className="font-medium">Tuesday</span>
            <CustomTimeEntryDetails
              {...{
                schedule: {
                  timeIn: schedule?.schedule.tuesday.timeIn ?? '',
                  timeOut: schedule?.schedule.tuesday.timeOut ?? ''
                }
              }}
            />
          </CustomCard>
          <CustomCard>
            <span className="font-medium">Wednesday</span>
            <CustomTimeEntryDetails
              {...{
                schedule: {
                  timeIn: schedule?.schedule.wednesday.timeIn ?? '',
                  timeOut: schedule?.schedule.wednesday.timeOut ?? ''
                }
              }}
            />
          </CustomCard>
          <CustomCard>
            <span className="font-medium">Thursday</span>
            <CustomTimeEntryDetails
              {...{
                schedule: {
                  timeIn: schedule?.schedule.thursday.timeIn ?? '',
                  timeOut: schedule?.schedule.thursday.timeOut ?? ''
                }
              }}
            />
          </CustomCard>
          <CustomCard>
            <span className="font-medium">Friday</span>
            <CustomTimeEntryDetails
              {...{
                schedule: {
                  timeIn: schedule?.schedule.friday.timeIn ?? '',
                  timeOut: schedule?.schedule.friday.timeOut ?? ''
                }
              }}
            />
          </CustomCard>
          <CustomCard>
            <span className="font-medium">Saturday</span>
            <CustomTimeEntryDetails
              {...{
                schedule: {
                  timeIn: schedule?.schedule.saturday.timeIn ?? '',
                  timeOut: schedule?.schedule.saturday.timeOut ?? ''
                }
              }}
            />
          </CustomCard>
          <CustomCard>
            <span className="font-medium">Sunday</span>
            <CustomTimeEntryDetails
              {...{
                schedule: {
                  timeIn: schedule?.schedule.sunday.timeIn ?? '',
                  timeOut: schedule?.schedule.sunday.timeOut ?? ''
                }
              }}
            />
          </CustomCard>
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

const CustomCard = ({ children }: { children: ReactNode }): JSX.Element => (
  <li
    className={classNames(
      'inline-flex flex-col rounded-lg border border-slate-300 px-3 py-2',
      'transition duration-150 ease-in-out hover:border-amber-200',
      'hover:shadow-md hover:shadow-amber-200'
    )}
  >
    {children}
  </li>
)

export default ViewScheduleModal
