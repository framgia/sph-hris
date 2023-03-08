import moment from 'moment'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { Eye } from 'react-feather'
import React, { Fragment, useState } from 'react'
import { AiOutlineCaretDown } from 'react-icons/ai'
import { Listbox, Transition } from '@headlessui/react'
import { createColumnHelper } from '@tanstack/react-table'

import Chip from './Chip'
import useProject from '~/hooks/useProject'
import ShowRemarksModal from './ShowRemarksModal'
import Button from '~/components/atoms/Buttons/Button'
import CellHeader from '~/components/atoms/CellHeader'
import { IMyOvertime } from '~/utils/types/overtimeTypes'

const columnHelper = createColumnHelper<IMyOvertime>()

export const columns = [
  columnHelper.accessor('multiProjects', {
    header: () => <CellHeader label="Project" />,
    footer: (info) => info.column.id,
    cell: ({ row }) => {
      const { handleProjectQuery } = useProject()
      const { data: projects } = handleProjectQuery()

      const multiProjectNames = row.original.multiProjects.map((mp) => {
        const projectdata = projects?.projects.find((project) => project.id === mp.projectId)
        return projectdata
      })

      return (
        <Listbox>
          <div className="relative mt-1">
            <Listbox.Button
              className={classNames(
                'flex items-center space-x-2',
                'text-xs outline-none focus:scale-95'
              )}
            >
              <span className="block truncate">{multiProjectNames[0]?.name}</span>
              <AiOutlineCaretDown className="h-3 w-3 text-gray-400" aria-hidden="true" />
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={classNames(
                  'absolute z-50 mt-1 max-h-40 w-full overflow-auto rounded-md bg-white',
                  'py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                )}
              >
                {multiProjectNames.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        'relative cursor-default select-none py-1.5 pl-5 pr-4',
                        active ? 'bg-amber-100 text-amber-900' : 'text-slate-800'
                      )
                    }
                    value={option?.id}
                  >
                    <span className="block truncate">{option?.name}</span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      )
    }
  }),
  columnHelper.display({
    id: 'empty1',
    header: () => '',
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('overtimeDate', {
    header: () => <CellHeader label="Date" />,
    footer: (info) => info.column.id,
    cell: ({ row: { original } }) => (
      <span>{moment(new Date(original.overtimeDate)).format('MMMM DD, YYYY')}</span>
    )
  }),
  // TODO: No Need to remove this for other reference purposes
  // columnHelper.accessor('overtimeIn', {
  //   header: () => <CellHeader label="Overtime in" />,
  //   footer: (info) => info.column.id
  // }),
  // columnHelper.accessor('overtimeOut', {
  //   header: () => <CellHeader label="Overtime Out" />,
  //   footer: (info) => info.column.id
  // }),
  columnHelper.accessor('requestedMinutes', {
    header: () => <CellHeader label="Requested Hours" />,
    footer: (info) => info.column.id,
    cell: ({ row: { original } }) => {
      const decimalFormatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3
      })

      const formattedNumber = decimalFormatter.format(original.requestedMinutes / 60)
      const parsedNumber = parseFloat(formattedNumber)

      return <span>{parsedNumber}</span>
    }
  }),
  columnHelper.accessor('approvedMinutes', {
    header: () => <CellHeader label="Approved Minutes" />,
    footer: (info) => info.column.id,
    cell: ({ row: { original } }) => (
      <div>
        {original.approvedMinutes ?? (
          <span className="italic text-slate-400">(pending approval)</span>
        )}
      </div>
    )
  }),
  columnHelper.accessor('isLeaderApproved', {
    header: () => <CellHeader label="Supervisor" />,
    footer: (info) => info.column.id,
    cell: ({ row }) => {
      const { handleProjectQuery } = useProject()
      const { data: projects } = handleProjectQuery()

      const projectLeaders = row.original.multiProjects.map((mp) => {
        const projectdata = projects?.projects.find((project) => project.id === mp.projectId)
        return projectdata
      })

      return (
        <Listbox>
          <div className="relative mt-1">
            <Listbox.Button
              className={classNames(
                'flex items-center space-x-2',
                'text-xs outline-none focus:scale-95'
              )}
            >
              <span className="block truncate">{projectLeaders[0]?.projectLeader.name}</span>
              <AiOutlineCaretDown className="h-3 w-3 text-gray-400" aria-hidden="true" />
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={classNames(
                  'absolute z-50 mt-1 max-h-40 w-full overflow-auto rounded-md bg-white',
                  'py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                )}
              >
                {projectLeaders.map((option, index) => (
                  <div key={index}>
                    {projectLeaders[0]?.projectLeader.name !== option?.projectLeader.name ? (
                      <Listbox.Option
                        className={({ active }) =>
                          classNames(
                            'relative cursor-default select-none py-1.5 pl-5 pr-4',
                            active ? 'bg-amber-100 text-amber-900' : 'text-slate-800'
                          )
                        }
                        value={option?.id}
                      >
                        <span className="block truncate">{option?.projectLeader.name}</span>
                      </Listbox.Option>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      )
    }
  }),
  columnHelper.accessor('createdAt', {
    header: () => <CellHeader label="Date Filed" />,
    footer: (info) => info.column.id,
    cell: ({ row: { original } }) => (
      <span>{moment(new Date(original.createdAt)).format('MMMM DD, YYYY')}</span>
    )
  }),
  columnHelper.accessor('isManagerApproved', {
    header: () => <CellHeader label="Status" />,
    footer: (info) => info.column.id,
    cell: ({ row: { original } }) => {
      type ApprovalStatus = 'pending' | 'approved' | 'disapproved'

      const getApprovalStatus = (
        isLeaderApprove: boolean | null,
        isManagerApproved: boolean | null
      ): ApprovalStatus => {
        switch (true) {
          case isLeaderApprove === null || isManagerApproved === null:
            return 'pending'
          case isLeaderApprove === true && isManagerApproved === true:
            return 'approved'
          default:
            return 'disapproved'
        }
      }

      return (
        <Chip label={getApprovalStatus(original.isLeaderApproved, original.isManagerApproved)} />
      )
    }
  }),
  columnHelper.display({
    id: 'empty2',
    header: () => '',
    footer: (info) => info.column.id
  }),
  columnHelper.display({
    id: 'id',
    header: () => <span className="font-normal text-slate-500">Actions</span>,
    cell: (props) => {
      const [isOpen, setIsOpen] = useState<boolean>(false)

      const handleToggle = (): void => setIsOpen(!isOpen)

      return (
        <div className="inline-flex rounded border border-slate-300">
          <Tippy placement="left" content="View Remarks" className="!text-xs">
            <Button onClick={handleToggle} rounded="none" className="py-0.5 px-1 text-slate-500">
              <Eye className="h-4 w-4" />
            </Button>
          </Tippy>

          {/* This will show the remarks modal */}
          <ShowRemarksModal
            {...{
              isOpen,
              closeModal: () => handleToggle(),
              row: props.row.original
            }}
          />
        </div>
      )
    },
    footer: (info) => info.column.id
  })
]
