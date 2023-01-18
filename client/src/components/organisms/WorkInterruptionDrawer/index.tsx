import { X } from 'react-feather'
import classNames from 'classnames'
import React, { FC, useEffect } from 'react'
import { FieldError, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import TextareaAutosize from 'react-textarea-autosize'

import Text from '~/components/atoms/Text'
import Avatar from '~/components/atoms/Avatar'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import { ConfirmInterruptionSchema } from '~/utils/validation'
import DrawerTemplate from '~/components/templates/DrawerTemplate'
import { ConfirmInterruptionValues } from '~/utils/types/formValues'

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

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ConfirmInterruptionValues>({
    mode: 'onTouched',
    resolver: yupResolver(ConfirmInterruptionSchema)
  })

  // This will handle Save Work Interruption
  const handleSave = async (data: ConfirmInterruptionValues): Promise<void> => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
        handleToggleWorkInterruptionDrawer()
        alert(JSON.stringify(data, null, 2))
      }, 2000)
    })
  }

  useEffect(() => {
    if (isOpenWorkInterruptionDrawer) {
      reset({
        specify_reason: '',
        time_in: '',
        time_out: '',
        remarks: ''
      })
    }
  }, [isOpenWorkInterruptionDrawer])

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
      <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
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
        <main className="flex flex-col space-y-3 px-4 py-2">
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
                Joshua Galit
              </Text>
              <p className="text-[11px] leading-tight text-slate-500">Clocking from GMT +8</p>
              <p className="text-[11px] leading-tight text-slate-500">Last in a few seconds ago</p>
              <p className="text-[11px] leading-tight text-slate-500">Split time: 12:00 am</p>
            </div>
          </div>
          {/* Error Message */}
          <div className="relative flex items-center justify-center rounded-md border border-rose-400 bg-rose-50 py-2.5 px-4 shadow-md">
            <X className="absolute left-4 h-4 w-4 rounded-full bg-rose-500 p-0.5 text-white" />
            <p className="text-xs font-medium text-rose-500">Something went wrong</p>
          </div>
          {/* Work Interruption DropDown */}
          <section>
            <label htmlFor="remarks" className="space-y-0.5">
              <span className="text-xs text-slate-500">Work Interruption</span>
              <div className="flex justify-center">
                <select
                  {...register('work_interruption')}
                  disabled={isSubmitting}
                  className={classNames(
                    'm-0 block w-full rounded placeholder:font-light placeholder:text-slate-400',
                    'border border-solid border-slate-300 bg-white bg-clip-padding focus:ring-primary',
                    'resize-none px-3 py-2 text-xs font-normal text-slate-700 transition focus:border-primary',
                    'ease-in-out focus:bg-white focus:text-slate-700 focus:outline-none',
                    'disabled:cursor-not-allowed disabled:opacity-50'
                  )}
                  aria-label="Default select example"
                >
                  <option value="1">Power Interruption</option>
                  <option value="2">Lost Internet Connection</option>
                  <option value="3">Emergency</option>
                  <option value="4">Errands</option>
                  <option value="5">Others</option>
                </select>
              </div>
            </label>
          </section>

          {/* Others */}
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
        </main>
        {/* Footer Options */}
        <footer className="border-t border-slate-200">
          <div className="flex justify-end py-2 px-4">
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
              disabled={isSubmitting}
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
