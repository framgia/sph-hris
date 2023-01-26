import React from 'react'
import { NextPage } from 'next'

import UnderConstructionPage from '~/components/pages/UnderContructionPage'
import LeaveManagementLayout from '~/components/templates/LeaveManagementLayout'

const ListOfLeave: NextPage = (): JSX.Element => {
  return (
    <LeaveManagementLayout metaTitle="List of leave">
      <UnderConstructionPage />
    </LeaveManagementLayout>
  )
}

export default ListOfLeave
