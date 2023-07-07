import toast from 'react-hot-toast'
import isEmpty from 'lodash/isEmpty'
import ReactSelect from 'react-select'
import React, { FC, useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { User, Save, Mail, RefreshCcw, X } from 'react-feather'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import TextField from './../TextField'
import Input from '~/components/atoms/Input'
import useEmployee from '~/hooks/useEmployee'
import { queryClient } from '~/lib/queryClient'
import useUserQuery from '~/hooks/useUserQuery'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import { NewEmployeeSchema } from '~/utils/validation'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { customStyles } from '~/utils/customReactSelectStyles'
import ModalTemplate from '~/components/templates/ModalTemplate'
import { NewEmployeeFormValues } from '~/utils/types/formValues'
import { IEmployeeInput } from '~/utils/interfaces/employeeInterface'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const AddNewEmployeeModal: FC<Props> = ({ isOpen, closeModal }): JSX.Element => {
  // USER HOOKS -> Get Positions, Get Roles
  const { getAllPositionQuery, getAllRoleQuery } = useUserQuery()
  const positionData = getAllPositionQuery()
  const roleData = getAllRoleQuery()

  // EMPLOYEE HOOKS
  const { handleAddNewEmployeeMutation } = useEmployee()
  const addEmployeeMutation = handleAddNewEmployeeMutation()

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<NewEmployeeFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(NewEmployeeSchema)
  })

  // This will handle Submit and Save New Overtime
  const handleSave: SubmitHandler<NewEmployeeFormValues> = async (data): Promise<void> => {
    return await new Promise((resolve) => {
      const request: IEmployeeInput = {
        email: data.email,
        firstName: data.first_name,
        middleName: data.middle_name ?? '',
        lastName: data.last_name,
        positionId: parseInt(data.position.value),
        roleId: parseInt(data.role.value)
      }

      addEmployeeMutation.mutate(request, {
        onSuccess: () => {
          // TODO: Please Specify the query key of all Employee
          void queryClient.invalidateQueries().then(() => {
            toast.success('Added New Employee Successfully!')
            resolve()
            closeModal()
          })
        }
      })
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
    const emptySelect = {
      value: '',
      label: ''
    }
    reset({
      email: '',
      position: emptySelect,
      role: emptySelect,
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
      className="w-full max-w-[430px]"
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
            <TextField title="Position" Icon={Mail} isRequired className="flex-1">
              <Controller
                name="position"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    isClearable
                    placeholder=""
                    className="w-full"
                    styles={customStyles}
                    classNames={{
                      control: (state) =>
                        state.isFocused
                          ? 'border-primary'
                          : !isEmpty(errors.position)
                          ? 'border-rose-500 ring-rose-500'
                          : 'border-slate-300'
                    }}
                    value={field.value}
                    onChange={field.onChange}
                    isLoading={positionData.isLoading}
                    isDisabled={isSubmitting || positionData.isLoading}
                    options={positionData.data}
                  />
                )}
              />
            </TextField>
            {errors.position !== null && errors.position !== undefined && (
              <span className="error text-[10px]">Position is required</span>
            )}
          </section>

          {/* Role */}
          <section className="col-span-2 overflow-visible">
            <TextField title="Role" isRequired className="flex-1">
              <Controller
                name="role"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    isClearable
                    placeholder=""
                    className="w-full"
                    styles={customStyles}
                    classNames={{
                      control: (state) =>
                        state.isFocused
                          ? 'border-primary'
                          : !isEmpty(errors.role)
                          ? 'border-rose-500 ring-rose-500'
                          : 'border-slate-300'
                    }}
                    value={field.value}
                    onChange={field.onChange}
                    isLoading={roleData.isLoading}
                    isDisabled={isSubmitting || roleData.isLoading}
                    options={roleData.data}
                  />
                )}
              />
            </TextField>
            {errors.role !== null && errors.role !== undefined && (
              <span className="error text-[10px]">Role is required</span>
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
            type="button"
            variant="secondary"
            onClick={handleReset}
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-4 py-1 text-sm"
          >
            <RefreshCcw className="h-4 w-4" />
            <span>Reset</span>
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={closeModal}
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-4 py-1 text-sm"
          >
            <X className="h-4 w-4" />
            <span>Close</span>
          </Button>
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
