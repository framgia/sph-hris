import React from 'react'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import '~/utils/styles/globals.css'

const queryClient = new QueryClient()
const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" reverseOrder={false} />
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
