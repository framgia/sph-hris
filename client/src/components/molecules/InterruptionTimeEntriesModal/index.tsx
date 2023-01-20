import classNames from 'classnames'
import { Clock } from 'react-feather'
import React, { FC, useState } from 'react'
import {
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'
import { fuzzyFilter } from '~/utils/fuzzyFilter'

import { columns } from './columns'
import InterruptionTimeEntriesTable from './Table'
import Button from '~/components/atoms/Buttons/Button'
import GlobalSearchFilter from './../GlobalSearchFilter'
import ModalTemplate from '~/components/templates/ModalTemplate'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import { interruptions } from '~/utils/constants/interruptionDummyTimeEntries'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const InterruptionTimeEntriesModal: FC<Props> = ({ isOpen, closeModal }): JSX.Element => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState<string>('')

  const table = useReactTable({
    data: interruptions,
    columns,
    // Options
    state: {
      sorting,
      globalFilter
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <ModalTemplate
      {...{
        isOpen,
        closeModal
      }}
    >
      {/* Custom Modal Header */}
      <ModalHeader
        {...{
          title: 'Joshua Galit’s Interruption Time Entries',
          Icon: Clock,
          closeModal
        }}
      />
      <GlobalSearchFilter
        value={globalFilter ?? ''}
        onChange={(value) => setGlobalFilter(String(value))}
        placeholder="Search"
        className="px-2 py-1"
      />
      {/* Actual Data Table for Interruption Time Entries */}
      <InterruptionTimeEntriesTable
        {...{
          table
        }}
      />
      {/* Custom Modal Footer Style */}
      <ModalFooter>
        <Button
          onClick={closeModal}
          className={classNames(
            'border border-slate-300 px-5 py-1 text-sm hover:border-slate-500 hover:bg-white',
            'text-slate-600 transition duration-150 ease-in-out hover:text-slate-800'
          )}
        >
          Close
        </Button>
      </ModalFooter>
    </ModalTemplate>
  )
}

InterruptionTimeEntriesModal.defaultProps = {}

export default InterruptionTimeEntriesModal
