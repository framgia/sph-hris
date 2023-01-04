import React from 'react'
import { NextPage } from 'next'

import Layout from '~/components/templates/Layout'
import UnderConstructionPage from '~/components/pages/UnderContructionPage'

const DTRManagement: NextPage = (): JSX.Element => {
  return (
    <Layout metaTitle="DTR Management">
      <UnderConstructionPage />
    </Layout>
  )
}

export default DTRManagement
