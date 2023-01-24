import React, { FC } from 'react'
import { Eye } from 'react-feather'
import classNames from 'classnames'

import Button from '~/components/atoms/Buttons/Button'
import ModalTemplate from '~/components/templates/ModalTemplate'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'

type Props = {
  isOpen: boolean
  closeModal: () => void
  remarks: string | undefined
}

const ShowRemarksModal: FC<Props> = ({ isOpen, closeModal, remarks }): JSX.Element => {
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
          title: 'View Remarks',
          Icon: Eye,
          closeModal
        }}
      />
      {/* Actual Remarks data */}
      <div className="py-7 px-5 text-sm text-slate-800 underline decoration-orange-400 selection:bg-fuchsia-400">
        {remarks}
      </div>

      {/* Custom Modal Footer Style */}
      <ModalFooter>
        <Button
          onClick={closeModal}
          className={classNames(
            'border border-slate-300 px-5 py-1 text-sm hover:border-slate-500 hover:bg-white',
            'text-slate-600 transition duration-150 ease-in-out hover:text-slate-800'
          )}
        >
          Close
        </Button>
      </ModalFooter>
    </ModalTemplate>
  )
}

ShowRemarksModal.defaultProps = {
  remarks: ''
}

export default ShowRemarksModal
