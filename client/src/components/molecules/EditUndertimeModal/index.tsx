import React, { FC } from 'react'
import { Tab } from '@headlessui/react'

import ModalTemplate from '~/components/templates/ModalTemplate'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import EditTab from './EditTab'

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
      <Tab.Group>
        {/* Tab header */}
        <Tab.Panels className="overflow-y-auto">
          {/* Edit Tab Form */}
          <EditTab
            {...{
              isOpen,
              closeModal
            }}
          />
        </Tab.Panels>
      </Tab.Group>
    </ModalTemplate>
  )
}

EditUndertimeModal.defaultProps = {
  isOpen: false
}

export default EditUndertimeModal
