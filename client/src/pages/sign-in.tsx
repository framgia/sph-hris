import Head from 'next/head'
import classNames from 'classnames'
import React, { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { NextPage, NextApiRequest } from 'next'
import { Toaster, toast } from 'react-hot-toast'
import { signOut, signIn, useSession } from 'next-auth/react'

import Logo from '~/components/atoms/Logo'
import useSignInMutation from '~/hooks/useSignInMutation'

const SignIn: NextPage = ({ cookies }: any): JSX.Element => {
  const session = useSession()
  const { handleSignInMutation } = useSignInMutation()
  const SignInMutation = handleSignInMutation()

  useEffect(() => {
    if (session?.status === 'authenticated') {
      SignInMutation.mutate({
        email: session?.data?.user?.email as string,
        token: cookies as string,
        expiration: session?.data?.expires
      })
    }
  }, [session?.status])

  useEffect(() => {
    if (SignInMutation?.data?.createSignIn === true) {
      window.location.href = '/'
      toast.success('Verification Success, redirecting...', { duration: 3000 })
    } else if (session?.data != null) {
      void signOut({ callbackUrl: '/sign-in' })
      toast.error('Email does not exist', { duration: 3000 })
    }
  }, [SignInMutation?.data])

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#2D3D63',
            color: '#fff'
          }
        }}
      />
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
                onClick={() => {
                  try {
                    signIn('google', { callbackUrl: 'http://localhost:3000/sign-in' })
                      .then()
                      .catch((error) => error.message)
                  } catch (error) {}
                }}
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

export async function getServerSideProps({
  req
}: {
  req: NextApiRequest
}): Promise<{ props: { cookies: string | null } }> {
  const cookies = req.cookies['next-auth.session-token'] ?? null

  return { props: { cookies } }
}
