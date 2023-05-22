import Head from 'next/head'
import React, { FC } from 'react'
import { useRouter } from 'next/router'

import handleImageError from '~/utils/handleImageError'
import Button from '~/components/atoms/Buttons/ButtonAction'

const UnderConstructionPage: FC = (): JSX.Element => {
  const router = useRouter()

  const handleRedirection = (): void => {
    void router.push('/my-daily-time-record')
  }

  return (
    <>
      <Head>
        <title>Page Under Construction</title>
      </Head>
      <div className="flex h-screen min-h-full flex-col items-center justify-center">
        <main className="flex max-w-[500px] flex-col items-center justify-center">
          <img
            onError={(e) => handleImageError(e, '/images/default.png')}
            src="/images/under-construction.png"
            alt="maintenance"
          />
          <h1 className="text-center text-xl font-medium text-slate-600">
            This page is currently under construction.
          </h1>
          <span className="text-lg font-medium text-slate-500">Please comeback soon!</span>
          <Button
            type="button"
            onClick={handleRedirection}
            variant="warning"
            className="mt-4 px-8 py-3 lg:py-4 lg:px-10"
            rounded="full"
          >
            Go to My DTR
          </Button>
        </main>
      </div>
    </>
  )
}

export default UnderConstructionPage
