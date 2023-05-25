import moment from 'moment'
import Link from 'next/link'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { HiFire } from 'react-icons/hi'
import React, { useState } from 'react'
import { Menu } from '@headlessui/react'
import { createColumnHelper } from '@tanstack/react-table'
import { Check, MoreVertical, RefreshCw, ThumbsDown } from 'react-feather'

import useUserQuery from '~/hooks/useUserQuery'
import AddNewOffsetModal from './AddNewOffsetModal'
import FiledOffsetModal from './../FiledOffsetModal'
import Button from '~/components/atoms/Buttons/Button'
import CellHeader from '~/components/atoms/CellHeader'
import AddNewOvertimeModal from '../AddNewOvertimeModal'
import CellTimeValue from '~/components/atoms/CellTimeValue'
import WorkStatusChip from '~/components/atoms/WorkStatusChip'
import { NO_OVERTIME } from '~/utils/constants/overtimeStatus'
import ChangeShiftRequestModal from './ChangeShiftRequestModal'
import { getSpecificTimeEntry } from '~/hooks/useTimesheetQuery'
import { USER_POSITIONS } from '~/utils/constants/userPositions'
import { IEmployeeTimeEntry } from '~/utils/types/timeEntryTypes'
import MenuTransition from '~/components/templates/MenuTransition'
import ViewFiledChangeShiftModal from './ViewFiledChangeShiftModal'
import InterruptionTimeEntriesModal from './../InterruptionTimeEntriesModal'

const columnHelper = createColumnHelper<IEmployeeTimeEntry>()
const EMPTY = 'N/A'

export const columns = [
  columnHelper.accessor((row) => moment(new Date(row.date)).format('MMMM DD, YYYY'), {
    id: 'Date',
    header: () => <CellHeader label="Date" />,
    footer: (info) => info.column.id
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
  columnHelper.accessor('overtime', {
    header: () => <CellHeader label="Overtime(min)" />,
    footer: (info) => info.column.id,
    cell: (props) => {
      const { original: timeEntry } = props.row
      const { overtime, endTime } = timeEntry
      const threshold = moment(endTime, 'HH:mm:ss').add(1, 'hour').format('HH:mm:ss')

      const [isOpen, setIsOpen] = useState<boolean>(false)

      const handleToggle = (): void => setIsOpen(!isOpen)

      const minuteDifference =
        endTime !== '00:00' && timeEntry.timeOut !== null
          ? Math.floor(
              moment
                .duration(
                  moment(timeEntry.timeOut?.createdAt).diff(
                    `${moment(timeEntry.date).format('YYYY-MM-DD')} ${threshold}`
                  )
                )
                .asMinutes()
            )
          : NO_OVERTIME

      return (
        <div className="flex items-center space-x-2">
          {/* If the user has no overtime filed */}
          {overtime === null ? (
            minuteDifference > 0 ? (
              <Button type="button" className="flex items-center" onClick={handleToggle}>
                <>
                  <span>{minuteDifference}</span>
                  <HiFire className="h-4 w-4 text-red-500" />
                </>

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
              <span>{NO_OVERTIME}</span>
            )
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
                      className="inline-flex items-center rounded border-y border-r border-slate-300 bg-white"
                    >
                      <Check className="h-4 w-5 rounded-l bg-green-500 text-white" />
                      <span className="px-1 text-green-600">{overtime.approvedMinutes ?? 0}</span>
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
                ((!overtime.isLeaderApproved && !overtime.isManagerApproved) ||
                  (overtime.isLeaderApproved && !overtime.isManagerApproved)) && (
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
  columnHelper.display({
    id: 'id',
    header: () => <span className="font-normal text-slate-500">Actions</span>,
    cell: (props) => {
      const { original: timeEntry } = props.row
      const [isOpenTimeEntry, setIsOpenTimeEntry] = useState<boolean>(false)
      const [isOpenNewOffset, setIsOpenNewOffset] = useState<boolean>(false)
      const [isOpenChangeShiftRequest, setIsOpenChangeShiftRequest] = useState<boolean>(false)
      const [isOpenFiledOffset, setIsOpenFiledOffset] = useState<boolean>(false)
      const [isOpenViewFiledOffset, setIsOpenViewFiledOffset] = useState<boolean>(false)

      // CURRENT USER QUERY HOOKS
      const { handleUserQuery } = useUserQuery()
      const { data: user } = handleUserQuery()

      const handleIsOpenTimeEntryToggle = (id?: string | undefined): void =>
        setIsOpenTimeEntry(!isOpenTimeEntry)

      const handleIsOpenNewOffsetToggle = (): void => {
        if (
          timeEntry.eslChangeShift === null ||
          timeEntry?.eslChangeShift?.isLeaderApproved === false
        ) {
          setIsOpenNewOffset(!isOpenNewOffset)
        } else {
          handleIsOpenViewFiledOffset()
        }
      }

      const handleIsOpenViewFiledOffset = (): void =>
        setIsOpenViewFiledOffset(!isOpenViewFiledOffset)

      const handleIsOpenChangeShiftRequestToggle = (): void => {
        if (timeEntry.changeShift === null) {
          setIsOpenChangeShiftRequest(!isOpenChangeShiftRequest)
        } else {
          handleIsOpenViewFiledOffset()
        }
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
                  timeEntryId: timeEntry.id,
                  user: user?.userById.name as string,
                  closeModal: handleIsOpenTimeEntryToggle
                }}
              />
            ) : null}

            {/* This is for ESL Work Interruption */}
            {isOpenNewOffset ? (
              <AddNewOffsetModal
                {...{
                  isOpen: isOpenNewOffset,
                  closeModal: handleIsOpenNewOffsetToggle,
                  row: props.row.original
                }}
              />
            ) : null}

            {/* This is for ESL Work Interruption */}
            {isOpenChangeShiftRequest ? (
              <ChangeShiftRequestModal
                {...{
                  isOpen: isOpenChangeShiftRequest,
                  closeModal: handleIsOpenChangeShiftRequestToggle,
                  timeEntry: props.row.original
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
                  isMyDTRPage: true,
                  query: {
                    isLoading: false,
                    isError: false
                  }
                }}
              />
            ) : null}

            {/* This will View the Filed Change Shift Modal */}
            {isOpenViewFiledOffset ? (
              <ViewFiledChangeShiftModal
                {...{
                  isOpen: isOpenViewFiledOffset,
                  closeModal: handleIsOpenViewFiledOffset,
                  timeEntry
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
                {user?.userById.position.id === USER_POSITIONS.ESL_TEACHER && (
                  <>
                    <Menu.Item>
                      <button className={menuItemButton} onClick={handleIsOpenNewOffsetToggle}>
                        <span>ESL Change Shift</span>
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <button className={menuItemButton} onClick={handleIsOpenFiledOffsetToggle}>
                        <span>Filed Offset</span>
                      </button>
                    </Menu.Item>
                  </>
                )}
                {user?.userById.position.id !== USER_POSITIONS.ESL_TEACHER && (
                  <Menu.Item>
                    <button
                      className={menuItemButton}
                      onClick={handleIsOpenChangeShiftRequestToggle}
                    >
                      <span>Change Shift Request</span>
                    </button>
                  </Menu.Item>
                )}
              </Menu.Items>
            </MenuTransition>
          </Menu>
        </div>
      )
    },
    footer: (info) => info.column.id
  })
]
