import React, { FC } from 'react'

import Form from './Form'
import ModalTemplate from '~/components/templates/ModalTemplate'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const EditUndertimeModal: FC<Props> = ({ isOpen, closeModal }): JSX.Element => {
  return (
    <ModalTemplate
      {...{
        isOpen,
        closeModal
      }}
      className="w-full max-w-[800px]"
    >
      {/* Custom Modal Header */}
      <ModalHeader
        {...{
          title: 'Edit Undertime',
          closeModal
        }}
      />
      <Form
        {...{
          isOpen,
          closeModal
        }}
      />
    </ModalTemplate>
  )
}

EditUndertimeModal.defaultProps = {
  isOpen: false
}

export default EditUndertimeModal
