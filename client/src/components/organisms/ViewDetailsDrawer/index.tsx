import moment from 'moment'
import React, { FC } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { parse } from 'iso8601-duration'
import { Calendar, Clock, Download, X } from 'react-feather'

import Text from '~/components/atoms/Text'
import Avatar from '~/components/atoms/Avatar'
import { getSpecificTimeEntry } from '~/hooks/useTimesheetQuery'
import DrawerTemplate from '~/components/templates/DrawerTemplate'

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
  const timeIn = parse(res.data?.timeById?.timeHour ?? 'PT0H')
  const date = res.data?.timeById?.createdAt

  const {
    isOpenViewDetailsDrawer,
    actions: { handleToggleViewDetailsDrawer }
  } = props

  const handleToggleDrawer = (): void => {
    void router.replace(router.pathname, undefined, { shallow: false })
  }

  const handleDownloadFile = (collectionName: string, fileName: string): void => {
    void fetch(`${process.env.NEXT_PUBLIC_MEDIA_URL as string}/${fileName}`)
      .then(async (resp) => await resp.blob())
      .then((blobobject) => {
        const blob = window.URL.createObjectURL(blobobject)
        const anchor = document.createElement('a')
        anchor.style.display = 'none'
        anchor.href = blob
        anchor.download = fileName
        document.body.appendChild(anchor)
        anchor.click()
        window.URL.revokeObjectURL(blob)
      })
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
        {/* <Alert type="error" /> */}
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
                  <p className="text-xs">
                    {Number(timeIn.hours) > 12 ? Number(timeIn.hours) - 12 : Number(timeIn.hours)}:
                    {timeIn.minutes} {Number(timeIn?.hours) >= 12 ? 'PM' : 'AM'}
                  </p>
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
                  <p className="text-xs">{moment(date).format('YYYY/MM/DD')}</p>
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
                <p>{res.data?.timeById?.remarks}</p>
              </div>
            </label>
          </div>
          {/* Downloaded Files */}
          {!(router.query.time_out !== undefined) && (
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
                  {res.data?.timeById?.media?.map((i, index: number) => (
                    <div
                      key={index}
                      className="group flex w-full justify-between rounded px-2 py-2 text-xs font-medium text-slate-700 transition duration-150 ease-in-out focus:outline-none focus:ring-0 hover:bg-slate-700 hover:bg-opacity-5"
                    >
                      <div className="mr-1">
                        <img
                          src={
                            i.mimeType.includes('.document')
                              ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Microsoft_Word_2013-2019_logo.svg/2170px-Microsoft_Word_2013-2019_logo.svg.png'
                              : i.mimeType?.includes('pdf')
                              ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png'
                              : i.mimeType?.includes('image')
                              ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'
                              : 'https://w7.pngwing.com/pngs/770/995/png-transparent-computer-icons-text-file-tiff-plain-text-tiff-text-logo-sign.png'
                          }
                          width={'17px'}
                        ></img>
                      </div>
                      <a
                        className="flex w-full truncate"
                        href={`${process.env.NEXT_PUBLIC_MEDIA_URL as string}/${i.fileName}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <div className="flex">
                          <div>{i.fileName}</div>
                        </div>
                      </a>
                      <button
                        className="rounded bg-white p-0.5 opacity-0 focus:outline-slate-400 group-hover:opacity-100"
                        onClick={() => handleDownloadFile(i.collectionName, i.fileName)}
                      >
                        <Download className="h-4 w-4 text-slate-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </label>
            </div>
          )}
        </div>
      </div>
    </DrawerTemplate>
  )
}

export default ViewDetailsDrawer
