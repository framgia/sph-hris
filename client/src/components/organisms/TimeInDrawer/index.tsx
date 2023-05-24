import moment from 'moment'
import { X } from 'react-feather'
import classNames from 'classnames'
import { toast } from 'react-hot-toast'
import { parse } from 'iso8601-duration'
import { serialize } from 'tinyduration'
import { confirmAlert } from 'react-confirm-alert'
import React, { FC, useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import Card from '~/components/atoms/Card'
import Alert from '~/components/atoms/Alert'
import useUserQuery from '~/hooks/useUserQuery'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
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

  const handleRestdayTimeInChecker = (): void => {
    const day = moment().format('dddd')
    const schedule = data?.userById?.employeeSchedule.workingDayTimes.find(
      (item) => item.day === day
    )
    if (schedule !== null && schedule !== undefined) {
      handleSaveTimeIn()
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
          <Card className="w-full max-w-[350px] px-8 py-6 shadow-none" rounded="lg">
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

  const handleSaveTimeIn = (): void => {
    const time = moment(new Date())
    timeInMutation.mutate({
      id: data?.userById.timeEntry.id as number,
      userId: data?.userById.id as number,
      startTime: (data?.userById.employeeSchedule?.workingDayTimes[0]?.from as string) ?? '',
      endTime: (data?.userById.employeeSchedule?.workingDayTimes[0]?.to as string) ?? '',
      date: moment(new Date()).format(),
      timeHour: serialize({
        hours: time.hours(),
        minutes: time.minutes(),
        seconds: time.seconds()
      }),
      remarks,
      files: files as FileList
    })
  }

  useEffect(() => {
    if (timeInMutation.isSuccess) {
      setRemarks('')
      handleToggleTimeInDrawer()
      toast.success('Time In Successful')
    }
  }, [timeInMutation.status])

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
                value={remarks}
                id="remarks"
                disabled={timeInMutation.isLoading}
                onChange={(e) => setRemarks(e.target.value)}
                className={classNames(
                  'm-0 block min-h-[20vh] w-full rounded placeholder:text-slate-400',
                  'border border-solid border-slate-300 bg-white bg-clip-padding focus:ring-primary',
                  'resize-none px-3 py-1.5 text-sm font-normal text-slate-700 transition focus:border-primary',
                  'ease-in-out focus:border-primary focus:bg-white focus:text-slate-700 focus:outline-none'
                )}
                placeholder="Message..."
              />
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
          <button
            type="button"
            onClick={handleToggleTimeInDrawer}
            className={classNames(
              'flex items-center justify-center border-slate-200 text-xs active:scale-95',
              'w-24 border-dark-primary py-2 text-dark-primary outline-none'
            )}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={timeInMutation.isLoading}
            onClick={handleRestdayTimeInChecker}
            className={classNames(
              'flex items-center justify-center rounded-md border active:scale-95',
              `w-24 border-dark-primary ${
                !timeInMutation.isLoading ? 'bg-primary hover:bg-dark-primary' : 'bg-slate-400'
              } text-xs text-white outline-none `
            )}
          >
            {timeInMutation.isLoading && <SpinnerIcon className=" mr-2 fill-gray-500" />}
            Save
          </button>
        </div>
      </section>
    </DrawerTemplate>
  )
}

export default TimeInDrawer
