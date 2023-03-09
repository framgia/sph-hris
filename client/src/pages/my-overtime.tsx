import moment from 'moment'
import { NextPage } from 'next'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import useUserQuery from '~/hooks/useUserQuery'
import Layout from '~/components/templates/Layout'
import { IMyOvertimeTable } from '~/utils/interfaces'
import { getOvertimeQuery } from '~/hooks/useOvertimeQuery'
import BarsLoadingIcon from '~/utils/icons/BarsLoadingIcon'
import { getApprovalStatus } from '~/utils/myOvertimeHelpers'
import MyOvertimeTable from '~/components/molecules/MyOvertimeTable'
import { columns } from '~/components/molecules/MyOvertimeTable/columns'
import GlobalSearchFilter from '~/components/molecules/GlobalSearchFilter'
import YearlyFilterDropdown from '~/components/molecules/MyOvertimeTable/YearlyFilterDropdown'

const MyOverTime: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { status, year } = router.query
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [filteredData, setFilteredData] = useState<IMyOvertimeTable[]>()

  // From User Query Hooks
  const { handleUserQuery } = useUserQuery()
  const { data: user } = handleUserQuery()

  // From Overtime Query Hooks
  const { data: overtime } = getOvertimeQuery(user?.userById?.id as number)

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
            'sticky left-0 top-0 z-20 flex items-center justify-between',
            'border-b border-slate-200 bg-slate-100 px-4 py-2'
          )}
        >
          <GlobalSearchFilter
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search"
          />
          <YearlyFilterDropdown />
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
            <BarsLoadingIcon className="h-7 w-7 fill-current text-amber-500" />
          </div>
        )}
      </section>
    </Layout>
  )
}

export default MyOverTime
