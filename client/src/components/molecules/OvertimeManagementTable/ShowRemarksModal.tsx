import React, { FC } from 'react'
import { Eye } from 'react-feather'

import Button from '~/components/atoms/Buttons/ButtonAction'
import ModalTemplate from '~/components/templates/ModalTemplate'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import { IOvertimeManagement, IOvertimeManagementManager } from '~/utils/interfaces'

type Props = {
  isOpen: boolean
  closeModal: () => void
  row: IOvertimeManagement | IOvertimeManagementManager
}

const ShowRemarksModal: FC<Props> = ({ isOpen, closeModal, row }): JSX.Element => {
  return (
    <ModalTemplate
      {...{
        isOpen,
        closeModal
      }}
      className="w-full max-w-lg"
    >
      {/* Custom Modal Header */}
      <ModalHeader
        {...{
          title: "View Requester's Remarks",
          Icon: Eye,
          closeModal
        }}
      />
      {/* Actual Remarks data */}
      <div className="py-7 px-5 text-sm leading-relaxed tracking-wide text-slate-800 underline decoration-orange-400 selection:bg-fuchsia-400">
        {row.remarks}
      </div>

      {/* Custom Modal Footer Style */}
      <ModalFooter>
        <Button onClick={closeModal} variant="secondary" className="px-5 py-1 text-sm">
          Close
        </Button>
      </ModalFooter>
    </ModalTemplate>
  )
}

export default ShowRemarksModal
