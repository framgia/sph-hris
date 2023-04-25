import React, { FC } from 'react'
import toast from 'react-hot-toast'
import isEmpty from 'lodash/isEmpty'
import ReactSelect from 'react-select'
import { UserPlus } from 'react-feather'
import { PulseLoader } from 'react-spinners'
import makeAnimated from 'react-select/animated'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { AddScheduleMemberSchema } from '~/utils/validation'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { customStyles } from '~/utils/customReactSelectStyles'
import ModalTemplate from '~/components/templates/ModalTemplate'
import { AddScheduleMemberFormValues } from '~/utils/types/formValues'
import { scheduleMembers } from '~/utils/constants/dummyScheduleMembers'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import { generateMemberSelect } from '~/utils/helpers/scheduleMemberHelpers'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const animatedComponents = makeAnimated()

const AddScheduleMembersModal: FC<Props> = ({ isOpen, closeModal }): JSX.Element => {
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
    return await new Promise((resolve) => {
      setTimeout(() => {
        closeModal()
        resolve()
        toast.success('Added New Member(s) Successfully')
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
                  options={generateMemberSelect(scheduleMembers)}
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
