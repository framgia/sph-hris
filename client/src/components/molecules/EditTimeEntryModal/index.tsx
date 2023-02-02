import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import React, { FC, useEffect } from 'react'
import { Edit, Save, X } from 'react-feather'

import Button from '~/components/atoms/Buttons/ButtonAction'
import { TimeEntryFormValues } from '~/utils/types/formValues'
import ModalTemplate from '~/components/templates/ModalTemplate'
import useUpdateTimeEntryMutation from '~/hooks/useTimeEntryMutation'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'

type Props = {
  isOpen: boolean
  timeEntry: {
    id: number
    timeIn: string
    timeOut: string
  }
  user: {
    id: number
    name: string
  }
  closeModal: () => void
}

const EditTimeEntriesModal: FC<Props> = ({ isOpen, timeEntry, user, closeModal }): JSX.Element => {
  const { handleUpdateTimeEntryMutation } = useUpdateTimeEntryMutation()
  const updateTimeEntry = handleUpdateTimeEntryMutation()

  const handleSave = (data: TimeEntryFormValues): void => {
    updateTimeEntry.mutate({
      updatedTimeEntry: {
        userId: user.id,
        timeEntryId: timeEntry.id,
        timeIn: data.time_in,
        timeOut: data.time_out !== '' ? data.time_out : null
      }
    })
    closeModal()
  }

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<TimeEntryFormValues>({
    mode: 'onTouched'
  })

  useEffect(() => {
    if (isOpen) {
      reset({
        time_in: timeEntry.timeIn,
        time_out: timeEntry.timeOut
      })
    }
  }, [isOpen])

  return (
    <ModalTemplate
      {...{
        isOpen,
        closeModal
      }}
      className="w-full max-w-md"
    >
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(handleSave)}
      >
        {/* Custom Modal Header */}
        <ModalHeader
          {...{
            title: `${user.name}'s DTR`,
            Icon: Edit,
            closeModal
          }}
        />
        <div className="space-y-3 px-6 py-4">
          <div className="grid grid-cols-2 gap-x-6 px-4 py-4">
            <div>
              <label htmlFor="timeIn" className="space-y-0.5">
                <p className="text-xs text-slate-500">Time In</p>
                <input
                  type="time"
                  id="timeIn"
                  className={classNames(
                    'block w-full rounded placeholder:font-light placeholder:text-slate-400',
                    'border border-solid border-slate-300 bg-white bg-clip-padding',
                    'resize-none px-3 py-3 text-xs font-normal text-slate-700 transition',
                    'clock:text-white ease-in-out focus:bg-white focus:text-slate-700',
                    'disabled:cursor-not-allowed disabled:opacity-50'
                  )}
                  {...register('time_in')}
                  disabled={isSubmitting}
                />
              </label>
            </div>
            <div>
              <label htmlFor="timeOut" className="space-y-0.5">
                <p className="text-xs text-slate-500">Time Out</p>
                <input
                  type="time"
                  id="timeOut"
                  className={classNames(
                    'block w-full rounded placeholder:font-light placeholder:text-slate-400',
                    'border border-solid border-slate-300 bg-white bg-clip-padding',
                    'resize-none px-3 py-3 text-xs font-normal text-slate-700 transition',
                    'clock:text-white ease-in-out focus:bg-white focus:text-slate-700',
                    'disabled:cursor-not-allowed disabled:opacity-50'
                  )}
                  {...register('time_out')}
                  disabled={isSubmitting}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Custom Modal Footer Style */}
        <ModalFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={closeModal}
            className="relative flex items-center space-x-1 py-1 px-7 text-sm"
            disabled={isSubmitting}
          >
            <X className="absolute left-2.5 h-4 w-4" />
            <span>Close</span>
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="relative flex items-center space-x-2 py-1 px-7 text-sm"
            disabled={isSubmitting}
          >
            <Save className="absolute left-2.5 h-4 w-4" />
            <span>Save</span>
          </Button>
        </ModalFooter>
      </form>
    </ModalTemplate>
  )
}

EditTimeEntriesModal.defaultProps = {}

export default EditTimeEntriesModal
