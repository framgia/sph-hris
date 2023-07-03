import moment from 'moment'
import React, { FC } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { Calendar, Clock, X } from 'react-feather'

import UploadedFiles from './UploadFiles'
import Text from '~/components/atoms/Text'
import Avatar from '~/components/atoms/Avatar'
import { IMedia } from '~/utils/types/timeEntryTypes'
import handleImageError from '~/utils/handleImageError'
import DrawerTemplate from '~/components/templates/DrawerTemplate'
import {
  getUserProfileLink,
  getSpecificTimeEntry,
  getSpecificTimeEntryById
} from '~/hooks/useTimesheetQuery'

type Props = {
  isOpenViewDetailsDrawer: boolean
  actions: {
    handleToggleViewDetailsDrawer: () => void
  }
}

const ViewDetailsDrawer: FC<Props> = (props): JSX.Element => {
  const router = useRouter()
  const timeIdExists = router.query.time_in ?? router.query.time_out
  const res = getSpecificTimeEntry(Number(timeIdExists))
  const timeHour = res?.data?.timeById?.timeHour ?? ''

  const date = res.data?.timeById?.createdAt
  const { data } = getSpecificTimeEntryById(Number(timeIdExists))
  const { data: profileLink } = getUserProfileLink(Number(data?.specificTimeEntryById?.user?.id))

  const {
    isOpenViewDetailsDrawer,
    actions: { handleToggleViewDetailsDrawer }
  } = props

  const handleToggleDrawer = (): void => {
    void router.replace(router.pathname, undefined, { shallow: false })
  }

  const renderTextWithLinks = (text: string): React.ReactNode[] => {
    const words = text.split(' ')

    return words.map((word, index) => {
      let linkComponent = null

      switch (true) {
        case isValidUrl(word):
          linkComponent = (
            <a
              key={index}
              href={word}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              {word}
            </a>
          )
          break
        case isValidEmail(word):
          linkComponent = (
            <a
              key={index}
              href={`mailto:${word}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              {word}
            </a>
          )
          break
        default:
          linkComponent = <span key={index}>{word} </span>
          break
      }

      return linkComponent
    })
  }

  const isValidUrl = (url: string): boolean => {
    const urlRegex =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    return urlRegex.test(url)
  }

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const getFormattedTimeHour = (timeHour: string): string => {
    const duration = moment.duration(timeHour)
    const formattedTime = moment.utc(duration.asMilliseconds()).format('h:mm A')

    return formattedTime
  }

  return (
    <DrawerTemplate
      {...{
        isOpen: timeIdExists !== undefined ? !isOpenViewDetailsDrawer : isOpenViewDetailsDrawer,
        actions: {
          handleToggle: handleToggleViewDetailsDrawer
        }
      }}
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 px-6 py-3">
        <h1 className="text-base font-medium text-slate-900">View Details</h1>
        <button onClick={() => handleToggleDrawer()} className="active:scale-95">
          <X className="h-6 w-6 stroke-0.5 text-slate-400" />
        </button>
      </header>
      {/* Body */}
      <div className="default-scrollbar flex h-full flex-col space-y-3 overflow-y-auto px-6">
        {/* User */}
        <div className="flex items-center space-x-3 border-b border-slate-200 py-3">
          <Avatar
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              handleImageError(e, '/images/default.png')
            }
            src={profileLink?.specificUserProfileDetail?.avatarLink as string}
            alt="user-avatar"
            size="lg"
            rounded="full"
          />
          <div>
            <Text
              theme="md"
              size="sm"
              weight="semibold"
              className="font-inter !text-slate-600 line-clamp-1"
            >
              {profileLink?.specificUserProfileDetail?.name as string}
            </Text>
            <p className="text-[11px] leading-tight text-slate-500">
              {profileLink?.specificUserProfileDetail?.role?.name}
            </p>
            <p className="text-[11px] leading-tight text-slate-500">
              Schedule: {profileLink?.specificUserProfileDetail?.employeeSchedule?.name}
            </p>
          </div>
        </div>
        <div className="form-group space-y-2">
          {/* Time */}
          <div>
            <label htmlFor="remarks" className="space-y-0.5">
              <span className="text-xs text-slate-500">Time</span>
              <div
                id="remarks"
                className={classNames(
                  'm-0 block w-full items-center rounded placeholder:text-slate-400',
                  'border border-solid border-slate-300 bg-clip-padding',
                  'resize-none text-sm font-normal text-amber-700 transition'
                )}
              >
                <div className="flex items-center">
                  <div className="rounded-l border-r border-slate-300 bg-white p-1.5">
                    <Clock className="h-4 w-4 text-slate-500" />
                  </div>
                  <div className="border-l-4 border-slate-300"></div>
                  <p className="text-xs">{getFormattedTimeHour(timeHour)}</p>
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
                  'border border-solid border-slate-300 bg-clip-padding',
                  'resize-none text-sm font-normal text-amber-700 transition'
                )}
              >
                <div className="flex items-center">
                  <div className="rounded-l border-r border-slate-300 bg-white p-1.5">
                    <Calendar className="h-4 w-4 text-slate-500" />
                  </div>
                  <div className="border-l-4 border-slate-300"></div>
                  <p className="text-xs">{moment(date).format('MM/DD/YYYY')}</p>
                </div>
              </div>
            </label>
          </div>

          {/* Remarks */}
          <div>
            <label htmlFor="remarks" className="space-y-0.5">
              <span className="text-xs text-slate-500">Remarks</span>
              <div className="default-scrollbar min-h-[20vh] rounded border border-slate-300 bg-white text-[13px]">
                <h3 className="break-words px-3 py-1.5 font-normal text-amber-700">
                  {renderTextWithLinks(res.data?.timeById?.remarks ?? '')}
                </h3>
              </div>
            </label>
          </div>
          {/* Downloaded Files */}
          {!(router.query.time_out !== undefined) && (
            <>
              {res.data?.timeById?.media.length !== 0 ? (
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
                      {res.data?.timeById?.media?.map((file: IMedia, index: number) => {
                        return <UploadedFiles file={file} index={index} key={index} />
                      })}
                    </div>
                  </label>
                </div>
              ) : (
                <div className="pt-4 text-xs italic text-slate-500">No Proofs Provided</div>
              )}
            </>
          )}
        </div>
      </div>
    </DrawerTemplate>
  )
}

export default ViewDetailsDrawer
