import React from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import classNames from 'classnames'
import { useRouter } from 'next/router'

const NotFound: NextPage = (): JSX.Element => {
  const router = useRouter()

  const handleRedirection = (): void => {
    void router.replace({
      pathname: '/my-daily-time-record'
    })
  }

  return (
    <>
      <Head>
        <title>Page Not Found</title>
        <meta name="description" content="404 page not found" />
      </Head>
      <div
        className={classNames(
          'flex h-screen min-h-screen items-center justify-center px-4',
          'bg-white text-gray-800 transition duration-700 ease-in-out'
        )}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center">
            <h1 className="-mr-6 text-9xl font-bold">4</h1>
            <div className="z-50 flex-shrink-0">
              <img src="/images/404.png" alt="Cry Emoji Image" className="h-48 w-48" />
            </div>
            <h1 className="-ml-8 text-9xl font-bold">4</h1>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold uppercase">Oops! Page not be found</h2>
            <div className="max-w-md text-center">
              <p className="text-sm text-gray-500">
                Sorry but the page you are looking for does not exist, have been removed. name
                changed or is temporarily unavailable
              </p>
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={handleRedirection}
              className={classNames(
                'rounded-full bg-yellow-500 px-6 py-3 text-white hover:bg-yellow-400',
                'font-semibold transition duration-150 ease-in-out focus:outline-none hover:shadow-xl'
              )}
            >
              Back to My DTR
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound
