import React from 'react'
import { NextPage } from 'next'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'

import Card from '~/components/atoms/Card'
import Input from '~/components/atoms/Input'
import FadeInOut from '~/components/templates/FadeInOut'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'
import MyScheduleLayout from '~/components/templates/MySchedulelayout'
import UnderConstructionPage from '~/components/pages/UnderContructionPage'

const CurrentSchedule: NextPage = (): JSX.Element => {
  const { watch } = useForm({
    mode: 'onChange'
  })

  if (process.env.NODE_ENV === 'production') {
    return <UnderConstructionPage />
  }

  return (
    <MyScheduleLayout metaTitle="Current Schedule">
      <FadeInOut className="default-scrollbar h-full overflow-y-auto">
        <MaxWidthContainer maxWidth="w-full max-w-[868px]" className="my-8 px-4">
          <Card className="default-scrollbar flex flex-col items-center justify-center overflow-auto px-6 py-4 md:px-14 md:py-8 lg:px-16 lg:py-10">
            <header className="pt-3 text-center">
              <h1 className="text-base font-semibold">Morning Shift</h1>
            </header>
            <main className="flex flex-col divide-y divide-slate-200 text-[13px] lg:divide-y-0">
              {/* Monday Field */}
              <section className="py-4 lg:mx-12 lg:py-6">
                <label
                  htmlFor="schedule-name"
                  className={classNames(
                    'flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-2'
                  )}
                >
                  <span className="shrink-0 font-medium">Monday</span>
                  {watch('mondaySelected') === undefined ? (
                    <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-3">
                      <div className="relative inline-flex items-center space-x-2">
                        <div>
                          <Input
                            type="time"
                            rounded="lg"
                            disabled={true}
                            color="warning"
                            value="09:30"
                            className="py-2 px-4 text-[13px] placeholder:text-slate-500 disabled:opacity-90"
                          />
                        </div>
                        <span>to</span>
                        <div>
                          <Input
                            type="time"
                            rounded="lg"
                            disabled={true}
                            value="18:30"
                            color="warning"
                            className="py-2 px-4 text-[13px] placeholder:text-slate-500 disabled:opacity-90"
                          />
                        </div>
                      </div>
                      <div className="font-medium">
                        Break:{' '}
                        <span className="font-normal text-slate-500">12:00 PM - 1:00 PM</span>
                      </div>
                    </div>
                  ) : (
                    <span className="italic text-slate-400">Rest day</span>
                  )}
                </label>
              </section>

              {/* Tuesday Field */}
              <section className="py-4 lg:mx-12 lg:py-6">
                <label
                  htmlFor="schedule-name"
                  className={classNames(
                    'flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-2'
                  )}
                >
                  <span className="shrink-0 font-medium">Tuesday</span>
                  {watch('mondaySelected') === undefined ? (
                    <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-3">
                      <div className="relative inline-flex items-center space-x-2">
                        <div>
                          <Input
                            type="time"
                            rounded="lg"
                            disabled={true}
                            color="warning"
                            value="09:30"
                            className="py-2 px-4 text-[13px] placeholder:text-slate-500 disabled:opacity-90"
                          />
                        </div>
                        <span>to</span>
                        <div>
                          <Input
                            type="time"
                            rounded="lg"
                            disabled={true}
                            value="18:30"
                            color="warning"
                            className="py-2 px-4 text-[13px] placeholder:text-slate-500 disabled:opacity-90"
                          />
                        </div>
                      </div>
                      <div className="font-medium">
                        Break:{' '}
                        <span className="font-normal text-slate-500">12:00 PM - 1:00 PM</span>
                      </div>
                    </div>
                  ) : (
                    <span className="italic text-slate-400">Rest day</span>
                  )}
                </label>
              </section>

              {/* Wednesday Field */}
              <section className="py-4 lg:mx-7 lg:py-6">
                <label
                  htmlFor="schedule-name"
                  className={classNames(
                    'flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-2'
                  )}
                >
                  <span className="shrink-0 font-medium">Wednesday</span>
                  {watch('mondaySelected') === undefined ? (
                    <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-3">
                      <div className="relative inline-flex items-center space-x-2">
                        <div>
                          <Input
                            type="time"
                            rounded="lg"
                            disabled={true}
                            color="warning"
                            value="09:30"
                            className="py-2 px-4 text-[13px] placeholder:text-slate-500 disabled:opacity-90"
                          />
                        </div>
                        <span>to</span>
                        <div>
                          <Input
                            type="time"
                            rounded="lg"
                            disabled={true}
                            value="18:30"
                            color="warning"
                            className="py-2 px-4 text-[13px] placeholder:text-slate-500 disabled:opacity-90"
                          />
                        </div>
                      </div>
                      <div className="font-medium">
                        Break:{' '}
                        <span className="font-normal text-slate-500">12:00 PM - 1:00 PM</span>
                      </div>
                    </div>
                  ) : (
                    <span className="italic text-slate-400">Rest day</span>
                  )}
                </label>
              </section>

              {/* Thursday Field */}
              <section className="py-4 lg:ml-11 lg:py-6">
                <label
                  htmlFor="schedule-name"
                  className={classNames(
                    'flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-2'
                  )}
                >
                  <span className="shrink-0 font-medium">Thrusday</span>
                  {watch('mondaySelected') !== undefined ? (
                    <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-3">
                      <div className="relative inline-flex items-center space-x-2">
                        <div>
                          <Input
                            type="time"
                            rounded="lg"
                            disabled={true}
                            color="warning"
                            value="09:30"
                            className="py-2 px-4 text-[13px] placeholder:text-slate-500 disabled:opacity-90"
                          />
                        </div>
                        <span>to</span>
                        <div>
                          <Input
                            type="time"
                            rounded="lg"
                            disabled={true}
                            value="18:30"
                            color="warning"
                            className="py-2 px-4 text-[13px] placeholder:text-slate-500 disabled:opacity-90"
                          />
                        </div>
                      </div>
                      <div className="font-medium">
                        Break:{' '}
                        <span className="font-normal text-slate-500">12:00 PM - 1:00 PM</span>
                      </div>
                    </div>
                  ) : (
                    <span className="italic text-slate-400">Rest day</span>
                  )}
                </label>
              </section>

              {/* Friday Field */}
              <section className="py-4 lg:ml-[65px] lg:py-6">
                <label
                  htmlFor="schedule-name"
                  className={classNames(
                    'flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-2'
                  )}
                >
                  <span className="shrink-0 font-medium">Friday</span>
                  {watch('mondaySelected') === undefined ? (
                    <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-3">
                      <div className="relative inline-flex items-center space-x-2">
                        <div>
                          <Input
                            type="time"
                            rounded="lg"
                            disabled={true}
                            color="warning"
                            value="09:30"
                            className="py-2 px-4 text-[13px] placeholder:text-slate-500 disabled:opacity-90"
                          />
                        </div>
                        <span>to</span>
                        <div>
                          <Input
                            type="time"
                            rounded="lg"
                            disabled={true}
                            value="18:30"
                            color="warning"
                            className="py-2 px-4 text-[13px] placeholder:text-slate-500 disabled:opacity-90"
                          />
                        </div>
                      </div>
                      <div className="font-medium">
                        Break:{' '}
                        <span className="font-normal text-slate-500">12:00 PM - 1:00 PM</span>
                      </div>
                    </div>
                  ) : (
                    <span className="italic text-slate-400">Rest day</span>
                  )}
                </label>
              </section>

              {/* Saturday Field */}
              <section className="py-4 lg:ml-11 lg:py-6">
                <label
                  htmlFor="schedule-name"
                  className={classNames(
                    'flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-2'
                  )}
                >
                  <span className="shrink-0 font-medium">Saturday</span>
                  {watch('mondaySelected') !== undefined ? (
                    <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-3">
                      <div className="relative inline-flex items-center space-x-2">
                        <div>
                          <Input
                            type="time"
                            rounded="lg"
                            disabled={true}
                            color="warning"
                            value="09:30"
                            className="py-2 px-4 text-[13px] placeholder:text-slate-500 disabled:opacity-90"
                          />
                        </div>
                        <span>to</span>
                        <div>
                          <Input
                            type="time"
                            rounded="lg"
                            disabled={true}
                            value="18:30"
                            color="warning"
                            className="py-2 px-4 text-[13px] placeholder:text-slate-500 disabled:opacity-90"
                          />
                        </div>
                      </div>
                      <div className="font-medium">
                        Break:{' '}
                        <span className="font-normal text-slate-500">12:00 PM - 1:00 PM</span>
                      </div>
                    </div>
                  ) : (
                    <span className="italic text-slate-400">Rest day</span>
                  )}
                </label>
              </section>

              {/* Sunday Field */}
              <section className="py-4 lg:ml-14 lg:py-6">
                <label
                  htmlFor="schedule-name"
                  className={classNames(
                    'flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-2'
                  )}
                >
                  <span className="shrink-0 font-medium">Sunday</span>
                  {watch('mondaySelected') !== undefined ? (
                    <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-3">
                      <div className="relative inline-flex items-center space-x-2">
                        <div>
                          <Input
                            type="time"
                            rounded="lg"
                            disabled={true}
                            color="warning"
                            value="09:30"
                            className="py-2 px-4 text-[13px] placeholder:text-slate-500 disabled:opacity-90"
                          />
                        </div>
                        <span>to</span>
                        <div>
                          <Input
                            type="time"
                            rounded="lg"
                            disabled={true}
                            value="18:30"
                            color="warning"
                            className="py-2 px-4 text-[13px] placeholder:text-slate-500 disabled:opacity-90"
                          />
                        </div>
                      </div>
                      <div className="font-medium">
                        Break:{' '}
                        <span className="font-normal text-slate-500">12:00 PM - 1:00 PM</span>
                      </div>
                    </div>
                  ) : (
                    <span className="italic text-slate-400">Rest day</span>
                  )}
                </label>
              </section>
            </main>
          </Card>
        </MaxWidthContainer>
      </FadeInOut>
    </MyScheduleLayout>
  )
}

export default CurrentSchedule
