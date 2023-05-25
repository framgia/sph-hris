import moment from 'moment'
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
import { PulseLoader } from 'react-spinners'
import { fuzzyFilter } from '~/utils/fuzzyFilter'

import { columns } from './columns'
import FiledOffsetTable from './Table'
import MobileDisclose from './MobileDisclose'
import FileOffsetModal from './FileOffsetModal'
import useFileOffset from '~/hooks/useFileOffset'
import GlobalSearchFilter from '../GlobalSearchFilter'
import { IFiledOffsetTable } from '~/utils/interfaces'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { getApprovalStatus } from '~/utils/myDailyTimeHelpers'
import ModalTemplate from '~/components/templates/ModalTemplate'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import { IEmployeeTimeEntry, ITimeEntry } from '~/utils/types/timeEntryTypes'

type Props = {
  isOpen: boolean
  closeModal: () => void
  row: ITimeEntry | IEmployeeTimeEntry
  query: {
    isLoading: boolean
    isError: boolean
  }
  isMyDTRPage?: boolean
}

const FiledOffsetModal: FC<Props> = (props): JSX.Element => {
  const {
    isOpen,
    closeModal,
    query: { isLoading, isError },
    row,
    isMyDTRPage
  } = props

  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [isOpenFileOffset, setIsOpenFileOffset] = useState<boolean>(false)
  const [offsetDataTable, setOffsetDataTable] = useState<IFiledOffsetTable[]>()

  // FILED OFFSET QUERY HOOKS
  const { getESLFiledOffsetsQuery } = useFileOffset()
  const { data: filedOffsets } = getESLFiledOffsetsQuery(row.id)

  const handleIsOpenFileOffsetToggle = (): void => setIsOpenFileOffset(!isOpenFileOffset)

  // Get FiledOffsets Mapped Data
  const getFiledOffsetsMappedData = (): IFiledOffsetTable[] | undefined => {
    return filedOffsets?.eslOffsetsByTimeEntry.map((item) => {
      const mapped: IFiledOffsetTable = {
        id: item.id,
        title: item.title,
        timeIn: moment(item.timeIn, 'HH:mm').format('hh:mm A'),
        timeOut: moment(item.timeOut, 'HH:mm').format('hh:mm A'),
        teamLeader: item.teamLeader.name,
        status: getApprovalStatus(item.isLeaderApproved),
        remarks: item.description,
        createdAt: item.createdAt,
        updateAt: item.updatedAt,
        isUsed: item.isUsed
      }
      return mapped
    })
  }

  // Fetched Once and siplay all data
  useEffect(() => {
    if (filedOffsets?.eslOffsetsByTimeEntry !== undefined) {
      const mappedOffsets = getFiledOffsetsMappedData()
      setOffsetDataTable(mappedOffsets)
    }
  }, [filedOffsets])

  const table = useReactTable({
    data: offsetDataTable ?? [],
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
      className="w-full max-w-[720px]"
    >
      {/* Custom Modal Header */}
      <ModalHeader
        {...{
          title:
            isMyDTRPage === true
              ? 'Filed Offsets'
              : `${(row as ITimeEntry).user?.name}'s Filed Offsets`,
          Icon: Clock,
          closeModal
        }}
      />
      <div className="flex items-center space-x-2 px-4 py-1">
        <GlobalSearchFilter
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Search"
          className="w-full"
        />
        {isMyDTRPage === true ? (
          <Button
            variant="primary"
            className="shrink-0 px-4 py-1 text-xs"
            onClick={handleIsOpenFileOffsetToggle}
          >
            File Request
          </Button>
        ) : null}
      </div>
      {isOpenFileOffset ? (
        <FileOffsetModal
          {...{
            isOpen: isOpenFileOffset,
            closeModal: handleIsOpenFileOffsetToggle,
            tableRow: row
          }}
        />
      ) : null}
      {/* Actual Data Table for Interruption Time Entries */}
      <div className="default-scrollbar overflow-auto">
        <div className="block md:hidden">
          <MobileDisclose
            {...{
              table,
              isLoading,
              error: null
            }}
          />
        </div>
        {/* Show on medium size and beyond */}
        <div className="mx-auto hidden w-full max-w-fit md:block">
          {offsetDataTable !== undefined ? (
            <FiledOffsetTable
              {...{
                table,
                query: {
                  isLoading,
                  isError
                }
              }}
            />
          ) : (
            <div className="flex min-h-[20vh] items-center justify-center">
              <PulseLoader color="#ffb40b" size={10} />
            </div>
          )}
        </div>
      </div>
      {/* Custom Modal Footer Style */}
      <ModalFooter>
        <Button onClick={closeModal} variant="secondary" className="px-5 py-1 text-sm">
          Close
        </Button>
      </ModalFooter>
    </ModalTemplate>
  )
}

FiledOffsetModal.defaultProps = {
  isMyDTRPage: false
}

export default FiledOffsetModal
