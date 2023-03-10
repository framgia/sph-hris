import moment from 'moment'
import { X } from 'react-feather'
import classNames from 'classnames'
import { toast } from 'react-hot-toast'
import { serialize } from 'tinyduration'
import TextareaAutosize from 'react-textarea-autosize'
import React, { FC, useEffect, useState } from 'react'

import Alert from '~/components/atoms/Alert'
import useUserQuery from '~/hooks/useUserQuery'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import useTimeOutMutation from '~/hooks/useTimeOutMutation'
import UserTimeZone from '~/components/molecules/UserTimeZone'
import DrawerTemplate from '~/components/templates/DrawerTemplate'

type Props = {
  isOpenTimeOutDrawer: boolean
  workedHours: string
  actions: {
    handleToggleTimeOutDrawer: () => void
  }
}

const TimeOutDrawer: FC<Props> = (props): JSX.Element => {
  const {
    isOpenTimeOutDrawer,
    workedHours,
    actions: { handleToggleTimeOutDrawer }
  } = props

  const [remarks, setRemarks] = useState('')

  const { handleUserQuery } = useUserQuery()
  const { handleTimeOutMutation } = useTimeOutMutation()
  const { data } = handleUserQuery()
  const timeOutMutation = handleTimeOutMutation()

  const handleSaveTimeOut = (): void => {
    const time = moment(new Date())
    timeOutMutation.mutate({
      userId: data?.userById.id as number,
      timeEntryId: data?.userById.timeEntry.id as number,
      workedHours,
      timeHour: serialize({
        hours: time.hours(),
        minutes: time.minutes(),
        seconds: time.seconds()
      }),
      remarks
    })
  }

  useEffect(() => {
    if (timeOutMutation.isSuccess) {
      setRemarks('')
      handleToggleTimeOutDrawer()
      toast.success('Time Out Successful')
    }
  }, [timeOutMutation.status])

  return (
    <DrawerTemplate
      {...{
        isOpen: isOpenTimeOutDrawer,
        actions: {
          handleToggle: handleToggleTimeOutDrawer
        }
      }}
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 px-6 py-3">
        <h1 className="font-inter text-base font-medium text-slate-700">Confirm Time Out</h1>
        <button onClick={handleToggleTimeOutDrawer} className="active:scale-95">
          <X className="h-6 w-6 stroke-0.5 text-slate-400" />
        </button>
      </header>
      {/* Body */}
      <div className="flex flex-col space-y-3 px-6">
        {/* User */}
        <UserTimeZone user={data?.userById} />

        {/* Error Message */}
        {timeOutMutation.isError && <Alert type="error" />}
        {/* Remarks */}
        <div className="form-group space-y-2">
          <div>
            <label htmlFor="remarks" className="space-y-0.5">
              <span className="text-xs text-slate-500">Remarks</span>
              <TextareaAutosize
                id="remarks"
                value={remarks}
                disabled={timeOutMutation.isLoading}
                onChange={(e) => setRemarks(e.target.value)}
                className={classNames(
                  'm-0 block min-h-[20vh] w-full rounded placeholder:font-light placeholder:text-slate-400',
                  'border border-solid border-slate-300 bg-white bg-clip-padding focus:ring-primary',
                  'resize-none px-3 py-1.5 text-sm font-normal text-slate-700 transition focus:border-primary',
                  'ease-in-out focus:border-primary focus:bg-white focus:text-slate-700 focus:outline-none'
                )}
                placeholder="Message..."
              />
            </label>
          </div>
        </div>
      </div>
      {/* Footer Options */}
      <section className="mt-auto border-t border-slate-200">
        <div className="flex justify-end py-2 px-6">
          <button
            type="button"
            onClick={handleToggleTimeOutDrawer}
            className={classNames(
              'flex items-center justify-center border-slate-200 text-xs active:scale-95',
              'w-24 border-dark-primary py-2 text-dark-primary outline-none'
            )}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={timeOutMutation.isLoading}
            onClick={handleSaveTimeOut}
            className={classNames(
              'flex items-center justify-center rounded-md border active:scale-95',
              'w-24 border-dark-primary bg-primary text-xs text-white outline-none hover:bg-dark-primary'
            )}
          >
            {timeOutMutation.isLoading && <SpinnerIcon className=" mr-2 fill-gray-500" />}
            Save
          </button>
        </div>
      </section>
    </DrawerTemplate>
  )
}

export default TimeOutDrawer
