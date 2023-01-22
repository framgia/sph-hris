import React, { FC, useEffect, useState } from 'react'
import { X } from 'react-feather'
import classNames from 'classnames'
import TextareaAutosize from 'react-textarea-autosize'
import moment from 'moment'
import { useRouter } from 'next/router'
import { serialize } from 'tinyduration'
import { toast } from 'react-hot-toast'
import { parse } from 'iso8601-duration'

import Alert from '~/components/atoms/Alert'
import Text from '~/components/atoms/Text'
import Avatar from '~/components/atoms/Avatar'
import DrawerTemplate from '~/components/templates/DrawerTemplate'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import useTimeInMutation from '~/hooks/useTimeInMutation'
import useUserQuery from '~/hooks/useUserQuery'
import { getSpecificTimeEntry } from '~/hooks/useTimesheetQuery'

type Props = {
  isOpenTimeInDrawer: boolean
  actions: {
    handleToggleTimeInDrawer: () => void
  }
}

const TimeInDrawer: FC<Props> = (props): JSX.Element => {
  const router = useRouter()
  const timeInId = router.query.time_in
  const res = getSpecificTimeEntry(Number(timeInId)).data?.timeById.remarks

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

  const handleToggleDrawer = (): void => {
    if (timeInId !== null && timeInId !== undefined) {
      void router.back()
    } else {
      handleToggleTimeInDrawer()
    }
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
        isOpen: timeInId?.length !== undefined ? false : isOpenTimeInDrawer,
        actions: {
          handleToggle: handleToggleTimeInDrawer
        }
      }}
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 px-6 py-3">
        <h1 className="text-base font-medium text-slate-900">
          Confirm {afterStartTime ? 'Late' : ''} Time In
        </h1>
        <button onClick={() => handleToggleDrawer()} className="active:scale-95">
          <X className="h-6 w-6 stroke-0.5 text-slate-400" />
        </button>
      </header>
      {/* Body */}
      <div className="flex flex-col space-y-3 px-6 py-2">
        {/* User */}
        <div className="flex items-center space-x-3 border-b border-slate-200 py-3">
          <Avatar
            src="https://avatars.githubusercontent.com/u/38458781?v=4"
            alt="user-avatar"
            size="lg"
            rounded="full"
          />
          <div>
            <Text theme="md" size="sm" weight="bold">
              {data?.userById.name}
            </Text>
            <p className="text-[11px] leading-tight text-slate-500">
              Clocking from {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </p>
            <p className="text-[11px] leading-tight text-slate-500">
              {moment(new Date()).format('dddd, MMMM Do YYYY')}
            </p>
            <p className="text-[11px] leading-tight text-slate-500">
              Schedule: {data?.userById.employeeSchedule.name}
            </p>
          </div>
        </div>
        {/* Error Message */}
        {timeInMutation.isError && <Alert type="error" />}

        {/* Remarks */}
        <div className="form-group space-y-2">
          <div>
            <label htmlFor="remarks" className="space-y-0.5">
              <span className="text-xs text-slate-500">Remarks</span>
              <TextareaAutosize
                value={res ?? remarks}
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
          {!(timeInId !== undefined && timeInId !== null) && afterStartTime && (
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
      {!(timeInId !== undefined && timeInId !== null) && (
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
              onClick={handleSaveTimeIn}
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
      )}
    </DrawerTemplate>
  )
}

export default TimeInDrawer
