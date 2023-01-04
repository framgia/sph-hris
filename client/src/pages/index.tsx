import type { NextPage } from 'next'

import Layout from '~/components/templates/Layout'
import UnderConstructionPage from '~/components/pages/UnderContructionPage'

const Index: NextPage = (): JSX.Element => {
  return (
    <Layout metaTitle="Home">
      <UnderConstructionPage />
    </Layout>
  )
}

export default Index
