import classNames from 'classnames'
import ReactSelect from 'react-select'
import makeAnimated from 'react-select/animated'
import CreatableSelect from 'react-select/creatable'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { FC, useEffect, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { X, User, Save, Clock, Coffee, FileText, Calendar, RefreshCcw } from 'react-feather'

import TextField from './../TextField'
import useProject from '~/hooks/useProject'
import Input from '~/components/atoms/Input'
import useOvertime from '~/hooks/useOvertime'
import { Roles } from '~/utils/constants/roles'
import useUserQuery from '~/hooks/useUserQuery'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import { MyBulkOvertimeSchema } from '~/utils/validation'
import { User as UserType } from '~/utils/types/userTypes'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { customStyles } from '~/utils/customReactSelectStyles'
import ModalTemplate from '~/components/templates/ModalTemplate'
import { NewBulkOvertimeFormValues } from '~/utils/types/formValues'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import { generateProjectSelect, generateUserSelect } from '~/utils/createLeaveHelpers'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const animatedComponents = makeAnimated()

const AddNewBulkOvertimeModal: FC<Props> = ({ isOpen, closeModal }): JSX.Element => {
  const [members, setMembers] = useState<UserType[]>([])
  const [managers, setManagers] = useState<UserType[]>([])

  // PROJECT QUERY HOOKS
  const { handleProjectQuery } = useProject()
  const { data: projects } = handleProjectQuery()

  // USERS QUERY HOOKS
  const { handleAllUsersQuery } = useUserQuery()
  const { data: users, isSuccess: isUsersSuccess } = handleAllUsersQuery()

  const { handleBulkOvertimeMutation } = useOvertime()
  const bulkOvertimeMutation = handleBulkOvertimeMutation()

  useEffect(() => {
    if (isUsersSuccess) {
      const tempManager = users.allUsers.filter((user) => user.role.name === Roles.MANAGER)
      setManagers([...tempManager])
      const tempMember = users.allUsers.filter((user) => user.role.name !== Roles.MANAGER)
      setMembers([...tempMember])
    }
  }, [isUsersSuccess])

  const emptyReactSelectOption = {
    label: '',
    value: ''
  }

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<NewBulkOvertimeFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(MyBulkOvertimeSchema)
  })

  // This will handle Submit and Save New Overtime
  const handleSave = async (data: NewBulkOvertimeFormValues): Promise<void> => {
    return await new Promise((resolve) => {
      bulkOvertimeMutation.mutate(
        {
          managerId: parseInt(data.manager.value),
          date: data.date_effective,
          otherProject: data.project.__isNew__ === true ? data.project.value : null,
          projectId: parseInt(data.project.value),
          requestedMinutes: data.requested_minutes,
          remarks: data.remarks,
          employeeIds: data.members.map((member) => parseInt(member.value))
        },
        {
          onSuccess: () => {
            closeModal()
          },
          onSettled: () => {
            resolve()
          }
        }
      )
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
      project: emptyReactSelectOption,
      members: [],
      manager: emptyReactSelectOption,
      remarks: '',
      date_effective: '',
      requested_minutes: null as unknown as number
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
            title: 'Add New Bulk Overtime',
            closeModal
          }}
        />

        <main className="grid grid-cols-2 gap-x-4 gap-y-6 py-6 px-8 text-xs text-slate-800">
          {/* Projects */}
          <div
            className={classNames(
              'col-span-2 flex w-full flex-wrap items-end justify-between',
              ' space-y-4 sm:space-x-2 md:space-y-0',
              (errors?.project !== null && errors?.project !== undefined) ||
                (errors?.manager !== null && errors?.manager !== undefined)
                ? 'pb-4'
                : ''
            )}
          >
            <section className="w-full flex-1">
              <TextField title="Project" Icon={Coffee} isRequired>
                <Controller
                  name="project"
                  control={control}
                  render={({ field }) => {
                    return (
                      <CreatableSelect
                        {...field}
                        isClearable
                        placeholder=""
                        styles={customStyles}
                        closeMenuOnSelect={true}
                        isDisabled={isSubmitting}
                        classNames={{
                          control: (state) =>
                            state.isFocused
                              ? 'border-primary'
                              : errors.project !== null && errors.project !== undefined
                              ? 'border-rose-500 ring-rose-500'
                              : 'border-slate-300'
                        }}
                        backspaceRemovesValue={true}
                        options={generateProjectSelect(projects?.projects as any)}
                        components={animatedComponents}
                        className="w-full"
                      />
                    )
                  }}
                />
              </TextField>
              {errors.project !== null && errors.project !== undefined && (
                <span className="error absolute text-[10px]">Project is required</span>
              )}
            </section>
            {/* Manager */}
            <section className="w-full flex-1">
              <TextField title="Manager" Icon={User} isRequired className="py-2.5 text-xs">
                <Controller
                  name="manager"
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
                            : errors.manager !== null && errors.manager !== undefined
                            ? 'border-rose-500 ring-rose-500'
                            : 'border-slate-300'
                      }}
                      value={field.value}
                      onChange={field.onChange}
                      isDisabled={isSubmitting}
                      options={generateUserSelect(managers)}
                    />
                  )}
                />
              </TextField>
              {errors.manager !== null && errors.manager !== undefined && (
                <span className="error absolute text-[10px]">Manager is required</span>
              )}
            </section>
          </div>

          {/* Members */}
          <section className="col-span-2">
            <TextField title="Members" Icon={Coffee} isRequired>
              <Controller
                name="members"
                control={control}
                render={({ field }) => {
                  return (
                    <ReactSelect
                      {...field}
                      isMulti
                      isClearable
                      placeholder=""
                      styles={customStyles}
                      closeMenuOnSelect={false}
                      isDisabled={isSubmitting}
                      classNames={{
                        control: (state) =>
                          state.isFocused
                            ? 'border-primary'
                            : errors.members !== null && errors.members !== undefined
                            ? 'border-rose-500 ring-rose-500'
                            : 'border-slate-300'
                      }}
                      backspaceRemovesValue={true}
                      options={generateUserSelect(members)}
                      components={animatedComponents}
                      className="w-full"
                    />
                  )
                }}
              />
            </TextField>
            {errors.members !== null && errors.members !== undefined && (
              <span className="error text-[10px]">{errors.members?.message}</span>
            )}
          </section>

          {/* Date Effective */}
          <section className="col-span-2 md:col-span-1">
            <TextField title="Date Effective" Icon={Calendar} isRequired className="flex-1">
              <Input
                type="date"
                placeholder=""
                {...register('date_effective')}
                className="py-2.5 pl-11 text-xs"
                iserror={errors.date_effective !== null && errors?.date_effective !== undefined}
              />
            </TextField>
            {errors?.date_effective !== null && errors?.date_effective !== undefined && (
              <span className="error text-[10px]">{errors.date_effective?.message}</span>
            )}
          </section>

          {/* Requested minutes */}
          <section className="col-span-2 md:col-span-1">
            <TextField title="Requested Minutes" Icon={Clock} isRequired className="flex-1">
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
              <span className="error text-[10px]">Requested Minutes must be number.</span>
            )}
          </section>

          {/* Remarks */}
          <section className="col-span-2">
            <TextField title="Remarks" Icon={FileText} isRequired>
              <ReactTextareaAutosize
                id="remarks"
                placeholder=""
                {...register('remarks')}
                className={classNames(
                  'text-area-auto-resize min-h-[14vh] pl-12',
                  errors?.remarks !== null && errors.remarks !== undefined
                    ? 'border-rose-500 ring-rose-500'
                    : ''
                )}
                disabled={isSubmitting}
              />
            </TextField>
            {errors.remarks !== null && errors.remarks !== undefined && (
              <span className="error text-[10px]">{errors.remarks?.message}</span>
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

export default AddNewBulkOvertimeModal
