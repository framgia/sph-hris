import moment from 'moment'
import { X } from 'react-feather'
import classNames from 'classnames'
import toast from 'react-hot-toast'
import React, { FC, useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { confirmAlert } from 'react-confirm-alert'
import TextareaAutosize from 'react-textarea-autosize'

import Card from '~/components/atoms/Card'
import Alert from '~/components/atoms/Alert'
import { queryClient } from '~/lib/queryClient'
import useUserQuery from '~/hooks/useUserQuery'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import Button from '~/components/atoms/Buttons/Button'
import useTimeOutMutation from '~/hooks/useTimeOutMutation'
import UserTimeZone from '~/components/molecules/UserTimeZone'
import DrawerTemplate from '~/components/templates/DrawerTemplate'
import ButtonAction from '~/components/atoms/Buttons/ButtonAction'

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

  const handleEarlyTimeOutChecker = async (): Promise<void> => {
    const time = moment().hour()
    const day = moment().format('dddd')
    const schedule = data?.userById?.employeeSchedule.workingDayTimes.find(
      (item) => item.day === day
    )
    if (
      data?.userById.timeEntry.date.split('T')[0] === moment().format('YYYY-MM-DD') &&
      schedule !== null &&
      schedule !== undefined
    ) {
      const regex = /PT(\d+)H/
      const match = schedule.to.match(regex)
      const hours = match !== null ? parseInt(match[1]) : 0
      if (time < hours) return handleRemoveConfirmation()
    }
    await handleSaveTimeOut()
  }

  // FOR CONFIRMATION ONLY
  const handleRemoveConfirmation = (): void => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Card className="w-full max-w-[350px] px-8 py-6 shadow-none" rounded="lg">
            <h1 className="text-center text-xl font-bold text-rose-500">Confirmation</h1>
            <p className="mt-4 text-sm font-normal text-slate-600">
              You won&apos;t be able to time in again for today if you time out. Proceed?
            </p>
            <div className="mt-6 flex items-center justify-center space-x-2 text-white">
              <ButtonAction
                disabled={timeOutMutation.isLoading}
                onClick={() => {
                  void handleSaveTimeOut()
                  return onClose()
                }}
                variant="danger"
                className="w-full py-1 px-4"
              >
                {timeOutMutation.isLoading && <SpinnerIcon className=" mr-2 fill-gray-500" />}
                Yes
              </ButtonAction>
              <ButtonAction
                onClick={onClose}
                variant="secondary"
                className="w-full py-1 px-4 text-slate-500"
              >
                No
              </ButtonAction>
            </div>
          </Card>
        )
      }
    })
  }

  const handleSaveTimeOut = async (): Promise<void> => {
    const time = moment()
    const timeHour = `PT${time.hours()}H${time.minutes()}M${time.seconds()}S`

    await timeOutMutation.mutateAsync({
      userId: data?.userById?.id ?? 0,
      timeEntryId: data?.userById?.timeEntry?.id ?? 0,
      workedHours,
      timeHour,
      remarks
    })

    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['GET_USER_QUERY'] }),
      queryClient.invalidateQueries({ queryKey: ['GET_EMPLOYEE_TIMESHEET'] })
    ])

    setRemarks('')
    handleToggleTimeOutDrawer()
    toast.success('Time Out Successful ⌛')
  }

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
          <Button
            type="button"
            disabled={timeOutMutation.isLoading}
            onClick={handleToggleTimeOutDrawer}
            className={classNames(
              'flex items-center justify-center border-slate-200 text-xs active:scale-95',
              'w-24 border-dark-primary py-2 text-dark-primary outline-none'
            )}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={timeOutMutation.isLoading}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleEarlyTimeOutChecker}
            className={classNames(
              'flex items-center justify-center rounded-md border active:scale-95',
              'w-24 border-dark-primary bg-primary text-xs text-white outline-none hover:bg-dark-primary'
            )}
          >
            {timeOutMutation.isLoading ? <PulseLoader color="#fff" size={6} /> : 'Save'}
          </Button>
        </div>
      </section>
    </DrawerTemplate>
  )
}

export default TimeOutDrawer
