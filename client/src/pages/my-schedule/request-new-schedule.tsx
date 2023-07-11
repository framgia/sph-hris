import { NextPage } from 'next'
import classNames from 'classnames'
import toast from 'react-hot-toast'
import isEmpty from 'lodash/isEmpty'
import ReactSelect from 'react-select'
import { CheckSquare } from 'react-feather'
import makeAnimated from 'react-select/animated'
import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import Card from '~/components/atoms/Card'
import useProject from '~/hooks/useProject'
import Input from '~/components/atoms/Input'
import Alert from '~/components/atoms/Alert'
import FadeInOut from '~/components/templates/FadeInOut'
import useChangeSchedule from '~/hooks/useChangeSchedule'
import { LeaderDetails } from '~/utils/types/projectTypes'
import { User as UserType } from '~/utils/types/userTypes'
import DayButton from '~/components/atoms/Buttons/DayButton'
import { RequestNewScheduleSchema } from '~/utils/validation'
import useEmployeeSchedule from '~/hooks/useEmployeeSchedule'
import { customStyles } from '~/utils/customReactSelectStyles'
import { IWorkDay } from '~/utils/types/employeeScheduleTypes'
import { generateUserSelect } from '~/utils/createLeaveHelpers'
import ClearButton from '~/components/atoms/Buttons/ClearButton'
import ButtonAction from '~/components/atoms/Buttons/ButtonAction'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'
import ApplyToAllModal from '~/components/molecules/ApplyToAllModal'
import MyScheduleLayout from '~/components/templates/MySchedulelayout'
import {
  ReactSelectOption,
  TimeEntryWithBreak,
  RequestNewScheduleFormData
} from '~/utils/types/formValues'

const animatedComponents = makeAnimated()

const RequestNewSchedule: NextPage = (): JSX.Element => {
  const [leaders, setLeaders] = useState<LeaderDetails[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [allSchedule, setAllSchedule] = useState<ReactSelectOption[]>([])
  const [selectedShift, setSelectedShift] = useState<ReactSelectOption>()
  const [isOpenApplyToAll, setIsOpenApplyToAll] = useState<boolean>(false)

  // EMPLOYEE SCHEDULE HOOKS
  const { getAllEmployeeScheduleQuery } = useEmployeeSchedule()
  const { data: allEmployeeData } = getAllEmployeeScheduleQuery()
  const allEmployeeSchedule = allEmployeeData?.allEmployeeScheduleDetails

  // PROJECT HOOKS
  const { getLeadersQuery } = useProject()
  const {
    data: leadersList,
    isLoading: isLoadingLeaders,
    isSuccess: isLeadersSuccess,
    isFetching: isLeadersFetching
  } = getLeadersQuery(undefined)

  // CHANGE SCHEDULE HOOKS
  const { handleChangeScheduleMutation } = useChangeSchedule()
  const changeScheduleMutation = handleChangeScheduleMutation()

  const {
    reset,
    watch,
    control,
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
    const leaderIds = data?.teamLeaders?.map((item) => parseInt(item.value))
    const workingDays: IWorkDay[] = []
    const daysOfWeek: string[] = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday'
    ]

    for (const day of daysOfWeek) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      const dayData = (data as any)[`${day}Selected`] && (data as any)[day]

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (dayData) {
        const workDay: IWorkDay = {
          day: day.charAt(0).toUpperCase() + day.slice(1),
          from: dayData.timeIn,
          to: dayData.timeOut,
          breakFrom: dayData.breakFrom,
          breakTo: dayData.breakTo
        }
        workingDays.push(workDay)
      }
    }

    if (isButtonSelected && !isEmpty(watch('teamLeaders'))) {
      await changeScheduleMutation.mutateAsync(
        {
          leaderIds,
          workingDays
        },
        {
          onSettled: () => {
            toast.success('Requested New Schedule Successfully.')
            handleReset()
          }
        }
      )
    } else {
      setErrorMessage('Please select atleast one Day of the week button.')
    }
  }

  useEffect(() => {
    if (isButtonSelected) {
      setErrorMessage('')
    }
  }, [isButtonSelected])

  useEffect(() => {
    if (leadersList !== undefined) setLeaders(leadersList.allLeaders)
  }, [leadersList])

  useEffect(() => {
    if (allEmployeeSchedule !== undefined) {
      const empty = [{ value: '', label: '' }]
      const customShift: ReactSelectOption = {
        value: '0',
        label: 'Custom Shift'
      }
      const filteredSchedule: ReactSelectOption[] | undefined = allEmployeeSchedule?.map(
        (sched) => ({
          value: sched?.id.toString(),
          label: sched?.scheduleName
        })
      )
      filteredSchedule?.unshift(customShift)
      setAllSchedule(filteredSchedule ?? empty)
    }
  }, [allEmployeeSchedule])

  const empty = {
    timeIn: '',
    timeOut: '',
    breakFrom: '',
    breakTo: ''
  }

  const handleReset = (): void => {
    setErrorMessage('')
    setSelectedShift(allSchedule[0])
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
      sunday: empty,
      teamLeaders: []
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
    const newShiftData = allEmployeeSchedule?.find(
      (item) => item.id.toString() === selectedShift.value
    )

    const { scheduleName, days } = newShiftData ?? {}

    const mondayData = days?.[0]
    const tuesdayData = days?.[1]
    const wednesdayData = days?.[2]
    const thursdayData = days?.[3]
    const fridayData = days?.[4]
    const saturdayData = days?.[5]
    const sundayData = days?.[6]

    const shiftData = {
      scheduleName: scheduleName ?? '',
      mondaySelected: mondayData?.isDaySelected ?? false,
      monday: {
        timeIn: mondayData?.timeIn ?? '',
        timeOut: mondayData?.timeOut ?? '',
        breakFrom: mondayData?.breakFrom ?? '',
        breakTo: mondayData?.breakTo ?? ''
      },
      tuesdaySelected: tuesdayData?.isDaySelected ?? false,
      tuesday: {
        timeIn: tuesdayData?.timeIn ?? '',
        timeOut: tuesdayData?.timeOut ?? '',
        breakFrom: tuesdayData?.breakFrom ?? '',
        breakTo: tuesdayData?.breakTo ?? ''
      },
      wednesdaySelected: wednesdayData?.isDaySelected ?? false,
      wednesday: {
        timeIn: wednesdayData?.timeIn ?? '',
        timeOut: wednesdayData?.timeOut ?? '',
        breakFrom: wednesdayData?.breakFrom ?? '',
        breakTo: wednesdayData?.breakTo ?? ''
      },
      thursdaySelected: thursdayData?.isDaySelected ?? false,
      thursday: {
        timeIn: thursdayData?.timeIn ?? '',
        timeOut: thursdayData?.timeOut ?? '',
        breakFrom: thursdayData?.breakFrom ?? '',
        breakTo: thursdayData?.breakTo ?? ''
      },
      fridaySelected: fridayData?.isDaySelected ?? false,
      friday: {
        timeIn: fridayData?.timeIn ?? '',
        timeOut: fridayData?.timeOut ?? '',
        breakFrom: fridayData?.breakFrom ?? '',
        breakTo: fridayData?.breakTo ?? ''
      },
      saturdaySelected: saturdayData?.isDaySelected ?? false,
      saturday: {
        timeIn: saturdayData?.timeIn ?? '',
        timeOut: saturdayData?.timeOut ?? '',
        breakFrom: saturdayData?.breakFrom ?? '',
        breakTo: saturdayData?.breakTo ?? ''
      },
      sundaySelected: sundayData?.isDaySelected ?? false,
      sunday: {
        timeIn: sundayData?.timeIn ?? '',
        timeOut: sundayData?.timeOut ?? '',
        breakFrom: sundayData?.breakFrom ?? '',
        breakTo: sundayData?.breakTo ?? ''
      }
    }

    switch (selectedShift.value) {
      case '0':
        handleReset()
        break
      default:
        reset(shiftData)
        break
    }

    setSelectedShift(selectedShift)
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

  return (
    <MyScheduleLayout metaTitle="Request New Schedule">
      <FadeInOut className="default-scrollbar h-full overflow-y-auto">
        <MaxWidthContainer maxWidth="w-full max-w-[868px]" className="my-8 px-4">
          <Card className="text-sm">
            <header className="flex items-center justify-between px-4 pt-6 sm:px-8">
              <section className="space-y-1 ">
                <h3 className="text-xs font-medium">Schedule Shift:</h3>
                <div className="w-full sm:w-56">
                  <ReactSelect
                    className="text-xs"
                    value={selectedShift}
                    styles={customStyles}
                    options={allSchedule}
                    closeMenuOnSelect={true}
                    isDisabled={isSubmitting}
                    instanceId="scheduleShift"
                    defaultValue={allSchedule[0]}
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
                          {/* To Clear Field */}
                          <ClearButton
                            {...{
                              day: 'mondayClear',
                              setValue
                            }}
                          />
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
                          {/* To Clear Field */}
                          <ClearButton
                            {...{
                              day: 'tuesdayClear',
                              setValue
                            }}
                          />
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
                          {/* To Clear Field */}
                          <ClearButton
                            {...{
                              day: 'wednesdayClear',
                              setValue
                            }}
                          />
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
                          {/* To Clear Field */}
                          <ClearButton
                            {...{
                              day: 'thursdayClear',
                              setValue
                            }}
                          />
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
                          {/* To Clear Field */}
                          <ClearButton
                            {...{
                              day: 'fridayClear',
                              setValue
                            }}
                          />
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
                          {/* To Clear Field */}
                          <ClearButton
                            {...{
                              day: 'saturdayClear',
                              setValue
                            }}
                          />
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
                          {/* To Clear Field */}
                          <ClearButton
                            {...{
                              day: 'sundayClear',
                              setValue
                            }}
                          />
                        </div>
                      ) : (
                        <span className="italic text-slate-400">Rest day</span>
                      )}
                    </label>
                  </section>

                  {/* Team Leader Select */}
                  <section className="space-y-1.5 py-4 text-xs">
                    <label htmlFor="teamLeader" className="text-[13px] font-medium">
                      Team Leaders
                    </label>
                    <Controller
                      name="teamLeaders"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <ReactSelect
                          {...field}
                          isMulti
                          isClearable
                          placeholder=""
                          menuPlacement="top"
                          styles={customStyles}
                          closeMenuOnSelect={false}
                          isDisabled={
                            isSubmitting ||
                            isLeadersFetching ||
                            !isLeadersSuccess ||
                            isLoadingLeaders
                          }
                          classNames={{
                            control: (state) =>
                              state.isFocused
                                ? 'border-primary'
                                : !isEmpty(errors.teamLeaders)
                                ? 'border-rose-500 ring-rose-500'
                                : 'border-slate-300'
                          }}
                          backspaceRemovesValue={true}
                          instanceId="teamLeaderReqNewShed"
                          options={generateUserSelect(leaders as UserType[])}
                          components={animatedComponents}
                          className="w-full"
                        />
                      )}
                    />
                    {!isEmpty(errors.teamLeaders) && (
                      <span className="error text-[11px]">{errors?.teamLeaders.message}</span>
                    )}
                  </section>
                </main>
                <footer className="flex justify-center space-x-2 py-2 sm:justify-end">
                  <ButtonAction
                    type={!isButtonSelected ? 'submit' : 'button'}
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
                    className="w-24 rounded-md py-2 text-xs"
                  >
                    Save
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
