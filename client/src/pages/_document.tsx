import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'
class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/sun-color-icon.svg" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="overflow-hidden font-inter antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
