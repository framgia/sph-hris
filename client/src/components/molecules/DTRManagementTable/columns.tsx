import Link from 'next/link'
import classNames from 'classnames'
import React, { useState } from 'react'
import { Menu } from '@headlessui/react'
import { MoreVertical } from 'react-feather'
import { createColumnHelper } from '@tanstack/react-table'

import Avatar from '~/components/atoms/Avatar'
import FiledOffsetModal from './../FiledOffsetModal'
import CellHeader from '~/components/atoms/CellHeader'
import handleImageError from '~/utils/handleImageError'
import EditTimeEntriesModal from '../EditTimeEntryModal'
import { ITimeEntry } from '~/utils/types/timeEntryTypes'
import CellTimeValue from '~/components/atoms/CellTimeValue'
import WorkStatusChip from '~/components/atoms/WorkStatusChip'
import { getSpecificTimeEntry } from '~/hooks/useTimesheetQuery'
import MenuTransition from '~/components/templates/MenuTransition'
import InterruptionTimeEntriesModal from './../InterruptionTimeEntriesModal'

const columnHelper = createColumnHelper<ITimeEntry>()
const EMPTY = 'N/A'

export const columns = [
  columnHelper.accessor('user.name', {
    header: () => <CellHeader label="Name" />,
    footer: (info) => info.column.id,
    cell: (props) => {
      const { avatarLink } = props.row.original.user

      return (
        <div className="flex items-center space-x-2">
          <Avatar
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              handleImageError(e, '/images/default.png')
            }
            src={`${avatarLink}`}
            size="base"
            rounded="full"
          />
          <div className="flex flex-col items-start">
            <h1 className="font-semibold">{props.row.original.user.name}</h1>
            <small className="text-slate-500">{props.row.original.user.position.name}</small>
          </div>
        </div>
      )
    }
  }),
  columnHelper.accessor('status', {
    header: () => <CellHeader label="Status" />,
    footer: (info) => info.column.id,
    cell: (props) => <WorkStatusChip label={props.getValue()} />
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
  columnHelper.accessor((row) => row.timeOut?.timeHour, {
    id: 'Time Out',
    header: () => <CellHeader label="Time Out" />,
    footer: (info) => info.column.id,
    cell: (props) => {
      const { original: timeEntry } = props.row

      return (
        <>
          {timeEntry.timeOut?.remarks !== undefined && timeEntry.timeOut?.remarks !== '' ? (
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
    footer: (info) => info.column.id,
    cell: (props) => <CellTimeValue initialMinutes={props.row.original.late} />
  }),
  columnHelper.accessor('undertime', {
    header: () => <CellHeader label="Undertime(min)" />,
    footer: (info) => info.column.id,
    cell: (props) => <CellTimeValue initialMinutes={props.row.original.undertime} />
  }),
  columnHelper.display({
    id: 'approvedMinutes',
    header: () => <CellHeader label="Overtime(min)" />,
    footer: (info) => info.column.id,
    cell: (props) => (
      <CellTimeValue initialMinutes={props.row.original.overtime?.approvedMinutes as number} />
    )
  }),
  columnHelper.display({
    id: 'id',
    header: () => <span className="font-normal text-slate-500">Actions</span>,
    cell: (props) => {
      const { original: timeEntry } = props.row
      const [isOpenTimeEntry, setIsOpenTimeEntry] = useState<boolean>(false)
      const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
      const [isOpenFiledOffset, setIsOpenFiledOffset] = useState<boolean>(false)

      const handleIsOpenTimeEntryToggle = (id?: string | undefined): void => {
        setIsOpenTimeEntry(!isOpenTimeEntry)
      }

      const handleIsOpenEditModalToggle = (): void => {
        setIsOpenEditModal(!isOpenEditModal)
      }

      const handleIsOpenFiledOffsetToggle = (): void => setIsOpenFiledOffset(!isOpenFiledOffset)

      const menuItemButton = 'px-3 py-2 text-left text-xs hover:text-slate-700 text-slate-500'

      return (
        <div
          className={classNames(
            'inline-flex divide-x divide-slate-300 rounded border',
            'border-transparent group-hover:border-slate-300'
          )}
        >
          <Menu as="div" className="relative w-full">
            {/* This is for Work Interruption Modal */}
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

            {/* This is for Edit Time Entries modal */}
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

            {/* This is for Filed Offset Modal */}
            {isOpenFiledOffset ? (
              <FiledOffsetModal
                {...{
                  isOpen: isOpenFiledOffset,
                  closeModal: handleIsOpenFiledOffsetToggle,
                  row: props.row.original,
                  query: {
                    isLoading: false,
                    isError: false
                  }
                }}
              />
            ) : null}
            <Menu.Button className="p-0.5 text-slate-500 outline-none">
              <MoreVertical className="h-4" />
            </Menu.Button>
            <MenuTransition>
              <Menu.Items
                className={classNames(
                  'absolute top-7 right-0 z-50 flex w-44 flex-col divide-y divide-slate-200 overflow-hidden rounded-md',
                  'bg-white py-0.5 shadow-xl shadow-slate-200 ring-1 ring-black ring-opacity-5 focus:outline-none'
                )}
              >
                <Menu.Item>
                  <button
                    className={menuItemButton}
                    onClick={() => handleIsOpenTimeEntryToggle(props.row.id)}
                  >
                    <span>Work Interruption</span>
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button className={menuItemButton} onClick={handleIsOpenEditModalToggle}>
                    <span>Edit DTR</span>
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button className={menuItemButton} onClick={handleIsOpenFiledOffsetToggle}>
                    <span>Filed Offset</span>
                  </button>
                </Menu.Item>
              </Menu.Items>
            </MenuTransition>
          </Menu>
        </div>
      )
    },
    footer: (info) => info.column.id
  })
]
