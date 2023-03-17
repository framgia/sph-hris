import React from 'react'
import type { NextPage } from 'next'
import isEmpty from 'lodash/isEmpty'
import useFormPersist from 'react-hook-form-persist'
import { yupResolver } from '@hookform/resolvers/yup'
import { AlertCircle, Calendar } from 'react-feather'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'

import Card from '~/components/atoms/Card'
import Input from '~/components/atoms/Input'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { LaptopMonitoringSchema } from '~/utils/validation'
import MyFormsLayout from '~/components/templates/MyFormsLayout'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'
import { LaptopMonitoringFormValues } from '~/utils/types/formValues'
import TextField from '~/components/molecules/TextField'

const LaptopMonitoring: NextPage = (): JSX.Element => {
  const {
    watch,
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LaptopMonitoringFormValues>({
    mode: 'onChange',
    resolver: yupResolver(LaptopMonitoringSchema)
  })

  useFormPersist('laptopMonitoringFormValues', {
    watch,
    setValue
  })

  // This will handle saving the form data
  const handleSaveLaptopMonitoring: SubmitHandler<LaptopMonitoringFormValues> = async (
    data
  ): Promise<void> => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(data, null, 2))
        resolve()
        alert(JSON.stringify(data, null, 2))
      }, 2000)
    })
  }

  const laptopOwnerErrors = !isEmpty(errors?.laptop_owner)
  const laptopBrandErrors = !isEmpty(errors?.laptop_brand)
  const laptopModelErrors = !isEmpty(errors?.laptop_model)
  const laptopSerialNumberErrors = !isEmpty(errors?.laptop_serial_number)
  const laptopCompanyTagErrors = !isEmpty(errors?.laptop_company_tag)
  const laptopIssueDateErrors = !isEmpty(errors?.laptop_issue_date)
  const laptopConditionErrors = !isEmpty(errors?.laptop_condition)
  const laptopIssuesErrors = !isEmpty(errors?.laptop_issues)
  const laptopIssuesListErrors = !isEmpty(errors?.laptop_issues_list)
  const laptopOsErrors = !isEmpty(errors?.laptop_os)
  const laptopRamErrors = !isEmpty(errors?.laptop_ram)
  const laptopProcessorErrors = !isEmpty(errors?.laptop_processor)
  const laptopVideoMemoryErrors = !isEmpty(errors?.laptop_video_memory)

  return (
    <MyFormsLayout metaTitle="Laptop Monitoring ">
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(handleSaveLaptopMonitoring)}
        className="default-scrollbar h-full overflow-y-auto"
      >
        <MaxWidthContainer
          maxWidth="max-w-[710px]"
          className="flex flex-col space-y-4 px-4 pb-8 text-slate-700 md:space-y-6"
        >
          {/* Laptop Monitoring Card */}
          <Card
            rounded="lg"
            shadow-size="md"
            disabled={isSubmitting}
            className="mt-4 border-t-[10px] border-t-sky-500 md:mt-6"
          >
            <section className="space-y-2 py-4 px-5 md:py-5 md:px-7">
              <h1 className="text-base font-medium md:text-lg">Laptop Monitoring Form</h1>
            </section>
          </Card>

          {/* Laptop Owner* */}
          <Card rounded="lg" shadow-size="md" disabled={isSubmitting} iserror={laptopOwnerErrors}>
            <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
              <h2 className="text-sm md:text-base">
                Laptop Owner <span className="text-rose-500">*</span>
              </h2>
              <div className="w-full md:w-1/2">
                <Input
                  type="text"
                  {...register('laptop_owner')}
                  placeholder="Your answer"
                  className="text-sm"
                />
              </div>
              {laptopOwnerErrors ? (
                <div className="flex items-center space-x-2 text-xs text-rose-500">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p>{errors?.laptop_owner?.message}</p>
                </div>
              ) : null}
            </section>
          </Card>

          {/* Laptop Brand */}
          <Card rounded="lg" shadow-size="md" disabled={isSubmitting} iserror={laptopBrandErrors}>
            <section className="space-y-3 py-4 px-5 md:py-5 md:px-7">
              <h2 className="text-sm md:text-base">
                Laptop Brand <span className="text-rose-500">*</span>
              </h2>
              <div className="space-y-3 text-sm">
                <Controller
                  name="laptop_brand"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="flex flex-col justify-center space-y-3">
                      <div>
                        <input
                          {...field}
                          value={'apple'}
                          id="apple"
                          type="radio"
                          // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                          checked={field.value === 'apple'}
                          onChange={() => field.onChange('apple')}
                          className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                        />
                        <label htmlFor="apple" className="ml-2 text-slate-500">
                          Apple
                        </label>
                      </div>
                      <div>
                        <input
                          {...field}
                          value={'asus'}
                          id="asus"
                          type="radio"
                          // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                          checked={field.value === 'asus'}
                          onChange={() => field.onChange('asus')}
                          className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                        />
                        <label htmlFor="asus" className="ml-2 text-slate-500">
                          Asus
                        </label>
                      </div>
                      <div>
                        <input
                          {...field}
                          value={'dell'}
                          id="dell"
                          type="radio"
                          // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                          checked={field.value === 'dell'}
                          onChange={() => field.onChange('dell')}
                          className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                        />
                        <label htmlFor="dell" className="ml-2 text-slate-500">
                          Dell
                        </label>
                      </div>
                      <div>
                        <input
                          {...field}
                          value={'lenovo'}
                          id="lenovo"
                          type="radio"
                          // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                          checked={field.value === 'lenovo'}
                          onChange={() => field.onChange('lenovo')}
                          className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                        />
                        <label htmlFor="lenovo" className="ml-2 text-slate-500">
                          Lenovo
                        </label>
                      </div>
                      <div>
                        <input
                          {...field}
                          value={'acer'}
                          id="acer"
                          type="radio"
                          // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                          checked={field.value === 'acer'}
                          onChange={() => field.onChange('acer')}
                          className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                        />
                        <label htmlFor="acer" className="ml-2 text-slate-500">
                          Acer
                        </label>
                      </div>
                      <div>
                        <input
                          {...field}
                          value={'hp'}
                          id="hp"
                          type="radio"
                          // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                          checked={field.value === 'hp'}
                          onChange={() => field.onChange('hp')}
                          className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                        />
                        <label htmlFor="hp" className="ml-2 text-slate-500">
                          HP
                        </label>
                      </div>
                    </div>
                  )}
                />
                {laptopBrandErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{errors?.laptop_brand?.message}</p>
                  </div>
                ) : null}
              </div>
            </section>
          </Card>

          {/* Laptop Model* */}
          <Card rounded="lg" shadow-size="md" disabled={isSubmitting} iserror={laptopModelErrors}>
            <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
              <h2 className="text-sm md:text-base">
                Laptop Model <span className="text-rose-500">*</span>
              </h2>
              <div className="w-full md:w-1/2">
                <Input
                  type="text"
                  {...register('laptop_model')}
                  placeholder="Your answer"
                  className="text-sm"
                />
              </div>
              {laptopModelErrors ? (
                <div className="flex items-center space-x-2 text-xs text-rose-500">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p>{errors?.laptop_model?.message}</p>
                </div>
              ) : null}
            </section>
          </Card>

          {/* Laptop Serial Number* */}
          <Card
            rounded="lg"
            shadow-size="md"
            disabled={isSubmitting}
            iserror={laptopSerialNumberErrors}
          >
            <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
              <h2 className="text-sm md:text-base">
                Laptop Serial Number <span className="text-rose-500">*</span>
              </h2>
              <div className="w-full md:w-1/2">
                <Input
                  type="text"
                  {...register('laptop_serial_number')}
                  placeholder="Your answer"
                  className="text-sm"
                />
              </div>
              {laptopSerialNumberErrors ? (
                <div className="flex items-center space-x-2 text-xs text-rose-500">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p>{errors?.laptop_serial_number?.message}</p>
                </div>
              ) : null}
            </section>
          </Card>

          {/* Laptop Company Tag* */}
          <Card
            rounded="lg"
            shadow-size="md"
            disabled={isSubmitting}
            iserror={laptopCompanyTagErrors}
          >
            <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
              <h2 className="text-sm md:text-base">
                Laptop Company Tag <span className="text-rose-500">*</span>
              </h2>
              <div className="w-full md:w-1/2">
                <Input
                  type="text"
                  {...register('laptop_company_tag')}
                  placeholder="Your answer"
                  className="text-sm"
                />
              </div>
              {laptopCompanyTagErrors ? (
                <div className="flex items-center space-x-2 text-xs text-rose-500">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p>{errors?.laptop_company_tag?.message}</p>
                </div>
              ) : null}
            </section>
          </Card>

          {/* When did the company issue the laptop to you? */}
          <Card
            rounded="lg"
            shadow-size="md"
            disabled={isSubmitting}
            iserror={laptopIssueDateErrors}
          >
            <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
              <h2 className="text-sm md:text-base">
                When did the company issue the laptop to you?{' '}
                <span className="text-rose-500">*</span>
              </h2>
              <div className="w-full md:w-1/2">
                <TextField title="" Icon={Calendar} className="flex-1">
                  <Input
                    type="date"
                    disabled={isSubmitting}
                    placeholder=""
                    {...register('laptop_issue_date')}
                    className="py-2.5 pl-11 text-sm"
                  />
                </TextField>
                {laptopIssueDateErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{errors?.laptop_issue_date?.message}</p>
                  </div>
                ) : null}
              </div>
            </section>
          </Card>

          {/* What was the condition of the laptop when it was given to you? */}
          <Card
            rounded="lg"
            shadow-size="md"
            disabled={isSubmitting}
            iserror={laptopConditionErrors}
          >
            <section className="space-y-3 py-4 px-5 md:py-5 md:px-7">
              <h2 className="text-sm md:text-base">
                What was the condition of the laptop when it was given to you?{' '}
                <span className="text-rose-500">*</span>
              </h2>
              <div className="space-y-3 text-sm">
                <Controller
                  name="laptop_condition"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="flex flex-col justify-center space-y-3">
                      <div>
                        <input
                          {...field}
                          value={'brand_new'}
                          id="brand_new"
                          type="radio"
                          // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                          checked={field.value === 'brand_new'}
                          onChange={() => field.onChange('brand_new')}
                          className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                        />
                        <label htmlFor="brand_new" className="ml-2 text-slate-500">
                          Brand New
                        </label>
                      </div>
                      <div>
                        <input
                          {...field}
                          value={'used_laptop'}
                          id="used_laptop"
                          type="radio"
                          // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                          checked={field.value === 'used_laptop'}
                          onChange={() => field.onChange('used_laptop')}
                          className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                        />
                        <label htmlFor="used_laptop" className="ml-2 text-slate-500">
                          Used Laptop
                        </label>
                      </div>
                    </div>
                  )}
                />
                {laptopConditionErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{errors?.laptop_condition?.message}</p>
                  </div>
                ) : null}
              </div>
            </section>
          </Card>

          {/* Do you have any issue/s or problem/s in your current laptop? */}
          <Card rounded="lg" shadow-size="md" disabled={isSubmitting} iserror={laptopIssuesErrors}>
            <section className="space-y-3 py-4 px-5 md:py-5 md:px-7">
              <h2 className="text-sm md:text-base">
                Do you have any issue/s or problem/s in your current laptop?{' '}
                <span className="text-rose-500">*</span>
              </h2>
              <div className="space-y-3 text-sm">
                <Controller
                  name="laptop_issues"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="flex flex-col justify-center space-y-3">
                      <div>
                        <input
                          {...field}
                          value={'yes'}
                          id="yes"
                          type="radio"
                          // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                          checked={field.value === 'yes'}
                          onChange={() => field.onChange('yes')}
                          className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                        />
                        <label htmlFor="yes" className="ml-2 text-slate-500">
                          Yes
                        </label>
                      </div>
                      <div>
                        <input
                          {...field}
                          value={'no'}
                          id="no"
                          type="radio"
                          // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                          checked={field.value === 'no'}
                          onChange={() => field.onChange('no')}
                          className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                        />
                        <label htmlFor="no" className="ml-2 text-slate-500">
                          No
                        </label>
                      </div>
                    </div>
                  )}
                />
                {laptopIssuesErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{errors?.laptop_issues?.message}</p>
                  </div>
                ) : null}
              </div>
            </section>
          </Card>

          {/* Please state here for the laptop issue/s. If none write "none".  */}
          <Card
            rounded="lg"
            shadow-size="md"
            disabled={isSubmitting}
            iserror={laptopIssuesListErrors}
          >
            <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
              <h2 className="text-sm md:text-base">
                Please state here for the laptop issue/s. If none write "none".{' '}
                <span className="text-rose-500">*</span>
              </h2>
              <div className="w-full md:w-1/2">
                <Input
                  type="text"
                  {...register('laptop_issues_list')}
                  placeholder="Your answer"
                  className="text-sm"
                />
              </div>
              {laptopIssuesListErrors ? (
                <div className="flex items-center space-x-2 text-xs text-rose-500">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p>{errors?.laptop_issues_list?.message}</p>
                </div>
              ) : null}
            </section>
          </Card>

          {/* Installed OS */}
          <Card rounded="lg" shadow-size="md" disabled={isSubmitting} iserror={laptopOsErrors}>
            <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
              <h2 className="text-sm md:text-base">
                Installed OS <span className="text-rose-500">*</span>
              </h2>
              <div className="w-full md:w-1/2">
                <Input
                  type="text"
                  {...register('laptop_os')}
                  placeholder="Your answer"
                  className="text-sm"
                />
              </div>
              {laptopOsErrors ? (
                <div className="flex items-center space-x-2 text-xs text-rose-500">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p>{errors?.laptop_os?.message}</p>
                </div>
              ) : null}
            </section>
          </Card>

          {/* RAM */}
          <Card rounded="lg" shadow-size="md" disabled={isSubmitting} iserror={laptopRamErrors}>
            <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
              <h2 className="text-sm md:text-base">
                RAM <span className="text-rose-500">*</span>
              </h2>
              <div className="w-full md:w-1/2">
                <Input
                  type="text"
                  {...register('laptop_ram')}
                  placeholder="Your answer"
                  className="text-sm"
                />
              </div>
              {laptopRamErrors ? (
                <div className="flex items-center space-x-2 text-xs text-rose-500">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p>{errors?.laptop_ram?.message}</p>
                </div>
              ) : null}
            </section>
          </Card>

          {/* Processor */}
          <Card
            rounded="lg"
            shadow-size="md"
            disabled={isSubmitting}
            iserror={laptopProcessorErrors}
          >
            <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
              <h2 className="text-sm md:text-base">
                Processor <span className="text-rose-500">*</span>
              </h2>
              <div className="w-full md:w-1/2">
                <Input
                  type="text"
                  {...register('laptop_processor')}
                  placeholder="Your answer"
                  className="text-sm"
                />
              </div>
              {laptopProcessorErrors ? (
                <div className="flex items-center space-x-2 text-xs text-rose-500">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p>{errors?.laptop_processor?.message}</p>
                </div>
              ) : null}
            </section>
          </Card>

          {/* Video Memory */}
          <Card
            rounded="lg"
            shadow-size="md"
            disabled={isSubmitting}
            iserror={laptopVideoMemoryErrors}
          >
            <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
              <h2 className="text-sm md:text-base">
                Video Memory <span className="text-rose-500">*</span>
              </h2>
              <div className="w-full md:w-1/2">
                <Input
                  type="text"
                  {...register('laptop_video_memory')}
                  placeholder="Your answer"
                  className="text-sm"
                />
              </div>
              {laptopVideoMemoryErrors ? (
                <div className="flex items-center space-x-2 text-xs text-rose-500">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p>{errors?.laptop_video_memory?.message}</p>
                </div>
              ) : null}
            </section>
          </Card>

          {/* Other Note */}
          <Card rounded="lg" shadow-size="md" disabled={isSubmitting}>
            <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
              <h2 className="text-sm md:text-base">Other Note</h2>
              <div className="w-full md:w-1/2">
                <Input
                  type="text"
                  {...register('other_note')}
                  placeholder="Your answer"
                  className="text-sm"
                />
              </div>
            </section>
          </Card>

          <section className="flex justify-end">
            <Button
              variant="primary"
              disabled={isSubmitting}
              className="relative flex w-full items-center justify-center space-x-3 px-8 py-1.5 sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <SpinnerIcon className="absolute left-5 h-3.5 w-3.5 !fill-white" />
                  <span>Saving...</span>
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </section>
        </MaxWidthContainer>
      </form>
    </MyFormsLayout>
  )
}

export default LaptopMonitoring
