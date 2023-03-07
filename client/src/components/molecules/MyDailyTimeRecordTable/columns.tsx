import moment from 'moment'
import Link from 'next/link'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { HiFire } from 'react-icons/hi'
import React, { useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Check, Clock, Edit, RefreshCw, ThumbsDown } from 'react-feather'

import Chip from '~/components/atoms/Chip'
import useUserQuery from '~/hooks/useUserQuery'
import Button from '~/components/atoms/Buttons/Button'
import CellHeader from '~/components/atoms/CellHeader'
import AddNewOvertimeModal from '../AddNewOvertimeModal'
import { NO_OVERTIME } from '~/utils/constants/overtimeStatus'
import { getSpecificTimeEntry } from '~/hooks/useTimesheetQuery'
import { IEmployeeTimeEntry } from '~/utils/types/timeEntryTypes'
import InterruptionTimeEntriesModal from './../InterruptionTimeEntriesModal'

const columnHelper = createColumnHelper<IEmployeeTimeEntry>()
const EMPTY = 'N/A'

export const columns = [
  columnHelper.accessor((row) => moment(new Date(row.date)).format('MMMM DD, YYYY'), {
    id: 'Date',
    header: () => <CellHeader label="Date" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor((row) => row.timeIn?.timeHour, {
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
                href={`my-daily-time-record/?time_in=${timeEntry.timeIn?.id}`}
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
  columnHelper.accessor('timeOut', {
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
                href={`my-daily-time-record/?time_out=${timeEntry.timeOut?.id}`}
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
    footer: (info) => info.column.id,
    cell: (props) => {
      const { original: timeEntry } = props.row
      const { overtime } = timeEntry

      const [isOpen, setIsOpen] = useState<boolean>(false)

      const handleToggle = (): void => setIsOpen(!isOpen)

      const minuteDifference = Math.floor(
        moment
          .duration(
            moment(timeEntry.timeOut.createdAt).diff(
              `${moment(timeEntry.date).format('YYYY-MM-DD')} ${moment('19:30', 'HH:mm:ss').format(
                'HH:mm:ss'
              )}`
            )
          )
          .asMinutes()
      )

      return (
        <div className="flex items-center space-x-2">
          {/* If the user has no overtime filed */}
          {overtime === null ? (
            <Button type="button" className="flex items-center" onClick={handleToggle}>
              {minuteDifference > 0 ? (
                <>
                  <span>{minuteDifference}</span>
                  <HiFire className="h-4 w-4 text-red-500" />
                </>
              ) : (
                <span>{NO_OVERTIME}</span>
              )}

              {/* File New Overtime Modal */}
              {isOpen ? (
                <AddNewOvertimeModal
                  {...{
                    isOpen,
                    closeModal: handleToggle,
                    timeEntry,
                    initialMinutes: minuteDifference
                  }}
                />
              ) : null}
            </Button>
          ) : (
            <>
              {/* If Approved Request */}
              {overtime.isLeaderApproved != null &&
                overtime.isManagerApproved != null &&
                overtime.isLeaderApproved &&
                overtime.isManagerApproved && (
                  <Tippy placement="left" content="Approved request" className="!text-xs">
                    <Button
                      type="button"
                      className="inline-flex items-center rounded border-y border-r border-slate-300 group-hover:bg-white"
                    >
                      <Check className="h-4 w-5 rounded-l bg-green-500 text-white" />
                      <span className="px-1 text-green-600">{overtime.approvedMinutes}</span>
                    </Button>
                  </Tippy>
                )}

              {/* If Pending Request */}
              {(overtime.isLeaderApproved === null || overtime.isManagerApproved === null) && (
                <Tippy placement="left" content="Pending request" className="!text-xs">
                  <Button
                    type="button"
                    className="inline-flex items-center rounded border-y border-r border-slate-300 group-hover:bg-white"
                  >
                    <RefreshCw className="h-4 w-5 rounded-l bg-amber-500 px-1 text-white" />
                    <span className="px-1 text-amber-600">{overtime.requestedMinutes}</span>
                  </Button>
                </Tippy>
              )}

              {/* If Disapproved Request */}
              {overtime.isLeaderApproved !== null &&
                overtime.isManagerApproved !== null &&
                !overtime.isLeaderApproved &&
                !overtime.isManagerApproved && (
                  <Tippy placement="left" content="Disapproved request" className="!text-xs">
                    <Button
                      type="button"
                      className="inline-flex items-center rounded border-y border-r border-slate-300 group-hover:bg-white"
                    >
                      <ThumbsDown className="h-4 w-5 rounded-l bg-rose-500 px-1 text-white" />
                      <span className="px-1 text-rose-600">{overtime.requestedMinutes}</span>
                    </Button>
                  </Tippy>
                )}
            </>
          )}
        </div>
      )
    }
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
      const { handleUserQuery } = useUserQuery()
      const { data: user } = handleUserQuery()

      const handleIsOpenTimeEntryToggle = (id?: string | undefined): void => {
        setIsOpenTimeEntry(!isOpenTimeEntry)
      }

      return (
        <div className="inline-flex items-center divide-x divide-slate-300 rounded border border-slate-300">
          <Tippy placement="left" content="Time Entries" className="!text-xs">
            <Button
              rounded="none"
              className="py-0.5 px-1 text-slate-500"
              onClick={() => handleIsOpenTimeEntryToggle(props.row.id)}
            >
              <Clock className="h-4 w-4" />
              {isOpenTimeEntry ? (
                <InterruptionTimeEntriesModal
                  {...{
                    isOpen: isOpenTimeEntry,
                    timeEntryId: timeEntry.id,
                    user: user?.userById.name as string,
                    closeModal: handleIsOpenTimeEntryToggle
                  }}
                />
              ) : null}
            </Button>
          </Tippy>
          <Tippy placement="left" content="Edit" className="!text-xs">
            <Button
              onClick={() => alert(props.row.id)}
              rounded="none"
              className="py-0.5 px-1 text-slate-500"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </Tippy>
        </div>
      )
    },
    footer: (info) => info.column.id
  })
]
