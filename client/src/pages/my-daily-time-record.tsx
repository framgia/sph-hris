import React from 'react'
import { NextPage } from 'next'

import Layout from '~/components/templates/Layout'
import UnderConstructionPage from '~/components/pages/UnderContructionPage'

const MyDailyTimeRecord: NextPage = (): JSX.Element => {
  return (
    <Layout metaTitle="My Daily Time Record">
      <UnderConstructionPage />
    </Layout>
  )
}

export default MyDailyTimeRecord
