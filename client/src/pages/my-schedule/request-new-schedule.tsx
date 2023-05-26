import { NextPage } from 'next'
import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import ReactSelect from 'react-select'
import { CheckSquare, X } from 'react-feather'
import makeAnimated from 'react-select/animated'
import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import Card from '~/components/atoms/Card'
import Input from '~/components/atoms/Input'
import Alert from '~/components/atoms/Alert'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import FadeInOut from '~/components/templates/FadeInOut'
import DayButton from '~/components/atoms/Buttons/DayButton'
import { RequestNewScheduleSchema } from '~/utils/validation'
import { customStyles } from '~/utils/customReactSelectStyles'
import { shiftSchedule } from '~/utils/constants/shiftSchedule'
import ButtonAction from '~/components/atoms/Buttons/ButtonAction'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'
import ApplyToAllModal from '~/components/molecules/ApplyToAllModal'
import MyScheduleLayout from '~/components/templates/MySchedulelayout'
import UnderConstructionPage from '~/components/pages/UnderContructionPage'
import {
  ReactSelectOption,
  TimeEntryWithBreak,
  RequestNewScheduleFormData
} from '~/utils/types/formValues'

const animatedComponents = makeAnimated()

const RequestNewSchedule: NextPage = (): JSX.Element => {
  const [selectedShift, setSelectedShift] = useState<ReactSelectOption>()

  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isOpenApplyToAll, setIsOpenApplyToAll] = useState<boolean>(false)

  const {
    reset,
    watch,
    setValue,
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RequestNewScheduleFormData>({
    resolver: yupResolver(RequestNewScheduleSchema),
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

  const handleSaveSchedule: SubmitHandler<RequestNewScheduleFormData> = async (
    data
  ): Promise<void> => {
    return await new Promise((resolve) => {
      if (isButtonSelected) {
        alert(JSON.stringify(data, null, 2))
      } else {
        setErrorMessage('Please select atleast one Day of the week button.')
      }
      resolve()
    })
  }

  useEffect(() => {
    if (isButtonSelected) {
      setErrorMessage('')
    }
  }, [isButtonSelected])

  const empty = {
    timeIn: '',
    timeOut: '',
    breakFrom: '',
    breakTo: ''
  }

  const handleReset = (): void => {
    setSelectedShift(shiftSchedule[0])
    setErrorMessage('')
    reset({
      mondaySelected: false,
      tuesdaySelected: false,
      wednesdaySelected: false,
      thursdaySelected: false,
      fridaySelected: false,
      saturdaySelected: false,
      sundaySelected: false,
      monday: empty,
      tuesday: empty,
      wednesday: empty,
      thursday: empty,
      friday: empty,
      saturday: empty,
      sunday: empty
    })
  }

  const handleShiftChange = (selectedOption: ReactSelectOption): void =>
    setSelectedShift(selectedOption)

  useEffect(() => {
    if (selectedShift !== undefined) {
      getScheduleShiftData(selectedShift)
    }
  }, [selectedShift])

  const getScheduleShiftData = (selectedShift: ReactSelectOption): void => {
    const shiftSelect = {
      mondaySelected: true,
      tuesdaySelected: true,
      wednesdaySelected: true,
      thursdaySelected: true,
      fridaySelected: true,
      saturdaySelected: false,
      sundaySelected: false
    }
    const morningShiftData = {
      ...shiftSelect,
      monday: {
        timeIn: '09:30',
        timeOut: '06:30',
        breakFrom: '12:00',
        breakTo: '13:00'
      },
      tuesday: {
        timeIn: '09:30',
        timeOut: '06:30',
        breakFrom: '12:00',
        breakTo: '03:00'
      },
      wednesday: {
        timeIn: '09:30',
        timeOut: '06:30',
        breakFrom: '12:00',
        breakTo: '03:00'
      },
      thursday: {
        timeIn: '09:30',
        timeOut: '06:30',
        breakFrom: '12:00',
        breakTo: '03:00'
      },
      friday: {
        timeIn: '09:30',
        timeOut: '06:30',
        breakFrom: '12:00',
        breakTo: '03:00'
      }
    }
    const afternoonShiftData = {
      ...shiftSelect,
      monday: {
        timeIn: '01:00',
        timeOut: '10:00',
        breakFrom: '05:00',
        breakTo: '01:00'
      },
      tuesday: {
        timeIn: '01:00',
        timeOut: '10:00',
        breakFrom: '05:00',
        breakTo: '06:00'
      },
      wednesday: {
        timeIn: '06:00',
        timeOut: '10:00',
        breakFrom: '05:00',
        breakTo: '06:00'
      },
      thursday: {
        timeIn: '06:00',
        timeOut: '10:00',
        breakFrom: '05:00',
        breakTo: '06:00'
      },
      friday: {
        timeIn: '06:00',
        timeOut: '10:00',
        breakFrom: '05:00',
        breakTo: '06:00'
      }
    }
    switch (selectedShift.value) {
      case '1':
        handleReset()
        break
      case '2':
        reset(morningShiftData)
        break
      case '3':
        reset(afternoonShiftData)
        break
      default:
        handleReset()
        break
    }
  }

  const handleOpenApplyToAllToggle = (): void => setIsOpenApplyToAll(!isOpenApplyToAll)

  const handleApplyToAll: SubmitHandler<TimeEntryWithBreak> = (dayData): void => {
    reset({
      mondaySelected: true,
      tuesdaySelected: true,
      wednesdaySelected: true,
      thursdaySelected: true,
      fridaySelected: true,
      saturdaySelected: true,
      sundaySelected: true,
      monday: dayData,
      tuesday: dayData,
      wednesday: dayData,
      thursday: dayData,
      friday: dayData,
      saturday: dayData,
      sunday: dayData
    })
    setIsOpenApplyToAll(false)
  }

  const handleClear = (
    dayClear:
      | 'mondayClear'
      | 'tuesdayClear'
      | 'wednesdayClear'
      | 'thursdayClear'
      | 'fridayClear'
      | 'saturdayClear'
      | 'sundayClear'
  ): void => {
    switch (dayClear) {
      case 'mondayClear':
        setValue('monday', empty)
        break
      case 'tuesdayClear':
        setValue('tuesday', empty)
        break
      case 'wednesdayClear':
        setValue('wednesday', empty)
        break
      case 'thursdayClear':
        setValue('thursday', empty)
        break
      case 'fridayClear':
        setValue('friday', empty)
        break
      case 'saturdayClear':
        setValue('saturday', empty)
        break
      case 'sundayClear':
        setValue('sunday', empty)
        break
      default:
        break
    }
  }

  if (process.env.NEXT_PUBLIC_DISPLAY_MY_SCHEDULE_PAGE === 'false') {
    return <UnderConstructionPage />
  }

  return (
    <MyScheduleLayout metaTitle="Request New Schedule">
      <FadeInOut className="default-scrollbar h-full overflow-y-auto">
        <MaxWidthContainer maxWidth="w-full max-w-[868px]" className="my-8 px-4">
          <Card className="default-scrollbar overflow-auto text-sm">
            <header className="flex items-center justify-between px-4 pt-6 sm:px-8">
              <section className="space-y-1 ">
                <h3 className="text-xs font-medium">Schedule Shift:</h3>
                <div className="w-full sm:w-56">
                  <ReactSelect
                    className="text-xs"
                    value={selectedShift}
                    styles={customStyles}
                    options={shiftSchedule}
                    closeMenuOnSelect={true}
                    isDisabled={isSubmitting}
                    instanceId="scheduleShift"
                    defaultValue={shiftSchedule[0]}
                    components={animatedComponents}
                    onChange={(option) => handleShiftChange(option as ReactSelectOption)}
                  />
                </div>
              </section>
              <section className="mt-2">
                <ButtonAction
                  variant="secondary"
                  onClick={handleOpenApplyToAllToggle}
                  className="inline-flex items-center space-x-1.5 px-1.5 py-1 text-xs"
                >
                  <CheckSquare className="h-4 w-4" />
                  <span>Apply to All</span>
                </ButtonAction>

                {/* Show the Apply To All Modal */}
                <ApplyToAllModal
                  {...{
                    isOpen: isOpenApplyToAll,
                    closeModal: handleOpenApplyToAllToggle,
                    actions: {
                      handleApplyToAll
                    }
                  }}
                />
              </section>
            </header>
            <div className="px-6 pb-4 md:px-8 md:pb-8 lg:px-14 lg:pb-10">
              <form
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={handleSubmit(handleSaveSchedule)}
                className="mx-auto w-full sm:px-4"
              >
                <main className="flex flex-col divide-y divide-slate-100 text-[13px]">
                  {errorMessage !== '' ? (
                    <Alert type="info" message={errorMessage} className="mt-4" />
                  ) : null}

                  {/* Days of Week Buttons */}
                  <section className="py-4">
                    <label
                      htmlFor="schedule-name"
                      className="flex flex-1 flex-col items-center space-y-2 overflow-x-auto"
                    >
                      <span className="shrink-0 font-medium">Days of the week</span>
                      <div className="flex flex-wrap items-center gap-2 rounded-lg">
                        <DayButton
                          {...{
                            day: 'M',
                            title: 'Monday',
                            disabled: isSubmitting,
                            selected: getValues('mondaySelected'),
                            onClick: () => {
                              setValue('monday', empty)
                              setValue('mondaySelected', !watch('mondaySelected'))
                            }
                          }}
                        />
                        <DayButton
                          {...{
                            day: 'T',
                            title: 'Tuesday',
                            disabled: isSubmitting,
                            selected: getValues('tuesdaySelected'),
                            onClick: () => {
                              setValue('tuesday', empty)
                              setValue('tuesdaySelected', !watch('tuesdaySelected'))
                            }
                          }}
                        />
                        <DayButton
                          {...{
                            day: 'W',
                            title: 'Wednesday',
                            disabled: isSubmitting,
                            selected: getValues('wednesdaySelected'),
                            onClick: () => {
                              setValue('wednesday', empty)
                              setValue('wednesdaySelected', !watch('wednesdaySelected'))
                            }
                          }}
                        />
                        <DayButton
                          {...{
                            day: 'T',
                            title: 'Thursday',
                            disabled: isSubmitting,
                            selected: getValues('thursdaySelected'),
                            onClick: () => {
                              setValue('thursday', empty)
                              setValue('thursdaySelected', !watch('thursdaySelected'))
                            }
                          }}
                        />
                        <DayButton
                          {...{
                            day: 'F',
                            title: 'Friday',
                            disabled: isSubmitting,
                            selected: getValues('fridaySelected'),
                            onClick: () => {
                              setValue('friday', empty)
                              setValue('fridaySelected', !watch('fridaySelected'))
                            }
                          }}
                        />
                        <DayButton
                          {...{
                            day: 'S',
                            title: 'Saturday',
                            disabled: isSubmitting,
                            selected: getValues('saturdaySelected'),
                            onClick: () => {
                              setValue('saturday', empty)
                              setValue('saturdaySelected', !watch('saturdaySelected'))
                            }
                          }}
                        />
                        <DayButton
                          {...{
                            day: 'S',
                            title: 'Sunday',
                            disabled: isSubmitting,
                            selected: getValues('sundaySelected'),
                            onClick: () => {
                              setValue('sunday', empty)
                              setValue('sundaySelected', !watch('sundaySelected'))
                            }
                          }}
                        />
                      </div>
                    </label>
                  </section>

                  {/* Monday Field */}
                  <section className="py-4">
                    <label htmlFor="monday" className={classNames('flex flex-col space-y-2')}>
                      <span className="shrink-0 font-medium">Monday</span>
                      {watch('mondaySelected') ? (
                        <div className="flex flex-col gap-y-2 gap-x-2 lg:flex-row lg:items-start">
                          <div
                            className={classNames(
                              'flex items-center gap-x-2',
                              !isEmpty(errors.monday?.timeIn) || !isEmpty(errors.monday?.timeOut)
                                ? 'mb-5'
                                : ''
                            )}
                          >
                            <div className="relative">
                              <Input
                                type="time"
                                rounded="lg"
                                color="warning"
                                disabled={isSubmitting}
                                {...register('monday.timeIn')}
                                iserror={!isEmpty(errors.monday?.timeIn)}
                                className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                              />
                              {!isEmpty(errors.monday?.timeIn) && (
                                <p className="error absolute">{errors.monday?.timeIn.message}</p>
                              )}
                            </div>
                            <span>to</span>
                            <div className="relative">
                              <Input
                                type="time"
                                rounded="lg"
                                color="warning"
                                disabled={isSubmitting}
                                {...register('monday.timeOut')}
                                iserror={!isEmpty(errors.monday?.timeOut)}
                                className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                              />
                              {!isEmpty(errors.monday?.timeOut) && (
                                <p className="error absolute">{errors.monday?.timeOut.message}</p>
                              )}
                            </div>
                          </div>
                          <div
                            className={classNames(
                              'flex flex-col gap-y-2 gap-x-2 lg:flex-row lg:items-center',
                              !isEmpty(errors.monday?.breakFrom) || !isEmpty(errors.monday?.breakTo)
                                ? 'mb-5'
                                : ''
                            )}
                          >
                            <span className="font-medium">Break</span>
                            <div className="inline-flex flex-row items-center gap-x-2">
                              <div className="relative">
                                <Input
                                  type="time"
                                  rounded="lg"
                                  color="warning"
                                  disabled={isSubmitting}
                                  {...register('monday.breakFrom')}
                                  iserror={!isEmpty(errors.monday?.breakFrom)}
                                  className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                                />
                                {!isEmpty(errors.monday?.breakFrom) && (
                                  <p className="error absolute">
                                    {errors.monday?.breakFrom.message}
                                  </p>
                                )}
                              </div>
                              <span>to</span>
                              <div className="relative">
                                <Input
                                  type="time"
                                  rounded="lg"
                                  color="warning"
                                  disabled={isSubmitting}
                                  {...register('monday.breakTo')}
                                  iserror={!isEmpty(errors.monday?.breakTo)}
                                  className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                                />
                                {!isEmpty(errors.monday?.breakTo) && (
                                  <p className="error absolute">{errors.monday?.breakTo.message}</p>
                                )}
                              </div>
                            </div>
                          </div>
                          <ButtonAction
                            type="button"
                            variant="secondary-outline"
                            onClick={() => handleClear('mondayClear')}
                            className="mt-2 inline-flex w-20 items-center space-x-1 px-1.5 py-0.5"
                          >
                            <X className="h-[18px] w-[18px]" />
                            <span className="text-[13px]">Clear</span>
                          </ButtonAction>
                        </div>
                      ) : (
                        <span className="italic text-slate-400">Rest day</span>
                      )}
                    </label>
                  </section>

                  {/* Tuesday Field */}
                  <section className="py-4">
                    <label htmlFor="tuesday" className={classNames('flex flex-col space-y-2')}>
                      <span className="shrink-0 font-medium">Tuesday</span>
                      {watch('tuesdaySelected') ? (
                        <div className="flex flex-col gap-y-2 gap-x-2 lg:flex-row lg:items-start">
                          <div
                            className={classNames(
                              'flex items-center gap-x-2',
                              !isEmpty(errors.tuesday?.timeIn) || !isEmpty(errors.tuesday?.timeOut)
                                ? 'mb-5'
                                : ''
                            )}
                          >
                            <div className="relative">
                              <Input
                                type="time"
                                rounded="lg"
                                color="warning"
                                disabled={isSubmitting}
                                {...register('tuesday.timeIn')}
                                iserror={!isEmpty(errors.tuesday?.timeIn)}
                                className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                              />
                              {!isEmpty(errors.tuesday?.timeIn) && (
                                <p className="error absolute">{errors.tuesday?.timeIn.message}</p>
                              )}
                            </div>
                            <span>to</span>
                            <div className="relative">
                              <Input
                                type="time"
                                rounded="lg"
                                color="warning"
                                disabled={isSubmitting}
                                {...register('tuesday.timeOut')}
                                iserror={!isEmpty(errors.tuesday?.timeOut)}
                                className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                              />
                              {!isEmpty(errors.tuesday?.timeOut) && (
                                <p className="error absolute">{errors.tuesday?.timeOut.message}</p>
                              )}
                            </div>
                          </div>
                          <div
                            className={classNames(
                              'flex flex-col gap-y-2 gap-x-2 lg:flex-row lg:items-center',
                              !isEmpty(errors.tuesday?.breakFrom) ||
                                !isEmpty(errors.tuesday?.breakTo)
                                ? 'mb-5'
                                : ''
                            )}
                          >
                            <span className="font-medium">Break</span>
                            <div className="inline-flex flex-row items-center gap-x-2">
                              <div className="relative">
                                <Input
                                  type="time"
                                  rounded="lg"
                                  color="warning"
                                  disabled={isSubmitting}
                                  {...register('tuesday.breakFrom')}
                                  iserror={!isEmpty(errors.tuesday?.breakFrom)}
                                  className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                                />
                                {!isEmpty(errors.tuesday?.breakFrom) && (
                                  <p className="error absolute">
                                    {errors.tuesday?.breakFrom.message}
                                  </p>
                                )}
                              </div>
                              <span>to</span>
                              <div className="relative">
                                <Input
                                  type="time"
                                  rounded="lg"
                                  color="warning"
                                  disabled={isSubmitting}
                                  {...register('tuesday.breakTo')}
                                  iserror={!isEmpty(errors.tuesday?.breakTo)}
                                  className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                                />
                                {!isEmpty(errors.tuesday?.breakTo) && (
                                  <p className="error absolute">
                                    {errors.tuesday?.breakTo.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <ButtonAction
                            type="button"
                            variant="secondary-outline"
                            onClick={() => handleClear('tuesdayClear')}
                            className="mt-2 inline-flex w-20 items-center space-x-1 px-1.5 py-0.5"
                          >
                            <X className="h-[18px] w-[18px]" />
                            <span className="text-[13px]">Clear</span>
                          </ButtonAction>
                        </div>
                      ) : (
                        <span className="italic text-slate-400">Rest day</span>
                      )}
                    </label>
                  </section>

                  {/* Wednesday Field */}
                  <section className="py-4">
                    <label htmlFor="wednesday" className={classNames('flex flex-col space-y-2')}>
                      <span className="shrink-0 font-medium">Wednesday</span>
                      {watch('wednesdaySelected') ? (
                        <div className="flex flex-col gap-y-2 gap-x-2 lg:flex-row lg:items-start">
                          <div
                            className={classNames(
                              'flex items-center gap-x-2',
                              !isEmpty(errors.wednesday?.timeIn) ||
                                !isEmpty(errors.wednesday?.timeOut)
                                ? 'mb-5'
                                : ''
                            )}
                          >
                            <div className="relative">
                              <Input
                                type="time"
                                rounded="lg"
                                color="warning"
                                disabled={isSubmitting}
                                {...register('wednesday.timeIn')}
                                iserror={!isEmpty(errors.wednesday?.timeIn)}
                                className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                              />
                              {!isEmpty(errors.wednesday?.timeIn) && (
                                <p className="error absolute">{errors.wednesday?.timeIn.message}</p>
                              )}
                            </div>
                            <span>to</span>
                            <div className="relative">
                              <Input
                                type="time"
                                rounded="lg"
                                color="warning"
                                disabled={isSubmitting}
                                {...register('wednesday.timeOut')}
                                iserror={!isEmpty(errors.wednesday?.timeOut)}
                                className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                              />
                              {!isEmpty(errors.wednesday?.timeOut) && (
                                <p className="error absolute">
                                  {errors.wednesday?.timeOut.message}
                                </p>
                              )}
                            </div>
                          </div>
                          <div
                            className={classNames(
                              'flex flex-col gap-y-2 gap-x-2 lg:flex-row lg:items-center',
                              !isEmpty(errors.wednesday?.breakFrom) ||
                                !isEmpty(errors.wednesday?.breakTo)
                                ? 'mb-5'
                                : ''
                            )}
                          >
                            <span className="font-medium">Break</span>
                            <div className="inline-flex flex-row items-center gap-x-2">
                              <div className="relative">
                                <Input
                                  type="time"
                                  rounded="lg"
                                  color="warning"
                                  disabled={isSubmitting}
                                  {...register('wednesday.breakFrom')}
                                  iserror={!isEmpty(errors.wednesday?.breakFrom)}
                                  className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                                />
                                {!isEmpty(errors.wednesday?.breakFrom) && (
                                  <p className="error absolute">
                                    {errors.wednesday?.breakFrom.message}
                                  </p>
                                )}
                              </div>
                              <span>to</span>
                              <div className="relative">
                                <Input
                                  type="time"
                                  rounded="lg"
                                  color="warning"
                                  disabled={isSubmitting}
                                  {...register('wednesday.breakTo')}
                                  iserror={!isEmpty(errors.wednesday?.breakTo)}
                                  className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                                />
                                {!isEmpty(errors.wednesday?.breakTo) && (
                                  <p className="error absolute">
                                    {errors.wednesday?.breakTo.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <ButtonAction
                            type="button"
                            variant="secondary-outline"
                            onClick={() => handleClear('wednesdayClear')}
                            className="mt-2 inline-flex w-20 items-center space-x-1 px-1.5 py-0.5"
                          >
                            <X className="h-[18px] w-[18px]" />
                            <span className="text-[13px]">Clear</span>
                          </ButtonAction>
                        </div>
                      ) : (
                        <span className="italic text-slate-400">Rest day</span>
                      )}
                    </label>
                  </section>

                  {/* Thursday Field */}
                  <section className="py-4">
                    <label htmlFor="thursday" className={classNames('flex flex-col space-y-2')}>
                      <span className="shrink-0 font-medium">Thursday</span>
                      {watch('thursdaySelected') ? (
                        <div className="flex flex-col gap-y-2 gap-x-2 lg:flex-row lg:items-start">
                          <div
                            className={classNames(
                              'flex items-center gap-x-2',
                              !isEmpty(errors.thursday?.timeIn) ||
                                !isEmpty(errors.thursday?.timeOut)
                                ? 'mb-5'
                                : ''
                            )}
                          >
                            <div className="relative">
                              <Input
                                type="time"
                                rounded="lg"
                                color="warning"
                                disabled={isSubmitting}
                                {...register('thursday.timeIn')}
                                iserror={!isEmpty(errors.thursday?.timeIn)}
                                className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                              />
                              {!isEmpty(errors.thursday?.timeIn) && (
                                <p className="error absolute">{errors.thursday?.timeIn.message}</p>
                              )}
                            </div>
                            <span>to</span>
                            <div className="relative">
                              <Input
                                type="time"
                                rounded="lg"
                                color="warning"
                                disabled={isSubmitting}
                                {...register('thursday.timeOut')}
                                iserror={!isEmpty(errors.thursday?.timeOut)}
                                className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                              />
                              {!isEmpty(errors.thursday?.timeOut) && (
                                <p className="error absolute">{errors.thursday?.timeOut.message}</p>
                              )}
                            </div>
                          </div>
                          <div
                            className={classNames(
                              'flex flex-col gap-y-2 gap-x-2 lg:flex-row lg:items-center',
                              !isEmpty(errors.thursday?.breakFrom) ||
                                !isEmpty(errors.thursday?.breakTo)
                                ? 'mb-5'
                                : ''
                            )}
                          >
                            <span className="font-medium">Break</span>
                            <div className="inline-flex flex-row items-center gap-x-2">
                              <div className="relative">
                                <Input
                                  type="time"
                                  rounded="lg"
                                  color="warning"
                                  disabled={isSubmitting}
                                  {...register('thursday.breakFrom')}
                                  iserror={!isEmpty(errors.thursday?.breakFrom)}
                                  className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                                />
                                {!isEmpty(errors.thursday?.breakFrom) && (
                                  <p className="error absolute">
                                    {errors.thursday?.breakFrom.message}
                                  </p>
                                )}
                              </div>
                              <span>to</span>
                              <div className="relative">
                                <Input
                                  type="time"
                                  rounded="lg"
                                  color="warning"
                                  disabled={isSubmitting}
                                  {...register('thursday.breakTo')}
                                  iserror={!isEmpty(errors.thursday?.breakTo)}
                                  className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                                />
                                {!isEmpty(errors.thursday?.breakTo) && (
                                  <p className="error absolute">
                                    {errors.thursday?.breakTo.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <ButtonAction
                            type="button"
                            variant="secondary-outline"
                            onClick={() => handleClear('thursdayClear')}
                            className="mt-2 inline-flex w-20 items-center space-x-1 px-1.5 py-0.5"
                          >
                            <X className="h-[18px] w-[18px]" />
                            <span className="text-[13px]">Clear</span>
                          </ButtonAction>
                        </div>
                      ) : (
                        <span className="italic text-slate-400">Rest day</span>
                      )}
                    </label>
                  </section>

                  {/* Friday Field */}
                  <section className="py-4">
                    <label htmlFor="friday" className={classNames('flex flex-col space-y-2')}>
                      <span className="shrink-0 font-medium">Friday</span>
                      {watch('fridaySelected') ? (
                        <div className="flex flex-col gap-y-2 gap-x-2 lg:flex-row lg:items-start">
                          <div
                            className={classNames(
                              'flex items-center gap-x-2',
                              !isEmpty(errors.friday?.timeIn) || !isEmpty(errors.friday?.timeOut)
                                ? 'mb-5'
                                : ''
                            )}
                          >
                            <div className="relative">
                              <Input
                                type="time"
                                rounded="lg"
                                color="warning"
                                disabled={isSubmitting}
                                {...register('friday.timeIn')}
                                iserror={!isEmpty(errors.friday?.timeIn)}
                                className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                              />
                              {!isEmpty(errors.friday?.timeIn) && (
                                <p className="error absolute">{errors.friday?.timeIn.message}</p>
                              )}
                            </div>
                            <span>to</span>
                            <div className="relative">
                              <Input
                                type="time"
                                rounded="lg"
                                color="warning"
                                disabled={isSubmitting}
                                {...register('friday.timeOut')}
                                iserror={!isEmpty(errors.friday?.timeOut)}
                                className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                              />
                              {!isEmpty(errors.friday?.timeOut) && (
                                <p className="error absolute">{errors.friday?.timeOut.message}</p>
                              )}
                            </div>
                          </div>
                          <div
                            className={classNames(
                              'flex flex-col gap-y-2 gap-x-2 lg:flex-row lg:items-center',
                              !isEmpty(errors.friday?.breakFrom) || !isEmpty(errors.friday?.breakTo)
                                ? 'mb-5'
                                : ''
                            )}
                          >
                            <span className="font-medium">Break</span>
                            <div className="inline-flex flex-row items-center gap-x-2">
                              <div className="relative">
                                <Input
                                  type="time"
                                  rounded="lg"
                                  color="warning"
                                  disabled={isSubmitting}
                                  {...register('friday.breakFrom')}
                                  iserror={!isEmpty(errors.friday?.breakFrom)}
                                  className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                                />
                                {!isEmpty(errors.friday?.breakFrom) && (
                                  <p className="error absolute">
                                    {errors.friday?.breakFrom.message}
                                  </p>
                                )}
                              </div>
                              <span>to</span>
                              <div className="relative">
                                <Input
                                  type="time"
                                  rounded="lg"
                                  color="warning"
                                  disabled={isSubmitting}
                                  {...register('friday.breakTo')}
                                  iserror={!isEmpty(errors.friday?.breakTo)}
                                  className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                                />
                                {!isEmpty(errors.friday?.breakTo) && (
                                  <p className="error absolute">{errors.friday?.breakTo.message}</p>
                                )}
                              </div>
                            </div>
                          </div>
                          <ButtonAction
                            type="button"
                            variant="secondary-outline"
                            onClick={() => handleClear('fridayClear')}
                            className="mt-2 inline-flex w-20 items-center space-x-1 px-1.5 py-0.5"
                          >
                            <X className="h-[18px] w-[18px]" />
                            <span className="text-[13px]">Clear</span>
                          </ButtonAction>
                        </div>
                      ) : (
                        <span className="italic text-slate-400">Rest day</span>
                      )}
                    </label>
                  </section>

                  {/* Saturyday Field */}
                  <section className="py-4">
                    <label htmlFor="saturday" className={classNames('flex flex-col space-y-2')}>
                      <span className="shrink-0 font-medium">Saturday</span>
                      {watch('saturdaySelected') ? (
                        <div className="flex flex-col gap-y-2 gap-x-2 lg:flex-row lg:items-start">
                          <div
                            className={classNames(
                              'flex items-center gap-x-2',
                              !isEmpty(errors.saturday?.timeIn) ||
                                !isEmpty(errors.saturday?.timeOut)
                                ? 'mb-5'
                                : ''
                            )}
                          >
                            <div className="relative">
                              <Input
                                type="time"
                                rounded="lg"
                                color="warning"
                                disabled={isSubmitting}
                                {...register('saturday.timeIn')}
                                iserror={!isEmpty(errors.saturday?.timeIn)}
                                className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                              />
                              {!isEmpty(errors.saturday?.timeIn) && (
                                <p className="error absolute">{errors.saturday?.timeIn.message}</p>
                              )}
                            </div>
                            <span>to</span>
                            <div className="relative">
                              <Input
                                type="time"
                                rounded="lg"
                                color="warning"
                                disabled={isSubmitting}
                                {...register('saturday.timeOut')}
                                iserror={!isEmpty(errors.saturday?.timeOut)}
                                className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                              />
                              {!isEmpty(errors.saturday?.timeOut) && (
                                <p className="error absolute">{errors.saturday?.timeOut.message}</p>
                              )}
                            </div>
                          </div>
                          <div
                            className={classNames(
                              'flex flex-col gap-y-2 gap-x-2 lg:flex-row lg:items-center',
                              !isEmpty(errors.saturday?.breakFrom) ||
                                !isEmpty(errors.saturday?.breakTo)
                                ? 'mb-5'
                                : ''
                            )}
                          >
                            <span className="font-medium">Break</span>
                            <div className="inline-flex flex-row items-center gap-x-2">
                              <div className="relative">
                                <Input
                                  type="time"
                                  rounded="lg"
                                  color="warning"
                                  disabled={isSubmitting}
                                  {...register('saturday.breakFrom')}
                                  iserror={!isEmpty(errors.saturday?.breakFrom)}
                                  className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                                />
                                {!isEmpty(errors.saturday?.breakFrom) && (
                                  <p className="error absolute">
                                    {errors.saturday?.breakFrom.message}
                                  </p>
                                )}
                              </div>
                              <span>to</span>
                              <div className="relative">
                                <Input
                                  type="time"
                                  rounded="lg"
                                  color="warning"
                                  disabled={isSubmitting}
                                  {...register('saturday.breakTo')}
                                  iserror={!isEmpty(errors.saturday?.breakTo)}
                                  className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                                />
                                {!isEmpty(errors.saturday?.breakTo) && (
                                  <p className="error absolute">
                                    {errors.saturday?.breakTo.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <ButtonAction
                            type="button"
                            variant="secondary-outline"
                            onClick={() => handleClear('saturdayClear')}
                            className="mt-2 inline-flex w-20 items-center space-x-1 px-1.5 py-0.5"
                          >
                            <X className="h-[18px] w-[18px]" />
                            <span className="text-[13px]">Clear</span>
                          </ButtonAction>
                        </div>
                      ) : (
                        <span className="italic text-slate-400">Rest day</span>
                      )}
                    </label>
                  </section>

                  {/* Sunday Field */}
                  <section className="py-4">
                    <label htmlFor="sunday" className={classNames('flex flex-col space-y-2')}>
                      <span className="shrink-0 font-medium">Sunday</span>
                      {watch('sundaySelected') ? (
                        <div className="flex flex-col gap-y-2 gap-x-2 lg:flex-row lg:items-start">
                          <div
                            className={classNames(
                              'flex items-center gap-x-2',
                              !isEmpty(errors.sunday?.timeIn) || !isEmpty(errors.sunday?.timeOut)
                                ? 'mb-5'
                                : ''
                            )}
                          >
                            <div className="relative">
                              <Input
                                type="time"
                                rounded="lg"
                                color="warning"
                                disabled={isSubmitting}
                                {...register('sunday.timeIn')}
                                iserror={!isEmpty(errors.sunday?.timeIn)}
                                className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                              />
                              {!isEmpty(errors.sunday?.timeIn) && (
                                <p className="error absolute">{errors.sunday?.timeIn.message}</p>
                              )}
                            </div>
                            <span>to</span>
                            <div className="relative">
                              <Input
                                type="time"
                                rounded="lg"
                                color="warning"
                                disabled={isSubmitting}
                                {...register('sunday.timeOut')}
                                iserror={!isEmpty(errors.sunday?.timeOut)}
                                className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                              />
                              {!isEmpty(errors.sunday?.timeOut) && (
                                <p className="error absolute">{errors.sunday?.timeOut.message}</p>
                              )}
                            </div>
                          </div>
                          <div
                            className={classNames(
                              'flex flex-col gap-y-2 gap-x-2 lg:flex-row lg:items-center',
                              !isEmpty(errors.sunday?.breakFrom) || !isEmpty(errors.sunday?.breakTo)
                                ? 'mb-5'
                                : ''
                            )}
                          >
                            <span className="font-medium">Break</span>
                            <div className="inline-flex flex-row items-center gap-x-2">
                              <div className="relative">
                                <Input
                                  type="time"
                                  rounded="lg"
                                  color="warning"
                                  disabled={isSubmitting}
                                  {...register('sunday.breakFrom')}
                                  iserror={!isEmpty(errors.sunday?.breakFrom)}
                                  className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                                />
                                {!isEmpty(errors.sunday?.breakFrom) && (
                                  <p className="error absolute">
                                    {errors.sunday?.breakFrom.message}
                                  </p>
                                )}
                              </div>
                              <span>to</span>
                              <div className="relative">
                                <Input
                                  type="time"
                                  rounded="lg"
                                  color="warning"
                                  disabled={isSubmitting}
                                  {...register('sunday.breakTo')}
                                  iserror={!isEmpty(errors.sunday?.breakTo)}
                                  className="py-2 px-4 text-[13px] placeholder:text-slate-500"
                                />
                                {!isEmpty(errors.sunday?.breakTo) && (
                                  <p className="error absolute">{errors.sunday?.breakTo.message}</p>
                                )}
                              </div>
                            </div>
                          </div>
                          <ButtonAction
                            type="button"
                            variant="secondary-outline"
                            onClick={() => handleClear('sundayClear')}
                            className="mt-2 inline-flex w-20 items-center space-x-1 px-1.5 py-0.5"
                          >
                            <X className="h-[18px] w-[18px]" />
                            <span className="text-[13px]">Clear</span>
                          </ButtonAction>
                        </div>
                      ) : (
                        <span className="italic text-slate-400">Rest day</span>
                      )}
                    </label>
                  </section>
                </main>
                <footer className="flex justify-center space-x-2 py-2 sm:justify-end">
                  <ButtonAction
                    type="button"
                    variant="secondary"
                    onClick={handleReset}
                    disabled={isSubmitting || !isButtonSelected}
                    className="flex w-24 items-center justify-center space-x-2 rounded-md py-2 text-xs"
                  >
                    <span>Reset</span>
                  </ButtonAction>
                  <ButtonAction
                    type="submit"
                    variant={!isButtonSelected ? 'secondary' : 'primary'}
                    disabled={isSubmitting || !isButtonSelected}
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
            </div>
          </Card>
        </MaxWidthContainer>
      </FadeInOut>
    </MyScheduleLayout>
  )
}

export default RequestNewSchedule
