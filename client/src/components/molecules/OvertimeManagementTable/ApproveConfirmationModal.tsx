import classNames from 'classnames'
import React, { FC, useEffect } from 'react'
import { PulseLoader } from 'react-spinners'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Clock, MessageCircle, ThumbsUp, X } from 'react-feather'

import TextField from './../TextField'
import { Emoji } from '~/utils/types/emoji'
import Input from '~/components/atoms/Input'
import useOvertime from '~/hooks/useOvertime'
import useUserQuery from '~/hooks/useUserQuery'
import Button from '~/components/atoms/Buttons/Button'
import handleImageError from '~/utils/handleImageError'
import EmojiPopoverPicker from './../EmojiPopoverPicker'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { ApproveConfirmationSchema } from '~/utils/validation'
import { IOvertimeManagementManager } from '~/utils/interfaces'
import ModalTemplate from '~/components/templates/ModalTemplate'
import ButtonAction from '~/components/atoms/Buttons/ButtonAction'

type Props = {
  isOpen: boolean
  closeModal: () => void
  row: IOvertimeManagementManager
}

type ApproveFormValues = {
  requested_minutes: number
  managerRemarks: string
}

const ApproveConfirmationModal: FC<Props> = ({ isOpen, closeModal, row }): JSX.Element => {
  const {
    reset,
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ApproveFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(ApproveConfirmationSchema)
  })

  const { handleUserQuery } = useUserQuery()
  const { data: user, isLoading: userLoading } = handleUserQuery()

  const { handleManagerApproveOvertimeMutation } = useOvertime()
  const approveOvertimeMutation = handleManagerApproveOvertimeMutation()

  // This will handle Submit and Save New Overtime
  const handleSave: SubmitHandler<ApproveFormValues> = async (data): Promise<void> => {
    await approveOvertimeMutation.mutateAsync(
      {
        userId: user?.userById.id as number,
        overtimeId: row.id,
        approvedMinutes: data.requested_minutes,
        isApproved: true,
        managerRemarks: data.managerRemarks
      },
      {
        onSuccess: () => closeModal()
      }
    )
  }

  // This will reset all form values
  useEffect(() => {
    if (isOpen) {
      reset({
        requested_minutes: row.requestedMinutes,
        managerRemarks: row.managerRemarks ?? ''
      })
    }
  }, [isOpen])

  const projectNames = row.projects
    .filter((project) => project.project_name.label !== '' && project.project_name.value !== '')
    .map((project) => project.project_name.label)

  const projectNamesString = projectNames.join(', ')

  const statement = `Do you want approve the requested overtime for the Project ${projectNamesString} of this person?`

  const handleEmojiSelect = (emoji: Emoji): void =>
    setValue('managerRemarks', watch('managerRemarks') + emoji.native)

  return (
    <ModalTemplate
      {...{
        isOpen,
        closeModal
      }}
      className="w-full max-w-md overflow-visible"
    >
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(handleSave)}
      >
        <main className="py-6 px-7 text-xs">
          <section className="flex items-start justify-between">
            <div className="inline-flex flex-col space-y-1">
              <img
                onError={(e) => handleImageError(e, '/images/default.png')}
                src={row.user.link}
                className="h-14 w-14 rounded-full"
                alt=""
              />
              <h1 className="text-lg font-semibold text-slate-700">{row.user.name}</h1>
            </div>
            <Button
              type="button"
              rounded="full"
              onClick={closeModal}
              className="p-2 text-slate-600 transition duration-150 ease-in-out hover:bg-slate-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </section>

          <h3 className="text-sm font-normal text-slate-600">{statement}</h3>

          {/* Requested minutes */}
          <section className="col-span-2 mt-4 md:col-span-1">
            <TextField title="Minutes to approve" Icon={Clock} isRequired className="flex-1">
              <Input
                type="text"
                disabled={isSubmitting}
                placeholder=""
                {...register('requested_minutes')}
                className="py-2.5 pl-11 text-xs"
                iserror={
                  errors.requested_minutes !== null && errors?.requested_minutes !== undefined
                }
              />
            </TextField>
            {errors?.requested_minutes !== null && errors?.requested_minutes !== undefined && (
              <span className="error text-[10px]">{errors.requested_minutes?.message}</span>
            )}
          </section>
          {/* Remarks */}
          <section className="relative col-span-2 mt-4">
            <TextField title="Remarks" Icon={MessageCircle} isRequired>
              <ReactTextareaAutosize
                id="reason"
                {...register('managerRemarks')}
                className={classNames(
                  'text-area-auto-resize pl-12',
                  errors?.managerRemarks !== null && errors.managerRemarks !== undefined
                    ? 'border-rose-500 ring-rose-500'
                    : ''
                )}
                disabled={isSubmitting}
              />
              <div className="absolute bottom-1 left-11">
                <EmojiPopoverPicker
                  {...{
                    handleEmojiSelect,
                    panelPosition: 'left-0 bottom-8'
                  }}
                />
              </div>
            </TextField>
            {errors.managerRemarks !== null && errors.managerRemarks !== undefined && (
              <span className="error text-[10px]">{errors.managerRemarks?.message}</span>
            )}
          </section>
          <ButtonAction
            type="submit"
            variant="success"
            disabled={isSubmitting || userLoading}
            className="relative mt-4 flex w-full items-center justify-center space-x-2 px-5 py-2 text-sm"
          >
            {isSubmitting ? (
              <PulseLoader color="#fff" size={8} className="py-1" />
            ) : (
              <>
                <ThumbsUp className="absolute left-4 h-5 w-5" />
                <span>Approve</span>
              </>
            )}
          </ButtonAction>
        </main>
      </form>
    </ModalTemplate>
  )
}

ApproveConfirmationModal.defaultProps = {}

export default ApproveConfirmationModal
