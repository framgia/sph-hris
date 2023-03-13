import { useForm } from 'react-hook-form'
import React, { FC, useEffect } from 'react'
import { Check, Clock, X } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'

import TextField from './../TextField'
import Text from '~/components/atoms/Text'
import Input from '~/components/atoms/Input'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { ApproveConfirmationSchema } from '~/utils/validation'
import { IOvertimeManagementManager } from '~/utils/interfaces'
import ModalTemplate from '~/components/templates/ModalTemplate'
import { NewOvertimeFormValues } from '~/utils/types/formValues'
import useOvertime from '~/hooks/useOvertime'
import useUserQuery from '~/hooks/useUserQuery'

type Props = {
  isOpen: boolean
  closeModal: () => void
  row: IOvertimeManagementManager
}

const ApproveConfirmationModal: FC<Props> = ({ isOpen, closeModal, row }): JSX.Element => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Required<Pick<NewOvertimeFormValues, 'requested_minutes'>>>({
    mode: 'onTouched',
    resolver: yupResolver(ApproveConfirmationSchema)
  })

  const { handleUserQuery } = useUserQuery()
  const { data: user, isLoading: userLoading } = handleUserQuery()

  const { handleManagerApproveOvertimeMutation } = useOvertime()
  const approveOvertimeMutation = handleManagerApproveOvertimeMutation()

  // This will handle Submit and Save New Overtime
  const handleSave = async (
    data: Required<Pick<NewOvertimeFormValues, 'requested_minutes'>>
  ): Promise<void> => {
    return await new Promise((resolve) => {
      approveOvertimeMutation.mutate(
        {
          userId: user?.userById.id as number,
          overtimeId: row.id,
          approvedMinutes: data.requested_minutes,
          isApproved: true
        },
        {
          onSuccess: () => closeModal()
        }
      )

      resolve()
    })
  }

  // This will reset all form values
  useEffect(() => {
    if (isOpen) {
      reset({
        requested_minutes: row.requestedMinutes
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
        className="space-y-6 px-8 py-6 text-xs"
      >
        <Text theme="lg" weight="semibold" className="text-slate-7s00">
          Do you approve the requested overtime for the Project{' '}
          {row.projects.map((project, index) => (
            <span key={index}>{`${project.project_name.label}, `}</span>
          ))}
          of <span className="text-amber-800 underline">{row.user.name}?</span>
        </Text>
        {/* Requested minutes */}
        <section className="col-span-2 md:col-span-1">
          <TextField title="Minutes to approve" Icon={Clock} isRequired className="flex-1">
            <Input
              type="text"
              disabled={isSubmitting}
              placeholder=""
              {...register('requested_minutes')}
              className="py-2.5 pl-11 text-xs"
              iserror={errors.requested_minutes !== null && errors?.requested_minutes !== undefined}
            />
          </TextField>
          {errors?.requested_minutes !== null && errors?.requested_minutes !== undefined && (
            <span className="error text-[10px]">{errors.requested_minutes?.message}</span>
          )}
        </section>
        <footer className="flex items-center space-x-4">
          <Button
            type="submit"
            variant="success"
            disabled={isSubmitting || userLoading}
            className="relative flex w-full items-center justify-center space-x-2 px-5 py-2 text-sm"
          >
            {isSubmitting ? (
              <>
                <SpinnerIcon className="h-3 w-3 fill-amber-600" />
                <span>Approving..</span>
              </>
            ) : (
              <>
                <Check className="absolute left-4 h-4 w-4" />
                <span>Approve</span>
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={closeModal}
            disabled={isSubmitting}
            className="relative flex w-full items-center justify-center space-x-2 px-4 py-2 text-sm"
          >
            <X className="absolute left-4 h-4 w-4" />
            <span>Cancel</span>
          </Button>
        </footer>
      </form>
    </ModalTemplate>
  )
}

ApproveConfirmationModal.defaultProps = {}

export default ApproveConfirmationModal
