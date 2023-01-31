import React from 'react'
import type { NextPage } from 'next'

import Layout from '~/components/templates/Layout'
import UnderConstructionPage from '~/components/pages/UnderContructionPage'

const MyLeaves: NextPage = (): JSX.Element => {
  return (
    <Layout metaTitle="My Leaves">
      <UnderConstructionPage />
    </Layout>
  )
}

export default MyLeaves
