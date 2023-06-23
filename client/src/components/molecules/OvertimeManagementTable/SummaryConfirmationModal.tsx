import React, { FC } from 'react'
import classNames from 'classnames'
import { PulseLoader } from 'react-spinners'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MessageCircle, ThumbsDown, ThumbsUp, X } from 'react-feather'

import TextField from '../TextField'
import useOvertime from '~/hooks/useOvertime'
import useUserQuery from '~/hooks/useUserQuery'
import Button from '~/components/atoms/Buttons/Button'
import { IOvertimeManagement } from '~/utils/interfaces'
import ReactTextareaAutosize from 'react-textarea-autosize'
import ModalTemplate from '~/components/templates/ModalTemplate'
import ButtonAction from '~/components/atoms/Buttons/ButtonAction'
import { ApproveSummaryConfirmationSchema } from '~/utils/validation'
import { IManagerApproveOvertimeRequestInput } from '~/utils/types/overtimeTypes'

type Props = {
  isOpen: boolean
  closeModal: () => void
  summary: IOvertimeManagement[] | undefined
  state: boolean
}

type ApproveFormValues = {
  managerRemarks: string
}

const SummaryConfirmationModal: FC<Props> = ({
  isOpen,
  closeModal,
  summary,
  state
}): JSX.Element => {
  const { handleManagerApproveOvertimesSummaryMutation } = useOvertime()
  const approveOvertimeSummaryMutation = handleManagerApproveOvertimesSummaryMutation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ApproveFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(ApproveSummaryConfirmationSchema)
  })

  const { handleUserQuery } = useUserQuery()
  const { data: user, isLoading: userLoading } = handleUserQuery()
  const id = user?.userById.id

  // This will handle Submit and Save New Overtime
  const handleSave: SubmitHandler<ApproveFormValues> = async (data): Promise<void> => {
    if (summary !== undefined) {
      const mappedOvertimeSummary = summary?.map((x) => {
        const mapped: IManagerApproveOvertimeRequestInput = {
          userId: id as number,
          overtimeId: x.id,
          approvedMinutes: x.requestedMinutes,
          isApproved: state,
          managerRemarks: data.managerRemarks
        }
        return mapped
      })
      await approveOvertimeSummaryMutation.mutateAsync(mappedOvertimeSummary, {
        onSuccess: () => {
          void closeModal()
        }
      })
    }
  }

  const statement = 'Do you want to approve the requested overtime summary?'

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
        <main className="py-6 px-7 text-xs">
          <section className="flex w-full flex-row-reverse items-start justify-between">
            <Button
              type="button"
              rounded="full"
              onClick={closeModal}
              className="flex p-2 text-slate-600 transition duration-150 ease-in-out hover:bg-slate-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </section>

          <h3 className="text-sm font-normal text-slate-600">{statement}</h3>
          {/* Remarks */}
          <section className="col-span-2 mt-4">
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
            </TextField>
            {errors.managerRemarks !== null && errors.managerRemarks !== undefined && (
              <span className="error text-[10px]">{errors.managerRemarks?.message}</span>
            )}
          </section>
          <ButtonAction
            type="submit"
            variant={state ? 'success' : 'danger'}
            disabled={isSubmitting || userLoading}
            className="relative mt-4 flex w-full items-center justify-center space-x-2 px-5 py-2 text-sm"
          >
            {isSubmitting ? (
              <PulseLoader color="#fff" size={8} className="py-1" />
            ) : (
              <>
                {state ? (
                  <>
                    <ThumbsUp className="absolute left-4 h-5 w-5" />
                    <span>Approve</span>{' '}
                  </>
                ) : (
                  <>
                    <ThumbsDown className="absolute left-4 h-5 w-5" />
                    <span>Disapprove</span>
                  </>
                )}
              </>
            )}
          </ButtonAction>
        </main>
      </form>
    </ModalTemplate>
  )
}

SummaryConfirmationModal.defaultProps = {}

export default SummaryConfirmationModal
