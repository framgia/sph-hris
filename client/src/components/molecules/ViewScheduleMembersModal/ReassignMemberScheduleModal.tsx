import router from 'next/router'
import React, { FC } from 'react'
import isEmpty from 'lodash/isEmpty'
import ReactSelect from 'react-select'
import { Calendar } from 'react-feather'
import { PulseLoader } from 'react-spinners'
import makeAnimated from 'react-select/animated'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import useUserQuery from '~/hooks/useUserQuery'
import { ReassignScheduleSchema } from '~/utils/validation'
import Button from '~/components/atoms/Buttons/ButtonAction'
import useEmployeeSchedule from '~/hooks/useEmployeeSchedule'
import { customStyles } from '~/utils/customReactSelectStyles'
import ModalTemplate from '~/components/templates/ModalTemplate'
import { ReassigneScheduleFormValues } from '~/utils/types/formValues'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import { IScheduleMember } from '~/utils/interfaces/scheduleMemberInterface'
import {
  IGetAllEmployeeSchedule,
  IReassignEmployeesScheduleRequestInput
} from '~/utils/types/employeeScheduleTypes'
import { generateScheduleSelect } from '~/utils/helpers/scheduleMemberHelpers'

type Props = {
  isOpen: boolean
  closeModal: () => void
  member: IScheduleMember
}

const animatedComponents = makeAnimated()

const ReassignMemberScheduleModal: FC<Props> = ({ isOpen, closeModal, member }): JSX.Element => {
  const { handleUserQuery } = useUserQuery()
  const { getAllEmployeeScheduleQuery, handleReassignEmployeeScheduleMutation } =
    useEmployeeSchedule()
  const reassignEmployeeScheduleMutation = handleReassignEmployeeScheduleMutation()
  const { data, isLoading } = getAllEmployeeScheduleQuery()
  const scheduleList = data?.allEmployeeScheduleDetails
  const { data: currentUser } = handleUserQuery()
  const currentUserId = currentUser?.userById.id as Number
  const { id: scheduleId } = router.query

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ReassigneScheduleFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(ReassignScheduleSchema)
  })

  // modify custom style control
  customStyles.control = (provided: Record<string, unknown>, state: any): any => ({
    ...provided,
    boxShadow: 'none',
    borderColor: 'none',
    '&:hover': {
      color: '#75c55e'
    }
  })

  const handleSave: SubmitHandler<ReassigneScheduleFormValues> = async (data): Promise<void> => {
    return await new Promise((resolve) => {
      const request: IReassignEmployeesScheduleRequestInput = {
        userId: Number(currentUserId),
        employeeId: Number(member.id),
        scheduleId: Number(data.schedule.value)
      }
      reassignEmployeeScheduleMutation.mutate(request, {
        onSettled: () => {
          closeModal()
          resolve()
        }
      })
    })
  }

  return (
    <ModalTemplate
      {...{
        isOpen,
        closeModal
      }}
      className="w-full max-w-xl overflow-visible"
    >
      <ModalHeader
        {...{
          isOpen,
          closeModal,
          Icon: Calendar,
          hasBorder: false,
          title: `Reassign Schedule (${member.name})`
        }}
        className="px-7 py-4"
      />
      <main className="px-7 pb-4 text-sm">
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(handleSave)}
        >
          <section className="text-xs">
            <Controller
              name="schedule"
              control={control}
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  isClearable
                  placeholder=""
                  className="w-full"
                  classNames={{
                    control: (state) =>
                      state.isFocused
                        ? 'border-primary'
                        : !isEmpty(errors.schedule)
                        ? 'border-rose-500 ring-rose-500'
                        : 'border-slate-300'
                  }}
                  value={field.value}
                  styles={customStyles}
                  onChange={field.onChange}
                  isDisabled={isSubmitting}
                  backspaceRemovesValue={true}
                  components={animatedComponents}
                  isLoading={isLoading || isSubmitting}
                  options={generateScheduleSelect(
                    scheduleList?.filter(
                      (x) => Number(x.id) !== Number(scheduleId)
                    ) as IGetAllEmployeeSchedule[]
                  )}
                />
              )}
            />
            {!isEmpty(errors.schedule) && (
              <span className="error text-[11px]">Schedule is required</span>
            )}
          </section>
          <section className="flex justify-end py-2">
            <Button variant="primary" disabled={isSubmitting} className="py-1.5 px-6">
              {isSubmitting ? <PulseLoader color="#fff" size={8} /> : 'Add'}
            </Button>
          </section>
        </form>
      </main>
    </ModalTemplate>
  )
}

export default ReassignMemberScheduleModal
