import moment from 'moment'
import Link from 'next/link'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import React, { useState } from 'react'
import { Clock, Edit } from 'react-feather'
import { createColumnHelper } from '@tanstack/react-table'

import Chip from '~/components/atoms/Chip'
import Avatar from '~/components/atoms/Avatar'
import Button from '~/components/atoms/Buttons/Button'
import CellHeader from '~/components/atoms/CellHeader'
import EditTimeEntriesModal from '../EditTimeEntryModal'
import { ITimeEntry } from '~/utils/types/timeEntryTypes'
import InterruptionTimeEntriesModal from './../InterruptionTimeEntriesModal'
import { getSpecificTimeEntry, getUserProfileLink } from '~/hooks/useTimesheetQuery'

const columnHelper = createColumnHelper<ITimeEntry>()
const EMPTY = 'N/A'

export const columns = [
  columnHelper.accessor('user.name', {
    header: () => <CellHeader label="Name" />,
    footer: (info) => info.column.id,
    cell: (props) => (
      <div className="flex items-center space-x-2">
        <Avatar
          src={
            getUserProfileLink(Number(props.row.original.user.id)).data?.specificUserProfileDetail
              ?.avatarLink
          }
          size="base"
          rounded="full"
        />
        <div className="flex flex-col items-start">
          <h1 className="font-semibold">{props.getValue()}</h1>
          <small className="text-slate-500">Web Developer</small>
        </div>
      </div>
    )
  }),
  columnHelper.accessor('timeIn.timeHour', {
    id: 'Time In',
    header: () => <CellHeader label="Time In" />,
    footer: (info) => info.column.id,
    cell: (props) => {
      const { original: timeEntry } = props.row

      return (
        <>
          {(timeEntry.timeIn?.remarks !== undefined && timeEntry.timeIn?.remarks !== '') ||
          getSpecificTimeEntry(Number(timeEntry.timeIn?.id)).data?.timeById?.media[0]?.fileName !==
            undefined ? (
            <Tippy
              content={moment(timeEntry.date).format('MMM D, YYYY')}
              placement="left"
              className="!text-xs"
            >
              <Link
                href={`dtr-management/?time_in=${timeEntry.timeIn?.id}`}
                className="relative flex cursor-pointer active:scale-95"
              >
                {/* Actual Time In Data */}
                <span>{timeEntry.timeIn?.timeHour ?? EMPTY}</span>
                {/* Status */}
                {timeEntry.startTime > timeEntry.timeIn?.timeHour ? (
                  <span
                    className={classNames('ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500')}
                  />
                ) : (
                  <>
                    {!Number.isNaN(timeEntry.timeIn?.id) && (
                      <span
                        className={classNames('ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500')}
                      />
                    )}
                  </>
                )}
              </Link>
            </Tippy>
          ) : (
            <div className="relative flex">
              {/* Actual Time In Data */}
              <span>{timeEntry.timeIn?.timeHour ?? EMPTY}</span>
              {/* Status */}
              {timeEntry.timeIn?.timeHour !== undefined && timeEntry.timeIn?.timeHour !== ''
                ? !(timeEntry.startTime > timeEntry.timeIn?.timeHour) && (
                    <span
                      className={classNames('ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500')}
                    />
                  )
                : ''}
            </div>
          )}
        </>
      )
    }
  }),
  columnHelper.accessor('timeOut.timeHour', {
    header: () => <CellHeader label="Time Out" />,
    footer: (info) => info.column.id,
    cell: (props) => {
      const { original: timeEntry } = props.row

      return (
        <>
          {timeEntry.timeOut?.remarks !== undefined && timeEntry.timeOut?.remarks !== '' ? (
            <Tippy
              content={moment(timeEntry.date).format('MMM D, YYYY')}
              placement="left"
              className="!text-xs"
            >
              <Link
                href={`dtr-management/?time_out=${timeEntry.timeOut?.id}`}
                className="relative flex cursor-pointer active:scale-95"
              >
                {/* Actual Time In Data */}
                <span>{timeEntry.timeOut?.timeHour ?? EMPTY}</span>
                {/* Status */}
                {!Number.isNaN(timeEntry.timeOut?.id) && (
                  <span
                    className={classNames('ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500')}
                  />
                )}
              </Link>
            </Tippy>
          ) : (
            <span>{timeEntry.timeOut?.timeHour ?? EMPTY}</span>
          )}
        </>
      )
    }
  }),
  columnHelper.accessor('startTime', {
    header: () => <CellHeader label="Start Time" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('endTime', {
    header: () => <CellHeader label="End Time" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('workedHours', {
    header: () => <CellHeader label="Work Hours" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('late', {
    header: () => <CellHeader label="Late(min)" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('undertime', {
    header: () => <CellHeader label="Undertime(min)" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('overtime', {
    header: () => <CellHeader label="Overtime(min)" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('status', {
    header: () => <CellHeader label="Status" />,
    footer: (info) => info.column.id,
    cell: (props) => <Chip label={props.getValue()} />
  }),
  columnHelper.display({
    id: 'id',
    header: () => <span className="font-normal text-slate-500">Actions</span>,
    cell: (props) => {
      const { original: timeEntry } = props.row
      const [isOpenTimeEntry, setIsOpenTimeEntry] = useState<boolean>(false)
      const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)

      const handleIsOpenTimeEntryToggle = (id?: string | undefined): void => {
        setIsOpenTimeEntry(!isOpenTimeEntry)
      }

      const handleIsOpenEditModalToggle = (): void => {
        setIsOpenEditModal(!isOpenEditModal)
      }

      return (
        <div className="inline-flex items-center divide-x divide-slate-300 rounded border border-slate-300">
          <Tippy content="Time Entries" placement="left" className="!text-xs">
            <Button
              onClick={() => handleIsOpenTimeEntryToggle(props.row.id)}
              rounded="none"
              className="py-0.5 px-1 text-slate-500"
            >
              <Clock className="h-4 w-4" />
              {isOpenTimeEntry ? (
                <InterruptionTimeEntriesModal
                  {...{
                    isOpen: isOpenTimeEntry,
                    user: timeEntry.user.name,
                    timeEntryId: timeEntry.id,
                    closeModal: handleIsOpenTimeEntryToggle
                  }}
                />
              ) : null}
            </Button>
          </Tippy>
          <Tippy content="Edit" placement="left" className="!text-xs">
            <Button
              onClick={handleIsOpenEditModalToggle}
              rounded="none"
              className="py-0.5 px-1 text-slate-500"
            >
              <Edit className="h-4 w-4" />
              {isOpenEditModal ? (
                <EditTimeEntriesModal
                  {...{
                    isOpen: isOpenEditModal,
                    user: timeEntry.user,
                    timeEntry: {
                      id: timeEntry.id,
                      timeIn: timeEntry.timeIn?.timeHour,
                      timeOut: timeEntry.timeOut?.timeHour
                    },
                    closeModal: handleIsOpenEditModalToggle
                  }}
                />
              ) : null}
            </Button>
          </Tippy>
        </div>
      )
    },
    footer: (info) => info.column.id
  })
]
