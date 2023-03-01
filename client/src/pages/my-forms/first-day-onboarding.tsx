import React from 'react'
import classNames from 'classnames'
import type { NextPage } from 'next'
import isEmpty from 'lodash/isEmpty'
import useFormPersist from 'react-hook-form-persist'
import { yupResolver } from '@hookform/resolvers/yup'
import { AlertCircle, Upload, X } from 'react-feather'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'

import Card from '~/components/atoms/Card'
import Input from '~/components/atoms/Input'
import SpinnerIcon from '~/utils/icons/SpinnerIcon'
import FadeInOut from '~/components/templates/FadeInOut'
import Button from '~/components/atoms/Buttons/ButtonAction'
import { FirstDayOnBoardingSchema } from '~/utils/validation'
import MyFormsLayout from '~/components/templates/MyFormsLayout'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'
import { FirstDayOnBoardingFormValues } from '~/utils/types/formValues'

const FirstDayOnboarding: NextPage = (): JSX.Element => {
  const {
    watch,
    control,
    setValue,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FirstDayOnBoardingFormValues>({
    mode: 'onChange',
    resolver: yupResolver(FirstDayOnBoardingSchema)
  })

  const ssAuthForEmailImage = watch('ss_auth_for_email_image')
  const ssAuthForGitHubImage = watch('ss_auth_for_github_image')
  const signatureForCompanyIDImage = watch('signature_for_company_id_image')
  const pictureForCompanyID = watch('picture_2x2_company_id')

  useFormPersist('firstDayOnBoardingFormValues', {
    watch,
    setValue
  })

  // This will handle saving the form data
  const handleSaveFirstDayOnBoarding: SubmitHandler<FirstDayOnBoardingFormValues> = async (
    data
  ): Promise<void> => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        // console.log(data)
        alert(JSON.stringify(data, null, 2))
        resolve()
        alert(JSON.stringify(data, null, 2))
      }, 2000)
    })
  }

  const handleAuthForEmailImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if (file !== undefined && file !== null) {
      const dt = new DataTransfer()
      dt.items.add(file)
      const fileList = dt.files
      clearErrors('ss_auth_for_email_image')
      setValue('ss_auth_for_email_image', fileList)
    }
  }

  const handleAuthForGitHubImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if (file !== undefined && file !== null) {
      const dt = new DataTransfer()
      dt.items.add(file)
      const fileList = dt.files
      clearErrors('ss_auth_for_github_image')
      setValue('ss_auth_for_github_image', fileList)
    }
  }

  const handleSignatureForCompanyIDImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0]
    if (file !== undefined && file !== null) {
      const dt = new DataTransfer()
      dt.items.add(file)
      const fileList = dt.files
      clearErrors('signature_for_company_id_image')
      setValue('signature_for_company_id_image', fileList)
    }
  }

  const handlePictureForCompanyIDChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if (file !== undefined && file !== null) {
      const dt = new DataTransfer()
      dt.items.add(file)
      const fileList = dt.files
      clearErrors('picture_2x2_company_id')
      setValue('picture_2x2_company_id', fileList)
    }
  }

  const installBelowErrors =
    !isEmpty(errors?.install_below?.docker_toolbox) ||
    !isEmpty(errors?.install_below?.vscode) ||
    !isEmpty(errors?.install_below?.mysql_workbench) ||
    !isEmpty(errors?.install_below?.docker_for_windows)
  const githubAccountLinkErrors = !isEmpty(errors?.github_account_link)
  const authForEmailImageErrors = !isEmpty(errors?.ss_auth_for_email_image)
  const authForGitHubImageErrors = !isEmpty(errors?.ss_auth_for_github_image)
  const signatureForCompanyIDImageErrors = !isEmpty(errors?.signature_for_company_id_image)
  const picture2x2ForCompanyIDImageErrors = !isEmpty(errors?.picture_2x2_company_id)
  const isSigningProbationaryContractErrors = !isEmpty(errors?.is_signing_probationary_contract)
  const isExistingSSSLoanErrors = !isEmpty(errors?.is_existing_sss_loan)
  const isExistingPagIbigLoanErrors = !isEmpty(errors?.is_existing_pag_ibig_loan)

  return (
    <MyFormsLayout metaTitle="First day Onboarding">
      <FadeInOut className="default-scrollbar h-full overflow-y-auto">
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(handleSaveFirstDayOnBoarding)}
        >
          <MaxWidthContainer
            maxWidth="max-w-[710px]"
            className="flex flex-col space-y-4 px-4 pb-8 text-slate-700 md:space-y-6"
          >
            {/* First Day Onboarding Card */}
            <Card
              rounded="lg"
              shadow-size="md"
              disabled={isSubmitting}
              className="mt-4 border-t-[10px] border-t-sky-500 md:mt-6"
            >
              <section className="space-y-2 py-4 px-5 md:py-5 md:px-7">
                <h1 className="text-base font-medium md:text-lg">First Day Onboarding Checklist</h1>
                <p className="text-xs leading-6 text-slate-500 md:text-sm">
                  The name and photo associated with your Google account will be recorded when you
                  upload files and submit this form. Your email is not part of your response.
                </p>
              </section>
            </Card>

            {/* Install Below. (Check box if done) */}
            <Card
              rounded="lg"
              shadow-size="md"
              disabled={isSubmitting}
              iserror={installBelowErrors}
            >
              <section className="space-y-4 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Install below. (Tick box if done) <span className="text-rose-500">*</span>
                </h2>
                <ul className="flex flex-col space-y-4">
                  <li>
                    <label htmlFor="docker-toolbox" className="flex items-start">
                      <input
                        type="checkbox"
                        id="docker-toolbox"
                        {...register('install_below.docker_toolbox')}
                        className={classNames(
                          'h-4 w-4 rounded border-slate-300 bg-slate-100',
                          'text-primary focus:ring-primary'
                        )}
                      />
                      <div className="ml-2 flex flex-wrap items-center space-x-2 text-xs capitalize">
                        <span className="select-none text-slate-500">docker (toolbox)</span>
                        <a
                          href="https://www.docker.com/products/docker-desktop"
                          target="_blank"
                          rel="noreferrer"
                          className={classNames(
                            'text-sky-500 underline decoration-sky-500',
                            'line-clamp-1 hover:text-sky-600 hover:no-underline'
                          )}
                        >
                          docker-desktop-installation
                        </a>
                      </div>
                    </label>
                  </li>
                  <li>
                    <label htmlFor="vscode" className="flex items-start">
                      <input
                        type="checkbox"
                        id="vscode"
                        {...register('install_below.vscode')}
                        className={classNames(
                          'h-4 w-4 rounded border-slate-300 bg-slate-100',
                          'text-primary focus:ring-primary'
                        )}
                      />
                      <div className="ml-2 flex flex-wrap items-center space-x-2 text-xs capitalize">
                        <span className="select-none text-slate-500">vscode</span>
                        <a
                          href="https://code.visualstudio.com/download"
                          target="_blank"
                          rel="noreferrer"
                          className={classNames(
                            'text-sky-500 underline decoration-sky-500',
                            'line-clamp-1 hover:text-sky-600 hover:no-underline'
                          )}
                        >
                          visual-studio-code-download
                        </a>
                      </div>
                    </label>
                  </li>
                  <li>
                    <label htmlFor="mysql-workbench" className="flex items-start">
                      <input
                        type="checkbox"
                        id="mysql-workbench"
                        {...register('install_below.mysql_workbench')}
                        className={classNames(
                          'h-4 w-4 rounded border-slate-300 bg-slate-100',
                          'text-primary focus:ring-primary'
                        )}
                      />
                      <div className="ml-2 flex flex-wrap items-center space-x-2 text-xs capitalize">
                        <span className="select-none text-slate-500">mysql workbench</span>
                        <a
                          href="https://dev.mysql.com/downloads/workbench"
                          target="_blank"
                          rel="noreferrer"
                          className={classNames(
                            'text-sky-500 underline decoration-sky-500',
                            'line-clamp-1 hover:text-sky-600 hover:no-underline'
                          )}
                        >
                          mysql-workbench-download
                        </a>
                      </div>
                    </label>
                  </li>
                  <li>
                    <label htmlFor="docker-windows" className="flex items-start">
                      <input
                        type="checkbox"
                        id="docker-windows"
                        {...register('install_below.docker_for_windows')}
                        className={classNames(
                          'h-4 w-4 rounded border-slate-300 bg-slate-100',
                          'text-primary focus:ring-primary'
                        )}
                      />
                      <div className="ml-2 flex flex-wrap items-center space-x-2 text-xs capitalize">
                        <span className="select-none text-slate-500">docker for windows</span>
                        <a
                          href="https://docs.docker.com/docker-for-windows/install/"
                          target="_blank"
                          rel="noreferrer"
                          className={classNames(
                            'text-sky-500 underline decoration-sky-500',
                            'line-clamp-1 hover:text-sky-600 hover:no-underline'
                          )}
                        >
                          docker-for-window-download
                        </a>
                      </div>
                    </label>
                  </li>
                </ul>
                {installBelowErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>This is a required question</p>
                  </div>
                ) : null}
              </section>
            </Card>

            {/* Input your Github account link. * */}
            <Card
              rounded="lg"
              shadow-size="md"
              disabled={isSubmitting}
              iserror={githubAccountLinkErrors}
            >
              <section className="space-y-4 py-4 px-5 text-xs md:py-5 md:px-7">
                <div className="flex flex-col space-y-2 text-xs ">
                  <h2 className="text-sm md:text-base">
                    Input your Github account link. <span className="text-rose-500">*</span>
                  </h2>
                  <p className="text-slate-600">
                    Create Github account using company email address, to register go to this link
                  </p>
                  <span className="text-slate-600">
                    (
                    <a href="https://github.com" className="text-sky-500">
                      https://github.com
                    </a>
                    )
                  </span>
                </div>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    className="text-sm"
                    placeholder="Your answer"
                    {...register('github_account_link')}
                  />
                </div>
                {githubAccountLinkErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{errors?.github_account_link?.message}</p>
                  </div>
                ) : null}
              </section>
            </Card>

            {/* Upload screenshot of enabled (2) factor auth for email  * */}
            <Card
              rounded="lg"
              shadow-size="md"
              disabled={isSubmitting}
              iserror={authForEmailImageErrors}
            >
              <section className="space-y-3 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Upload screenshot of enabled (2) factor auth for email{' '}
                  <span className="text-rose-500">*</span>
                </h2>
                {isEmpty(ssAuthForEmailImage) ? (
                  <>
                    <Button
                      type="button"
                      variant="info-outline"
                      onClick={() => document.getElementById('ss_auth_for_email_image')?.click()}
                      className="flex items-center space-x-2 px-3.5 py-1.5 text-sm shadow-none"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Add File</span>
                    </Button>
                    <input
                      type="file"
                      id="ss_auth_for_email_image"
                      {...register('ss_auth_for_email_image')}
                      onChange={handleAuthForEmailImageChange}
                      className="hidden"
                    />
                  </>
                ) : (
                  <div
                    className={classNames(
                      'inline-flex items-center space-x-2 rounded',
                      'border border-slate-200 px-1.5 py-1 text-sm'
                    )}
                  >
                    <span className="line-clamp-1">
                      {ssAuthForEmailImage[0]?.name ?? 'image-file'}
                    </span>
                    <button
                      type="button"
                      className="outline-none"
                      onClick={() => setValue('ss_auth_for_email_image', new DataTransfer().files)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {authForEmailImageErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <span>{errors?.ss_auth_for_email_image?.message}</span>
                  </div>
                ) : null}
              </section>
            </Card>

            {/* Upload screenshot of enabled (2) factor auth for github * */}
            <Card
              rounded="lg"
              shadow-size="md"
              disabled={isSubmitting}
              iserror={authForGitHubImageErrors}
            >
              <section className="space-y-3 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Upload screenshot of enabled (2) factor auth for github{' '}
                  <span className="text-rose-500">*</span>
                </h2>
                {isEmpty(ssAuthForGitHubImage) ? (
                  <>
                    <Button
                      type="button"
                      variant="info-outline"
                      onClick={() => document.getElementById('ss_auth_for_github_image')?.click()}
                      className="flex items-center space-x-2 px-3.5 py-1.5 text-sm shadow-none"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Add File</span>
                    </Button>
                    <input
                      type="file"
                      id="ss_auth_for_github_image"
                      {...register('ss_auth_for_github_image')}
                      onChange={handleAuthForGitHubImageChange}
                      className="hidden"
                    />
                  </>
                ) : (
                  <div
                    className={classNames(
                      'inline-flex items-center space-x-2 rounded',
                      'border border-slate-200 px-1.5 py-1 text-sm'
                    )}
                  >
                    <span className="line-clamp-1">
                      {ssAuthForGitHubImage[0]?.name ?? 'image-file'}
                    </span>
                    <button
                      type="button"
                      className="outline-none"
                      onClick={() => setValue('ss_auth_for_github_image', new DataTransfer().files)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {authForGitHubImageErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{errors?.ss_auth_for_github_image?.message}</p>
                  </div>
                ) : null}
              </section>
            </Card>

            {/* Upload your e-signature for company ID * */}
            <Card
              rounded="lg"
              shadow-size="md"
              disabled={isSubmitting}
              iserror={signatureForCompanyIDImageErrors}
            >
              <section className="space-y-3 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Upload your e-signature for company ID <span className="text-rose-500">*</span>
                </h2>
                {isEmpty(signatureForCompanyIDImage) ? (
                  <>
                    <Button
                      type="button"
                      variant="info-outline"
                      onClick={() =>
                        document.getElementById('signature_for_company_id_image')?.click()
                      }
                      className="flex items-center space-x-2 px-3.5 py-1.5 text-sm shadow-none"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Add File</span>
                    </Button>
                    <input
                      type="file"
                      id="signature_for_company_id_image"
                      {...register('signature_for_company_id_image')}
                      onChange={handleSignatureForCompanyIDImageChange}
                      className="hidden"
                    />
                  </>
                ) : (
                  <div
                    className={classNames(
                      'inline-flex items-center space-x-2 rounded',
                      'border border-slate-200 px-1.5 py-1 text-sm'
                    )}
                  >
                    <span className="line-clamp-1">
                      {signatureForCompanyIDImage[0]?.name ?? 'image-file'}
                    </span>
                    <button
                      type="button"
                      className="outline-none"
                      onClick={() =>
                        setValue('signature_for_company_id_image', new DataTransfer().files)
                      }
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {signatureForCompanyIDImageErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{errors?.signature_for_company_id_image?.message}</p>
                  </div>
                ) : null}
              </section>
            </Card>

            {/* Upload 2*2 picture for company ID * */}
            <Card
              rounded="lg"
              shadow-size="md"
              disabled={isSubmitting}
              iserror={picture2x2ForCompanyIDImageErrors}
            >
              <section className="space-y-3 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Upload 2*2 picture for company ID <span className="text-rose-500">*</span>
                </h2>
                {isEmpty(pictureForCompanyID) ? (
                  <>
                    <Button
                      type="button"
                      variant="info-outline"
                      onClick={() => document.getElementById('picture_2x2_company_id')?.click()}
                      className="flex items-center space-x-2 px-3.5 py-1.5 text-sm shadow-none"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Add File</span>
                    </Button>
                    <input
                      type="file"
                      id="picture_2x2_company_id"
                      {...register('picture_2x2_company_id')}
                      onChange={handlePictureForCompanyIDChange}
                      className="hidden"
                    />
                  </>
                ) : (
                  <div
                    className={classNames(
                      'inline-flex items-center space-x-2 rounded',
                      'border border-slate-200 px-1.5 py-1 text-sm'
                    )}
                  >
                    <span className="line-clamp-1">
                      {pictureForCompanyID[0]?.name ?? 'image-file'}
                    </span>
                    <button
                      type="button"
                      className="outline-none"
                      onClick={() => setValue('picture_2x2_company_id', new DataTransfer().files)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {picture2x2ForCompanyIDImageErrors ? (
                  <div className="flex items-center space-x-2 text-xs text-rose-500">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{errors?.picture_2x2_company_id?.message}</p>
                  </div>
                ) : null}
              </section>
            </Card>

            {/* Are you done signing your probationary contract? * */}
            <Card
              rounded="lg"
              shadow-size="md"
              disabled={isSubmitting}
              iserror={isSigningProbationaryContractErrors}
            >
              <section className="space-y-3 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Are you done signing your probationary contract?{' '}
                  <span className="text-rose-500">*</span>
                </h2>
                <div className="space-y-3 text-sm">
                  <Controller
                    name="is_signing_probationary_contract"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="flex flex-col justify-center space-y-3">
                        <div>
                          <input
                            type="radio"
                            {...field}
                            value={1}
                            id="yes"
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                            checked={field.value === true}
                            onChange={() => field.onChange(true)}
                            className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                          />
                          <label htmlFor="yes" className="ml-2 text-slate-500">
                            Yes
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            {...field}
                            value={0}
                            id="no"
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                            checked={field.value === false}
                            onChange={() => field.onChange(false)}
                            className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                          />
                          <label htmlFor="no" className="ml-2 text-slate-500">
                            No
                          </label>
                        </div>
                      </div>
                    )}
                  />
                  {isSigningProbationaryContractErrors ? (
                    <div className="flex items-center space-x-2 text-xs text-rose-500">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <p>{errors?.is_signing_probationary_contract?.message}</p>
                    </div>
                  ) : null}
                </div>
              </section>
            </Card>

            {/* Do you have existing SSS loan? * */}
            <Card
              rounded="lg"
              shadow-size="md"
              disabled={isSubmitting}
              iserror={isExistingSSSLoanErrors}
            >
              <section className="space-y-3 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Do you have existing SSS loan? <span className="text-rose-500">*</span>
                </h2>
                <div className="space-y-3 text-sm">
                  <Controller
                    name="is_existing_sss_loan"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="flex flex-col justify-center space-y-3">
                        <div>
                          <input
                            type="radio"
                            {...field}
                            value={1}
                            id="yes"
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                            checked={field.value === true}
                            onChange={() => field.onChange(true)}
                            className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                          />
                          <label htmlFor="yes" className="ml-2 text-slate-500">
                            Yes
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            {...field}
                            value={0}
                            id="no"
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                            checked={field.value === false}
                            onChange={() => field.onChange(false)}
                            className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                          />
                          <label htmlFor="no" className="ml-2 text-slate-500">
                            No
                          </label>
                        </div>
                      </div>
                    )}
                  />
                  {isExistingSSSLoanErrors ? (
                    <div className="flex items-center space-x-2 text-xs text-rose-500">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <p>{errors?.is_existing_sss_loan?.message}</p>
                    </div>
                  ) : null}
                </div>
              </section>
            </Card>

            {/* Do you have existing Pag ibig loan * */}
            <Card
              rounded="lg"
              shadow-size="md"
              disabled={isSubmitting}
              iserror={isExistingPagIbigLoanErrors}
            >
              <section className="space-y-3 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  Do you have existing Pag ibig loan <span className="text-rose-500">*</span>
                </h2>
                <div className="space-y-3 text-sm">
                  <Controller
                    name="is_existing_pag_ibig_loan"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="flex flex-col justify-center space-y-3">
                        <div>
                          <input
                            {...field}
                            value={1}
                            id="yes"
                            type="radio"
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                            checked={field.value === true}
                            onChange={() => field.onChange(true)}
                            className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                          />
                          <label htmlFor="yes" className="ml-2 text-slate-500">
                            Yes
                          </label>
                        </div>
                        <div>
                          <input
                            {...field}
                            value={0}
                            id="no"
                            type="radio"
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                            checked={field.value === false}
                            onChange={() => field.onChange(false)}
                            className="h-4 w-4 text-sky-500 focus:ring-sky-400"
                          />
                          <label htmlFor="no" className="ml-2 text-slate-500">
                            No
                          </label>
                        </div>
                      </div>
                    )}
                  />
                  {isExistingPagIbigLoanErrors ? (
                    <div className="flex items-center space-x-2 text-xs text-rose-500">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <p>{errors?.is_existing_pag_ibig_loan?.message}</p>
                    </div>
                  ) : null}
                </div>
              </section>
            </Card>

            {/* How much is your monthly amortization for SSS Loan? * */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting}>
              <section className="space-y-5 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  How much is your monthly amortization for SSS Loan?
                </h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('monthly_amortization_for_sss_loan')}
                    placeholder="Your answer"
                    className="text-sm"
                  />
                </div>
              </section>
            </Card>

            {/* How much is your monthly amortization for Pag-ibig Loan? * */}
            <Card rounded="lg" shadow-size="md" disabled={isSubmitting}>
              <section className="space-y-5 py-4 px-5 md:py-5 md:px-7">
                <h2 className="text-sm md:text-base">
                  How much is your monthly amortization for Pag-ibig Loan?
                </h2>
                <div className="w-full md:w-1/2">
                  <Input
                    type="text"
                    {...register('monthly_amortization_for_pag_ibig_loan')}
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

export default FirstDayOnboarding
