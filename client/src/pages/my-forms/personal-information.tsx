import React from 'react'
import classNames from 'classnames'
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
import { PersonalInformationSchema } from '~/utils/validation'
import MyFormsLayout from '~/components/templates/MyFormsLayout'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'
import { PersonalInformationFormValues } from '~/utils/types/formValues'
import TextField from '~/components/molecules/TextField'
import FadeInOut from '~/components/templates/FadeInOut'

const PersonalInformation: NextPage = (): JSX.Element => {
  const {
    watch,
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<PersonalInformationFormValues>({
    mode: 'onChange',
    resolver: yupResolver(PersonalInformationSchema)
  })

  useFormPersist('peronalInformationFormValues', {
    watch,
    setValue
  })

  // This will handle saving the form data
  const handleSavePersonalInformation: SubmitHandler<PersonalInformationFormValues> = async (
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

  const firstNameErrors = !isEmpty(errors?.first_name)
  const lastNameErrors = !isEmpty(errors?.last_name)
  const positionErrors = !isEmpty(errors?.position)
  const birthdayErrors = !isEmpty(errors?.birthday)
  const sssnumberErrors = !isEmpty(errors?.sss_number)
  const tinnumberErrors = !isEmpty(errors?.tin_number)
  const philhealthnumberErrors = !isEmpty(errors?.philhealth_number)
  const pagibignumberErrors = !isEmpty(errors?.pagibig_number)
  const contactNumberErrors = !isEmpty(errors?.contact_number)
  const addressErrors = !isEmpty(errors?.address)
  const emailErrors = !isEmpty(errors?.email)
  const chatworkAccountErrors = !isEmpty(errors?.chatwork_account)
  const mobileCarrierErrors = !isEmpty(errors?.mobile_carrier)

  return (
    <MyFormsLayout metaTitle="First day Onboarding">
      <FadeInOut className="default-scrollbar h-full overflow-y-auto">
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(handleSavePersonalInformation)}
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
                <h1 className="text-base font-medium md:text-lg">Personal Info</h1>
                <p className="text-xs leading-6 text-slate-500 md:text-sm">
                  Please fill out the fields with your correct information
                </p>
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

            {/* Position */}
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

            {/* PhilHealth Number (XX-XXXXXXXXX-X) */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting}>
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">PhilHealth Number (XX-XXXXXXXXX-X) </h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('philhealth_number')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
                {philhealthnumberErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>PhilHealth Number (XX-XXXXXXXXX-X) only accepts digits and -.</p>
                  </div>
                ) : null}
              </section>
            </Card>

            {/* PAG-IBIG (HDMF) Number (XXXX-XXXX-XXXX) */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting}>
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">PAG-IBIG (HDMF) Number (XXXX-XXXX-XXXX) </h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('pagibig_number')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
                {pagibignumberErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>PAG-IBIG (HDMF) Number (XXXX-XXXX-XXXX) only accepts digits and -.</p>
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

            {/* Educational Background (University / Major / Course) */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting}>
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Educational Background (University / Major / Course)
                </h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('educational_background')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
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

            {/* Mobile Carrier (For debate. "unnecessary field") */}
            <Card
              rounded="lg"
              shadow-size="md"
              disabled={isSubmitting}
              iserror={mobileCarrierErrors}
            >
              <section className="space-y-3 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Mobile Carrier <span className="text-rose-500">*</span>
                </h2>
                <div className="space-y-3 text-sm">
                  <Controller
                    name="mobile_carrier"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="flex flex-col justify-center space-y-3">
                        <div>
                          <input
                            {...field}
                            value={'globe'}
                            id="globe"
                            type="radio"
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                            checked={field.value === 'globe'}
                            onChange={() => field.onChange('globe')}
                            className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                          />
                          <label htmlFor="globe" className="ml-2 text-slate-500">
                            Globe
                          </label>
                        </div>
                        <div>
                          <input
                            {...field}
                            value={'smart'}
                            id="smart"
                            type="radio"
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                            checked={field.value === 'smart'}
                            onChange={() => field.onChange('smart')}
                            className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                          />
                          <label htmlFor="smart" className="ml-2 text-slate-500">
                            Smart
                          </label>
                        </div>
                        <div>
                          <input
                            {...field}
                            value={'sun'}
                            id="sun"
                            type="radio"
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                            checked={field.value === 'sun'}
                            onChange={() => field.onChange('sun')}
                            className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                          />
                          <label htmlFor="sun" className="ml-2 text-slate-500">
                            Sun
                          </label>
                        </div>
                        <div>
                          <input
                            {...field}
                            value={'tm'}
                            id="tm"
                            type="radio"
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                            checked={field.value === 'tm'}
                            onChange={() => field.onChange('tm')}
                            className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                          />
                          <label htmlFor="tm" className="ml-2 text-slate-500">
                            TM
                          </label>
                        </div>
                        <div>
                          <input
                            {...field}
                            value={'tnt'}
                            id="tnt"
                            type="radio"
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                            checked={field.value === 'tnt'}
                            onChange={() => field.onChange('tnt')}
                            className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                          />
                          <label htmlFor="tnt" className="ml-2 text-slate-500">
                            TNT
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            {...field}
                            value={0}
                            id="others"
                            type="radio"
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                            checked={field.value === 'others'}
                            onChange={() => field.onChange('others')}
                            className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                          />
                          <label htmlFor="others" className="ml-2 text-slate-500">
                            Others
                          </label>
                          <input
                            placeholder="Your answer"
                            className={classNames(
                              'ml-2 border-b border-slate-300 bg-transparent text-sm',
                              'outline-none transition duration-150 ease-in-out placeholder:font-light ',
                              'placeholder:text-slate-400 focus:border-primary focus:outline-none ',
                              'focus:outline-0 focus:ring-primary disabled:cursor-not-allowed disabled:border-0 ',
                              'disabled:opacity-50'
                            )}
                          />
                        </div>
                      </div>
                    )}
                  />
                  {mobileCarrierErrors ? (
                    <div className="flex items-center space-x-2 text-xs text-rose-500">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <p>{errors?.mobile_carrier?.message}</p>
                    </div>
                  ) : null}
                </div>
              </section>
            </Card>

            {/* Address w/ postal code (....., XXXX) */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting} iserror={addressErrors}>
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Address w/ postal code (....., XXXX) <span className="text-rose-500">*</span>
                </h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('address')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
                {addressErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{errors?.address?.message}</p>
                  </div>
                ) : null}
              </section>
            </Card>

            {/* E-mail address for google documents / calender */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting} iserror={emailErrors}>
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  E-mail address for google documents / calendar{' '}
                  <span className="text-rose-500">*</span>
                </h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('email')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
                {emailErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{errors?.email?.message}</p>
                  </div>
                ) : null}
              </section>
            </Card>

            {/* Chatwork/Slack Account */}
            <Card
              rounded="lg"
              shadow-size="md"
              disabled={isSubmitting}
              iserror={chatworkAccountErrors}
            >
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Chatwork/Slack Account <span className="text-rose-500">*</span>
                </h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('chatwork_account')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
                {chatworkAccountErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{errors?.chatwork_account?.message}</p>
                  </div>
                ) : null}
              </section>
            </Card>

            {/* In Case of Emergency */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting}>
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">In Case of Emergency</h2>
              </section>
            </Card>

            {/* Name */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting}>
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">Name</h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('name_incase_of_emergency')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
              </section>
            </Card>

            {/* Relationship */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting}>
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">Relationship</h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('relationship_incase_of_emergency')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
              </section>
            </Card>

            {/* Address w/ postal code (....., XXXX) */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting}>
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">Address w/ postal code (....., XXXX)</h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('address_incase_of_emergency')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
              </section>
            </Card>

            {/* Contact Number (XX-XXX-XXX-XXXX) */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting}>
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">Contact Number (XX-XXX-XXX-XXXX)</h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('contact_incase_of_emergency')}
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
      </FadeInOut>
    </MyFormsLayout>
  )
}

export default PersonalInformation
