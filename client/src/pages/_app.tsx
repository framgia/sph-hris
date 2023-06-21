import React from 'react'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider } from '@tanstack/react-query'

import '~/utils/styles/globals.css'
import { queryClient } from '~/lib/queryClient'
import NextProgress from '~/utils/next-progress'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <SessionProvider>
      <NextProgress />
      <Toaster position="top-right" reverseOrder={false} containerStyle={{ top: 60 }} />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
