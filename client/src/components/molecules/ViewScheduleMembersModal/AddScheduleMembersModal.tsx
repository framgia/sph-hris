import router from 'next/router'
import React, { FC } from 'react'
import isEmpty from 'lodash/isEmpty'
import ReactSelect from 'react-select'
import { UserPlus } from 'react-feather'
import { PulseLoader } from 'react-spinners'
import makeAnimated from 'react-select/animated'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { User } from '~/utils/types/userTypes'
import useUserQuery from '~/hooks/useUserQuery'
import { AddScheduleMemberSchema } from '~/utils/validation'
import Button from '~/components/atoms/Buttons/ButtonAction'
import useEmployeeSchedule from '~/hooks/useEmployeeSchedule'
import { customStyles } from '~/utils/customReactSelectStyles'
import ModalTemplate from '~/components/templates/ModalTemplate'
import { AddScheduleMemberFormValues } from '~/utils/types/formValues'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import { generateMemberSelect } from '~/utils/helpers/scheduleMemberHelpers'
import { IAddMemberToScheduleInput } from '~/utils/types/employeeScheduleTypes'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const animatedComponents = makeAnimated()

const AddScheduleMembersModal: FC<Props> = ({ isOpen, closeModal }): JSX.Element => {
  const { handleAllUsersQuery, handleUserQuery } = useUserQuery()
  const { handleAddMemberToScheduleMutation } = useEmployeeSchedule()
  const addMemberToSchedule = handleAddMemberToScheduleMutation()
  const { data: allUser } = handleAllUsersQuery()
  const { data: currentUser } = handleUserQuery()
  const { id: scheduleId } = router.query
  const currentUserId = currentUser?.userById.id as Number

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<AddScheduleMemberFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(AddScheduleMemberSchema)
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

  const handleSave: SubmitHandler<AddScheduleMemberFormValues> = async (data): Promise<void> => {
    const employeeIds: Number[] = []
    data.members.map((x) => employeeIds.push(Number(x.value)))

    return await new Promise((resolve) => {
      const data: IAddMemberToScheduleInput = {
        userId: Number(currentUserId),
        employeeIds,
        scheduleId: Number(scheduleId)
      }
      addMemberToSchedule.mutate(data, {
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
          Icon: UserPlus,
          hasBorder: false,
          title: 'Add member'
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
              name="members"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  isMulti
                  isClearable
                  placeholder=""
                  className="w-full"
                  classNames={{
                    control: (state) =>
                      state.isFocused
                        ? 'border-primary'
                        : !isEmpty(errors.members)
                        ? 'border-rose-500 ring-rose-500'
                        : 'border-slate-300'
                  }}
                  value={field.value}
                  options={generateMemberSelect(
                    allUser?.allUsers.filter(
                      (x) => Number(x.employeeScheduleId) !== Number(scheduleId)
                    ) as User[]
                  )}
                  styles={customStyles}
                  closeMenuOnSelect={false}
                  onChange={field.onChange}
                  isDisabled={isSubmitting}
                  components={animatedComponents}
                  backspaceRemovesValue={true}
                />
              )}
            />
            {!isEmpty(errors.members) && (
              <span className="error text-[11px]">{errors?.members.message}</span>
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

export default AddScheduleMembersModal
