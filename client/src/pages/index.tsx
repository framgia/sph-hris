import React from 'react'
import type { NextPage } from 'next'

import Layout from '~/components/templates/Layout'
import UnderConstructionPage from '~/components/pages/UnderContructionPage'

type Props = {
  cookies: string | null
}

const Index: NextPage<Props> = (): JSX.Element => {
  return (
    <Layout metaTitle="Home">
      <UnderConstructionPage />
    </Layout>
  )
}

export default Index
