import { debounce } from 'lodash'
import classNames from 'classnames'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { PulseLoader } from 'react-spinners'
import React, { FC, useEffect, useState } from 'react'
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
  const router = useRouter()
  const { id } = router.query
  const { isOpen, closeModal, scheduleName } = props
  const [searchedVal, setSearchedVal] = useState<string>('')
  const [isOpenAddNewSchedule, setIsOpenAddNewSchedule] = useState<boolean>(false)
  const [scheduleMembers, setScheduleMembers] = useState<IScheduleMember[]>()

  const debouncedSetSearchVal = debounce(setSearchedVal, 500)

  const { getSearchEmployeesByScheduleQuery } = useEmployeeSchedule()
  const { data, isLoading, isError, fetchStatus } = getSearchEmployeesByScheduleQuery(
    { employeeScheduleId: Number(id), searchKey: searchedVal },
    isOpen
  )

  const ONLINE_NO_ERROR = fetchStatus !== FetchStatus.PAUSED && !isError

  useEffect(() => {
    if (data !== undefined) setScheduleMembers(data?.searchEmployeesBySchedule)
  }, [data])

  useEffect(() => {
    if (!isOpen) debouncedSetSearchVal('')
  }, [isOpen])

  const NoDataAvailable = (): JSX.Element => (
    <span className="absolute inset-x-0 left-0 right-0 w-full flex-1 py-2 text-center text-xs text-slate-400">
      No Data Available
    </span>
  )

  const FetchError = (): JSX.Element => (
    <span className="absolute inset-x-0 left-0 right-0 w-full flex-1 bg-red-50 py-2 text-center text-xs text-red-500">
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
              debouncedSetSearchVal(e.target.value)
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
          {!isLoading && ONLINE_NO_ERROR ? (
            <>
              {scheduleMembers === undefined || scheduleMembers?.length <= 0 ? (
                <NoDataAvailable />
              ) : (
                scheduleMembers?.map((member) => <MemberList key={member.id} {...{ member }} />)
              )}
            </>
          ) : (
            <>{ONLINE_NO_ERROR ? <Loading /> : <FetchError />}</>
          )}
        </div>
      </main>
    </ModalTemplate>
  )
}

export default ViewScheduleMembersModal
