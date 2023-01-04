import React from 'react'
import { NextPage } from 'next'

import Layout from '~/components/templates/Layout'
import UnderConstructionPage from '~/components/pages/UnderContructionPage'

const ScheduleManagement: NextPage = (): JSX.Element => {
  return (
    <Layout metaTitle="Schedule Management">
      <UnderConstructionPage />
    </Layout>
  )
}

export default ScheduleManagement
