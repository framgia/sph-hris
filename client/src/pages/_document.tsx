import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

const Document = (): JSX.Element => {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/company-logo.jpg" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="font-poppins antialiased selection:bg-amber-400">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
