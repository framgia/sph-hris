import React from 'react'
import { NextPage } from 'next'

import Layout from '~/components/templates/Layout'
import UnderConstructionPage from '~/components/pages/UnderContructionPage'

const MyOverTime: NextPage = (): JSX.Element => {
  return (
    <Layout metaTitle="My Overtime">
      <UnderConstructionPage />
    </Layout>
  )
}

export default MyOverTime
