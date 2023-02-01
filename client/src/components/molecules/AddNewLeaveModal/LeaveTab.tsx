import classNames from 'classnames'
import makeAnimated from 'react-select/animated'
import { yupResolver } from '@hookform/resolvers/yup'
import ReactSelect, { MultiValue } from 'react-select'
import React, { FC, useEffect, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import {
  X,
  Plus,
  Save,
  User,
  Minus,
  Coffee,
  FileText,
  Activity,
  Calendar,
  UserCheck
} from 'react-feather'

import TextField from './../TextField'
import Input from '~/components/atoms/Input'
import Select from '~/components/atoms/Select'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import { NewLeaveSchema } from '~/utils/validation'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { NewLeaveFormValues } from '~/utils/types/formValues'
import { customStyles } from '~/utils/customReactSelectStyles'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'
import {
  leaveTypes,
  numberOfDaysInLeaves,
  projectLeaders,
  projectList
} from '~/utils/constants/dummyAddNewLeaveFields'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

type ReactSelectProps = { label: string; value: string }

const animatedComponents = makeAnimated()

const LeaveTab: FC<Props> = ({ isOpen, closeModal }): JSX.Element => {
  const [selectedOtherProjectOption, setSelectedOtherProjectOption] = useState<
    MultiValue<ReactSelectProps>
  >([])

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
      setTimeout(() => {
        resolve()
        const newData = {
          ...data,
          project: selectedOtherProjectOption
        }
        alert(JSON.stringify(newData, null, 2))
        closeModal()
      }, 3000)
    })
  }

  const handleChangeProject = (selectedOption: MultiValue<ReactSelectProps>): void => {
    setSelectedOtherProjectOption(selectedOption)
  }

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'leave_date'
  })

  useEffect(() => {
    if (isOpen) {
      reset({
        leave_type: '',
        leave_date: [
          {
            date: '',
            number_of_days_in_leave: '',
            is_with_pay: false
          }
        ],
        other_project: '',
        reason: ''
      })
    }
  }, [isOpen])

  // Add New Date
  const handleAddNewDate = (): void =>
    append({ date: '', number_of_days_in_leave: '', is_with_pay: false })

  // Remove Date
  const handleRemoveDate = (index: number): void => remove(index)

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
                    options={projectList}
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
        <section className="col-span-2 sm:col-span-1">
          <TextField title="Other Project" Icon={Coffee} isOptional>
            <Input type="text" {...register('other_project')} className="py-2.5 pl-11 text-xs" />
          </TextField>
        </section>

        {/* Leave Types */}
        <section className="col-span-2 sm:col-span-1">
          <TextField title="Leave Type" Icon={Activity} isRequired>
            <Select
              className="py-2.5 pl-11 text-xs"
              disabled={isSubmitting}
              {...register('leave_type')}
              iserror={errors.leave_type !== null && errors?.leave_type !== undefined}
            >
              {leaveTypes.map((leave) => (
                <option key={leave.id} value={leave.value}>
                  {leave.value}
                </option>
              ))}
            </Select>
          </TextField>
          {errors?.leave_type !== null && errors?.leave_type !== undefined && (
            <span className="error text-[10px]">{errors.leave_type?.message}</span>
          )}
        </section>

        {/* Leave Dynamic Field */}
        {fields.map((date, index) => (
          <div
            className="col-span-2 flex w-full flex-wrap items-end justify-between space-y-4 sm:space-x-2 md:space-y-0"
            key={date.id}
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
                {errors.leave_date?.[index]?.date !== null &&
                  errors.leave_date?.[index]?.date !== undefined && (
                    <span className="error absolute -bottom-5 text-[10px]">
                      Leave Date {index + 1} is required field
                    </span>
                  )}
              </TextField>
            </section>
            {/* Number of days in leave */}
            <section className="w-full flex-1">
              <label>
                Number of days in leaves (Leave) <span className="text-rose-500">*</span>
                <Select
                  className="py-2.5 text-xs"
                  disabled={isSubmitting}
                  {...register(`leave_date.${index}.number_of_days_in_leave` as any)}
                  iserror={
                    errors.leave_date?.[index]?.number_of_days_in_leave !== null &&
                    errors.leave_date?.[index]?.number_of_days_in_leave !== undefined
                  }
                >
                  {numberOfDaysInLeaves.map(({ id, value }) => (
                    <option key={id} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
                {errors.leave_date?.[index]?.number_of_days_in_leave !== null &&
                  errors.leave_date?.[index]?.number_of_days_in_leave !== undefined && (
                    <span className="error absolute text-[10px]">
                      Number of days in leave is required field
                    </span>
                  )}
              </label>
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
                disabled={isSubmitting || fields?.length === 1}
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

        {/* Manager & Project leader */}
        <section className="col-span-2 sm:col-span-1">
          <TextField title="Manager" Icon={UserCheck} isRequired>
            <Select
              className="py-2.5 pl-11 text-xs"
              disabled={isSubmitting}
              {...register('manager')}
            >
              <option value="Abdul Jalil Palala">Abdul Jalil Palala</option>
              <option value="Arden Dave Cabotaje">Arden Dave Cabotaje</option>
              <option value="Jeremiah Caballero">Jeremiah Caballero</option>
              <option value="Rogelio John Oliverio">Rogelio John Oliverio</option>
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
              {projectLeaders.map((project, i) => (
                <option key={i} value={project.value}>
                  {project.value}
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

LeaveTab.defaultProps = {}

export default LeaveTab
