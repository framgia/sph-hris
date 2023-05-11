import Head from 'next/head'
import React, { FC } from 'react'
import handleImageError from '~/utils/handleImageError'

const UnderConstructionPage: FC = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Page Under Construction</title>
      </Head>
      <div className="flex h-screen min-h-full flex-col items-center justify-center">
        <main className="flex max-w-[400px] flex-col items-center justify-center">
          <img
            onError={(e) => handleImageError(e, '/images/default.png')}
            src="/images/under-construction.png"
            alt="maintenance"
          />
          <h1 className="text-center text-xl font-medium text-slate-600">
            This page is currently under construction.
          </h1>
          <span className="text-lg font-medium text-slate-500">Please comeback soon!</span>
        </main>
      </div>
    </>
  )
}

export default UnderConstructionPage
