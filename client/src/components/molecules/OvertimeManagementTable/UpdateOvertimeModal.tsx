import moment from 'moment'
import classNames from 'classnames'
import makeAnimated from 'react-select/animated'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ReactSelect, { MultiValue } from 'react-select'
import React, { FC, useEffect, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { Calendar, Clock, Coffee, Edit, FileText, RefreshCcw, Save, X } from 'react-feather'

import TextField from './../TextField'
import Input from '~/components/atoms/Input'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import { MyOvertimeSchema } from '~/utils/validation'
import { IOvertimeManagement } from '~/utils/interfaces'
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
  row: IOvertimeManagement
}

type ReactSelectProps = { label: string; value: string }

const animatedComponents = makeAnimated()

const UpdateOvertimeModal: FC<Props> = ({ isOpen, closeModal, row }): JSX.Element => {
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
      project: row.project,
      // other_project: row.others,
      date_effective: moment(new Date(row.dateFiled)).format('YYYY-MM-DD'),
      requested_hours: row.requestedHours,
      remarks: row.remarks
    })
    setOtherProject(false)
  }

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
            title: 'Update Overtime',
            closeModal,
            Icon: Edit
          }}
        />

        <main className="grid grid-cols-2 gap-x-4 gap-y-6 py-6 px-8 text-xs text-slate-800">
          {/* Project & Leave Type */}
          <section className="col-span-2 overflow-visible">
            <TextField title="Project" Icon={Coffee} isRequired>
              <Controller
                name="project"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => {
                  return (
                    <ReactSelect
                      isMulti
                      isClearable
                      placeholder=""
                      value={value}
                      styles={customStyles}
                      options={projectList}
                      onChange={(options) => {
                        onChange(options.map((c) => c))
                        return handleChangeProject(options)
                      }}
                      classNames={{
                        control: (state) =>
                          state.isFocused
                            ? 'border-primary'
                            : errors.project !== null && errors.project !== undefined
                            ? 'border-rose-500 ring-rose-500'
                            : 'border-slate-300'
                      }}
                      isDisabled={isSubmitting}
                      closeMenuOnSelect={false}
                      backspaceRemovesValue={true}
                      components={animatedComponents}
                      className="w-full"
                    />
                  )
                }}
              />
            </TextField>
            {errors.project !== null && errors.project !== undefined && (
              <span className="error text-[10px]">Project is required</span>
            )}
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
                  required
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

export default UpdateOvertimeModal
