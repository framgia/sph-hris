import classNames from 'classnames'
import ReactSelect from 'react-select'
import { Tab } from '@headlessui/react'
import makeAnimated from 'react-select/animated'
import CreatableSelect from 'react-select/creatable'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { FC, useEffect, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { X, Plus, Save, User, Minus, Coffee, FileText, Calendar, RefreshCcw } from 'react-feather'

import TextField from './../TextField'
import useProject from '~/hooks/useProject'
import Input from '~/components/atoms/Input'
import useUserQuery from '~/hooks/useUserQuery'
import { Roles } from '~/utils/constants/roles'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import { NewLeaveSchema } from '~/utils/validation'
import { User as UserType } from '~/utils/types/userTypes'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { NewLeaveFormValues } from '~/utils/types/formValues'
import { customStyles } from '~/utils/customReactSelectStyles'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'
import {
  projectList,
  dummyManagers,
  projectLeaders,
  dummyLeaveTypes,
  numberOfDaysInLeaves
} from '~/utils/constants/dummyAddNewLeaveFields'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const animatedComponents = makeAnimated()

const LeaveTab: FC<Props> = ({ isOpen, closeModal }): JSX.Element => {
  const [managers, setManagers] = useState<UserType[]>([])
  const [leaders, setLeaders] = useState<UserType[]>([])
  const { handleProjectQuery } = useProject()
  const { handleAllUsersQuery } = useUserQuery()
  const { data: projects, isSuccess: isProjectsSuccess } = handleProjectQuery()
  const { data: users, isSuccess: isUsersSuccess } = handleAllUsersQuery()

  // modify custom style control
  customStyles.control = (provided: Record<string, unknown>, state: any): any => ({
    ...provided,
    boxShadow: 'none',
    borderColor: 'none',
    '&:hover': {
      color: '#75c55e'
    }
  })

  useEffect(() => {
    if (isUsersSuccess) {
      const tempManager = users.allUsers.filter((user) => user.role.name === Roles.MANAGER)
      setManagers([...tempManager])
    }
  }, [isUsersSuccess])

  useEffect(() => {
    if (isProjectsSuccess && projects.projects.length > 0) {
      const tempLeaders = [...leaders]
      projects?.projects.forEach((project) => {
        if (project?.projectLeader != null || project?.projectSubLeader != null) {
          if (!tempLeaders.some((leader) => leader.id === project.projectLeader.id))
            tempLeaders.push(project?.projectLeader)
          if (!tempLeaders.some((leader) => leader.id === project.projectSubLeader.id))
            tempLeaders.push(project?.projectSubLeader)
        }
      })
      setLeaders(tempLeaders)
    }
  }, [isProjectsSuccess, projects?.projects])

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<NewLeaveFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(NewLeaveSchema)
  })

  // This will handle form submit and save
  const handleSave = async (data: NewLeaveFormValues): Promise<void> => {
    return await new Promise((resolve) => {
      // Other Project Name
      const others = data.projects.map(
        (project) => project.project_name.__isNew__ === true && project.project_name.value
      )

      alert(
        JSON.stringify(
          {
            data: {
              ...data,
              others
            },
            // I didn't use the managers state
            // Because I want the integrator to do it
            managers: { ...managers }
          },
          null,
          2
        )
      )
      resolve()
      closeModal()
    })
  }

  const {
    fields: leaveDateFields,
    remove: leaveDateRemove,
    append: leaveDateAppend
  } = useFieldArray({
    control,
    name: 'leave_date'
  })

  const {
    fields: projectFields,
    remove: projectRemove,
    append: projectAppend
  } = useFieldArray({
    control,
    name: 'projects'
  })

  useEffect(() => {
    if (isOpen) {
      handleReset()
    }
  }, [isOpen])

  const handleReset = (): void => {
    reset({
      projects: [
        {
          project_name: {
            label: '',
            value: ''
          },
          project_leader: {
            label: '',
            value: ''
          }
        }
      ],
      leave_type: {
        label: '',
        value: ''
      },
      leave_date: [
        {
          date: '',
          number_of_days_in_leave: '',
          is_with_pay: false
        }
      ],
      manager: '',
      reason: ''
    })
  }

  // Add New Date
  const handleAddNewDate = (): void =>
    leaveDateAppend({ date: '', number_of_days_in_leave: '', is_with_pay: false })

  // Remove Date
  const handleRemoveDate = (index: number): void => leaveDateRemove(index)

  // Add Project
  const handleAddNewProject = (): void =>
    projectAppend({
      project_name: {
        label: '',
        value: ''
      },
      project_leader: {
        label: '',
        value: ''
      }
    })

  // Remove Date
  const handleRemoveProject = (index: number): void => projectRemove(index)

  return (
    <Tab.Panel className="focus:outline-none">
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(handleSave)}
      >
        <main className="grid grid-cols-2 gap-x-4 gap-y-6 py-6 px-8 text-xs text-slate-800">
          {/* Projects */}
          {projectFields.map((field, index) => (
            <div
              key={field.id}
              className={classNames(
                'col-span-2 flex w-full flex-wrap items-end justify-between',
                ' space-y-4 sm:space-x-2 md:space-y-0',
                (errors?.projects?.[index]?.project_name !== null &&
                  errors?.projects?.[index]?.project_name !== undefined) ||
                  (errors?.projects?.[index]?.project_leader !== null &&
                    errors?.projects?.[index]?.project_leader !== undefined)
                  ? 'pb-4'
                  : ''
              )}
            >
              <section className="w-full sm:w-[43%]">
                <TextField title={`Project ${index + 1}`} Icon={Coffee} isRequired>
                  <Controller
                    name={`projects.${index}.project_name` as any}
                    control={control}
                    render={({ field }) => {
                      return (
                        <CreatableSelect
                          {...field}
                          isClearable
                          placeholder=""
                          styles={customStyles}
                          closeMenuOnSelect={true}
                          classNames={{
                            control: (state) =>
                              state.isFocused
                                ? 'border-primary'
                                : errors.projects?.[index]?.project_name !== null &&
                                  errors.projects?.[index]?.project_name !== undefined
                                ? 'border-rose-500 ring-rose-500'
                                : 'border-slate-300'
                          }}
                          isDisabled={isSubmitting}
                          backspaceRemovesValue={true}
                          components={animatedComponents}
                          options={projectList}
                          className="w-full"
                        />
                      )
                    }}
                  />
                </TextField>
                {errors.projects?.[index]?.project_name !== null &&
                  errors.projects?.[index]?.project_name !== undefined && (
                    <span className="error absolute text-[10px]">
                      Project {index + 1} name is required
                    </span>
                  )}
              </section>
              <section className="w-full flex-1">
                <TextField title="Project Leader" Icon={Coffee} isRequired>
                  <Controller
                    name={`projects.${index}.project_leader` as any}
                    control={control}
                    render={({ field }) => {
                      return (
                        <ReactSelect
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
                                : errors.projects?.[index]?.project_leader !== null &&
                                  errors.projects?.[index]?.project_leader !== undefined
                                ? 'border-rose-500 ring-rose-500'
                                : 'border-slate-300'
                          }}
                          backspaceRemovesValue={true}
                          options={projectLeaders}
                          components={animatedComponents}
                          className="w-full"
                        />
                      )
                    }}
                  />
                </TextField>
                {errors.projects?.[index]?.project_leader !== null &&
                  errors.projects?.[index]?.project_leader !== undefined && (
                    <span className="error absolute text-[10px]">
                      Project leader {index + 1} is required
                    </span>
                  )}
              </section>

              <div className="ml-4 flex items-center space-x-2 sm:ml-0">
                <Button
                  type="button"
                  shadow="none"
                  onClick={() => handleRemoveProject(index)}
                  disabled={isSubmitting || projectFields?.length === 1}
                  className="!bg-white p-[11px]"
                >
                  <Minus className="h-4 w-4 stroke-1 text-slate-700" />
                </Button>
                <Button
                  type="button"
                  shadow="none"
                  onClick={handleAddNewProject}
                  disabled={isSubmitting}
                  className="!bg-white p-[11px]"
                >
                  <Plus className="h-4 w-4 stroke-1 text-slate-700" />
                </Button>
              </div>
            </div>
          ))}

          {/* Leave Type */}
          <section className="col-span-2">
            <TextField title="Leave Type" Icon={User} isRequired className="py-2.5 text-xs">
              <Controller
                name="leave_type"
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
                          : errors.leave_type !== null && errors.leave_type !== undefined
                          ? 'border-rose-500 ring-rose-500'
                          : 'border-slate-300'
                    }}
                    value={field.value}
                    onChange={field.onChange}
                    isDisabled={isSubmitting}
                    options={dummyLeaveTypes as any}
                  />
                )}
              />
            </TextField>
            {errors.leave_type !== null && errors.leave_type !== undefined && (
              <span className="error text-[10px]">Type of leave is required</span>
            )}
          </section>

          {/* Leave Dynamic Field */}
          {leaveDateFields.map((date, index) => (
            <div
              key={date.id}
              className={classNames(
                'col-span-2 flex w-full flex-wrap items-end justify-between',
                'space-y-4 sm:space-x-2 md:space-y-0',
                (errors?.leave_date?.[index]?.date !== null &&
                  errors?.leave_date?.[index]?.date !== undefined) ||
                  (errors?.leave_date?.[index]?.number_of_days_in_leave !== null &&
                    errors?.leave_date?.[index]?.number_of_days_in_leave !== undefined)
                  ? 'pb-4'
                  : ''
              )}
            >
              {/* Date Calendar Field */}
              <section className="w-full sm:w-[36%]">
                <TextField
                  title={`Leave Date ${index + 1}`}
                  Icon={Calendar}
                  isRequired
                  isError={errors?.leave_date?.[index]?.date}
                  className="flex-1"
                >
                  <Input
                    type="date"
                    disabled={isSubmitting}
                    {...register(`leave_date.${index}.date` as any)}
                    placeholder="Leave Date"
                    iserror={
                      errors.leave_date?.[index]?.date !== null &&
                      errors.leave_date?.[index]?.date !== undefined
                    }
                    className="py-2.5 pl-11 text-xs"
                  />
                </TextField>
                {errors.leave_date?.[index]?.date !== null &&
                  errors.leave_date?.[index]?.date !== undefined && (
                    <span className="error absolute text-[10px]">
                      Leave Date {index + 1} is required field
                    </span>
                  )}
              </section>
              {/* Number of days in leave */}
              <section className="w-full flex-1">
                <TextField
                  title="Number of Days in Leave"
                  Icon={User}
                  isRequired
                  className="py-2.5 text-xs"
                >
                  <Controller
                    name={`leave_date.${index}.number_of_days_in_leave`}
                    control={control}
                    rules={{ required: true }}
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
                              : errors.leave_date?.[index]?.number_of_days_in_leave !== null &&
                                errors.leave_date?.[index]?.number_of_days_in_leave !== undefined
                              ? 'border-rose-500 ring-rose-500'
                              : 'border-slate-300'
                        }}
                        styles={customStyles}
                        value={field.value}
                        onChange={field.onChange}
                        isDisabled={isSubmitting}
                        options={numberOfDaysInLeaves as any}
                      />
                    )}
                  />
                </TextField>
                {errors.leave_date?.[index]?.number_of_days_in_leave !== null &&
                  errors.leave_date?.[index]?.number_of_days_in_leave !== undefined && (
                    <span className="error absolute text-[10px]">
                      Number of days in leave is required
                    </span>
                  )}
              </section>
              <div className="ml-4 flex items-center space-x-2 sm:ml-0">
                {/* With Pay boolean */}
                <div className="shrink-0">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className={classNames(
                        'h-4 w-4 rounded border-slate-300 bg-slate-100',
                        'text-primary focus:ring-primary'
                      )}
                      {...register(`leave_date.${index}.is_with_pay` as any)}
                    />
                    <span className="ml-2 select-none text-xs capitalize text-slate-500">
                      With Pay
                    </span>
                  </label>
                </div>
                <Button
                  type="button"
                  shadow="none"
                  disabled={isSubmitting || leaveDateFields?.length === 1}
                  onClick={() => handleRemoveDate(index)}
                  className="!bg-white p-[11px]"
                >
                  <Minus className="h-4 w-4 stroke-1 text-slate-700" />
                </Button>
                <Button
                  type="button"
                  shadow="none"
                  onClick={handleAddNewDate}
                  disabled={isSubmitting}
                  className="!bg-white p-[11px]"
                >
                  <Plus className="h-4 w-4 stroke-1 text-slate-700" />
                </Button>
              </div>
            </div>
          ))}

          {/* Manager */}
          <section className="col-span-2">
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
                    options={dummyManagers as any}
                  />
                )}
              />
            </TextField>
            {errors.manager !== null && errors.manager !== undefined && (
              <span className="error text-[10px]">Manager is required</span>
            )}
          </section>

          {/* Reason for leave Field */}
          <section className="col-span-2">
            <TextField title="Reason for leave" Icon={FileText} isRequired>
              <ReactTextareaAutosize
                id="reason"
                {...register('reason')}
                className={classNames(
                  'text-area-auto-resize pl-12',
                  errors?.reason !== null && errors.reason !== undefined
                    ? 'border-rose-500 ring-rose-500'
                    : ''
                )}
                disabled={isSubmitting}
              />
            </TextField>
            {errors.reason !== null && errors.reason !== undefined && (
              <span className="error text-[10px]">{errors.reason?.message}</span>
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
                <SpinnerIcon className="h-3 w-3 fill-amber-600" />
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
    </Tab.Panel>
  )
}

LeaveTab.defaultProps = {}

export default LeaveTab
