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
import Select from '~/components/atoms/Select'
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
import { generateProjectsMultiSelect } from '~/utils/createLeaveHelpers'
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
      const temp = users.allUsers.filter((user) => user.role.name === Roles.MANAGER)
      setManagers([...temp])
    }
  }, [isUsersSuccess])

  useEffect(() => {
    if (isProjectsSuccess && projects.projects.length > 0) {
      const temp = [...leaders]
      projects?.projects.forEach((project) => {
        if (project?.projectLeader != null || project?.projectSubLeader != null) {
          if (!temp.some((leader) => leader.id === project.projectLeader.id))
            temp.push(project?.projectLeader)
          if (!temp.some((leader) => leader.id === project.projectSubLeader.id))
            temp.push(project?.projectSubLeader)
        }
      })
      setLeaders(temp)
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
      leaveMutation.mutate({
        userId: user?.userById.id as number,
        projectIds: selectedOtherProjectOption.map((p) => parseInt(p.value)),
        leaveTypeId: LeaveTypes.UNDERTIME,
        managerId: parseInt(data.manager),
        otherProject: data.other_project as string,
        reason: data.reason,
        leaveDates: [
          {
            leaveDate: data.leave_date,
            isWithPay: false,
            days: parseFloat(data.number_of_days_in_leave_undertime)
          }
        ]
      })
      resolve()
      closeModal()
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
                    isMulti
                    {...field}
                    isClearable
                    styles={customStyles}
                    options={generateProjectsMultiSelect(projects?.projects as ProjectDetails[])}
                    closeMenuOnSelect={false}
                    isDisabled={isSubmitting}
                    backspaceRemovesValue={true}
                    onChange={handleChangeProject}
                    components={animatedComponents}
                    className="w-full"
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
        ) : (
          <></>
        )}

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
            <Select
              className="py-2.5 text-xs"
              disabled={isSubmitting}
              {...register('number_of_days_in_leave_undertime')}
              iserror={
                errors.number_of_days_in_leave_undertime !== null &&
                errors?.number_of_days_in_leave_undertime !== undefined
              }
            >
              {numberOfDaysInLeavesByUndertime.map(({ id, value }) => (
                <option key={id} value={value}>
                  {value}
                </option>
              ))}
            </Select>
            {errors?.number_of_days_in_leave_undertime !== null &&
              errors?.number_of_days_in_leave_undertime !== undefined && (
                <span className="error text-[10px]">
                  {errors.number_of_days_in_leave_undertime?.message}
                </span>
              )}
          </label>
        </section>

        {/* Manager & Project leader */}
        <section className="col-span-2 sm:col-span-1">
          <TextField title="Manager" Icon={UserCheck} isRequired>
            <Select
              className="py-2.5 pl-11 text-xs"
              disabled={isSubmitting}
              {...register('manager')}
            >
              {managers.map((manager, i) => (
                <option key={i} value={manager?.id}>
                  {manager?.name}
                </option>
              ))}
            </Select>
          </TextField>
        </section>

        {/* Project Leaders Field */}
        <section className="col-span-2 sm:col-span-1">
          <TextField title="Project Leader" Icon={User} isRequired>
            <Select
              className="py-2.5 pl-11 text-xs"
              disabled={isSubmitting}
              {...register('project_leader')}
            >
              {leaders.map((leader, i) => (
                <option key={i} value={leader?.id}>
                  {leader?.name}
                </option>
              ))}
            </Select>
          </TextField>
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
