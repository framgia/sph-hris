import classNames from 'classnames'
import { useRouter } from 'next/router'
import makeAnimated from 'react-select/animated'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import ReactSelect, { MultiValue } from 'react-select'
import React, { FC, useEffect, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { X, Save, Coffee, FileText, Calendar, UserCheck, User } from 'react-feather'

import TextField from './../TextField'
import Input from '~/components/atoms/Input'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import { UndertimeLeaveSchema } from '~/utils/validation'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { customStyles } from '~/utils/customReactSelectStyles'
import { UndertimeFormValues } from '~/utils/types/formValues'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'
import { numberOfDaysInLeavesByUndertime } from '~/utils/constants/dummyAddNewLeaveFields'
import useProject from '~/hooks/useProject'
import useUserQuery from '~/hooks/useUserQuery'
import useLeave from '~/hooks/useLeave'
import { User as UserType } from '~/utils/types/userTypes'
import { Roles } from '~/utils/constants/roles'
import {
  generateNumberOfDaysSelect,
  generateProjectsMultiSelect,
  generateUserSelect
} from '~/utils/createLeaveHelpers'
import { ProjectDetails } from '~/utils/types/projectTypes'
import { LeaveTypes } from '~/utils/constants/leaveTypes'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

type ReactSelectProps = { label: string; value: string }

const animatedComponents = makeAnimated()

const UndertimeTab: FC<Props> = ({ isOpen, closeModal }): JSX.Element => {
  const router = useRouter()
  const [otherProject, setOtherProject] = useState<boolean>(false)
  const [managers, setManagers] = useState<UserType[]>([])
  const [leaders, setLeaders] = useState<UserType[]>([])
  const { handleProjectQuery } = useProject()
  const { handleAllUsersQuery, handleUserQuery } = useUserQuery()
  const { handleLeaveMutation } = useLeave()
  const { data: user } = handleUserQuery()
  const leaveMutation = handleLeaveMutation(
    user?.userById.id as number,
    parseInt(router.query.year as string)
  )
  const { data: projects, isSuccess: isProjectsSuccess } = handleProjectQuery()
  const { data: users, isSuccess: isUsersSuccess } = handleAllUsersQuery()

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
  const [selectedOtherProjectOption, setSelectedOtherProjectOption] = useState<
    MultiValue<ReactSelectProps>
  >([])

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<UndertimeFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(UndertimeLeaveSchema)
  })

  // This will handle form submit and save
  const handleSave = async (data: UndertimeFormValues): Promise<void> => {
    return await new Promise((resolve) => {
      leaveMutation.mutate(
        {
          userId: user?.userById.id as number,
          projectIds: selectedOtherProjectOption.map((p) => parseInt(p.value)),
          leaveTypeId: LeaveTypes.UNDERTIME,
          managerId: parseInt(data.manager.value),
          otherProject: data.other_project as string,
          reason: data.reason,
          leaveDates: [
            {
              leaveDate: data.leave_date,
              isWithPay: false,
              days: parseFloat(data.number_of_days_in_leave_undertime.value)
            }
          ]
        },
        {
          onSuccess: () => closeModal()
        }
      )
      resolve()
    })
  }

  const handleChangeProject = (selectedOption: MultiValue<ReactSelectProps>): void => {
    setOtherProject(false)
    if (selectedOption.some((s) => s.label === 'Others')) {
      setOtherProject(true)
    }
    setSelectedOtherProjectOption(selectedOption)
  }

  useEffect(() => {
    if (isOpen) {
      reset({
        leave_date: '',
        other_project: '',
        reason: ''
      })
    }
  }, [isOpen])

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(handleSave)}
    >
      <main className="grid grid-cols-2 gap-x-4 gap-y-6 py-6 px-8 text-xs text-slate-800">
        {/* Project & Leave Type */}
        <section className="col-span-2">
          <TextField title="Project" Icon={Coffee} isRequired>
            <Controller
              name="project"
              control={control}
              render={({ field }) => {
                return (
                  <ReactSelect
                    className="w-full"
                    classNames={{
                      control: (state) =>
                        state.isFocused
                          ? 'border-primary'
                          : errors.project !== null && errors.project !== undefined
                          ? 'border-rose-500 ring-rose-500'
                          : 'border-slate-300'
                    }}
                    isMulti
                    {...field}
                    isClearable
                    styles={customStyles}
                    options={generateProjectsMultiSelect(projects?.projects as ProjectDetails[])}
                    closeMenuOnSelect={false}
                    isDisabled={isSubmitting}
                    backspaceRemovesValue={true}
                    value={field.value}
                    onChange={(options) => {
                      field.onChange(options.map((c) => c))
                      return handleChangeProject(options)
                    }}
                    components={animatedComponents}
                  />
                )
              }}
            />
            {errors?.project !== null && errors?.project !== undefined && (
              <span className="error absolute -bottom-4 text-[10px]">
                {errors.project?.message}
              </span>
            )}
          </TextField>
        </section>

        {/* Other Projects */}
        {otherProject ? (
          <section className="col-span-2">
            <TextField title="Other Project" Icon={Coffee} isOptional>
              <Input type="text" {...register('other_project')} className="py-2.5 pl-11 text-xs" />
            </TextField>
          </section>
        ) : null}

        {/* Leave Date */}
        <section className="col-span-2">
          <TextField title="Leave Date" Icon={Calendar} isRequired className="flex-1">
            <Input
              type="date"
              disabled={isSubmitting}
              placeholder=""
              {...register('leave_date')}
              className="py-2.5 pl-11 text-xs"
              iserror={errors.leave_date !== null && errors?.leave_date !== undefined}
            />
          </TextField>
          {errors?.leave_date !== null && errors?.leave_date !== undefined && (
            <span className="error text-[10px]">{errors.leave_date?.message}</span>
          )}
        </section>

        {/* Number of days in leave */}
        <section className="col-span-2 flex-1">
          <label>
            Number of leaves in days (Undertime) <span className="text-rose-500">*</span>
            <Controller
              name="number_of_days_in_leave_undertime"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ReactSelect
                  styles={customStyles}
                  className="w-full"
                  classNames={{
                    control: (state) =>
                      state.isFocused
                        ? 'border-primary'
                        : errors.number_of_days_in_leave_undertime !== null &&
                          errors?.number_of_days_in_leave_undertime !== undefined
                        ? 'border-rose-500 ring-rose-500'
                        : 'border-slate-300'
                  }}
                  {...field}
                  defaultValue={null}
                  value={field.value}
                  onChange={field.onChange}
                  options={generateNumberOfDaysSelect(numberOfDaysInLeavesByUndertime)}
                  isDisabled={isSubmitting}
                  components={animatedComponents}
                />
              )}
            />
            {errors?.number_of_days_in_leave_undertime !== null &&
              errors?.number_of_days_in_leave_undertime !== undefined && (
                <span className="error text-[10px]">
                  {errors.number_of_days_in_leave_undertime?.value?.message}
                </span>
              )}
          </label>
        </section>

        {/* Manager & Project leader */}
        <section className="col-span-2 sm:col-span-1">
          <TextField title="Manager" Icon={UserCheck} isRequired>
            <Controller
              name="manager"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ReactSelect
                  styles={customStyles}
                  className="w-full"
                  classNames={{
                    control: (state) =>
                      state.isFocused
                        ? 'border-primary'
                        : errors?.manager !== null && errors.manager !== undefined
                        ? 'border-rose-500 ring-rose-500'
                        : 'border-slate-300'
                  }}
                  {...field}
                  options={generateUserSelect(managers)}
                  defaultValue={null}
                  value={field.value}
                  onChange={field.onChange}
                  isDisabled={isSubmitting}
                  components={animatedComponents}
                />
              )}
            />
          </TextField>
          {errors?.manager !== null && errors?.manager !== undefined && (
            <span className="error text-[10px]">{errors.manager?.value?.message}</span>
          )}
        </section>

        {/* Project Leaders Field */}
        <section className="col-span-2 sm:col-span-1">
          <TextField title="Project Leader" Icon={User} isRequired>
            <Controller
              name="project_leader"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ReactSelect
                  styles={customStyles}
                  className="w-full"
                  classNames={{
                    control: (state) =>
                      state.isFocused
                        ? 'border-primary'
                        : errors?.project_leader !== null && errors.project_leader !== undefined
                        ? 'border-rose-500 ring-rose-500'
                        : 'border-slate-300'
                  }}
                  {...field}
                  options={generateUserSelect(leaders)}
                  defaultValue={null}
                  value={field.value}
                  onChange={field.onChange}
                  isDisabled={isSubmitting}
                  components={animatedComponents}
                />
              )}
            />
          </TextField>
          {errors?.project_leader !== null && errors?.project_leader !== undefined && (
            <span className="error text-[10px]">{errors.project_leader?.value?.message}</span>
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
              placeholder="Write down your reason"
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
  )
}

UndertimeTab.defaultProps = {}

export default UndertimeTab
