import React from 'react'
import Head from 'next/head'
import classNames from 'classnames'
import { NextPage } from 'next'
import { FcGoogle } from 'react-icons/fc'

import Logo from '~/components/atoms/Logo'

const SignIn: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="flex h-screen flex-col">
        <header
          className={classNames(
            'flex w-full items-center justify-between border-b',
            'border-slate-200 bg-white px-3 md:px-4'
          )}
        >
          {/* User Actions */}
          <Logo
            {...{
              isOpen: true
            }}
          />
        </header>
        <div className="relative flex h-full flex-col items-center justify-center">
          <div className="flex w-full max-w-xl flex-col items-center justify-center px-5 py-5">
            <div>
              <p className="flex items-center justify-center text-xs md:text-sm">
                Welcome to Sun Asterisk Philippines
              </p>
            </div>
            <div className="py-6">
              <h1 className="text-3xl font-bold md:text-5xl">Login to continue</h1>
            </div>
            <div className="relative my-7 flex w-full items-center justify-center border-b border-slate-300">
              <h1 className="absolute bg-white px-4">with</h1>
            </div>
            <div className="flex w-full ">
              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className={classNames(
                  'relative flex w-full items-center justify-center rounded border ',
                  'border-slate-300 px-6 py-2.5 text-xs font-medium uppercase leading-tight shadow-md',
                  'transition duration-150 ease-in-out focus:bg-slate-700',
                  ' focus:shadow-lg focus:outline-none focus:ring-0 hover:shadow-lg  active:shadow-lg'
                )}
              >
                <FcGoogle className="absolute left-4 text-xl" />
                <p className="text-center">Google</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
