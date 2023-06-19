import React, { FC } from 'react'
import { BsFileEarmarkText } from 'react-icons/bs'

import Button from '~/components/atoms/Buttons/ButtonAction'
import ModalTemplate from '~/components/templates/ModalTemplate'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'

type Props = {
  isOpen: boolean
  closeModal: () => void
  remarks: string | undefined
}

const ShowReasonModal: FC<Props> = ({ isOpen, closeModal, remarks }): JSX.Element => {
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
          title: 'View Reason',
          Icon: BsFileEarmarkText,
          closeModal
        }}
      />
      {/* Actual Remarks data */}
      <div className="py-7 px-5 text-sm text-slate-800">{remarks}</div>

      {/* Custom Modal Footer Style */}
      <ModalFooter>
        <Button onClick={closeModal} variant="secondary" className="px-5 py-1 text-sm">
          Close
        </Button>
      </ModalFooter>
    </ModalTemplate>
  )
}

ShowReasonModal.defaultProps = {
  remarks: ''
}

export default ShowReasonModal
