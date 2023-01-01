import React from 'react'
import { NextPage } from 'next'

import Layout from '~/components/templates/Layout'
import UnderConstructionPage from '~/components/pages/UnderContructionPage'

const OvertimeManagement: NextPage = (): JSX.Element => {
  return (
    <Layout metaTitle="Overtime Management">
      <UnderConstructionPage />
    </Layout>
  )
}

export default OvertimeManagement
