import React, { FC } from 'react'
import toast from 'react-hot-toast'
import classNames from 'classnames'
import { Download } from 'react-feather'
import { DefaultExtensionType, FileIcon, defaultStyles } from 'react-file-icon'

import { IMedia } from '~/utils/types/timeEntryTypes'

type Props = {
  file: IMedia
  index: number
}

const UploadedFiles: FC<Props> = ({ file, index }): JSX.Element => {
  const fileExtension = file.fileName.split('.').pop()
  const styles = defaultStyles[fileExtension as DefaultExtensionType]

  const LinkChecker = (link: string): void => {
    void fetch(link).then(async (resp) => {
      if (resp.ok) {
        return window.open(link)
      } else {
        toast.error('Sorry, cannot open file')
      }
    })
  }

  const handleDownloadFile = (link: string, fileName: string): void => {
    void fetch(link)
      .then(async (resp) => {
        if (!resp.ok) {
          throw Error(resp.statusText)
        }
        return await resp.blob()
      })
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
      .catch(() => toast.error('File does not exist'))
  }

  return (
    <div
      key={index}
      className={classNames(
        'group flex w-full justify-between rounded px-2 py-2 text-xs font-medium',
        'text-slate-700 transition duration-150 ease-in-out focus:outline-none',
        'focus:ring-0 hover:bg-slate-700 hover:bg-opacity-5'
      )}
    >
      <div className="mr-1">
        <div className="h-4 w-4">
          <FileIcon extension={fileExtension} {...styles} />
        </div>
      </div>
      <div className="flex w-full truncate" onClick={() => LinkChecker(file.link)}>
        <div>{file.fileName}</div>
      </div>
      <button
        className="rounded bg-white p-0.5 opacity-0 focus:outline-slate-400 group-hover:opacity-100"
        onClick={() => handleDownloadFile(file.link, file.fileName)}
      >
        <Download className="h-4 w-4 text-slate-500" />
      </button>
    </div>
  )
}
export default UploadedFiles
