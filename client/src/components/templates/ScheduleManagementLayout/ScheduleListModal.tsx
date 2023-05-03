import classNames from 'classnames'
import { Calendar, Search } from 'react-feather'
import React, { FC, useEffect, useState } from 'react'

import ScheduleList from './ScheduleList'
import Input from '~/components/atoms/Input'
import ModalTemplate from './../ModalTemplate'
import ModalHeader from './../ModalTemplate/ModalHeader'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const ScheduleListModal: FC<Props> = ({ isOpen, closeModal }): JSX.Element => {
  const [searchedVal, setSearchedVal] = useState<string>('')

  useEffect(() => {
    if (isOpen) {
      setSearchedVal('')
    }
  }, [isOpen])

  return (
    <ModalTemplate
      {...{
        isOpen,
        closeModal
      }}
      className="w-full max-w-lg"
    >
      {/* Custom Modal Header */}
      <ModalHeader
        {...{
          closeModal,
          Icon: Calendar,
          hasBorder: true,
          title: 'Schedule List'
        }}
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
            placeholder="Find Schedules"
            onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
              setSearchedVal(e.target.value)
            }
            className="py-2.5 pl-10 text-sm text-slate-800"
          />
        </section>

        <div
          className={classNames(
            'default-scrollbar mb-3 h-full max-h-[350px] min-h-[350px]',
            'overflow-y-auto scrollbar-track-slate-100'
          )}
        >
          {/* List of all Members */}
          <ScheduleList
            {...{
              searchedVal,
              closeModal
            }}
          />
        </div>
      </main>
    </ModalTemplate>
  )
}

export default ScheduleListModal
