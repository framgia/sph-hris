import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { FC, useEffect } from 'react'
import { User, Save, Mail, Award } from 'react-feather'

import TextField from './../TextField'
import Input from '~/components/atoms/Input'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import { NewEmployeeSchema } from '~/utils/validation'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { customStyles } from '~/utils/customReactSelectStyles'
import ModalTemplate from '~/components/templates/ModalTemplate'
import { NewEmployeeFormValues } from '~/utils/types/formValues'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const AddNewEmployeeModal: FC<Props> = ({ isOpen, closeModal }): JSX.Element => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<NewEmployeeFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(NewEmployeeSchema)
  })

  // This will handle Submit and Save New Overtime
  const handleSave = async (data: NewEmployeeFormValues): Promise<void> => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify({ ...data }, null, 2))
        resolve()
      }, 2000)
    })
  }

  // modify custom style control
  customStyles.control = (provided) => ({
    ...provided,
    boxShadow: 'none',
    borderColor: 'none',
    '&:hover': {
      color: '#75c55e'
    }
  })

  // This will reset all form values
  useEffect(() => {
    if (isOpen) {
      handleReset()
    }
  }, [isOpen])

  const handleReset = (): void => {
    reset({
      email: '',
      position: '',
      first_name: '',
      middle_name: '',
      last_name: ''
    })
  }

  return (
    <ModalTemplate
      {...{
        isOpen,
        closeModal
      }}
      className="w-full max-w-[700px]"
    >
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(handleSave)}
      >
        {/* Custom Modal Header */}
        <ModalHeader
          {...{
            title: 'Add New Employee',
            closeModal
          }}
        />

        <main className="grid grid-cols-2 gap-x-4 gap-y-6 py-6 px-8 text-xs text-slate-800">
          {/* Email */}
          <section className="col-span-2 overflow-visible">
            <TextField title="Email" Icon={Mail} isRequired className="flex-1">
              <Input
                type="text"
                disabled={isSubmitting}
                placeholder=""
                {...register('email')}
                className="py-2.5 pl-11 text-xs"
                iserror={errors.email !== null && errors?.email !== undefined}
              />
            </TextField>
            {errors?.email !== null && errors?.email !== undefined && (
              <span className="error text-[10px]">{errors.email?.message}</span>
            )}
          </section>

          {/* Position */}
          <section className="col-span-2 overflow-visible">
            <TextField title="Position" Icon={Award} isRequired className="flex-1">
              <Input
                type="text"
                disabled={isSubmitting}
                placeholder=""
                {...register('position')}
                className="py-2.5 pl-11 text-xs"
                iserror={errors.position !== null && errors?.position !== undefined}
              />
            </TextField>
            {errors?.position !== null && errors?.position !== undefined && (
              <span className="error text-[10px]">{errors.position?.message}</span>
            )}
          </section>

          {/* First Name */}
          <section className="col-span-2 overflow-visible">
            <TextField title="First Name" Icon={User} isRequired className="flex-1">
              <Input
                type="text"
                disabled={isSubmitting}
                placeholder=""
                {...register('first_name')}
                className="py-2.5 pl-11 text-xs"
                iserror={errors.first_name !== null && errors?.first_name !== undefined}
              />
            </TextField>
            {errors?.first_name !== null && errors?.first_name !== undefined && (
              <span className="error text-[10px]">{errors.first_name?.message}</span>
            )}
          </section>

          {/* Middle Name */}
          <section className="col-span-2 overflow-visible">
            <TextField
              title="Middle Name"
              Icon={User}
              isOptional
              optionalText="optional"
              className="flex-1"
            >
              <Input
                type="text"
                disabled={isSubmitting}
                placeholder=""
                {...register('middle_name')}
                className="py-2.5 pl-11 text-xs"
                iserror={errors.middle_name !== null && errors?.middle_name !== undefined}
              />
            </TextField>
            {errors?.middle_name !== null && errors?.middle_name !== undefined && (
              <span className="error text-[10px]">{errors.middle_name?.message}</span>
            )}
          </section>

          {/* Last Name */}
          <section className="col-span-2 overflow-visible">
            <TextField title="Last Name" Icon={User} isRequired className="flex-1">
              <Input
                type="text"
                disabled={isSubmitting}
                placeholder=""
                {...register('last_name')}
                className="py-2.5 pl-11 text-xs"
                iserror={errors.last_name !== null && errors?.last_name !== undefined}
              />
            </TextField>
            {errors?.last_name !== null && errors?.last_name !== undefined && (
              <span className="error text-[10px]">{errors.last_name?.message}</span>
            )}
          </section>
        </main>

        {/* Custom Modal Footer Style */}
        <ModalFooter>
          <Button
            type="submit"
            variant="success"
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-5 py-1 text-sm"
          >
            {isSubmitting ? (
              <>
                <SpinnerIcon className="h-3 w-3 fill-white" />
                <span>Saving..</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save</span>
              </>
            )}
          </Button>
        </ModalFooter>
      </form>
    </ModalTemplate>
  )
}

export default AddNewEmployeeModal
