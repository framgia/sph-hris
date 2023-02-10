import moment from 'moment'
import Link from 'next/link'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import React, { useState } from 'react'
import { Clock, Edit } from 'react-feather'
import { createColumnHelper } from '@tanstack/react-table'

import { getUserProfileLink } from '~/hooks/useTimesheetQuery'

import Chip from '~/components/atoms/Chip'
import Avatar from '~/components/atoms/Avatar'
import CellHeader from '~/components/atoms/CellHeader'
import Button from '~/components/atoms/Buttons/Button'
import { ITimeEntry } from '~/utils/types/timeEntryTypes'
import InterruptionTimeEntriesModal from './../InterruptionTimeEntriesModal'
import EditTimeEntriesModal from '../EditTimeEntryModal'

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
    cell: (props) => (
      <>
        {props.row.original.timeIn?.remarks !== undefined &&
        props.row.original.timeIn?.remarks !== '' ? (
          <Tippy
            content={moment(props.row.original.date).format('MMM D, YYYY')}
            placement="left"
            className="!text-xs"
          >
            <Link
              href={`dtr-management/?time_in=${props.row.original.timeIn?.id}`}
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
  columnHelper.accessor('timeOut.timeHour', {
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
              href={`dtr-management/?time_out=${props.row.original.timeOut?.id}`}
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
                    user: props.row.original.user.name,
                    timeEntryId: props.row.original.id,
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
                    user: props.row.original.user,
                    timeEntry: {
                      id: props.row.original.id,
                      timeIn: props.row.original.timeIn?.timeHour,
                      timeOut: props.row.original.timeOut?.timeHour
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
