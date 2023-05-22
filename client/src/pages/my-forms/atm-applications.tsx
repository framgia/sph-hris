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
import FadeInOut from '~/components/templates/FadeInOut'
import TextField from '~/components/molecules/TextField'
import { ATMApplicationSchema } from '~/utils/validation'
import Button from '~/components/atoms/Buttons/ButtonAction'
import MyFormsLayout from '~/components/templates/MyFormsLayout'
import { ATMApplicationFormValues } from '~/utils/types/formValues'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'
import UnderConstructionPage from '~/components/pages/UnderContructionPage'

const ATMApplication: NextPage = (): JSX.Element => {
  const {
    watch,
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ATMApplicationFormValues>({
    mode: 'onChange',
    resolver: yupResolver(ATMApplicationSchema)
  })

  useFormPersist('atmApplicationFormValues', {
    watch,
    setValue
  })

  // This will handle saving the form data
  const handleSaveATMApplication: SubmitHandler<ATMApplicationFormValues> = async (
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
  const lastNameErrors = !isEmpty(errors?.last_name)
  const firstNameErrors = !isEmpty(errors?.first_name)
  const mothermaidennameErrors = !isEmpty(errors?.mother_maiden_name)
  const maritalstatusErrors = !isEmpty(errors?.marital_status)
  const genderErrors = !isEmpty(errors?.gender)
  const addressErrors = !isEmpty(errors?.permanent_address)
  const citymunicipalityprovinceErrors = !isEmpty(errors?.city_municipality_province)
  const zipcodeErrors = !isEmpty(errors?.zipcode)
  const contactNumberErrors = !isEmpty(errors?.contact_number)
  const birthplaceErrors = !isEmpty(errors?.birth_place)
  const birthdayErrors = !isEmpty(errors?.birthday)
  const positionErrors = !isEmpty(errors?.position)
  const sssnumberErrors = !isEmpty(errors?.sss_number)
  const tinnumberErrors = !isEmpty(errors?.tin_number)

  if (process.env.NODE_ENV === 'production') {
    return <UnderConstructionPage />
  }

  return (
    <MyFormsLayout metaTitle="First day Onboarding">
      <FadeInOut className="default-scrollbar h-full overflow-y-auto">
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(handleSaveATMApplication)}
        >
          <MaxWidthContainer
            maxWidth="max-w-[710px]"
            className="flex flex-col space-y-4 px-4 pb-8 text-slate-700 md:space-y-6"
          >
            {/* Personal Info Card */}
            <Card
              rounded="lg"
              shadow-size="md"
              disabled={isSubmitting}
              className="mt-4 border-t-[10px] border-t-sky-500 md:mt-6"
            >
              <section className="space-y-2 py-4 px-5 md:py-5 md:px-7">
                <h1 className="text-base font-medium md:text-lg">ATM Application Form</h1>
              </section>
            </Card>

            {/* Last Name */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting} iserror={lastNameErrors}>
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Last Name <span className="text-rose-500">*</span>
                </h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('last_name')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
                {lastNameErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{errors?.last_name?.message}</p>
                  </div>
                ) : null}
              </section>
            </Card>

            {/* First Name */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting} iserror={firstNameErrors}>
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  First Name <span className="text-rose-500">*</span>
                </h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('first_name')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
                {firstNameErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{errors?.first_name?.message}</p>
                  </div>
                ) : null}
              </section>
            </Card>

            {/* Middle Name */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting}>
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">Middle Name</h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('middle_name')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
              </section>
            </Card>

            {/* Mother's Maiden Name (Full Name) */}
            <Card
              rounded="lg"
              shadow-size="md"
              disabled={isSubmitting}
              iserror={mothermaidennameErrors}
            >
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Mother&apos;s Maiden Name (Full Name) <span className="text-rose-500">*</span>
                </h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('mother_maiden_name')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
                {mothermaidennameErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{errors?.mother_maiden_name?.message}</p>
                  </div>
                ) : null}
              </section>
            </Card>

            {/* Marital Status */}
            <Card
              rounded="lg"
              shadow-size="md"
              disabled={isSubmitting}
              iserror={maritalstatusErrors}
            >
              <section className="space-y-3 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Marital Status <span className="text-rose-500">*</span>
                </h2>
                <div className="space-y-3 text-sm">
                  <Controller
                    name="marital_status"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="flex flex-col justify-center space-y-3">
                        <div>
                          <input
                            {...field}
                            value={'single'}
                            id="single"
                            type="radio"
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                            checked={field.value === 'single'}
                            onChange={() => field.onChange('single')}
                            className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                          />
                          <label htmlFor="single" className="ml-2 text-slate-500">
                            Single
                          </label>
                        </div>
                        <div>
                          <input
                            {...field}
                            value={'married'}
                            id="married"
                            type="radio"
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                            checked={field.value === 'married'}
                            onChange={() => field.onChange('married')}
                            className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                          />
                          <label htmlFor="married" className="ml-2 text-slate-500">
                            Married
                          </label>
                        </div>
                        <div>
                          <input
                            {...field}
                            value={'separated'}
                            id="separated"
                            type="radio"
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                            checked={field.value === 'separated'}
                            onChange={() => field.onChange('separated')}
                            className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                          />
                          <label htmlFor="separated" className="ml-2 text-slate-500">
                            Separated
                          </label>
                        </div>
                        <div>
                          <input
                            {...field}
                            value={'divorced'}
                            id="divorced"
                            type="radio"
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                            checked={field.value === 'divorced'}
                            onChange={() => field.onChange('divorced')}
                            className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                          />
                          <label htmlFor="divorced" className="ml-2 text-slate-500">
                            Divorced
                          </label>
                        </div>
                        <div>
                          <input
                            {...field}
                            value={'widowed'}
                            id="widowed"
                            type="radio"
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                            checked={field.value === 'widowed'}
                            onChange={() => field.onChange('widowed')}
                            className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                          />
                          <label htmlFor="widowed" className="ml-2 text-slate-500">
                            Widowed
                          </label>
                        </div>
                      </div>
                    )}
                  />
                  {maritalstatusErrors ? (
                    <div className="flex items-center space-x-2 text-xs text-rose-500">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <p>{errors?.marital_status?.message}</p>
                    </div>
                  ) : null}
                </div>
              </section>
            </Card>

            {/* Gender */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting} iserror={genderErrors}>
              <section className="space-y-3 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Gender <span className="text-rose-500">*</span>
                </h2>
                <div className="space-y-3 text-sm">
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="flex flex-col justify-center space-y-3">
                        <div>
                          <input
                            {...field}
                            value={'male'}
                            id="male"
                            type="radio"
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                            checked={field.value === 'male'}
                            onChange={() => field.onChange('male')}
                            className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                          />
                          <label htmlFor="male" className="ml-2 text-slate-500">
                            Male
                          </label>
                        </div>
                        <div>
                          <input
                            {...field}
                            value={'female'}
                            id="female"
                            type="radio"
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                            checked={field.value === 'female'}
                            onChange={() => field.onChange('female')}
                            className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                          />
                          <label htmlFor="female" className="ml-2 text-slate-500">
                            Female
                          </label>
                        </div>
                      </div>
                    )}
                  />
                  {genderErrors ? (
                    <div className="flex items-center space-x-2 text-xs text-rose-500">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <p>{errors?.gender?.message}</p>
                    </div>
                  ) : null}
                </div>
              </section>
            </Card>

            {/* Permanent Address */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting} iserror={addressErrors}>
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Permanent Address <span className="text-rose-500">*</span>
                </h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('permanent_address')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
                {addressErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{errors?.permanent_address?.message}</p>
                  </div>
                ) : null}
              </section>
            </Card>

            {/* City / Municipality / Province */}
            <Card
              rounded="lg"
              shadow-size="md"
              disabled={isSubmitting}
              iserror={citymunicipalityprovinceErrors}
            >
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  City / Municipality / Province <span className="text-rose-500">*</span>
                </h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('city_municipality_province')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
                {citymunicipalityprovinceErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{errors?.city_municipality_province?.message}</p>
                  </div>
                ) : null}
              </section>
            </Card>

            {/* Zip Code */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting} iserror={zipcodeErrors}>
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Zip Code <span className="text-rose-500">*</span>
                </h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('zipcode')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
                {zipcodeErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{errors?.zipcode?.message}</p>
                  </div>
                ) : null}
              </section>
            </Card>

            {/* Contact Number (XXXX-XXX-XXXX) */}
            <Card
              rounded="lg"
              shadow-size="md"
              disabled={isSubmitting}
              iserror={contactNumberErrors}
            >
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Contact Number (XXXX-XXX-XXXX) <span className="text-rose-500">*</span>
                </h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('contact_number')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
                {contactNumberErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{errors?.contact_number?.message}</p>
                  </div>
                ) : null}
              </section>
            </Card>

            {/* Birth Place* */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting} iserror={birthplaceErrors}>
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Birth Place <span className="text-rose-500">*</span>
                </h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('birth_place')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
                {birthplaceErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{errors?.birth_place?.message}</p>
                  </div>
                ) : null}
              </section>
            </Card>

            {/* Birthday */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting} iserror={birthdayErrors}>
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Birthday <span className="text-rose-500">*</span>
                </h2>
                <div className="w-full md:w-1/2">
                  <TextField title="" Icon={Calendar} className="flex-1">
                    <Input
                      type="date"
                      disabled={isSubmitting}
                      placeholder=""
                      {...register('birthday')}
                      className="py-2.5 pl-11 text-sm"
                    />
                  </TextField>
                  {birthdayErrors ? (
                    <div className="flex items-center space-x-2 text-xs text-rose-500">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <p>{errors?.birthday?.message}</p>
                    </div>
                  ) : null}
                </div>
              </section>
            </Card>

            {/*  Position */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting} iserror={positionErrors}>
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Position <span className="text-rose-500">*</span>
                </h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('position')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
                {positionErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{errors?.position?.message}</p>
                  </div>
                ) : null}
              </section>
            </Card>

            {/* TIN Number (XXX-XXX-XXX-XXX) */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting}>
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">TIN Number (XXX-XXX-XXX-XXX) </h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('tin_number')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
                {tinnumberErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>TIN Number (XXX-XXX-XXX-XXX) only accepts digits and -.</p>
                  </div>
                ) : null}
              </section>
            </Card>

            {/* SSS number (XX-XXXXXXX-X) */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting}>
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">SSS number (XX-XXXXXXX-X) </h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('sss_number')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
                {sssnumberErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>SSS number (XX-XXXXXXX-X) only accepts digits and -.</p>
                  </div>
                ) : null}
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
      </FadeInOut>
    </MyFormsLayout>
  )
}

export default ATMApplication
