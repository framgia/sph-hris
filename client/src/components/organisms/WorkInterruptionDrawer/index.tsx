import { X, Info } from 'react-feather'
import classNames from 'classnames'
import React, { FC, useEffect } from 'react'
import { FieldError, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import TextareaAutosize from 'react-textarea-autosize'
import toast from 'react-hot-toast'
import moment from 'moment'

import Text from '~/components/atoms/Text'
import Avatar from '~/components/atoms/Avatar'
import useUserQuery from '~/hooks/useUserQuery'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import useInterruptionType from '~/hooks/useInterruptionType'
import { ConfirmInterruptionSchema } from '~/utils/validation'
import DrawerTemplate from '~/components/templates/DrawerTemplate'
import { ConfirmInterruptionValues } from '~/utils/types/formValues'
import { WorkInterruptionType } from '~/utils/constants/work-status'

type Props = {
  isOpenWorkInterruptionDrawer: boolean
  actions: {
    handleToggleWorkInterruptionDrawer: () => void
  }
}

const WorkInterruptionDrawer: FC<Props> = (props): JSX.Element => {
  const {
    isOpenWorkInterruptionDrawer,
    actions: { handleToggleWorkInterruptionDrawer }
  } = props

  const { handleUserQuery } = useUserQuery()
  const { data: userData } = handleUserQuery()
  const { handleInterruptionTypeQuery, handleInterruptionMutation } = useInterruptionType()
  const { data: interruptionTypeData, isLoading } = handleInterruptionTypeQuery()
  const interruptionMutation = handleInterruptionMutation()

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ConfirmInterruptionValues>({
    mode: 'onTouched',
    resolver: yupResolver(ConfirmInterruptionSchema)
  })

  // This will handle Save Work Interruption
  const handleSave = async (data: ConfirmInterruptionValues): Promise<void> => {
    return await new Promise((resolve) => {
      resolve()
      interruptionMutation.mutate({
        timeEntryId: userData?.userById?.timeEntry?.id as number,
        workInterruptionTypeId: Number(data.work_interruption),
        timeOut: data.time_out,
        timeIn: data.time_in,
        remarks: data.remarks,
        otherReason:
          Number(data.work_interruption) === Number(WorkInterruptionType.OTHERS)
            ? data.specify_reason
            : null
      })
    })
  }
  useEffect(() => {
    if (interruptionMutation.isSuccess) {
      handleToggleWorkInterruptionDrawer()
      toast.success('Work interruption submitted!')
    }
  }, [interruptionMutation.status])

  useEffect(() => {
    if (isOpenWorkInterruptionDrawer) {
      reset({
        power_checkbox: true,
        work_interruption: 1,
        specify_reason: '',
        time_in: '',
        time_out: moment(new Date()).format('HH:mm'),
        remarks: ''
      })
    }
  }, [isOpenWorkInterruptionDrawer])

  useEffect(() => {
    setValue('power_checkbox', true)
  }, [watch('work_interruption')])

  const validationError = (error: FieldError | undefined): string => {
    return error !== null && error !== undefined
      ? 'border-rose-500 ring-rose-500 focus:border-rose-500 focus:ring-rose-500'
      : 'focus:border-primary focus:ring-primary'
  }

  return (
    <DrawerTemplate
      {...{
        isOpen: isOpenWorkInterruptionDrawer,
        actions: {
          handleToggle: handleToggleWorkInterruptionDrawer
        }
      }}
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 px-6 py-3">
        <h1 className="text-base font-medium text-slate-900">Confirm Interruption</h1>
        <button onClick={handleToggleWorkInterruptionDrawer} className="active:scale-95">
          <X className="h-6 w-6 stroke-0.5 text-slate-400" />
        </button>
      </header>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(handleSave)}
        className="default-scrollbar flex h-full flex-col justify-between overflow-y-auto"
      >
        {/* Body */}
        <main className="flex flex-col space-y-3 px-6 py-2">
          {/* User */}
          <div className="flex items-center space-x-3 border-b border-slate-200 py-3">
            <Avatar
              src={userData?.userById.avatarLink}
              alt="user-avatar"
              size="lg"
              rounded="full"
            />
            <div>
              <Text theme="md" size="sm" weight="bold">
                {userData?.userById.name}
              </Text>
              <p className="text-[11px] leading-tight text-slate-500">
                Clocking from {Intl.DateTimeFormat().resolvedOptions().timeZone}
              </p>
              <p className="text-[11px] leading-tight text-slate-500">
                {moment(new Date()).format('dddd, MMMM Do YYYY')}
              </p>
              <p className="text-[11px] leading-tight text-slate-500">
                Schedule: {userData?.userById.employeeSchedule.name}
              </p>
            </div>
          </div>
          {/* Error Message */}
          {interruptionMutation.isError ? (
            <div className="relative flex items-center justify-center rounded-md border border-rose-400 bg-rose-50 py-2.5 px-4 shadow-md">
              <X className="absolute left-4 h-4 w-4 rounded-full bg-rose-500 p-0.5 text-white" />
              <p className="text-xs font-medium text-rose-500">Something went wrong</p>
            </div>
          ) : (
            <></>
          )}
          {/* Warning Message */}
          {!watch('power_checkbox') ? (
            <div className="relative flex flex-row items-center justify-between space-x-4 rounded-md border border-blue-400 bg-blue-50 py-2.5 px-4 shadow-md">
              <div className="relative flex h-5 w-5 items-center">
                <Info className="absolute inset-0 h-5 w-5 rounded-full bg-blue-500 p-0.5 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-blue-500">
                  You may not yet submit if you can still continue working
                </p>
              </div>
            </div>
          ) : (
            <></>
          )}

          {/* Work Interruption DropDown */}
          <section>
            <label htmlFor="remarks" className="space-y-0.5">
              <span className="text-xs text-slate-500">Work Interruption</span>
              <div className="flex justify-center">
                <select
                  {...register('work_interruption')}
                  disabled={isSubmitting || isLoading}
                  className={classNames(
                    'm-0 block w-full rounded placeholder:font-light placeholder:text-slate-400',
                    'border border-solid border-slate-300 bg-white bg-clip-padding focus:ring-primary',
                    'resize-none px-3 py-2 text-xs font-normal text-slate-700 transition focus:border-primary',
                    'ease-in-out focus:bg-white focus:text-slate-700 focus:outline-none',
                    'disabled:cursor-not-allowed disabled:opacity-50'
                  )}
                  aria-label="Default select example"
                >
                  {interruptionTypeData?.allWorkInterruptionTypes.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </label>
          </section>

          {/* Power Interruption Checkbox */}
          {Number(watch('work_interruption')) ===
          Number(WorkInterruptionType.POWER_INTERRUPTION) ? (
            <section>
              <div className="mx-auto space-y-0.5 rounded border border-solid border-slate-300 bg-white px-3 py-1.5">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  {...register('power_checkbox')}
                  className="h-3 w-3 rounded border-gray-300 bg-gray-100 text-primary focus:ring-2 focus:ring-primary "
                />
                <label htmlFor="default-checkbox" className="ml-2 text-xs text-slate-500 ">
                  Cannot continue working 💻
                </label>
              </div>
            </section>
          ) : (
            <></>
          )}

          {watch('power_checkbox') ? (
            <>
              {/* Others */}
              {Number(watch('work_interruption')) === Number(WorkInterruptionType.OTHERS) ? (
                <section>
                  <label htmlFor="remarks" className="space-y-0.5">
                    <span className="text-xs text-slate-500">Specify Reason</span>
                    <TextareaAutosize
                      id="remarks"
                      disabled={isSubmitting}
                      className={classNames(
                        'm-0 block w-full rounded placeholder:font-light placeholder:text-slate-400',
                        'border border-solid border-slate-300 bg-white bg-clip-padding',
                        'resize-none px-3 py-1.5 text-sm font-normal text-slate-700 transition',
                        'ease-in-out focus:bg-white focus:text-slate-700 focus:outline-none',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        validationError(errors?.specify_reason)
                      )}
                      placeholder="Reason..."
                      {...register('specify_reason')}
                    />
                  </label>
                  {errors?.specify_reason !== null && errors?.specify_reason !== undefined && (
                    <span className="error">{errors?.specify_reason.message}</span>
                  )}
                </section>
              ) : (
                <></>
              )}

              {/* Time Out */}
              <section>
                <label htmlFor="remarks" className="space-y-0.5">
                  <span className="text-xs text-slate-500">Time Out</span>
                  <input
                    type="time"
                    disabled={isSubmitting}
                    className={classNames(
                      'm-0 block w-full rounded placeholder:font-light placeholder:text-slate-400',
                      'border border-solid border-slate-300 bg-white bg-clip-padding',
                      'resize-none px-3 py-2 text-xs font-normal text-slate-700 transition',
                      'clock:text-white ease-in-out focus:bg-white focus:text-slate-700 focus:outline-none',
                      'disabled:cursor-not-allowed disabled:opacity-50',
                      validationError(errors?.time_out)
                    )}
                    {...register('time_out')}
                  />
                </label>
                {errors?.time_out !== null && errors?.time_out !== undefined && (
                  <span className="error">{errors?.time_out.message}</span>
                )}
              </section>
              {/* Time In */}
              <section>
                <label htmlFor="remarks" className="space-y-0.5">
                  <span className="text-xs text-slate-500">Time In</span>
                  <input
                    type="time"
                    disabled={isSubmitting}
                    className={classNames(
                      'm-0 block w-full rounded placeholder:font-light placeholder:text-slate-400',
                      'border border-solid border-slate-300 bg-white bg-clip-padding',
                      'resize-none px-3 py-2 text-xs font-normal text-slate-700 transition',
                      'ease-in-out focus:bg-white focus:text-slate-700 focus:outline-none',
                      'disabled:cursor-not-allowed disabled:opacity-50',
                      validationError(errors?.time_in)
                    )}
                    {...register('time_in')}
                  />
                </label>
                {errors?.time_in !== null && errors?.time_in !== undefined && (
                  <span className="error">{errors?.time_in.message}</span>
                )}
              </section>
              {/* Remarks */}
              <section>
                <label htmlFor="remarks" className="space-y-0.5">
                  <span className="text-xs text-slate-500">Remarks</span>
                  <TextareaAutosize
                    id="remarks"
                    disabled={isSubmitting}
                    className={classNames(
                      'm-0 block min-h-[20vh] w-full rounded placeholder:font-light placeholder:text-slate-400',
                      'border border-solid border-slate-300 bg-white bg-clip-padding focus:ring-primary',
                      'resize-none px-3 py-1.5 text-sm font-normal text-slate-700 transition focus:border-primary',
                      'ease-in-out focus:bg-white focus:text-slate-700 focus:outline-none',
                      'disabled:cursor-not-allowed disabled:opacity-50'
                    )}
                    placeholder="Message..."
                    {...register('remarks')}
                  />
                </label>
              </section>
            </>
          ) : (
            <></>
          )}
        </main>
        {/* Footer Options */}
        <footer className="border-t border-slate-200">
          <div className="flex justify-end py-2 px-6">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleToggleWorkInterruptionDrawer}
              className={classNames(
                'disabled:cursor-not-allowed disabled:opacity-50',
                'flex items-center justify-center border-slate-200 text-xs active:scale-95',
                'w-24 border-dark-primary py-2 text-dark-primary outline-none'
              )}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !watch('power_checkbox')}
              className={classNames(
                'disabled:cursor-not-allowed disabled:opacity-50',
                'flex items-center justify-center rounded-md border active:scale-95',
                'w-24 border-dark-primary bg-primary text-xs text-white outline-none hover:bg-dark-primary'
              )}
            >
              {isSubmitting ? <SpinnerIcon className="h-4 w-4 !fill-amber-500" /> : 'Save'}
            </button>
          </div>
        </footer>
      </form>
    </DrawerTemplate>
  )
}

export default WorkInterruptionDrawer
