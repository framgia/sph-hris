import { NextPage } from 'next'
import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import Input from '~/components/atoms/Input'
import Alert from '~/components/atoms/Alert'
import { ScheduleSchema } from '~/utils/validation'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import FadeInOut from '~/components/templates/FadeInOut'
import { ScheduleFormData } from '~/utils/types/formValues'
import DayButton from '~/components/atoms/Buttons/DayButton'
import ButtonAction from '~/components/atoms/Buttons/ButtonAction'
import { scheduleList } from '~/utils/constants/dummyScheduleData'
import ScheduleManagementLayout from '~/components/templates/ScheduleManagementLayout'

const ScheduleManagement: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { id } = router.query
  const [errorMessage, setErrorMessage] = useState<string>('')
  const {
    reset,
    watch,
    setValue,
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ScheduleFormData>({
    resolver: yupResolver(ScheduleSchema),
    mode: 'onChange'
  })

  const isButtonSelected =
    watch('mondaySelected') ||
    watch('tuesdaySelected') ||
    watch('wednesdaySelected') ||
    watch('thursdaySelected') ||
    watch('fridaySelected') ||
    watch('saturdaySelected') ||
    watch('sundaySelected')

  const handleSaveSchedule: SubmitHandler<ScheduleFormData> = async (data): Promise<void> => {
    return await new Promise((resolve) => {
      if (isButtonSelected) {
        setErrorMessage('')
        setTimeout(() => {
          // console.log(data)
          alert(JSON.stringify(data, null, 2))
          resolve()
        }, 2000)
      } else {
        setErrorMessage('Please select atleast one days of week button!')
        resolve()
      }
    })
  }

  // For Filtering based on route ID and itemID
  useEffect(() => {
    const filteredData = scheduleList?.filter((item) => item.id === Number(id))
    setValue('scheduleName', filteredData[0]?.scheduleName)
    setValue('mondaySelected', filteredData[0]?.mondaySelected)
    setValue('monday', filteredData[0]?.monday)
    setValue('tuesdaySelected', filteredData[0]?.tuesdaySelected)
    setValue('tuesday', filteredData[0]?.tuesday)
    setValue('wednesdaySelected', filteredData[0]?.wednesdaySelected)
    setValue('wednesday', filteredData[0]?.wednesday)
    setValue('thursdaySelected', filteredData[0]?.thursdaySelected)
    setValue('thursday', filteredData[0]?.thursday)
    setValue('fridaySelected', filteredData[0]?.fridaySelected)
    setValue('friday', filteredData[0]?.friday)
    setValue('saturdaySelected', filteredData[0]?.saturdaySelected)
    setValue('saturday', filteredData[0]?.saturday)
    setValue('sundaySelected', filteredData[0]?.sundaySelected)
    setValue('sunday', filteredData[0]?.sunday)
  }, [id])

  useEffect(() => {
    if (isButtonSelected) {
      setErrorMessage('')
    }
  }, [isButtonSelected])

  const handleReset = (): void => {
    setErrorMessage('')
    reset({
      scheduleName: '',
      mondaySelected: false,
      tuesdaySelected: false,
      wednesdaySelected: false,
      thursdaySelected: false,
      fridaySelected: false,
      saturdaySelected: false,
      sundaySelected: false,
      monday: {
        timeIn: '',
        timeOut: ''
      },
      tuesday: {
        timeIn: '',
        timeOut: ''
      },
      wednesday: {
        timeIn: '',
        timeOut: ''
      },
      thursday: {
        timeIn: '',
        timeOut: ''
      },
      friday: {
        timeIn: '',
        timeOut: ''
      },
      saturday: {
        timeIn: '',
        timeOut: ''
      },
      sunday: {
        timeIn: '',
        timeOut: ''
      }
    })
  }

  return (
    <ScheduleManagementLayout metaTitle="Schedule Management">
      <FadeInOut className="default-scrollbar overflow-auto p-6 text-slate-800">
        <header>
          <h1 className="font-medium uppercase">{watch('scheduleName') ?? 'New Schedule'}</h1>
        </header>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(handleSaveSchedule)}
          className="mx-auto w-full min-w-[440px] max-w-full text-sm sm:max-w-xl"
        >
          <main className="mt-8 flex flex-col space-y-5 text-[13px]">
            {errorMessage !== '' ? <Alert type="info" message={errorMessage} /> : null}

            {/* Schedule Name Filed */}
            <section className="flex flex-col">
              <label
                htmlFor="schedule-name"
                className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2"
              >
                <div className="shrink-0">Schedule Name</div>
                <div className="w-full">
                  <Input
                    type="text"
                    rounded="lg"
                    color="warning"
                    disabled={isSubmitting}
                    placeholder="Schedule Name"
                    {...register('scheduleName')}
                    className="py-2 px-4 text-[13px]"
                    iserror={!isEmpty(errors.scheduleName)}
                  />
                </div>
              </label>
              {!isEmpty(errors.scheduleName) && (
                <p className="error sm:ml-28">{errors.scheduleName.message}</p>
              )}
            </section>

            {/* Days of Week Buttons */}
            <section className="sm:-ml-2">
              <label
                htmlFor="schedule-name"
                className="flex flex-1 flex-col space-y-2 overflow-x-auto sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0"
              >
                <span className="shrink-0">Days of the week</span>
                <div className="flex items-center space-x-2 overflow-hidden rounded-lg">
                  <DayButton
                    {...{
                      day: 'M',
                      title: 'Monday',
                      disabled: isSubmitting,
                      selected: getValues('mondaySelected'),
                      onClick: () => setValue('mondaySelected', !watch('mondaySelected'))
                    }}
                  />
                  <DayButton
                    {...{
                      day: 'T',
                      title: 'Tuesday',
                      disabled: isSubmitting,
                      selected: getValues('tuesdaySelected'),
                      onClick: () => setValue('tuesdaySelected', !watch('tuesdaySelected'))
                    }}
                  />
                  <DayButton
                    {...{
                      day: 'W',
                      title: 'Wednesday',
                      disabled: isSubmitting,
                      selected: getValues('wednesdaySelected'),
                      onClick: () => setValue('wednesdaySelected', !watch('wednesdaySelected'))
                    }}
                  />
                  <DayButton
                    {...{
                      day: 'T',
                      title: 'Thursday',
                      disabled: isSubmitting,
                      selected: getValues('thursdaySelected'),
                      onClick: () => setValue('thursdaySelected', !watch('thursdaySelected'))
                    }}
                  />
                  <DayButton
                    {...{
                      day: 'F',
                      title: 'Friday',
                      disabled: isSubmitting,
                      selected: getValues('fridaySelected'),
                      onClick: () => setValue('fridaySelected', !watch('fridaySelected'))
                    }}
                  />
                  <DayButton
                    {...{
                      day: 'S',
                      title: 'Saturday',
                      disabled: isSubmitting,
                      selected: getValues('saturdaySelected'),
                      onClick: () => setValue('saturdaySelected', !watch('saturdaySelected'))
                    }}
                  />
                  <DayButton
                    {...{
                      day: 'S',
                      title: 'Sunday',
                      disabled: isSubmitting,
                      selected: getValues('sundaySelected'),
                      onClick: () => setValue('sundaySelected', !watch('sundaySelected'))
                    }}
                  />
                </div>
              </label>
            </section>

            {/* Monday Field */}
            <section className="sm:ml-12">
              <label
                htmlFor="schedule-name"
                className={classNames(
                  'flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2',
                  !isEmpty(errors.monday?.timeIn) || !isEmpty(errors.monday?.timeOut) ? 'mb-5' : ''
                )}
              >
                <span className="shrink-0">Monday</span>
                {watch('mondaySelected') ? (
                  <div className="relative inline-flex items-center space-x-2">
                    <div>
                      <Input
                        type="time"
                        rounded="lg"
                        color="warning"
                        disabled={isSubmitting}
                        {...register('monday.timeIn')}
                        className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                      />
                      {!isEmpty(errors.monday?.timeIn) && (
                        <p className="error absolute">{errors.monday?.timeIn.message}</p>
                      )}
                    </div>
                    <span>to</span>
                    <div>
                      <Input
                        type="time"
                        rounded="lg"
                        color="warning"
                        disabled={isSubmitting}
                        {...register('monday.timeOut')}
                        className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                      />
                      {!isEmpty(errors.monday?.timeOut) && (
                        <p className="error absolute">{errors.monday?.timeOut.message}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <span className="italic text-slate-400">Rest day</span>
                )}
              </label>
            </section>

            {/* Tuesday Field */}
            <section className="sm:ml-12">
              <label
                htmlFor="schedule-name"
                className={classNames(
                  'flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2',
                  !isEmpty(errors.tuesday?.timeIn) || !isEmpty(errors.tuesday?.timeOut)
                    ? 'mb-5'
                    : ''
                )}
              >
                <span className="shrink-0">Tuesday</span>
                {watch('tuesdaySelected') ? (
                  <div className="relative inline-flex items-center space-x-2">
                    <div>
                      <Input
                        type="time"
                        rounded="lg"
                        color="warning"
                        disabled={isSubmitting}
                        {...register('tuesday.timeIn')}
                        className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                      />
                      {!isEmpty(errors.tuesday?.timeIn) && (
                        <p className="error absolute">{errors.tuesday?.timeIn.message}</p>
                      )}
                    </div>
                    <span>to</span>
                    <div>
                      <Input
                        type="time"
                        rounded="lg"
                        color="warning"
                        disabled={isSubmitting}
                        {...register('tuesday.timeOut')}
                        className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                      />
                      {!isEmpty(errors.tuesday?.timeOut) && (
                        <p className="error absolute">{errors.tuesday?.timeOut.message}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <span className="italic text-slate-400">Rest day</span>
                )}
              </label>
            </section>

            {/* Wednesday Field */}
            <section className="sm:ml-7">
              <label
                htmlFor="schedule-name"
                className={classNames(
                  'flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2',
                  !isEmpty(errors.wednesday?.timeIn) || !isEmpty(errors.wednesday?.timeOut)
                    ? 'mb-5'
                    : ''
                )}
              >
                <span className="shrink-0">Wednesday</span>
                {watch('wednesdaySelected') ? (
                  <div className="relative inline-flex items-center space-x-2">
                    <div>
                      <Input
                        type="time"
                        rounded="lg"
                        color="warning"
                        disabled={isSubmitting}
                        {...register('wednesday.timeIn')}
                        className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                      />
                      {!isEmpty(errors.wednesday?.timeIn) && (
                        <p className="error absolute">{errors.wednesday?.timeIn.message}</p>
                      )}
                    </div>
                    <span>to</span>
                    <div>
                      <Input
                        type="time"
                        rounded="lg"
                        color="warning"
                        disabled={isSubmitting}
                        {...register('wednesday.timeOut')}
                        className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                      />
                      {!isEmpty(errors.wednesday?.timeOut) && (
                        <p className="error absolute">{errors.wednesday?.timeOut.message}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <span className="italic text-slate-400">Rest day</span>
                )}
              </label>
            </section>

            {/* Thursday Field */}
            <section className="sm:ml-11">
              <label
                htmlFor="schedule-name"
                className={classNames(
                  'flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2',
                  !isEmpty(errors.thursday?.timeIn) || !isEmpty(errors.thursday?.timeOut)
                    ? 'mb-5'
                    : ''
                )}
              >
                <span className="shrink-0">Thrusday</span>
                {watch('thursdaySelected') ? (
                  <div className="relative inline-flex items-center space-x-2">
                    <div>
                      <Input
                        type="time"
                        rounded="lg"
                        color="warning"
                        disabled={isSubmitting}
                        {...register('thursday.timeIn')}
                        className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                      />
                      {!isEmpty(errors.thursday?.timeIn) && (
                        <p className="error absolute">{errors.thursday?.timeIn.message}</p>
                      )}
                    </div>
                    <span>to</span>
                    <div>
                      <Input
                        type="time"
                        rounded="lg"
                        color="warning"
                        disabled={isSubmitting}
                        {...register('thursday.timeOut')}
                        className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                      />
                      {!isEmpty(errors.thursday?.timeOut) && (
                        <p className="error absolute">{errors.thursday?.timeOut.message}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <span className="italic text-slate-400">Rest day</span>
                )}
              </label>
            </section>

            {/* Friday Field */}
            <section className="sm:ml-[65px]">
              <label
                htmlFor="schedule-name"
                className={classNames(
                  'flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2',
                  !isEmpty(errors.friday?.timeIn) || !isEmpty(errors.friday?.timeOut) ? 'mb-5' : ''
                )}
              >
                <span className="shrink-0">Friday</span>
                {watch('fridaySelected') ? (
                  <div className="relative inline-flex items-center space-x-2">
                    <div>
                      <Input
                        type="time"
                        rounded="lg"
                        color="warning"
                        disabled={isSubmitting}
                        {...register('friday.timeIn')}
                        className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                      />
                      {!isEmpty(errors.friday?.timeIn) && (
                        <p className="error absolute">{errors.friday?.timeIn.message}</p>
                      )}
                    </div>
                    <span>to</span>
                    <div>
                      <Input
                        type="time"
                        rounded="lg"
                        color="warning"
                        disabled={isSubmitting}
                        {...register('friday.timeOut')}
                        className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                      />
                      {!isEmpty(errors.friday?.timeOut) && (
                        <p className="error absolute">{errors.friday?.timeOut.message}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <span className="italic text-slate-400">Rest day</span>
                )}
              </label>
            </section>

            {/* Saturday Field */}
            <section className="sm:ml-11">
              <label
                htmlFor="schedule-name"
                className={classNames(
                  'flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2',
                  !isEmpty(errors.saturday?.timeIn) || !isEmpty(errors.saturday?.timeOut)
                    ? 'mb-5'
                    : ''
                )}
              >
                <span className="shrink-0">Saturday</span>
                {watch('saturdaySelected') ? (
                  <div className="relative inline-flex items-center space-x-2">
                    <div>
                      <Input
                        type="time"
                        rounded="lg"
                        color="warning"
                        disabled={isSubmitting}
                        {...register('saturday.timeIn')}
                        className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                      />
                      {!isEmpty(errors.saturday?.timeIn) && (
                        <p className="error absolute">{errors.saturday?.timeIn.message}</p>
                      )}
                    </div>
                    <span>to</span>
                    <div>
                      <Input
                        type="time"
                        rounded="lg"
                        color="warning"
                        disabled={isSubmitting}
                        {...register('saturday.timeOut')}
                        className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                      />
                      {!isEmpty(errors.saturday?.timeOut) && (
                        <p className="error absolute">{errors.saturday?.timeOut.message}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <span className="italic text-slate-400">Rest day</span>
                )}
              </label>
            </section>

            {/* Sunday Field */}
            <section className="sm:ml-14">
              <label
                htmlFor="schedule-name"
                className={classNames(
                  'flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2',
                  !isEmpty(errors.sunday?.timeIn) || !isEmpty(errors.sunday?.timeOut) ? 'mb-5' : ''
                )}
              >
                <span className="shrink-0">Sunday</span>
                {watch('sundaySelected') ? (
                  <div className="relative inline-flex items-center space-x-2">
                    <div>
                      <Input
                        type="time"
                        rounded="lg"
                        color="warning"
                        disabled={isSubmitting}
                        {...register('sunday.timeIn')}
                        className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                      />
                      {!isEmpty(errors.sunday?.timeIn) && (
                        <p className="error absolute">{errors.sunday?.timeIn.message}</p>
                      )}
                    </div>
                    <span>to</span>
                    <div>
                      <Input
                        type="time"
                        rounded="lg"
                        color="warning"
                        disabled={isSubmitting}
                        {...register('sunday.timeOut')}
                        className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                      />
                      {!isEmpty(errors.sunday?.timeOut) && (
                        <p className="error absolute">{errors.sunday?.timeOut.message}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <span className="italic text-slate-400">Rest day</span>
                )}
              </label>
            </section>
          </main>
          <hr className="border-1 my-6 border-slate-200" />
          <footer className="flex justify-end space-x-2 py-2">
            <ButtonAction
              type="button"
              variant="secondary"
              onClick={handleReset}
              disabled={isSubmitting || !isEmpty(id)}
              className="w-24 rounded-md py-2 text-xs"
            >
              Cancel
            </ButtonAction>
            <ButtonAction
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="flex w-24 items-center justify-center space-x-2 rounded-md py-2 text-xs"
            >
              {isSubmitting ? (
                <>
                  <SpinnerIcon className="h-3 w-3 !fill-white" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span>Save</span>
                </>
              )}
            </ButtonAction>
          </footer>
        </form>
      </FadeInOut>
    </ScheduleManagementLayout>
  )
}

export default ScheduleManagement
