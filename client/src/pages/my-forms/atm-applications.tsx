import React from 'react'
import type { NextPage } from 'next'

import Card from '~/components/atoms/Card'
import MyFormsLayout from '~/components/templates/MyFormsLayout'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'

const ATMApplications: NextPage = (): JSX.Element => {
  return (
    <MyFormsLayout metaTitle="ATM Applications">
      <form className="default-scrollbar h-full overflow-y-auto">
        <MaxWidthContainer
          maxWidth="max-w-[710px]"
          className="flex flex-col space-y-4 px-4 pb-8 text-slate-700 md:space-y-6"
        >
          <Card
            rounded="lg"
            shadow-size="md"
            className="mt-4 border-t-[10px] border-t-sky-500 md:mt-6"
          >
            <section className="space-y-2 py-4 px-5 md:py-5 md:px-7">
              <h1 className="text-base font-medium md:text-lg">ATM Applications</h1>
            </section>
          </Card>
        </MaxWidthContainer>
      </form>
    </MyFormsLayout>
  )
}

export default ATMApplications
