import React from 'react'
import { NextPage } from 'next'

import Layout from '~/components/templates/Layout'
import UnderConstructionPage from '~/components/pages/UnderContructionPage'

const EmployeeManagement: NextPage = (): JSX.Element => {
  return (
    <Layout metaTitle="Employee Management">
      <UnderConstructionPage />
    </Layout>
  )
}

export default EmployeeManagement
