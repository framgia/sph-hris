import React, { FC } from 'react'
import toast from 'react-hot-toast'
import isEmpty from 'lodash/isEmpty'
import ReactSelect from 'react-select'
import { Calendar } from 'react-feather'
import { PulseLoader } from 'react-spinners'
import makeAnimated from 'react-select/animated'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { ReassignScheduleSchema } from '~/utils/validation'
import Button from '~/components/atoms/Buttons/ButtonAction'
import useEmployeeSchedule from '~/hooks/useEmployeeSchedule'
import { customStyles } from '~/utils/customReactSelectStyles'
import ModalTemplate from '~/components/templates/ModalTemplate'
import { ReassigneScheduleFormValues } from '~/utils/types/formValues'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import { IScheduleMember } from '~/utils/interfaces/scheduleMemberInterface'
import { IGetAllEmployeeSchedule } from '~/utils/types/employeeScheduleTypes'
import { generateScheduleSelect } from '~/utils/helpers/scheduleMemberHelpers'

type Props = {
  isOpen: boolean
  closeModal: () => void
  member: IScheduleMember
}

const animatedComponents = makeAnimated()

const ReassignMemberScheduleModal: FC<Props> = ({ isOpen, closeModal, member }): JSX.Element => {
  // FETCH ALL SCHEDULES QUERY HOOKS
  const { getAllEmployeeScheduleQuery } = useEmployeeSchedule()

  const { data, isLoading } = getAllEmployeeScheduleQuery()
  const scheduleList = data?.allEmployeeScheduleDetails

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
      setTimeout(() => {
        closeModal()
        resolve()
        toast.success('Reassigned Successfully')
        alert(JSON.stringify(data, null, 2))
      }, 2000)
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
                  options={generateScheduleSelect(scheduleList as IGetAllEmployeeSchedule[])}
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
