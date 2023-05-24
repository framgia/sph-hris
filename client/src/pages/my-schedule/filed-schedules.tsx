import { NextPage } from 'next'
import React, { useState } from 'react'

import Card from '~/components/atoms/Card'
import FadeInOut from '~/components/templates/FadeInOut'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'
import MyScheduleLayout from '~/components/templates/MySchedulelayout'
import GlobalSearchFilter from '~/components/molecules/GlobalSearchFilter'
import UnderConstructionPage from '~/components/pages/UnderContructionPage'
import { columns } from '~/components/molecules/MyFiledScheduleTable/columns'
import MyFiledScheduleTable from '~/components/molecules/MyFiledScheduleTable'
import { dummyMyFiledScheduleData } from '~/utils/constants/dummyMyFiledScheduleData'

const FiledSchedules: NextPage = (): JSX.Element => {
  const [globalFilter, setGlobalFilter] = useState<string>('')

  if (process.env.NEXT_PUBLIC_DISPLAY_MY_SCHEDULE_PAGE === 'false') {
    return <UnderConstructionPage />
  }

  return (
    <MyScheduleLayout metaTitle="Filed Schedules">
      <FadeInOut className="default-scrollbar h-full overflow-auto">
        <MaxWidthContainer maxWidth="w-full max-w-[868px]" className="relative my-8 px-4 text-xs">
          <Card className="overflow-hidden">
            <header className="py-2 px-4">
              <GlobalSearchFilter
                {...{
                  value: globalFilter ?? '',
                  onChange: (value) => setGlobalFilter(String(value)),
                  placeholder: 'Search'
                }}
              />
            </header>
            <MyFiledScheduleTable
              {...{
                query: {
                  data: dummyMyFiledScheduleData,
                  error: null
                },
                table: {
                  columns,
                  globalFilter,
                  setGlobalFilter
                }
              }}
            />
          </Card>
        </MaxWidthContainer>
      </FadeInOut>
    </MyScheduleLayout>
  )
}

export default FiledSchedules
