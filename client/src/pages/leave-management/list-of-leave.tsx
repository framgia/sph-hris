import moment from 'moment'
import { NextPage } from 'next'
import classNames from 'classnames'
import { PulseLoader } from 'react-spinners'
import React, { useState, useEffect } from 'react'

import NotFound from './../404'
import useUserQuery from '~/hooks/useUserQuery'
import { Roles } from '~/utils/constants/roles'
import { getLeave } from '~/hooks/useLeaveQuery'
import { IListOfLeave } from '~/utils/interfaces'
import FadeInOut from '~/components/templates/FadeInOut'
import ListOfLeaveTable from '~/components/molecules/ListOfLeaveTable'
import { columns } from '~/components/molecules/ListOfLeaveTable/columns'
import GlobalSearchFilter from '~/components/molecules/GlobalSearchFilter'
import LeaveManagementLayout from '~/components/templates/LeaveManagementLayout'

const ListOfLeave: NextPage = (): JSX.Element => {
  const { handleUserQuery } = useUserQuery()
  const { data: currentUser } = handleUserQuery()

  const [globalFilter, setGlobalFilter] = useState<string>('')
  const { data } = getLeave()
  const [mappedLeave, setMappedLeave] = useState<IListOfLeave[]>([])

  useEffect(() => {
    const temp = [...mappedLeave]
    data?.allLeaves?.forEach((i) => {
      temp.push({
        id: i?.id,
        name: i?.userName,
        userId: i?.userId,
        projects: i?.leaveProjects.map((item) => ({
          project_name: {
            label: item.project.name,
            value: item.project.name
          },
          project_leader: {
            label: item.projectLeader.name,
            value: item.projectLeader.name
          }
        })),
        leaveDate: moment(i?.leaveDate).format('MM/DD/YYYY'),
        type: i?.leaveType,
        isWithPay: i?.isWithPay,
        manager: i?.manager,
        projectLeader: i?.leaveProjects[0]?.projectLeader?.name,
        totalUndertime:
          i?.leaveType === 'Undertime' ? parseFloat(i?.days.toFixed(3).toString()) : 0,
        totalLeaves: i?.leaveType === 'Undertime' ? 0 : parseFloat(i?.days.toFixed(3).toString()),
        dateFiled: moment(i?.createdAt).format('MM/DD/YYYY'),
        reason: i?.reason,
        avatar: i?.avatar
      })
    })
    setMappedLeave(temp)
  }, [data])

  if (process.env.NODE_ENV === 'production' && currentUser?.userById.role.name !== Roles.HR_ADMIN) {
    return <NotFound />
  }

  return (
    <LeaveManagementLayout metaTitle="List of leave">
      <FadeInOut className="default-scrollbar relative h-full overflow-auto text-xs text-slate-800">
        <header
          className={classNames(
            'sticky left-0 top-0 z-20 flex items-center justify-between',
            'border-b border-slate-200 bg-slate-100 px-4 py-2 text-xs'
          )}
        >
          <GlobalSearchFilter
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search"
          />
        </header>

        {mappedLeave !== undefined && data !== undefined ? (
          <ListOfLeaveTable
            {...{
              query: {
                data: mappedLeave,
                isLoading: false,
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
      </FadeInOut>
    </LeaveManagementLayout>
  )
}

export default ListOfLeave
