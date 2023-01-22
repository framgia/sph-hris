import React, { FC } from 'react'
import { Calendar, Clock, Download, X } from 'react-feather'
import classNames from 'classnames'

import Text from '~/components/atoms/Text'
import Alert from '~/components/atoms/Alert'
import Avatar from '~/components/atoms/Avatar'
import DrawerTemplate from '~/components/templates/DrawerTemplate'

type Props = {
  isOpenViewDetailsDrawer: boolean
  actions: {
    handleToggleViewDetailsDrawer: () => void
  }
}

const ViewDetailsDrawer: FC<Props> = (props): JSX.Element => {
  const {
    isOpenViewDetailsDrawer,
    actions: { handleToggleViewDetailsDrawer }
  } = props

  return (
    <DrawerTemplate
      {...{
        isOpen: isOpenViewDetailsDrawer,
        actions: {
          handleToggle: handleToggleViewDetailsDrawer
        }
      }}
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 px-6 py-3">
        <h1 className="text-base font-medium text-slate-900">View Details</h1>
        <button onClick={handleToggleViewDetailsDrawer} className="active:scale-95">
          <X className="h-6 w-6 stroke-0.5 text-slate-400" />
        </button>
      </header>
      {/* Body */}
      <div className="default-scrollbar flex h-full flex-col space-y-3 overflow-y-auto px-6 py-2">
        {/* User */}
        <div className="flex items-center space-x-3 border-b border-slate-200 py-3">
          <Avatar
            src="https://avatars.githubusercontent.com/u/38458781?v=4"
            alt="user-avatar"
            size="lg"
            rounded="full"
          />
          <div>
            <Text theme="md" size="sm" weight="bold">
              Joshua Galit
            </Text>
            <p className="text-[11px] leading-tight text-slate-500">Clocking from GMT +8</p>
            <p className="text-[11px] leading-tight text-slate-500">Last in a few seconds ago</p>
            <p className="text-[11px] leading-tight text-slate-500">Split time: 12:00 am</p>
          </div>
        </div>
        {/* Error Message */}
        <Alert type="error" />
        <div className="form-group space-y-2">
          {/* Time */}
          <div>
            <label htmlFor="remarks" className="space-y-0.5">
              <span className="text-xs text-slate-500">Time</span>
              <div
                id="remarks"
                className={classNames(
                  'm-0 block w-full items-center rounded placeholder:text-slate-400',
                  'border border-solid border-slate-300 bg-slate-100 bg-clip-padding',
                  'resize-none text-sm font-normal text-slate-700 transition'
                )}
              >
                <div className="flex items-center">
                  <div className="rounded-l border-r border-slate-300 bg-white p-1.5">
                    <Clock className="h-4 w-4 text-slate-500" />
                  </div>
                  <div className="border-l-4 border-slate-300"></div>
                  <p className="text-xs">INSERT DATA HERE</p>
                </div>
              </div>
            </label>
          </div>
          {/* Date */}
          <div>
            <label htmlFor="remarks" className="space-y-0.5">
              <span className="text-xs text-slate-500">Date</span>
              <div
                id="remarks"
                className={classNames(
                  'm-0 block w-full items-center rounded placeholder:text-slate-400',
                  'border border-solid border-slate-300 bg-slate-100 bg-clip-padding',
                  'resize-none text-sm font-normal text-slate-700 transition'
                )}
              >
                <div className="flex items-center">
                  <div className="rounded-l border-r border-slate-300 bg-white p-1.5">
                    <Calendar className="h-4 w-4 text-slate-500" />
                  </div>
                  <div className="border-l-4 border-slate-300"></div>
                  <p className="text-xs">INSERT DATA HERE</p>
                </div>
              </div>
            </label>
          </div>
          {/* Remarks */}
          <div>
            <label htmlFor="remarks" className="space-y-0.5">
              <span className="text-xs text-slate-500">Remarks</span>
              <div
                id="remarks"
                className={classNames(
                  'm-0 block min-h-[20vh] w-full rounded placeholder:text-slate-400',
                  'border border-solid border-slate-300 bg-white bg-clip-padding',
                  'resize-none px-3 py-1.5 text-sm font-normal text-slate-700 transition'
                )}
              >
                Insert Data Here
              </div>
            </label>
          </div>
          {/* Downloaded Files */}
          <div>
            <label htmlFor="remarks" className="space-y-0.5">
              <span className="text-xs text-slate-500">Proofs Provided</span>
              <div
                className={classNames(
                  'm-0 block h-[200px] w-full rounded placeholder:text-slate-400',
                  'border border-solid border-slate-300 bg-white bg-clip-padding',
                  'default-scrollbar '
                )}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i: number) => (
                  <div
                    key={i}
                    className="flex w-full justify-between rounded px-2 py-2 text-xs font-medium text-slate-700 transition duration-150 ease-in-out focus:outline-none focus:ring-0 hover:bg-slate-700 hover:bg-opacity-5"
                  >
                    <div className="flex">
                      <div className="mr-1">
                        <img src="https://files.slack.com/files-pri/T028JVBUY4F-F04J407U1H7/image.png"></img>
                      </div>
                      <div>IMG_20221209_211826.JPG</div>
                    </div>
                    <button className="rounded bg-white p-0.5 focus:outline-slate-400">
                      <Download className="h-4 w-4 text-slate-500" />
                    </button>
                  </div>
                ))}
              </div>
            </label>
          </div>
        </div>
      </div>
      {/* Footer Options */}
      <section className="mt-auto border-t border-slate-200">
        <div className="flex justify-end py-2 px-6">
          <button
            type="button"
            onClick={handleToggleViewDetailsDrawer}
            className={classNames(
              'flex items-center justify-center border-slate-200 text-xs active:scale-95',
              'w-24 border-dark-primary py-2 text-dark-primary outline-none'
            )}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleToggleViewDetailsDrawer}
            className={classNames(
              'flex items-center justify-center rounded-md border active:scale-95',
              'w-24 border-dark-primary bg-primary text-xs text-white outline-none hover:bg-dark-primary'
            )}
          >
            Save
          </button>
        </div>
      </section>
    </DrawerTemplate>
  )
}

export default ViewDetailsDrawer
