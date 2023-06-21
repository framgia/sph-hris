import moment from 'moment'
import { X } from 'react-feather'
import classNames from 'classnames'
import { toast } from 'react-hot-toast'
import { parse } from 'iso8601-duration'
import { PulseLoader } from 'react-spinners'
import { confirmAlert } from 'react-confirm-alert'
import React, { FC, useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import Card from '~/components/atoms/Card'
import Alert from '~/components/atoms/Alert'
import { queryClient } from '~/lib/queryClient'
import useUserQuery from '~/hooks/useUserQuery'
import Button from '~/components/atoms/Buttons/Button'
import useTimeInMutation from '~/hooks/useTimeInMutation'
import UserTimeZone from '~/components/molecules/UserTimeZone'
import DrawerTemplate from '~/components/templates/DrawerTemplate'
import ButtonAction from '~/components/atoms/Buttons/ButtonAction'

type Props = {
  isOpenTimeInDrawer: boolean
  actions: {
    handleToggleTimeInDrawer: () => void
  }
}

const TimeInDrawer: FC<Props> = (props): JSX.Element => {
  const {
    isOpenTimeInDrawer,
    actions: { handleToggleTimeInDrawer }
  } = props

  const [remarks, setRemarks] = useState('')
  const [files, setFiles] = useState<FileList | null>(null)
  const [afterStartTime, setAfterStartTime] = useState(false)
  const [errorRemark, setErrorRemark] = useState('')

  const { handleUserQuery } = useUserQuery()
  const { handleTimeInMutation } = useTimeInMutation()
  const { data } = handleUserQuery()
  const timeInMutation = handleTimeInMutation()

  const handleFileUploads = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFiles(e.target.files)
  }
  useEffect(() => {
    let status = false
    if (data !== null && data !== undefined) {
      const startTime = parse(data?.userById.employeeSchedule?.workingDayTimes[0]?.from ?? 'PT0H')
      status = moment(new Date(), 'h:mma').isAfter(
        moment(
          `${startTime.hours as number}:${startTime.minutes as number}:${
            startTime.seconds as number
          }`,
          'h:mma'
        )
      )
      setAfterStartTime(status)
    }
  }, [data])

  const handleRestdayTimeInChecker = async (): Promise<void> => {
    const day = moment().format('dddd')
    const schedule = data?.userById?.employeeSchedule.workingDayTimes.find(
      (item) => item.day === day
    )
    if (schedule !== null && schedule !== undefined) {
      await handleSaveTimeIn()
    } else {
      /* This is for when user times in when he/she rest day. */
      handleRestdayTimeInConfirmation()
    }
  }

  // FOR CONFIRMATION ONLY
  const handleRestdayTimeInConfirmation = (): void => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Card className="w-full max-w-[350px] px-8 py-6 !shadow-none" rounded="lg">
            <h1 className="text-center text-xl font-bold text-amber-500">Warning!</h1>
            <p className="mt-4 text-sm font-normal text-slate-600">
              Important: Time-in is not allowed on the designated rest day.
            </p>
            <div className="mt-6 flex items-center justify-center space-x-2 text-white">
              <ButtonAction onClick={onClose} variant="warning" className="w-full py-1 px-4">
                Close
              </ButtonAction>
            </div>
          </Card>
        )
      }
    })
  }

  const handleSaveTimeIn = async (): Promise<void> => {
    if (afterStartTime && remarks === '') {
      setErrorRemark('Remarks is required')
      return
    }

    const { userById } = data ?? {}
    const { timeEntry, id, employeeSchedule } = userById ?? {}
    const workingDayTimes = employeeSchedule?.workingDayTimes ?? []
    const { from = '', to = '' } = workingDayTimes[0] ?? {}

    const time = moment()
    const timeHour = `PT${time.hours()}H${time.minutes()}M${time.seconds()}S`

    await timeInMutation.mutateAsync({
      id: timeEntry?.id ?? 0,
      userId: id ?? 0,
      startTime: from,
      endTime: to,
      date: moment().format(),
      timeHour,
      remarks,
      files: files as FileList
    })

    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['GET_USER_QUERY'] }),
      queryClient.invalidateQueries({ queryKey: ['GET_EMPLOYEE_TIMESHEET'] })
    ])

    setRemarks('')
    handleToggleTimeInDrawer()
    toast.success('Time In Successful ⏱️')
  }

  return (
    <DrawerTemplate
      {...{
        isOpen: isOpenTimeInDrawer,
        actions: {
          handleToggle: handleToggleTimeInDrawer
        }
      }}
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 px-6 py-3">
        <h1 className="font-inter text-base font-medium text-slate-700">
          Confirm {afterStartTime ? 'Late' : ''} Time In
        </h1>
        <button onClick={handleToggleTimeInDrawer} className="active:scale-95">
          <X className="h-6 w-6 stroke-0.5 text-slate-400" />
        </button>
      </header>
      {/* Body */}
      <div className="flex flex-col space-y-3 px-6">
        {/* User */}
        <UserTimeZone user={data?.userById} />

        {/* Error Message */}
        {timeInMutation.isError && <Alert type="error" />}

        {/* Remarks */}
        <div className="form-group space-y-2">
          <div>
            <label htmlFor="remarks" className="space-y-0.5">
              <span className="text-xs text-slate-500">Remarks</span>
              <TextareaAutosize
                required={afterStartTime}
                value={remarks}
                id="remarks"
                disabled={timeInMutation.isLoading}
                onChange={(e) => setRemarks(e.target.value)}
                className={classNames(
                  'm-0 block min-h-[20vh] w-full rounded placeholder:text-slate-400',
                  'bg-white bg-clip-padding focus:ring-primary',
                  'resize-none px-3 py-1.5 text-sm font-normal text-slate-700 transition focus:border-primary',
                  'ease-in-out focus:border-primary focus:bg-white focus:text-slate-700 focus:outline-none',
                  errorRemark !== ''
                    ? '!border-rose-500 !ring-rose-500'
                    : 'border border-solid border-slate-300'
                )}
                onBlur={() => setErrorRemark('')}
                onFocus={() => setErrorRemark('')}
                placeholder="Message..."
              />
              {errorRemark !== null && errorRemark !== undefined && (
                <span className="error text-[10px]">{errorRemark}</span>
              )}
            </label>
          </div>
          {afterStartTime && (
            <div>
              <label htmlFor="screenshots">
                <span className="text-xs">Screenshots/Proof</span>
                <input
                  id="screenshots"
                  required={true}
                  disabled={timeInMutation.isLoading}
                  className={classNames(
                    'block w-full rounded-md border border-slate-200 bg-white text-xs text-slate-700',
                    'transition ease-in-out file:rounded-l-md  file:border-0 file:bg-slate-700 file:py-3 file:px-2',
                    'file:text-xs file:text-white focus:border-primary focus:bg-white focus:text-slate-700',
                    'focus:outline-none focus:ring-1 focus:ring-primary'
                  )}
                  type="file"
                  onChange={handleFileUploads}
                />
              </label>
            </div>
          )}
        </div>
      </div>
      {/* Footer Options */}
      <section className="mt-auto border-t border-slate-200">
        <div className="flex justify-end py-2 px-6">
          <Button
            type="button"
            disabled={timeInMutation.isLoading}
            onClick={handleToggleTimeInDrawer}
            className={classNames(
              'flex items-center justify-center border-slate-200 text-xs active:scale-95',
              'w-24 border-dark-primary py-2 text-dark-primary outline-none'
            )}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={timeInMutation.isLoading}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleRestdayTimeInChecker}
            className={classNames(
              'flex items-center justify-center rounded-md border active:scale-95',
              `w-24 border-dark-primary ${
                !timeInMutation.isLoading ? 'bg-primary hover:bg-dark-primary' : 'bg-slate-400'
              } text-xs text-white outline-none `
            )}
          >
            {timeInMutation.isLoading ? <PulseLoader color="#fff" size={6} /> : 'Save'}
          </Button>
        </div>
      </section>
    </DrawerTemplate>
  )
}

export default TimeInDrawer
