import React from 'react'
import type { NextPage } from 'next'

import Layout from '~/components/templates/Layout'
import UnderConstructionPage from '~/components/pages/UnderContructionPage'

const MyForms: NextPage = (): JSX.Element => {
  return (
    <Layout metaTitle="My Forms">
      <UnderConstructionPage />
    </Layout>
  )
}

export default MyForms
