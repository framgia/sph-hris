import classNames from 'classnames'
import toast from 'react-hot-toast'
import isEmpty from 'lodash/isEmpty'
import ReactSelect from 'react-select'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { FC, useEffect, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { FileText, RefreshCcw, Save, X } from 'react-feather'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import TextField from '../TextField'
import Input from '~/components/atoms/Input'
import { User } from '~/utils/types/userTypes'
import useUserQuery from '~/hooks/useUserQuery'
import { queryClient } from '~/lib/queryClient'
import useFileOffset from '~/hooks/useFileOffset'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import { FileOffsetSchema } from '~/utils/validation'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { customStyles } from '~/utils/customReactSelectStyles'
import { FileOffsetFormValues } from '~/utils/types/formValues'
import ModalTemplate from '~/components/templates/ModalTemplate'
import { generateESLUserSelect } from '~/utils/createLeaveHelpers'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import { IEmployeeTimeEntry, ITimeEntry } from '~/utils/types/timeEntryTypes'
import EmojiPopoverPicker from '../EmojiPopoverPicker'
import { Emoji } from '~/utils/types/emoji'

type Props = {
  isOpen: boolean
  closeModal: () => void
  tableRow: ITimeEntry | IEmployeeTimeEntry
}

const FileOffsetModal: FC<Props> = ({ isOpen, closeModal, tableRow }): JSX.Element => {
  const [eslLeaders, setEslLeaders] = useState<Array<Pick<User, 'id' | 'name'>>>([])

  const {
    reset,
    watch,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FileOffsetFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(FileOffsetSchema)
  })

  // FILE OFFSET HOOKS
  const { handleAddFileOffsetMutation } = useFileOffset()
  const addFileOffsetMutation = handleAddFileOffsetMutation()

  // CURRENT USER HOOKS && ALL ESL USERS HOOKS
  const { handleUserQuery, getESLUserQuery } = useUserQuery()
  const { data: user } = handleUserQuery() // SPECIFIC USER
  const { data: eslUsers, isSuccess: isESLUsersSuccess } = getESLUserQuery()

  // FETCHED ALL ESL LEADERS
  useEffect(() => {
    if (isESLUsersSuccess && eslUsers?.allESLUsers.length > 0) {
      const mappedData = eslUsers?.allESLUsers.map((option) => option)
      setEslLeaders(mappedData)
    }
  }, [isESLUsersSuccess, eslUsers?.allESLUsers])

  const handleSave: SubmitHandler<FileOffsetFormValues> = async (data): Promise<void> => {
    return await new Promise((resolve) => {
      addFileOffsetMutation.mutate(
        {
          userId: user?.userById.id as number,
          teamLeaderId: parseInt(data.teamLeader.value),
          timeEntryId: tableRow.id,
          timeIn: data.offsetTime.timeIn,
          timeOut: data.offsetTime.timeOut,
          description: data.remarks,
          title: data.title
        },
        {
          onSuccess: () => {
            void queryClient
              .invalidateQueries({ queryKey: ['GET_ALL_ESL_FILED_OFFSETS'] })
              .then(() => {
                toast.success('Filed New Offset Successfully')
                handleReset()
                closeModal()
              })
          },
          onSettled: () => {
            resolve()
          }
        }
      )
    })
  }

  const handleReset = (): void => {
    reset({
      offsetTime: {
        timeIn: '',
        timeOut: ''
      },
      title: '',
      teamLeader: {
        label: '',
        value: ''
      },
      remarks: ''
    })
  }

  // modify custom style control
  customStyles.control = (provided: Record<string, unknown>, state: any): any => ({
    ...provided,
    boxShadow: 'none',
    borderColor: 'none',
    '&:hover': {
      color: '#75c55e'
    }
  })

  const handleEmojiSelect = (emoji: Emoji): void =>
    setValue('remarks', watch('remarks') + emoji.native)

  return (
    <ModalTemplate
      {...{
        isOpen,
        closeModal
      }}
      className="w-full max-w-[686px]"
    >
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(handleSave)}
      >
        {/* Custom Modal Header */}
        <ModalHeader
          {...{
            title: 'File Offset',
            closeModal
          }}
        />
        <main className="mb-6 grid grid-cols-2 gap-x-4 gap-y-6 py-6 px-8 text-xs text-slate-800">
          {/* Offset Time */}
          <section className="col-span-2">
            <label
              htmlFor="schedule-name"
              className={classNames(
                'flex flex-col space-y-0.5',
                !isEmpty(errors.offsetTime?.timeIn) || !isEmpty(errors.offsetTime?.timeOut)
                  ? 'mb-5'
                  : ''
              )}
            >
              <p className="shrink-0">
                Offset Time <span className="text-rose-500">*</span>
              </p>
              <div className="relative flex items-center space-x-2">
                <div className="w-1/2">
                  <Input
                    type="time"
                    disabled={isSubmitting}
                    {...register('offsetTime.timeIn')}
                    iserror={!isEmpty(errors.offsetTime?.timeIn)}
                    className="w-full py-1.5 px-4 text-[13px] placeholder:text-slate-500"
                  />
                  {!isEmpty(errors.offsetTime?.timeIn) && (
                    <p className="error absolute">{errors.offsetTime?.timeIn.message}</p>
                  )}
                </div>
                <span>to</span>
                <div className="w-1/2">
                  <Input
                    type="time"
                    disabled={isSubmitting}
                    {...register('offsetTime.timeOut')}
                    iserror={!isEmpty(errors.offsetTime?.timeOut)}
                    className="py-1.5 px-4 text-[13px] placeholder:text-slate-500"
                  />
                  {!isEmpty(errors.offsetTime?.timeOut) && (
                    <p className="error absolute">{errors.offsetTime?.timeOut.message}</p>
                  )}
                </div>
              </div>
            </label>
          </section>

          {/* Title */}
          <section className="col-span-2">
            <TextField title="Title" isRequired Icon={FileText} className="py-2.5 text-xs">
              <Input
                type="title"
                disabled={isSubmitting}
                placeholder=""
                {...register('title')}
                className="py-2.5 pl-11 text-xs"
                iserror={errors.title !== null && errors?.title !== undefined}
              />
            </TextField>
            {errors.title !== null && errors.title !== undefined && (
              <span className="error text-[10px]">{errors.title?.message}</span>
            )}
          </section>

          {/* Team Leader */}
          <section className="col-span-2">
            <TextField title="Team Leader" isRequired className="py-2.5 text-xs">
              <Controller
                name="teamLeader"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    isClearable
                    placeholder=""
                    styles={customStyles}
                    className="w-full"
                    classNames={{
                      control: (state) =>
                        state.isFocused
                          ? 'border-primary'
                          : errors.teamLeader !== null && errors.teamLeader !== undefined
                          ? 'border-rose-500 ring-rose-500'
                          : 'border-slate-300'
                    }}
                    value={field.value}
                    onChange={field.onChange}
                    isDisabled={isSubmitting}
                    backspaceRemovesValue={true}
                    options={generateESLUserSelect(eslLeaders)}
                  />
                )}
              />
            </TextField>
            {errors.teamLeader !== null && errors.teamLeader !== undefined && (
              <span className="error text-[10px]">Team Leader is required</span>
            )}
          </section>

          {/* Descriptiohn Field */}
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
        <ModalFooter>
          <Button
            type="button"
            variant="secondary"
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-4 py-1 text-sm"
            onClick={handleReset}
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

export default FileOffsetModal
