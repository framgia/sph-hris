import React, { FC } from 'react'
import { Tab } from '@headlessui/react'

import ModalTemplate from '~/components/templates/ModalTemplate'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import EditTab from './EditTab'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const EditLeaveModal: FC<Props> = ({ isOpen, closeModal }): JSX.Element => {
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
          title: 'Edit Leave',
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

EditLeaveModal.defaultProps = {
  isOpen: false
}

export default EditLeaveModal
