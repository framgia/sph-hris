import React from 'react'
import type { AppProps } from 'next/app'

import '~/utils/styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default MyApp
