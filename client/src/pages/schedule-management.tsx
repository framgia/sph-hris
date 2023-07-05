import { NextPage } from 'next'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import ReactSelect from 'react-select'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import makeAnimated from 'react-select/animated'
import React, { useEffect, useState } from 'react'
import { CheckSquare, Users } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import NotFound from './404'
import Input from '~/components/atoms/Input'
import Alert from '~/components/atoms/Alert'
import { queryClient } from '~/lib/queryClient'
import useUserQuery from '~/hooks/useUserQuery'
import { Roles } from '~/utils/constants/roles'
import { ScheduleSchema } from '~/utils/validation'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import Button from '~/components/atoms/Buttons/Button'
import FadeInOut from '~/components/templates/FadeInOut'
import DayButton from '~/components/atoms/Buttons/DayButton'
import useEmployeeSchedule from '~/hooks/useEmployeeSchedule'
import { customStyles } from '~/utils/customReactSelectStyles'
import { IWorkDay } from '~/utils/types/employeeScheduleTypes'
import { shiftSchedule } from '~/utils/constants/shiftSchedule'
import ClearButton from '~/components/atoms/Buttons/ClearButton'
import ButtonAction from '~/components/atoms/Buttons/ButtonAction'
import ApplyToAllModal from '~/components/molecules/ApplyToAllModal'
import ScheduleManagementLayout from '~/components/templates/ScheduleManagementLayout'
import ViewScheduleMembersModal from '~/components/molecules/ViewScheduleMembersModal'
import { ReactSelectOption, ScheduleFormData, TimeEntryWithBreak } from '~/utils/types/formValues'

const animatedComponents = makeAnimated()

const ScheduleManagement: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { id } = router.query

  const [errorMessage, setErrorMessage] = useState<string>('')
  const [selectedShift, setSelectedShift] = useState<ReactSelectOption>()
  const [isOpenApplyToAll, setIsOpenApplyToAll] = useState<boolean>(false)
  const [isOpenViewScheduleMember, setIsOpenViewScheduleMember] = useState<boolean>(false)
  const [allSchedule, setAllSchedule] = useState<ReactSelectOption[]>([])

  // USE EMPLOYEE SCHEDULE HOOKS
  const {
    getEmployeeScheduleQuery,
    getAllEmployeeScheduleQuery,
    handleEditEmployeeScheduleMutation,
    handleCreateEmployeeScheduleMutation
  } = useEmployeeSchedule()
  const { data, isLoading } = getEmployeeScheduleQuery(Number(id))
  const EmployeeSchedule = data?.employeeScheduleDetails[0]

  const { data: allEmployeeData } = getAllEmployeeScheduleQuery()
  const allEmployeeSchedule = allEmployeeData?.allEmployeeScheduleDetails

  const createEmployeeScheduleMutation = handleCreateEmployeeScheduleMutation()
  const editEmployeeScheduleMutation = handleEditEmployeeScheduleMutation()

  // USE USER QUERY HOOK
  const { handleUserQuery } = useUserQuery()
  const { data: user } = handleUserQuery()

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

  useEffect(() => {
    if (id === undefined) {
      handleReset()
    }
  }, [id])

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

  // THIS WILL SUBMIT TO EITHER SAVE OR UPDATE SCHEDULE
  const handleSaveSchedule: SubmitHandler<any> = async (data): Promise<void> => {
    const workingDays: IWorkDay[] = []
    const daysOfWeek = [
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
      const dayData = data[`${day}Selected`] && data[day]
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (dayData) {
        workingDays.push({
          day: day.charAt(0).toUpperCase() + day.slice(1),
          from: dayData.timeIn,
          to: dayData.timeOut,
          breakFrom: dayData.breakFrom,
          breakTo: dayData.breakTo
        })
      }
    }
    const isCreateSchedule = id === undefined
    if (isCreateSchedule) {
      await handleCreateSchedule(data, workingDays)
    } else {
      await handleEditSchedule(data, workingDays)
    }
  }

  // THIS WILL CREATE NEW SCHEDULE
  const handleCreateSchedule = async (
    data: ScheduleFormData,
    workingDays: IWorkDay[]
  ): Promise<void> => {
    return await new Promise((resolve) => {
      createEmployeeScheduleMutation.mutate(
        {
          userId: user?.userById.id as number,
          scheduleName: data.scheduleName,
          workingDays
        },
        {
          onSuccess: () => {
            void queryClient
              .invalidateQueries({
                queryKey: ['GET_ALL_EMPLOYEE_SCHEDULE']
              })
              .then(() => {
                toast.success('The schedule has been added successfully!')
                handleReset()
              })
          },
          onSettled: () => {
            resolve()
          }
        }
      )
    })
  }

  // THIS WILL UPDATE EXISTING SCEHDULE
  const handleEditSchedule = async (
    data: ScheduleFormData,
    workingDays: IWorkDay[]
  ): Promise<void> => {
    return await new Promise((resolve) => {
      editEmployeeScheduleMutation.mutate(
        {
          employeeScheduleId: Number(id),
          userId: user?.userById.id as number,
          scheduleName: data.scheduleName,
          workingDays
        },
        {
          onSuccess: () => {
            void queryClient.invalidateQueries().then(() => {
              toast.success('The schedule has been updated successfully!')
            })
          },
          onSettled: () => {
            resolve()
          }
        }
      )
    })
  }

  const assignDay = (): void => {
    setSelectedShift(shiftSchedule[0])
    setValue('scheduleName', EmployeeSchedule?.scheduleName as string)
    const dayProperties: any = {
      Monday: {
        selected: 'mondaySelected',
        timeIn: 'monday.timeIn',
        timeOut: 'monday.timeOut',
        breakFrom: 'monday.breakFrom',
        breakTo: 'monday.breakTo'
      },
      Tuesday: {
        selected: 'tuesdaySelected',
        timeIn: 'tuesday.timeIn',
        timeOut: 'tuesday.timeOut',
        breakFrom: 'tuesday.breakFrom',
        breakTo: 'tuesday.breakTo'
      },
      Wednesday: {
        selected: 'wednesdaySelected',
        timeIn: 'wednesday.timeIn',
        timeOut: 'wednesday.timeOut',
        breakFrom: 'wednesday.breakFrom',
        breakTo: 'wednesday.breakTo'
      },
      Thursday: {
        selected: 'thursdaySelected',
        timeIn: 'thursday.timeIn',
        timeOut: 'thursday.timeOut',
        breakFrom: 'thursday.breakFrom',
        breakTo: 'thursday.breakTo'
      },
      Friday: {
        selected: 'fridaySelected',
        timeIn: 'friday.timeIn',
        timeOut: 'friday.timeOut',
        breakFrom: 'friday.breakFrom',
        breakTo: 'friday.breakTo'
      },
      Saturday: {
        selected: 'saturdaySelected',
        timeIn: 'saturday.timeIn',
        timeOut: 'saturday.timeOut',
        breakFrom: 'saturday.breakFrom',
        breakTo: 'saturday.breakTo'
      },
      Sunday: {
        selected: 'sundaySelected',
        timeIn: 'sunday.timeIn',
        timeOut: 'sunday.timeOut',
        breakFrom: 'sunday.breakFrom',
        breakTo: 'sunday.breakTo'
      }
    }
    if (EmployeeSchedule?.days !== undefined) {
      for (const day of EmployeeSchedule?.days) {
        const { workingDay, isDaySelected, timeIn, timeOut, breakFrom, breakTo } = day
        if (workingDay in dayProperties) {
          const {
            selected,
            timeIn: dayTimeIn,
            timeOut: dayTimeOut,
            breakFrom: dayBreakFrom,
            breakTo: dayBreakTo
          } = dayProperties[workingDay]
          setValue(selected, isDaySelected)
          setValue(dayTimeIn, timeIn)
          setValue(dayTimeOut, timeOut)
          setValue(dayBreakFrom, breakFrom)
          setValue(dayBreakTo, breakTo)
        }
      }
    }
  }

  // For Filtering based on route ID and itemID
  useEffect(() => {
    assignDay()
  }, [id, isLoading])

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
    setErrorMessage('')
    setSelectedShift(shiftSchedule[0])

    if (!isEmpty(id)) {
      assignDay()
    } else {
      reset({
        scheduleName: '',
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
  }

  const handleIsOpenViewScheduleMember = (): void =>
    setIsOpenViewScheduleMember(!isOpenViewScheduleMember)

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

    reset(shiftData)
    setSelectedShift(selectedShift)
  }

  const handleOpenApplyToAllToggle = (): void => setIsOpenApplyToAll(!isOpenApplyToAll)

  const handleShiftChange = (selectedOption: ReactSelectOption): void => {
    setSelectedShift(selectedOption)
  }

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

  if (process.env.NODE_ENV === 'production' && user?.userById.role.name !== Roles.HR_ADMIN) {
    return <NotFound />
  }

  return (
    <ScheduleManagementLayout metaTitle="Schedule Management">
      {isLoading && !isEmpty(id) ? (
        <CustomSkeletonLoading />
      ) : (
        <FadeInOut className="default-scrollbar overflow-auto p-6 text-slate-800">
          <header className="flex items-center justify-between">
            <h1 className="font-medium uppercase">{watch('scheduleName') ?? 'New Schedule'}</h1>
            {!isEmpty(id) && (
              <>
                <Tippy content="View all members" placement="left" className="!text-xs">
                  <Button
                    type="button"
                    onClick={handleIsOpenViewScheduleMember}
                    className={classNames(
                      'inline-flex items-center space-x-1 border py-0.5 px-1',
                      'text-slate-500 transition hover:text-slate-600',
                      'duration-150 ease-in-out'
                    )}
                  >
                    <Users className="h-5 w-5" />
                    <span className="select-none text-xs font-medium">
                      {EmployeeSchedule?.memberCount}
                    </span>
                  </Button>
                </Tippy>
                <ViewScheduleMembersModal
                  {...{
                    isOpen: isOpenViewScheduleMember,
                    closeModal: handleIsOpenViewScheduleMember,
                    scheduleName: watch('scheduleName')
                  }}
                />
              </>
            )}
          </header>
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
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(handleSaveSchedule)}
            className="mx-auto w-full max-w-full text-sm sm:max-w-2xl sm:px-4"
          >
            <main className="mt-8 flex flex-col space-y-5 text-[13px]">
              {errorMessage !== '' ? <Alert type="info" message={errorMessage} /> : null}

              {/* Schedule Name Filed */}
              <section className="flex flex-col">
                <label
                  htmlFor="schedule-name"
                  className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-2"
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
                              <p className="error absolute">{errors.monday?.breakFrom.message}</p>
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
                          !isEmpty(errors.tuesday?.breakFrom) || !isEmpty(errors.tuesday?.breakTo)
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
                              <p className="error absolute">{errors.tuesday?.breakFrom.message}</p>
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
                              <p className="error absolute">{errors.tuesday?.breakTo.message}</p>
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
                          !isEmpty(errors.wednesday?.timeIn) || !isEmpty(errors.wednesday?.timeOut)
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
                            <p className="error absolute">{errors.wednesday?.timeOut.message}</p>
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
                              <p className="error absolute">{errors.wednesday?.breakTo.message}</p>
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
                          !isEmpty(errors.thursday?.timeIn) || !isEmpty(errors.thursday?.timeOut)
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
                          !isEmpty(errors.thursday?.breakFrom) || !isEmpty(errors.thursday?.breakTo)
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
                              <p className="error absolute">{errors.thursday?.breakFrom.message}</p>
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
                              <p className="error absolute">{errors.thursday?.breakTo.message}</p>
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
                              <p className="error absolute">{errors.friday?.breakFrom.message}</p>
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
                          !isEmpty(errors.saturday?.timeIn) || !isEmpty(errors.saturday?.timeOut)
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
                          !isEmpty(errors.saturday?.breakFrom) || !isEmpty(errors.saturday?.breakTo)
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
                              <p className="error absolute">{errors.saturday?.breakFrom.message}</p>
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
                              <p className="error absolute">{errors.saturday?.breakTo.message}</p>
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
                              <p className="error absolute">{errors.sunday?.breakFrom.message}</p>
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
            </main>
            <hr className="border-1 my-6 border-slate-200" />
            <footer className="flex justify-center space-x-2 py-2 sm:justify-end">
              <ButtonAction
                type="button"
                variant="secondary"
                onClick={handleReset}
                disabled={isSubmitting}
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
      )}
    </ScheduleManagementLayout>
  )
}

const CustomSkeletonLoading = (): JSX.Element => {
  const skeletonItems = [1, 2, 3, 4, 5, 6, 7]
  return (
    <div className="min-h-[50vh] p-6">
      <div className="flex animate-pulse items-center justify-between px-4">
        <div className="h-4 w-20 rounded bg-slate-200/70"></div>
        <div className="h-4 w-12 rounded bg-slate-200/70"></div>
      </div>
      <div className="mx-auto mt-8 flex w-full max-w-lg flex-col space-y-5">
        <div
          className="flex h-5 w-[80%] animate-pulse rounded bg-slate-200/70"
          style={{ animationFillMode: 'backwards', animationDelay: '200ms' }}
        ></div>
        <div
          className="flex animate-pulse items-center space-x-6"
          style={{ animationFillMode: 'backwards', animationDelay: '350ms' }}
        >
          {skeletonItems.map((_, index) => (
            <div key={index} className="h-12 w-12 rounded-full bg-slate-200/70"></div>
          ))}
        </div>
        <div
          className="animate-pulse space-y-6"
          style={{ animationFillMode: 'backwards', animationDelay: '550ms' }}
        >
          {skeletonItems.map((_, index) => (
            <div key={index} className="flex justify-start space-x-8">
              <div className="h-4 w-28 rounded bg-slate-200/70"></div>
              <div className="h-4 w-28 rounded bg-slate-200/70"></div>
            </div>
          ))}
        </div>
        <div
          className="flex animate-pulse justify-end space-x-5 "
          style={{ animationFillMode: 'backwards', animationDelay: '750ms' }}
        >
          <div className="h-4 w-20 rounded bg-slate-200/70"></div>
          <div className="h-4 w-20 rounded bg-slate-200/70"></div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleManagement
