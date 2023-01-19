import React from 'react'
import { NextPage } from 'next'

import Layout from '~/components/templates/Layout'
import { getSpecificTimeEntry } from '~/hooks/useTimesheetQuery'
import UnderConstructionPage from '~/components/pages/UnderContructionPage'

const MyOverTime: NextPage = (): JSX.Element => {
  const { data } = getSpecificTimeEntry(1);

  return (
    <Layout metaTitle="My Overtime">
      <pre>{JSON.stringify(data?.timeById, null, 2)}</pre>
      {/* <UnderConstructionPage /> */}
    </Layout>
  )
}

export default MyOverTime
