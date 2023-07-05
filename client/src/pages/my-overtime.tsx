import moment from 'moment'
import { NextPage } from 'next'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { PulseLoader } from 'react-spinners'
import React, { useEffect, useState } from 'react'

import useUserQuery from '~/hooks/useUserQuery'
import Layout from '~/components/templates/Layout'
import { IMyOvertimeTable } from '~/utils/interfaces'
import { Position } from '~/utils/constants/position'
import { getOvertimeQuery } from '~/hooks/useOvertimeQuery'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { getApprovalStatus } from '~/utils/myOvertimeHelpers'
import MyOvertimeTable from '~/components/molecules/MyOvertimeTable'
import { columns } from '~/components/molecules/MyOvertimeTable/columns'
import GlobalSearchFilter from '~/components/molecules/GlobalSearchFilter'
import AddNewBulkOvertimeModal from '~/components/molecules/AddNewBulkOvertimeModal'
import YearlyFilterDropdown from '~/components/molecules/MyOvertimeTable/YearlyFilterDropdown'
import { Plus } from 'react-feather'

const MyOverTime: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { status, year } = router.query
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [filteredData, setFilteredData] = useState<IMyOvertimeTable[]>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  // From User Query Hooks
  const { handleUserQuery } = useUserQuery()
  const { data: user } = handleUserQuery()

  // From Overtime Query Hooks
  const { data: overtime } = getOvertimeQuery(user?.userById?.id as number)
  const handleToggle = (): void => setIsOpen(!isOpen)

  useEffect(() => {
    if (router.isReady && year === undefined && status === undefined) {
      void router.replace({
        pathname: router.pathname,
        query: {
          status: null,
          year: new Date().getFullYear().toString()
        }
      })
    }
  }, [router])

  // Get the Initial Data and Passed through `filteredData` State
  const getOvertimeMappedData = (): IMyOvertimeTable[] | undefined => {
    return overtime?.overtime.map((item) => {
      const [project] = item.projects
      const mapped: IMyOvertimeTable = {
        id: item.id,
        projects: [
          {
            project_name: {
              value: project?.project.id as unknown as string,
              label: project?.project.name
            },
            project_leader: {
              value: project?.projectLeader.id as unknown as string,
              label: project?.projectLeader.name
            }
          },
          {
            project_name: {
              value: item?.otherProject ?? '',
              label: item?.otherProject ?? ''
            },
            project_leader: {
              value: 'others',
              label: 'others'
            }
          }
        ],
        date: moment(new Date(item.overtimeDate)).format('MMMM DD, YYYY'),
        requestedHours: item?.requestedMinutes ?? 0,
        approvedMinutes: item?.approvedMinutes,
        supervisor: project?.projectLeader.name,
        dateFiled: moment(new Date(item.dateFiled)).format('MMMM DD, YYYY'),
        remarks: item.remarks,
        status: getApprovalStatus(item?.isLeaderApproved, item?.isManagerApproved) as string
      }
      return mapped
    })
  }

  // For Filtering based on year and status
  useEffect(() => {
    const mappedData = getOvertimeMappedData()

    const filteredOvertime = mappedData?.filter((item) => {
      if (year !== undefined || status !== undefined) {
        const yearOvertime = new Date(item.date).getFullYear().toString()
        if (status === '') return yearOvertime === year
        return yearOvertime === year && item.status === status
      }
      return item
    })

    setFilteredData(filteredOvertime)
  }, [router.query])

  // Fetched Once and siplay all data
  useEffect(() => {
    if (overtime?.overtime !== undefined) {
      const mappedData = getOvertimeMappedData()
      setFilteredData(mappedData)
    }
  }, [overtime])

  const isTeamLeader = user?.userById.position.id === Position.WEB_DEVELOPER_TEAM_LEADER

  return (
    <Layout metaTitle="My Overtime">
      <section
        className={classNames(
          'default-scrollbar relative h-full min-h-full',
          'overflow-auto text-xs text-slate-800'
        )}
      >
        <header
          className={classNames(
            'sticky left-0 top-0 z-20 px-4 py-2',
            'border-b border-slate-200 bg-slate-100'
          )}
        >
          <div className="flex items-center justify-between">
            <GlobalSearchFilter
              value={globalFilter ?? ''}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder="Search"
            />
            <div className="flex items-center space-x-2">
              <div className={classNames('fixed z-50', isTeamLeader ? 'right-40' : 'right-4')}>
                <YearlyFilterDropdown />
              </div>
              {isTeamLeader && (
                <Button
                  type="button"
                  variant="primary"
                  className="flex items-center space-x-0.5 px-1.5 py-[3px]"
                  onClick={handleToggle}
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:block">File Bulk Overtime</span>
                </Button>
              )}
            </div>
          </div>
          {/* This will Open New Modal for Filing New Leave */}
          <AddNewBulkOvertimeModal
            {...{
              isOpen,
              closeModal: handleToggle
            }}
          />
        </header>
        {filteredData !== undefined ? (
          <MyOvertimeTable
            {...{
              query: {
                data: filteredData,
                error: null
              },
              table: {
                columns,
                globalFilter,
                setGlobalFilter
              }
            }}
          />
        ) : (
          <div className="flex min-h-[50vh] items-center justify-center">
            <PulseLoader color="#ffb40b" size={10} />
          </div>
        )}
      </section>
    </Layout>
  )
}

export default MyOverTime
