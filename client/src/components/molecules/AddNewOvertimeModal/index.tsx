import classNames from 'classnames'
import ReactSelect from 'react-select'
import makeAnimated from 'react-select/animated'
import CreatableSelect from 'react-select/creatable'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { FC, useEffect, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import {
  X,
  Save,
  Plus,
  User,
  Clock,
  Minus,
  Coffee,
  FileText,
  Calendar,
  RefreshCcw
} from 'react-feather'

import TextField from './../TextField'
import useProject from '~/hooks/useProject'
import { Emoji } from '~/utils/types/emoji'
import Input from '~/components/atoms/Input'
import useOvertime from '~/hooks/useOvertime'
import { Roles } from '~/utils/constants/roles'
import useUserQuery from '~/hooks/useUserQuery'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import { MyOvertimeSchema } from '~/utils/validation'
import EmojiPopoverPicker from './../EmojiPopoverPicker'
import { User as UserType } from '~/utils/types/userTypes'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { customStyles } from '~/utils/customReactSelectStyles'
import ModalTemplate from '~/components/templates/ModalTemplate'
import { NewOvertimeFormValues } from '~/utils/types/formValues'
import { IEmployeeTimeEntry } from '~/utils/types/timeEntryTypes'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import { LeaderDetails, ProjectDetails } from '~/utils/types/projectTypes'
import { generateProjectsMultiSelect, generateUserSelect } from '~/utils/createLeaveHelpers'

type Props = {
  isOpen: boolean
  closeModal: () => void
  timeEntry: IEmployeeTimeEntry
  initialMinutes: number
}

const animatedComponents = makeAnimated()

const AddNewOvertimeModal: FC<Props> = ({
  isOpen,
  closeModal,
  timeEntry,
  initialMinutes
}): JSX.Element => {
  const [leaders, setLeaders] = useState<LeaderDetails[]>([])
  const [managers, setManagers] = useState<UserType[]>([])

  const { handleProjectQuery, getLeadersQuery } = useProject()
  const { data: projects } = handleProjectQuery()

  const { handleAllUsersQuery, handleUserQuery } = useUserQuery()
  const { data: user } = handleUserQuery()
  const { data: users, isSuccess: isUsersSuccess } = handleAllUsersQuery()
  const { data: leadersList } = getLeadersQuery(undefined)

  const { handleOvertimeMutation } = useOvertime()
  const overtimeMutation = handleOvertimeMutation()

  useEffect(() => {
    if (leadersList !== undefined) setLeaders(leadersList.allLeaders)
  }, [leadersList])

  useEffect(() => {
    if (isUsersSuccess) {
      const tempManager = users.allUsers.filter((user) => user.role.name === Roles.MANAGER)
      setManagers([...tempManager])
    }
  }, [isUsersSuccess])

  const emptyReactSelectOption = {
    label: '',
    value: ''
  }

  const {
    reset,
    watch,
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<NewOvertimeFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(MyOvertimeSchema)
  })

  const {
    fields: projectFields,
    remove: projectRemove,
    append: projectAppend
  } = useFieldArray({
    control,
    name: 'projects'
  })

  // This will handle Submit and Save New Overtime
  const handleSave = async (data: NewOvertimeFormValues): Promise<void> => {
    return await new Promise((resolve) => {
      const others = data.projects.map(
        (project) => project.project_name.__isNew__ === true && project.project_name.value
      )

      overtimeMutation.mutate(
        {
          userId: user?.userById.id as number,
          timeEntryId: timeEntry.id,
          managerId: parseInt(data.manager.value),
          otherProject: others.filter((value) => value !== false).toString(),
          requestedMinutes: data.requested_minutes,
          remarks: data.remarks,
          date: data.date_effective,
          overtimeProjects: data.projects.map((project) => {
            const otherProjectType = projects?.projects.find(
              (project) => project.name.toLowerCase() === 'others'
            ) as ProjectDetails

            return {
              projectId: (project.project_name.__isNew__ as boolean)
                ? otherProjectType.id
                : parseInt(project.project_name.value),
              projectLeaderId: parseInt(project.project_leader.value)
            }
          })
        },
        {
          onSuccess: () => {
            closeModal()
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
      projects: [
        {
          project_name: emptyReactSelectOption,
          project_leader: emptyReactSelectOption
        }
      ],
      manager: emptyReactSelectOption,
      date_effective: timeEntry.date,
      requested_minutes: initialMinutes,
      remarks: ''
    })
  }

  // Add Project
  const handleAddNewProject = (): void =>
    projectAppend({
      project_name: emptyReactSelectOption,
      project_leader: emptyReactSelectOption
    })

  // Remove Date
  const handleRemoveProject = (index: number): void => projectRemove(index)

  const handleEmojiSelect = (emoji: Emoji): void =>
    setValue('remarks', watch('remarks') + emoji.native)

  return (
    <ModalTemplate
      {...{
        isOpen,
        closeModal
      }}
      className="relative w-full max-w-[700px] overflow-visible"
    >
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(handleSave)}
      >
        {/* Custom Modal Header */}
        <ModalHeader
          {...{
            title: 'Add New Overtime',
            closeModal
          }}
        />

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
                          options={generateProjectsMultiSelect(
                            projects?.projects as ProjectDetails[]
                          )}
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
                          options={generateUserSelect(leaders as UserType[])}
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
                    options={generateUserSelect(managers)}
                  />
                )}
              />
            </TextField>
            {errors.manager !== null && errors.manager !== undefined && (
              <span className="error text-[10px]">Manager is required</span>
            )}
          </section>

          {/* Date Effective */}
          <section className="col-span-2 md:col-span-1">
            <TextField title="Date Effective" Icon={Calendar} isRequired className="flex-1">
              <Input
                type="date"
                disabled={true}
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
              <span className="error text-[10px]">{errors.requested_minutes?.message}</span>
            )}
          </section>

          {/* Remarks */}
          <section className="relative col-span-2">
            <TextField title="Remarks" Icon={FileText} isRequired>
              <ReactTextareaAutosize
                id="remarks"
                {...register('remarks')}
                className={classNames(
                  'text-area-auto-resize min-h-[13vh] w-full pl-12 pb-8',
                  errors?.remarks !== null && errors.remarks !== undefined
                    ? 'border-rose-500 ring-rose-500'
                    : ''
                )}
                disabled={isSubmitting}
              />
              <div className="absolute bottom-1 left-11">
                <EmojiPopoverPicker
                  {...{
                    handleEmojiSelect,
                    panelPosition: 'left-0 bottom-8'
                  }}
                />
              </div>
            </TextField>
            {errors.remarks !== null && errors.remarks !== undefined && (
              <span className="error text-[10px]">{errors.remarks?.message}</span>
            )}
          </section>
        </main>

        {/* Custom Modal Footer Style */}
        <ModalFooter className="rounded-b-xl">
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

export default AddNewOvertimeModal
