import classNames from 'classnames'
import makeAnimated from 'react-select/animated'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ReactSelect, { MultiValue } from 'react-select'
import React, { FC, useEffect, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { Calendar, Clock, Coffee, FileText, Save, X } from 'react-feather'

import TextField from './../TextField'
import Input from '~/components/atoms/Input'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import { MyOvertimeSchema } from '~/utils/validation'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { customStyles } from '~/utils/customReactSelectStyles'
import ModalTemplate from '~/components/templates/ModalTemplate'
import { NewOvertimeFormValues } from '~/utils/types/formValues'
import { projectList } from '~/utils/constants/dummyAddNewLeaveFields'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

type ReactSelectProps = { label: string; value: string }

const animatedComponents = makeAnimated()

const AddNewOvertimeModal: FC<Props> = ({ isOpen, closeModal }): JSX.Element => {
  const [otherProject, setOtherProject] = useState<boolean>(false)
  const [selectedOtherProjectOption, setSelectedOtherProjectOption] = useState<
    MultiValue<ReactSelectProps>
  >([])

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<NewOvertimeFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(MyOvertimeSchema)
  })

  // This will handle Submit and Save New Overtime
  const handleSave = async (data: NewOvertimeFormValues): Promise<void> => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify({ ...data, projects: { ...selectedOtherProjectOption } }, null, 2))
        resolve()
      }, 2000)
    })
  }

  // This will reset all form values
  useEffect(() => {
    if (isOpen) {
      reset({
        other_project: '',
        date_effective: '',
        requested_hours: '',
        remarks: ''
      })
      setOtherProject(false)
    }
  }, [isOpen])

  const handleChangeProject = (selectedOption: MultiValue<ReactSelectProps>): void => {
    setOtherProject(false)
    if (selectedOption.some((s) => s.label === 'Others')) {
      setOtherProject(true)
    }
    setSelectedOtherProjectOption(selectedOption)
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
            title: 'Add New Overtime',
            closeModal
          }}
        />

        <main className="grid grid-cols-2 gap-x-4 gap-y-6 py-6 px-8 text-xs text-slate-800">
          {/* Project & Leave Type */}
          <section className="col-span-2 overflow-visible">
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
          {otherProject ? (
            <section className="col-span-2">
              <TextField
                title="Other Project"
                Icon={Coffee}
                isOptional
                optionalText="Specify if others"
              >
                <Input
                  type="text"
                  {...register('other_project')}
                  className="py-2.5 pl-11 text-xs"
                />
              </TextField>
            </section>
          ) : null}

          {/* Date Effective */}
          <section className="col-span-2 md:col-span-1">
            <TextField title="Date Effective" Icon={Calendar} isRequired className="flex-1">
              <Input
                type="date"
                disabled={isSubmitting}
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

          {/* Requested hours */}
          <section className="col-span-2 md:col-span-1">
            <TextField title="Requested hours" Icon={Clock} isRequired className="flex-1">
              <Input
                type="text"
                disabled={isSubmitting}
                placeholder=""
                {...register('requested_hours')}
                className="py-2.5 pl-11 text-xs"
                iserror={errors.requested_hours !== null && errors?.requested_hours !== undefined}
              />
            </TextField>
            {errors?.requested_hours !== null && errors?.requested_hours !== undefined && (
              <span className="error text-[10px]">{errors.requested_hours?.message}</span>
            )}
          </section>

          {/* Remarks */}
          <section className="col-span-2">
            <TextField title="Remarks" Icon={FileText} isRequired>
              <ReactTextareaAutosize
                id="remarks"
                {...register('remarks')}
                className={classNames(
                  'text-area-auto-resize min-h-[14vh] pl-12',
                  errors?.remarks !== null && errors.remarks !== undefined
                    ? 'border-rose-500 ring-rose-500'
                    : ''
                )}
                disabled={isSubmitting}
                placeholder="Write down your remarks"
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
    </ModalTemplate>
  )
}

export default AddNewOvertimeModal
