import { Clock } from 'react-feather'
import React, { FC, useEffect, useState } from 'react'
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
import GlobalSearchFilter from './../GlobalSearchFilter'
import Button from '~/components/atoms/Buttons/ButtonAction'
import useInterruptionType from '~/hooks/useInterruptionType'
import ModalTemplate from '~/components/templates/ModalTemplate'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'

type Props = {
  isOpen: boolean
  timeEntryId: number
  user: string
  closeModal: () => void
}

const InterruptionTimeEntriesModal: FC<Props> = ({
  isOpen,
  closeModal,
  user,
  timeEntryId
}): JSX.Element => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const { handleGetAllWorkInterruptionsQuery } = useInterruptionType()
  const {
    data: interruptions,
    refetch,
    isLoading,
    isError
  } = handleGetAllWorkInterruptionsQuery({ timeEntryId })

  useEffect(() => {
    void refetch()
  }, [timeEntryId])

  const table = useReactTable({
    data: interruptions?.interruptionsByTimeEntryId ?? [],
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
          title: `${user}'s Interruption Time Entries`,
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
          table,
          query: {
            isLoading,
            isError
          }
        }}
      />
      {/* Custom Modal Footer Style */}
      <ModalFooter>
        <Button onClick={closeModal} variant="secondary" className="px-5 py-1 text-sm">
          Close
        </Button>
      </ModalFooter>
    </ModalTemplate>
  )
}

InterruptionTimeEntriesModal.defaultProps = {}

export default InterruptionTimeEntriesModal
