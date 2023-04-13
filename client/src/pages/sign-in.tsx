import Head from 'next/head'
import classNames from 'classnames'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { FcGoogle } from 'react-icons/fc'
import React, { FC, useEffect, useState } from 'react'
import { signOut, signIn, useSession } from 'next-auth/react'

import { PulseLoader } from 'react-spinners'
import WaveStyle from '~/utils/icons/WaveStyle'
import { getServerSideProps } from '~/utils/ssr'
import useSignInMutation from '~/hooks/useSignInMutation'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'

type Props = {
  cookies: string | null
}

const SignIn: FC<Props> = ({ cookies }): JSX.Element => {
  const router = useRouter()

  const session = useSession()
  const { handleSignInMutation } = useSignInMutation()
  const SignInMutation = handleSignInMutation()
  const [isVerifying, setIsVerifying] = useState<boolean>(false)

  useEffect(() => {
    if (session?.status === 'authenticated') {
      SignInMutation.mutate({
        email: session?.data?.user?.email as string,
        token: cookies as string,
        expiration: session?.data?.expires
      })
      localStorage.setItem('cookies', cookies as string)
      localStorage.setItem('newNotificationCount', '0')
    }
  }, [session?.status])

  useEffect(() => {
    if (session?.data != null) setIsVerifying(true)
    if (SignInMutation?.data?.createSignIn === true) {
      void router.push('/')
      toast.success('Verification Success!', { duration: 3000 })
    } else if (session?.data != null) {
      void signOut({ callbackUrl: '/sign-in' })
      toast.error('Email does not exist!', { duration: 3000 })
    }
  }, [SignInMutation?.data])

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="relative flex h-screen min-h-screen flex-col justify-center overflow-hidden">
        <MaxWidthContainer
          maxWidth="max-w-xl"
          className="relative flex flex-col items-center justify-center space-y-10 px-4"
        >
          <div className="space-y-5 text-center">
            <p className="text-xs text-slate-600 md:text-sm">Welcome to Sun Asterisk Philippines</p>
            <h1 className="text-3xl font-bold text-slate-900 md:text-5xl">Login to continue</h1>
          </div>
          <div className="relative flex w-full items-center justify-center border-b border-slate-300">
            <h1 className="absolute bg-white px-4 text-xs text-slate-500">with</h1>
          </div>
          <div className="w-full">
            <button
              type="button"
              className={classNames(
                'overflow-hidden border-[#4285f4] px-6 py-2.5 text-xs font-medium shadow-md shadow-blue-100',
                'relative inline-flex w-full items-center justify-center rounded border text-white focus:scale-95',
                !isVerifying &&
                  'focus:shadow-lg focus:outline-none focus:ring-0 hover:shadow-lg hover:shadow-blue-200 active:shadow-lg',
                !isVerifying
                  ? 'focus:[#4285f4] bg-[#4285f4] transition duration-200 ease-in-out focus:text-white hover:bg-[#4285f4]/90'
                  : 'bg-[#4285f4]',
                isVerifying || session.status === 'loading'
                  ? 'cursor-not-allowed opacity-50 active:scale-100'
                  : ''
              )}
              onClick={() => {
                try {
                  signIn('google', {
                    callbackUrl: `${process.env.NEXT_PUBLIC_CLIENT_URL as string}/sign-in`
                  })
                    .then()
                    .catch((error) => error.message)
                } catch (error) {}
              }}
              disabled={isVerifying || session.status === 'loading'}
            >
              <div className="absolute inset-y-0 left-0 flex items-center bg-white px-2">
                <FcGoogle className="text-xl" />
              </div>
              {session.status === 'loading' || isVerifying ? (
                <div className="flex items-center justify-center">
                  <PulseLoader color="#ffffff" size={10} />
                </div>
              ) : (
                <>
                  <p className="text-center font-inter tracking-widest">Sign in with Google</p>
                </>
              )}
            </button>
          </div>
        </MaxWidthContainer>
        <div className="absolute inset-x-0 -bottom-14 -z-10">
          <WaveStyle className="w-full" />
        </div>
      </div>
    </>
  )
}

export default SignIn

export { getServerSideProps }
