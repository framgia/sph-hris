import React from 'react'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

import '~/utils/styles/globals.css'

const queryClient = new QueryClient()
const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
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
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
