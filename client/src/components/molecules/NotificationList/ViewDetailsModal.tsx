import moment from 'moment'
import React, { FC } from 'react'
import { Check, X } from 'react-feather'
import { useRouter } from 'next/router'

import { INotification } from '~/utils/interfaces'
import Button from '~/components/atoms/Buttons/ButtonAction'
import ModalTemplate from '~/components/templates/ModalTemplate'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'

type Props = {
  isOpen: boolean
  row: INotification
}

const ViewDetailsModal: FC<Props> = ({ isOpen, row }): JSX.Element => {
  const router = useRouter()

  const handleClose = (): void => {
    void router.replace({
      pathname: '/notifications'
    })
  }

  return (
    <ModalTemplate
      {...{
        isOpen,
        closeModal: handleClose
      }}
      className="w-full max-w-lg"
    >
      <ModalHeader
        {...{
          title: `${row.name}'s ${row.type} request`,
          closeModal: handleClose,
          hasAvatar: true,
          avatar: row.userAvatarLink
        }}
      />
      <main className="px-8 py-4 text-sm  text-slate-700">
        <ul className="flex flex-col space-y-3 divide-y divide-slate-200">
          <li className="inline-flex items-center space-x-3">
            <span className="text-slate-600">Project: </span>
            <span className="flex items-center font-medium">{row.project}</span>
          </li>
          <li className="inline-flex items-center space-x-3 pt-2">
            <span className="text-slate-600">Date: </span>
            <span className="flex items-center font-medium">{row.date}</span>
          </li>
          <li className="inline-flex items-center space-x-3 pt-2">
            <span className="text-slate-600">Duration: </span>
            <span className="flex items-center font-medium">{row.duration}</span>
          </li>
          <li className="inline-flex items-center space-x-3 pt-2">
            <span className="text-slate-600">Date Filed: </span>
            <span className="flex items-center font-medium">
              {moment(new Date(row.date)).format('MMM DD, YY')} &bull; {``}
              {moment(new Date(row.dateFiled)).fromNow()}
            </span>
          </li>
          <li className="inline-flex items-center space-x-3 pt-2">
            <span className="text-slate-600">Status: </span>
            <span className="flex items-center font-medium">{row.status}</span>
          </li>
          <li className="inline-flex flex-col space-y-2 pt-2">
            <span className="text-slate-600">Remarks: </span>
            <span className="font-medium">{row.remarks}</span>
          </li>
        </ul>
      </main>
      <ModalFooter>
        <Button
          variant="success"
          className="flex items-center space-x-1 py-0.5 px-4 text-slate-500"
        >
          <Check className="h-4 w-4" />
          <span>Approve</span>
        </Button>
        <Button
          variant="danger-outline"
          className="flex items-center space-x-1 py-0.5 px-2 text-slate-500"
        >
          <X className="h-4 w-4" />
          <span>Disapprove</span>
        </Button>
      </ModalFooter>
    </ModalTemplate>
  )
}

ViewDetailsModal.defaultProps = {}

export default ViewDetailsModal
