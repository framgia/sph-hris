import moment from 'moment'
import { NextPage } from 'next'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { PulseLoader } from 'react-spinners'
import React, { useEffect, useState } from 'react'

import NotFound from './404'
import { Check } from 'react-feather'
import useUserQuery from '~/hooks/useUserQuery'
import { Roles } from '~/utils/constants/roles'
import Layout from '~/components/templates/Layout'
import { Position } from '~/utils/constants/position'
import { IOvertimeManagement } from '~/utils/interfaces'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { RequestStatus } from '~/utils/constants/requestStatus'
import useOvertime, { getAllovertime } from '~/hooks/useOvertime'
import { STATUS_OPTIONS } from '~/utils/constants/notificationFilter'
import GlobalSearchFilter from '~/components/molecules/GlobalSearchFilter'
import OptionDropdown from '~/components/molecules/MyOvertimeTable/OptionDropdown'
import OvertimeManagementTable from '~/components/molecules/OvertimeManagementTable'
import HROvertimeFilterDropdown from '~/components/molecules/HROvertimeFilterDropDown'
import { hrColumns, managerColumns } from '~/components/molecules/OvertimeManagementTable/columns'

type URLParameterType = {
  startDate: string
  endDate: string
  searchKey: string
}

const OvertimeManagement: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { startDate, endDate } = router.query
  const newStartDate = new Date(startDate as string)
  const newEndDate = new Date(endDate as string)
  const { status: requestStatus } = router.query as any
  const { year } = router.query as any
  const { handleUserQuery } = useUserQuery()
  const { data: user } = handleUserQuery()
  const isHRAdmin = user?.userById.role.name === Roles.HR_ADMIN
  const isManager = user?.userById.position.id === Position.MANAGER

  const [globalFilter, setGlobalFilter] = useState<string>('')

  const { data: overtime } = getAllovertime()
  const { handleCreateOvertimeSummaryMutation } = useOvertime()
  const createOvertimeSummary = handleCreateOvertimeSummaryMutation()

  const [overtimeData, setOvertimeData] = useState<IOvertimeManagement[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDisable, setIsDisable] = useState<boolean>(false)

  const [filters, setFilters] = useState({
    date: moment().format('YYYY-MM-DD'),
    status: '',
    startDate:
      new Date().getDate() > 15 ? moment().format('YYYY-MM-16') : moment().format('YYYY-MM-01'),
    endDate:
      new Date().getDate() > 15
        ? moment().endOf('month').format('YYYY-MM-DD')
        : moment().format('YYYY-MM-15')
  })

  const handleURLParameterChange = (query: URLParameterType): void => {
    void router.replace({
      pathname: '/overtime-management',
      query
    })
  }

  const handleFilterUpdate = (): void => {
    handleURLParameterChange({
      startDate: filters.startDate,
      endDate: filters.endDate,
      searchKey: globalFilter
    })
  }

  const isDataAvailable = (
    data: IOvertimeManagement[] | undefined,
    startDate: string | string[] | undefined,
    endDate: string | string[] | undefined
  ): boolean => {
    return data !== undefined && data.length > 0 && startDate !== undefined && endDate !== undefined
  }

  const isShowOption = isManager && isDataAvailable(overtimeData, startDate, endDate)
  const isShowSendSummary = isHRAdmin && isDataAvailable(overtimeData, startDate, endDate)

  const status = (isLeaderApproved: boolean, isManagerApproved: boolean): string | undefined => {
    if (isLeaderApproved == null || isManagerApproved == null) {
      return STATUS_OPTIONS.PENDING.toLowerCase()
    }
    if (isLeaderApproved && isManagerApproved) {
      return STATUS_OPTIONS.APPROVED.toLowerCase()
    }
    if (!isLeaderApproved || !isManagerApproved) {
      return STATUS_OPTIONS.DISAPPROVED.toLowerCase()
    }
  }

  useEffect(() => {
    setIsDisable(false)
  }, [overtimeData])

  useEffect(() => {
    if (overtime?.allOvertime !== undefined) {
      const mappedOvertime = overtime?.allOvertime.map((notif) => {
        const [project] = notif.projects
        const mapped: IOvertimeManagement = {
          id: notif.id,
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
                value: notif.otherProject,
                label: notif.otherProject
              },
              project_leader: {
                value: 'others',
                label: 'others'
              }
            }
          ],
          user: {
            id: notif.user.id,
            name: notif.user.name,
            link: notif.user.link,
            role: {
              id: notif.user.roleId,
              name: notif.user.roleName
            }
          },
          date: notif.overtimeDate,
          requestedMinutes: notif.requestedMinutes,
          approvedMinutes: notif.approvedMinutes,
          supervisor: project?.projectLeader.name,
          dateFiled: notif.dateFiled,
          remarks: notif.remarks,
          status: status(notif.isLeaderApproved, notif.isManagerApproved) as string,
          overtimeIn: '',
          overtimeOut: '',
          manager: {
            label: '',
            value: ''
          },
          managerid: notif.manager.id,
          isManagerApproved: notif.isManagerApproved,
          managerRemarks: notif.managerRemarks ?? ''
        }
        return mapped
      })
      if (router.isReady) {
        if (year !== '' || requestStatus !== '') {
          const newOvertime: IOvertimeManagement[] | undefined = []
          if (year === '' && requestStatus !== '') {
            mappedOvertime.forEach((overtime): void => {
              if (overtime.status === requestStatus?.toLowerCase()) {
                void newOvertime.push(overtime)
              }
              void setOvertimeData(newOvertime)
            })
          }
          if (year !== '' && requestStatus === '') {
            mappedOvertime.forEach((overtime): void => {
              if (moment(overtime.date).format('YYYY') === year) {
                void newOvertime.push(overtime)
              }
              void setOvertimeData(newOvertime)
            })
          }
          if (year !== '' && requestStatus !== '') {
            mappedOvertime.forEach((overtime): void => {
              if (overtime.status === requestStatus?.toLowerCase()) {
                if (moment(overtime.date).format('YYYY') === year) {
                  void newOvertime.push(overtime)
                }
              }
              void setOvertimeData(newOvertime)
            })
          }
        }
        if (
          year === undefined ||
          requestStatus === undefined ||
          (requestStatus === '' && year === '')
        ) {
          const isFiltered = startDate !== undefined && endDate !== undefined
          const filteredOvertime = mappedOvertime.filter((x) => {
            const newDateFiled = new Date(x.dateFiled)
            return (
              newDateFiled >= newStartDate &&
              newDateFiled <= newEndDate &&
              x.status.toLowerCase() === RequestStatus.APPROVED.toLowerCase()
            )
          })

          void setOvertimeData(isFiltered ? filteredOvertime : mappedOvertime)
        }
      }
    }
  }, [overtime, year, requestStatus, router.isReady, startDate, endDate])

  function managerData(overtimeData: IOvertimeManagement[]): IOvertimeManagement[] {
    overtimeData = overtimeData.filter(
      (data: IOvertimeManagement) => data.managerid === user?.userById.id
    )
    return overtimeData
  }

  if (process.env.NODE_ENV === 'production' && user?.userById.role.name === Roles.EMPLOYEE) {
    return <NotFound />
  }

  const handleSendSummary = async (): Promise<void> => {
    setIsLoading(true)
    await createOvertimeSummary.mutateAsync({ startDate, endDate })
    setIsDisable(true)
    setIsLoading(false)
  }

  const handleClick = handleSendSummary as () => void

  return (
    <Layout metaTitle="Overtime Management">
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
          <div className="fixed right-0 z-50">
            <div className="flex justify-evenly space-x-2 bg-slate-100 px-4 py-2">
              {isShowOption && <OptionDropdown data={overtimeData} />}
              <HROvertimeFilterDropdown
                filters={filters}
                setFilters={setFilters}
                handleFilterUpdate={handleFilterUpdate}
              />
              {isShowSendSummary && (
                <Button
                  type="button"
                  variant="primary"
                  className="flex items-center px-1.5  py-[3px]"
                  onClick={handleClick}
                  disabled={isLoading || isDisable}
                >
                  {isLoading ? (
                    <span>
                      <PulseLoader color="#FFFFFF" size={8} />
                    </span>
                  ) : isDisable ? (
                    <span className="px-3">
                      <Check className="h-4 w-4 text-white" />
                    </span>
                  ) : (
                    <span>Send Summary</span>
                  )}
                </Button>
              )}
            </div>
          </div>
        </header>

        {overtimeData !== undefined ? (
          <OvertimeManagementTable
            {...{
              query: {
                data: isHRAdmin
                  ? overtimeData
                  : isManager
                  ? overtimeData
                  : managerData(overtimeData),
                error: null
              },
              table: {
                columns: user?.userById.role.name === Roles.HR_ADMIN ? hrColumns : managerColumns,
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

export default OvertimeManagement
