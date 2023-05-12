import classNames from 'classnames'
import type { NextPage } from 'next'
import React, { useState } from 'react'
import { Check, Eye, Info, Search, Wifi, X } from 'react-feather'

import Card from '~/components/atoms/Card'
import Layout from '~/components/templates/Layout'
import Button from '~/components/atoms/Buttons/Button'
import useScreenCondition from '~/hooks/useScreenCondition'
import CustomCard from '~/components/atoms/Card/CustomCard'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'
import { dummyAllUserData } from '~/utils/constants/dummyAllUsersData'
import UnderConstructionPage from '~/components/pages/UnderContructionPage'

const Index: NextPage = (): JSX.Element => {
  const [searchedVal, setSearchedVal] = useState<string>('')

  // SCREEN SIZE CONDITION HOOKS
  const isTabletScreen = useScreenCondition('(max-width: 1100px)')

  const avatarUrl = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'

  if (process.env.NODE_ENV === 'production') {
    return <UnderConstructionPage />
  }

  return (
    <Layout metaTitle="Dashboard">
      <div className="default-scrollbar flex h-full flex-col overflow-y-auto">
        {/* Important Announcement */}
        <AnnouncementAlert />

        <MaxWidthContainer
          className={classNames(
            'mt-6 flex h-full w-full max-w-7xl items-start',
            'gap-x-4 px-4 pb-24 text-sm text-slate-600 md:gap-x-6'
          )}
        >
          {/* Cards Information */}
          <section className="grid w-full gap-4 md:gap-6">
            {isTabletScreen && (
              <Card className="col-span-1 transition duration-100 ease-in-out active:scale-95">
                <header className="cursor-pointer rounded-md px-5 py-3 hover:shadow-lg hover:shadow-slate-200">
                  <section className="flex items-center justify-between">
                    <div className="inline-flex items-center space-x-2 ">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      <h1 className="text-xl font-semibold">Present</h1>
                      <div className="shrink-0 rounded border border-slate-300 px-0.5 text-[11px]">
                        80
                      </div>
                    </div>
                    <Eye className="h-4 w-4 text-slate-500" />
                  </section>
                </header>
              </Card>
            )}

            {/* First 2 Grid */}
            <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              {/* My Information Card */}
              <CustomCard>
                <p className="text-xs text-slate-500">My Information</p>
                <div className="inline-flex items-start space-x-4 lg:items-center">
                  <div className="shrink-0">
                    <img src={avatarUrl} className="h-16 w-16 rounded-full" />
                  </div>
                  <div className="inline-flex flex-col">
                    <h3 className="flex-wrap font-inter text-lg font-bold text-slate-700 lg:text-xl">
                      Joshua A. Galit
                    </h3>
                    <span className="text-slate-500 line-clamp-1">Jr. Web developer</span>
                  </div>
                </div>
              </CustomCard>
              {/* Total Work Hours Card */}
              <CustomCard>
                <p className="text-xs text-slate-500">Total Working Hours</p>
                <div className="pt-2 text-center text-slate-700">
                  <h1 className="font-inter text-2xl font-bold line-clamp-1 lg:text-3xl">
                    1.28k hrs
                  </h1>
                </div>
              </CustomCard>
            </div>

            {/* Grid 3 */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
              {/* Remaining Paid Leaves */}
              <CustomCard>
                <p className="text-xs text-slate-500">Remaining Paid Leaves</p>
                <div className="pt-2 text-center text-slate-700">
                  <h1 className="font-inter text-2xl font-bold line-clamp-1 lg:text-3xl">10.54</h1>
                </div>
              </CustomCard>
              {/* Total Year Overtime */}
              <CustomCard>
                <p className="text-xs text-slate-500">Total 2023 Overtime (mins)</p>
                <div className="pt-2 text-center text-slate-700">
                  <h1 className="font-inter text-2xl font-bold line-clamp-1 lg:text-3xl">45.65k</h1>
                </div>
              </CustomCard>
              {/* Employee Position */}
              <CustomCard>
                <p className="text-xs text-slate-500">Position</p>
                <div className="pt-2 text-center text-slate-700">
                  <h1 className="font-inter text-2xl font-bold line-clamp-1 lg:text-3xl">ESL</h1>
                </div>
              </CustomCard>
            </div>

            <Card className="h-full text-slate-500">
              <header className="flex items-center space-x-3 border-b border-slate-200 py-2 px-5">
                <Wifi className="h-4 w-4" />
                <h2>Latest Activity</h2>
              </header>
              <main className="text-xs">
                <nav>
                  <li className="flex list-none items-center justify-between px-5 hover:bg-slate-100">
                    <div className="inline-flex items-center space-x-3 py-1.5">
                      <div className="shrink-0">
                        <img src={avatarUrl} className="h-7 w-7 rounded-full" alt="avatar" />
                      </div>
                      <p className="flex-wrap font-medium">
                        You <span className="font-normal">logged in at</span> 9:00 PM - May 07, 2023
                      </p>
                    </div>
                    <span className="shrink-0 text-slate-500">12 minutes ago</span>
                  </li>
                </nav>
              </main>
            </Card>
          </section>
          {/* List Of All Present within the day */}
          {!isTabletScreen && (
            <section className="h-full w-[25%] shrink-0">
              <Card className="default-scrollbar h-full overflow-y-auto">
                {/* Header */}
                <header className="sticky top-0 z-10 bg-white px-5 pt-4">
                  <section className="flex items-center justify-between">
                    <div className="inline-flex items-center space-x-2 ">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      <h1 className="text-xl font-semibold">Present</h1>
                      <div className="shrink-0 rounded border border-slate-300 px-0.5 text-[11px]">
                        80
                      </div>
                    </div>
                    <label htmlFor="search">
                      <Search className="h-4 w-4 text-slate-500 hover:text-slate-600" />
                    </label>
                  </section>
                  <section className="mt-2">
                    <input
                      type="text"
                      id="search"
                      onChange={(e) => setSearchedVal(e.target.value)}
                      className={classNames(
                        'w-full border-0 border-b border-slate-200 px-2 text-sm placeholder:font-light',
                        'placeholder:text-slate-400 focus:border-amber-500 focus:ring-0'
                      )}
                      placeholder="Search"
                    />
                  </section>
                </header>

                <main className="mt-4">
                  <ul className="divide-y divide-slate-200 text-xs">
                    {dummyAllUserData
                      ?.filter(
                        (row) =>
                          searchedVal?.length === 0 ||
                          row?.name
                            .toString()
                            .toLowerCase()
                            .includes(searchedVal.toString().toLowerCase()) ||
                          row?.position.name
                            .toString()
                            .toLowerCase()
                            .includes(searchedVal.toString().toLowerCase())
                      )
                      ?.map((user) => (
                        <li
                          key={user.id}
                          className="group relative flex items-center justify-between px-5 py-1.5 transition duration-75 ease-in-out hover:bg-slate-100"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="shrink-0">
                              <img
                                src="/images/default.png"
                                className="h-9 w-9 rounded-full object-cover"
                              />
                            </div>
                            <div className="inline-flex flex-col space-y-0.5">
                              <h1 className="font-medium line-clamp-1" title={user.name}>
                                {user.name}
                              </h1>
                              <p className="text-xs font-light text-slate-400">
                                {user.position.name}
                              </p>
                            </div>
                          </div>
                          <Check className="h-4 w-4 rounded-full bg-slate-300 p-0.5 text-white group-hover:bg-primary" />
                        </li>
                      ))}
                  </ul>
                </main>
              </Card>
            </section>
          )}
        </MaxWidthContainer>
      </div>
    </Layout>
  )
}

const AnnouncementAlert = (): JSX.Element => {
  return (
    <div className="flex items-center justify-between bg-sky-100 px-4 py-3 text-xs text-sky-700">
      <div className="md:items-cebter inline-flex items-start space-x-2">
        <Info className="h-4 w-4 shrink-0" />
        <p>
          🎉 Congratulations to Sir Jeremiah Cabellero For Rendering 1.8 Million hours in Sun
          Asterisk Philippines! 🥳
        </p>
      </div>
      <Button>
        <X className="h-4 w-4 " />
      </Button>
    </div>
  )
}

export default Index
