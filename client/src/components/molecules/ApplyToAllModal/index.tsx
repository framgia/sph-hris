import React, { FC } from 'react'
import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import { useForm } from 'react-hook-form'
import { CheckSquare } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'

import Input from '~/components/atoms/Input'
import { ApplyToAllSchema } from '~/utils/validation'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { TimeEntryWithBreak } from '~/utils/types/formValues'
import ModalTemplate from '~/components/templates/ModalTemplate'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'

type Props = {
  isOpen: boolean
  closeModal: () => void
  actions: {
    handleApplyToAll: (data: TimeEntryWithBreak) => void
  }
}

const ApplyToAllModal: FC<Props> = (props): JSX.Element => {
  const {
    isOpen,
    closeModal,
    actions: { handleApplyToAll }
  } = props

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TimeEntryWithBreak>({
    resolver: yupResolver(ApplyToAllSchema),
    mode: 'onChange'
  })

  const handleReset = (): void => {
    reset({
      timeIn: '',
      timeOut: '',
      breakFrom: '',
      breakTo: ''
    })
  }

  const isValidated =
    !isEmpty(errors?.timeIn) ||
    !isEmpty(errors?.timeOut) ||
    !isEmpty(errors?.breakFrom) ||
    !isEmpty(errors?.breakTo)

  return (
    <ModalTemplate
      {...{
        isOpen,
        closeModal
      }}
      className="w-full max-w-xs md:max-w-[620px]"
    >
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(handleApplyToAll)}
      >
        {/* Custom Modal Header */}
        <ModalHeader
          {...{
            title: 'Apply To All',
            Icon: CheckSquare,
            closeModal
          }}
        />
        <div className="mb-2 flex flex-col items-center justify-center space-y-4 px-4 py-4 text-[13px] md:flex-row md:space-y-0 md:space-x-4">
          <label className="inline-flex flex-col space-y-2">
            <span className="shrink-0">Time In/Out</span>
            <div className="flex flex-col gap-y-2 gap-x-2 lg:flex-row lg:items-start">
              <div className={classNames('flex items-center gap-x-2', isValidated ? 'mb-5' : '')}>
                <div className="relative">
                  <Input
                    type="time"
                    rounded="lg"
                    color="warning"
                    {...register('timeIn')}
                    iserror={!isEmpty(errors?.timeIn)}
                    className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                  />
                  {!isEmpty(errors?.timeIn) && (
                    <p className="error absolute">{errors?.timeIn.message}</p>
                  )}
                </div>
                <span>to</span>
                <div className="relative">
                  <Input
                    type="time"
                    rounded="lg"
                    color="warning"
                    {...register('timeOut')}
                    iserror={!isEmpty(errors?.timeOut)}
                    className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                  />
                  {!isEmpty(errors?.timeOut) && (
                    <p className="error absolute">{errors?.timeOut.message}</p>
                  )}
                </div>
              </div>
            </div>
          </label>
          <label className="inline-flex flex-col space-y-2">
            <span className="shrink-0">Break</span>
            <div className="flex flex-col gap-y-2 gap-x-2 lg:flex-row lg:items-start">
              <div className={classNames('flex items-center gap-x-2', isValidated ? 'mb-5' : '')}>
                <div className="relative">
                  <Input
                    type="time"
                    rounded="lg"
                    color="warning"
                    {...register('breakFrom')}
                    iserror={!isEmpty(errors?.breakFrom)}
                    className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                  />
                  {!isEmpty(errors?.breakFrom) && (
                    <p className="error absolute">{errors?.breakFrom.message}</p>
                  )}
                </div>
                <span>to</span>
                <div className="relative">
                  <Input
                    type="time"
                    rounded="lg"
                    color="warning"
                    {...register('breakTo')}
                    iserror={!isEmpty(errors?.breakTo)}
                    className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                  />
                  {!isEmpty(errors?.breakTo) && (
                    <p className="error absolute">{errors?.breakTo.message}</p>
                  )}
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Custom Modal Footer Style */}
        <ModalFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            className="px-5 py-1.5 text-xs md:px-8"
          >
            Reset
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={closeModal}
            className="px-5 py-1.5 text-xs md:px-8"
          >
            Close
          </Button>
          <Button type="submit" variant="primary" className="px-5 py-1.5 text-xs md:px-8">
            <span>Save</span>
          </Button>
        </ModalFooter>
      </form>
    </ModalTemplate>
  )
}

export default ApplyToAllModal
