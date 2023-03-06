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
    cell: (props) => (
      <>
        {(props.row.original.timeIn?.remarks !== undefined &&
          props.row.original.timeIn?.remarks !== '') ||
        getSpecificTimeEntry(Number(props.row.original.timeIn?.id)).data?.timeById?.media[0]
          ?.fileName !== undefined ? (
          <Tippy
            content={moment(props.row.original.date).format('MMM D, YYYY')}
            placement="left"
            className="!text-xs"
          >
            <Link
              href={`my-daily-time-record/?time_in=${props.row.original.timeIn?.id}`}
              className="relative flex cursor-pointer active:scale-95"
            >
              {/* Actual Time In Data */}
              <span>{props.row.original.timeIn?.timeHour ?? EMPTY}</span>
              {/* Status */}
              {props.row.original.startTime > props.row.original.timeIn?.timeHour ? (
                <span
                  className={classNames('ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500')}
                />
              ) : (
                <>
                  {!Number.isNaN(props.row.original.timeIn?.id) && (
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
            <span>{props.row.original.timeIn?.timeHour ?? EMPTY}</span>
            {/* Status */}
            {props.row.original.timeIn?.timeHour !== undefined &&
            props.row.original.timeIn?.timeHour !== ''
              ? !(props.row.original.startTime > props.row.original.timeIn?.timeHour) && (
                  <span
                    className={classNames('ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500')}
                  />
                )
              : ''}
          </div>
        )}
      </>
    )
  }),
  columnHelper.accessor('timeOut', {
    header: () => <CellHeader label="Time Out" />,
    footer: (info) => info.column.id,
    cell: (props) => (
      <>
        {props.row.original.timeOut?.remarks !== undefined &&
        props.row.original.timeOut?.remarks !== '' ? (
          <Tippy
            content={moment(props.row.original.date).format('MMM D, YYYY')}
            placement="left"
            className="!text-xs"
          >
            <Link
              href={`my-daily-time-record/?time_out=${props.row.original.timeOut?.id}`}
              className="relative flex cursor-pointer active:scale-95"
            >
              {/* Actual Time In Data */}
              <span>{props.row.original.timeOut?.timeHour ?? EMPTY}</span>
              {/* Status */}
              {!Number.isNaN(props.row.original.timeOut?.id) && (
                <span
                  className={classNames('ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500')}
                />
              )}
            </Link>
          </Tippy>
        ) : (
          <span>{props.row.original.timeOut?.timeHour ?? EMPTY}</span>
        )}
      </>
    )
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
      const [isOpen, setIsOpen] = useState<boolean>(false)

      const handleToggle = (): void => setIsOpen(!isOpen)

      const minuteDifference = moment
        .duration(
          moment(props.row.original.timeOut?.timeHour, 'HH:mm').diff(moment('19:30', 'HH:mm'))
        )
        .asMinutes()

      return (
        <div className="flex items-center space-x-2">
          {/* If the user has an overtime */}
          {props.row.original.overtime === null ? (
            <Button type="button" className="flex items-center" onClick={handleToggle}>
              {minuteDifference > 0 ? (
                <>
                  <span>{minuteDifference}</span>
                  <HiFire className="h-4 w-4 text-red-500" />
                </>
              ) : (
                <span>0</span>
              )}

              {/* File New Overtime Modal */}
              {isOpen ? (
                <AddNewOvertimeModal
                  {...{
                    isOpen,
                    closeModal: handleToggle,
                    timeEntry: props.row.original,
                    initialMinutes: minuteDifference
                  }}
                />
              ) : null}
            </Button>
          ) : (
            <>
              {/* If Approved Request */}
              {props.row.original.overtime.isLeaderApproved != null &&
                props.row.original.overtime.isManagerApproved != null &&
                props.row.original.overtime.isLeaderApproved &&
                props.row.original.overtime.isManagerApproved && (
                  <Tippy placement="left" content="Approved request" className="!text-xs">
                    <Button
                      type="button"
                      className="inline-flex items-center rounded border-y border-r border-slate-300 group-hover:bg-white"
                    >
                      <Check className="h-4 w-5 rounded-l bg-green-500 text-white" />
                      <span className="px-1 text-green-600">
                        {props.row.original.overtime.approvedMinutes}
                      </span>
                    </Button>
                  </Tippy>
                )}

              {/* If Pending Request */}
              {(props.row.original.overtime.isLeaderApproved === null ||
                props.row.original.overtime.isManagerApproved === null) && (
                <Tippy placement="left" content="Pending request" className="!text-xs">
                  <Button
                    type="button"
                    className="inline-flex items-center rounded border-y border-r border-slate-300 group-hover:bg-white"
                  >
                    <RefreshCw className="h-4 w-5 rounded-l bg-amber-500 px-1 text-white" />
                    <span className="px-1 text-amber-600">
                      {props.row.original.overtime.requestedMinutes}
                    </span>
                  </Button>
                </Tippy>
              )}

              {/* If Disapproved Request */}
              {props.row.original.overtime.isLeaderApproved !== null &&
                props.row.original.overtime.isManagerApproved !== null &&
                !props.row.original.overtime.isLeaderApproved &&
                !props.row.original.overtime.isManagerApproved && (
                  <Tippy placement="left" content="Disapproved request" className="!text-xs">
                    <Button
                      type="button"
                      className="inline-flex items-center rounded border-y border-r border-slate-300 group-hover:bg-white"
                    >
                      <ThumbsDown className="h-4 w-5 rounded-l bg-rose-500 px-1 text-white" />
                      <span className="px-1 text-rose-600">
                        {props.row.original.overtime.requestedMinutes}
                      </span>
                    </Button>
                  </Tippy>
                )}

              {/* Just a normal number */}
              {/* <span>0</span> */}
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
                    timeEntryId: props.row.original.id,
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
