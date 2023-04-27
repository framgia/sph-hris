import classNames from 'classnames'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { Coffee, Search, UserPlus } from 'react-feather'

import MemberList from './MemberList'
import Input from '~/components/atoms/Input'
import { FetchStatus } from '~/utils/constants/fetchStatus'
import useEmployeeSchedule from '~/hooks/useEmployeeSchedule'
import AddScheduleMembersModal from './AddScheduleMembersModal'
import ModalTemplate from '~/components/templates/ModalTemplate'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import { IScheduleMember } from '~/utils/interfaces/scheduleMemberInterface'

type Props = {
  isOpen: boolean
  closeModal: () => void
  scheduleName: string
}

const ViewScheduleMembersModal: FC<Props> = (props): JSX.Element => {
  const { isOpen, closeModal, scheduleName } = props
  const [isOpenAddNewSchedule, setIsOpenAddNewSchedule] = useState<boolean>(false)
  const [searchedVal, setSearchedVal] = useState<string>('')
  const router = useRouter()
  const { id } = router.query

  const { getEmployeesByScheduleQuery } = useEmployeeSchedule()
  const { data, isLoading, isError, fetchStatus } = getEmployeesByScheduleQuery(Number(id), isOpen)
  const scheduleMembers = data?.employeesBySchedule

  const filterMembers = (member: IScheduleMember, searchedVal: string): boolean => {
    if (searchedVal.length === 0) {
      return true
    }
    const lowerCaseSearchedVal = String(searchedVal).toLowerCase()
    const lowerCaseName = member.name.toLowerCase()
    return lowerCaseName.includes(lowerCaseSearchedVal)
  }

  const NoDataAvailable = (): JSX.Element => (
    <span className="absolute inset-x-0 left-0 right-0 w-full flex-1 py-2 text-center font-medium text-slate-500">
      No Data Available
    </span>
  )

  const FetchError = (): JSX.Element => (
    <span className="absolute inset-x-0 left-0 right-0 w-full flex-1 bg-red-50 py-2 text-center font-medium text-red-500">
      Error Fetching Data
    </span>
  )

  const Loading = (): JSX.Element => (
    <div className="amber-500 flex min-h-[20vh] items-center justify-center">
      <PulseLoader color="#ffb40b" size={10} />
    </div>
  )

  const handleOpenAddNewScheduleToggle = (): void => {
    if (fetchStatus !== FetchStatus.PAUSED && !isError) {
      setIsOpenAddNewSchedule(!isOpenAddNewSchedule)
    } else {
      toast.error('Error Fetching Data')
    }
  }

  return (
    <ModalTemplate
      {...{
        isOpen,
        closeModal
      }}
      className="w-full max-w-lg"
    >
      <ModalHeader
        {...{
          isOpen,
          closeModal,
          Icon: Coffee,
          hasBorder: true,
          title: scheduleName
        }}
        className="px-7 py-4"
      />
      <main>
        {/* For Search Field */}
        <section className="group relative px-7 py-4">
          <div className="absolute inset-y-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-slate-400/70 group-focus-within:text-amber-500" />
          </div>
          <Input
            type="text"
            color="warning"
            placeholder="Find Members"
            className="py-2.5 pl-10 text-sm text-slate-800"
            onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
              setSearchedVal(e.target.value)
            }
          />
        </section>

        {/* For Add New Member Button */}
        <section
          onClick={handleOpenAddNewScheduleToggle}
          className={classNames(
            'flex items-center px-7 py-2 transition',
            'duration-100 ease-in-out hover:bg-slate-100',
            'cursor-pointer space-x-4'
          )}
        >
          <div className="rounded border border-amber-100 bg-amber-50 p-2">
            <UserPlus className="h-5 w-5 stroke-1 text-amber-500" />
          </div>
          <span className="select-none text-sm font-medium text-slate-800">Add member</span>

          {/* Modal FOr Adding New Schedule Members */}
          {isOpenAddNewSchedule && (
            <AddScheduleMembersModal
              {...{
                isOpen: isOpenAddNewSchedule,
                closeModal: handleOpenAddNewScheduleToggle
              }}
            />
          )}
        </section>

        <div
          className={classNames(
            'default-scrollbar mb-3 h-full max-h-[350px] min-h-[350px]',
            'overflow-y-auto scrollbar-track-slate-100'
          )}
        >
          {/* List of all Members */}
          {!isLoading && !isError && fetchStatus !== FetchStatus.PAUSED ? (
            <>
              {scheduleMembers === undefined || scheduleMembers?.length <= 0 ? (
                <NoDataAvailable />
              ) : (
                scheduleMembers
                  ?.filter((row) => filterMembers(row, searchedVal))
                  ?.map((member) => <MemberList key={member.id} {...{ member }} />)
              )}
            </>
          ) : (
            <>{fetchStatus !== FetchStatus.PAUSED && !isError ? <Loading /> : <FetchError />}</>
          )}
        </div>
      </main>
    </ModalTemplate>
  )
}

export default ViewScheduleMembersModal
