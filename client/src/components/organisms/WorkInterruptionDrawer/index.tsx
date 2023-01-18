import React, { FC } from 'react'
import { X } from 'react-feather'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import Text from '~/components/atoms/Text'
import Avatar from '~/components/atoms/Avatar'
import DrawerTemplate from '~/components/templates/DrawerTemplate'

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
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ mode: 'onChange' })

  function handleonSubmit() {}
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
      <form className="h-screen" onSubmit={handleSubmit(handleonSubmit)}>
        {/* Body */}
        <div className="flex flex-col space-y-3 px-4 py-2">
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
          <div className="form-group space-y-2">
            <div>
              <label htmlFor="remarks" className="space-y-0.5">
                <span className="text-xs text-slate-500">Work Interruption</span>
                <div className="flex justify-center">
                  <select
                    className={classNames(
                      'm-0 block w-full rounded placeholder:font-light placeholder:text-slate-400',
                      'border border-solid border-slate-300 bg-white bg-clip-padding focus:ring-primary',
                      'resize-none px-3 py-1.5 text-sm font-normal text-slate-700 transition focus:border-primary',
                      'ease-in-out focus:bg-white focus:text-slate-700 focus:outline-none'
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
            </div>
          </div>

          {/* Others */}
          <div className="form-group space-y-2">
            <div>
              <label htmlFor="remarks" className="space-y-0.5">
                <span className="text-xs text-slate-500">Specify Reason</span>
                <TextareaAutosize
                  id="remarks"
                  className={classNames(
                    'm-0 block w-full rounded placeholder:font-light placeholder:text-slate-400',
                    'border border-solid border-slate-300 bg-white bg-clip-padding focus:ring-primary',
                    'resize-none px-3 py-1.5 text-sm font-normal text-slate-700 transition focus:border-primary',
                    'ease-in-out focus:bg-white focus:text-slate-700 focus:outline-none'
                  )}
                  placeholder="Reason..."
                  {...register('reason', { required: true })}
                />
                {errors.reason && (
                  <p className="text-xs font-medium text-rose-500">Field is required</p>
                )}
              </label>
            </div>
          </div>

          {/* Time Out */}
          <div className="form-group space-y-2">
            <div>
              <label htmlFor="remarks" className="space-y-0.5">
                <span className="text-xs text-slate-500">Time Out</span>
                <input
                  type="time"
                  className={classNames(
                    'm-0 block w-full rounded placeholder:font-light placeholder:text-slate-400',
                    'border border-solid border-slate-300 bg-white bg-clip-padding focus:ring-primary',
                    'resize-none px-3 py-1.5 text-sm font-normal text-slate-700 transition focus:border-primary',
                    'clock:text-white ease-in-out focus:bg-white focus:text-slate-700 focus:outline-none'
                  )}
                  {...register('timeOut', { required: true })}
                />
                {errors.timeOut && (
                  <p className="text-xs font-medium text-rose-500">Field is required</p>
                )}
              </label>
            </div>
          </div>
          {/* Time In */}
          <div className="form-group space-y-2">
            <div>
              <label htmlFor="remarks" className="space-y-0.5">
                <span className="text-xs text-slate-500">Time In</span>
                <input
                  type="time"
                  className={classNames(
                    'm-0 block w-full rounded placeholder:font-light placeholder:text-slate-400',
                    'border border-solid border-slate-300 bg-white bg-clip-padding focus:ring-primary',
                    'resize-none px-3 py-1.5 text-sm font-normal text-slate-700 transition focus:border-primary',
                    'ease-in-out focus:bg-white focus:text-slate-700 focus:outline-none'
                  )}
                  {...register('timeIn', { required: true })}
                />
                {errors.timeIn && (
                  <p className="text-xs font-medium text-rose-500">Field is required</p>
                )}
              </label>
            </div>
          </div>
          {/* Remarks */}
          <div className="form-group space-y-2">
            <div>
              <label htmlFor="remarks" className="space-y-0.5">
                <span className="text-xs text-slate-500">Remarks</span>
                <TextareaAutosize
                  id="remarks"
                  className={classNames(
                    'm-0 block min-h-[20vh] w-full rounded placeholder:font-light placeholder:text-slate-400',
                    'border border-solid border-slate-300 bg-white bg-clip-padding focus:ring-primary',
                    'resize-none px-3 py-1.5 text-sm font-normal text-slate-700 transition focus:border-primary',
                    'ease-in-out focus:bg-white focus:text-slate-700 focus:outline-none'
                  )}
                  placeholder="Message..."
                  {...register('remarks', { required: true })}
                />
                {errors.remarks && (
                  <p className="text-xs font-medium text-rose-500">Field is required</p>
                )}
              </label>
            </div>
          </div>
        </div>
        {/* Footer Options */}
        <section
          className="fixed inset-x-0
             bottom-0 mt-auto border-t border-slate-200"
        >
          <div className="flex justify-end py-2 px-4">
            <button
              type="button"
              onClick={handleToggleWorkInterruptionDrawer}
              className={classNames(
                'flex items-center justify-center border-slate-200 text-xs active:scale-95',
                'w-24 border-dark-primary py-2 text-dark-primary outline-none'
              )}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={classNames(
                'flex items-center justify-center rounded-md border active:scale-95',
                'w-24 border-dark-primary bg-primary text-xs text-white outline-none hover:bg-dark-primary'
              )}
            >
              Save
            </button>
          </div>
        </section>
      </form>
    </DrawerTemplate>
  )
}

export default WorkInterruptionDrawer
