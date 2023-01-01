import React from 'react'
import { NextPage } from 'next'

import Layout from '~/components/templates/Layout'
import UnderConstructionPage from '~/components/pages/UnderContructionPage'

const LeaveManagement: NextPage = (): JSX.Element => {
  return (
    <Layout metaTitle="Leave Management">
      <UnderConstructionPage />
    </Layout>
  )
}

export default LeaveManagement
