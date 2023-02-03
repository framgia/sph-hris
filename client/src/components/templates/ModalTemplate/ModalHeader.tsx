import React, { FC } from 'react'
import { Plus, X } from 'react-feather'

import Button from '~/components/atoms/Buttons/Button'

type Props = {
  title?: string
  Icon?: any
  closeModal: () => void
}

const ModalHeader: FC<Props> = ({ title, Icon, closeModal }): JSX.Element => {
  return (
    <header className="flex w-full items-center justify-between border-b border-slate-200 px-5 py-4">
      <div className="flex items-center space-x-2 text-slate-700">
        <Icon className="h-5 w-5 text-slate-600" />
        <h1 className="text-base font-medium">{title}</h1>
      </div>
      <Button onClick={closeModal} className="text-slate-600 hover:text-slate-800">
        <X className="h-5 w-5" />
      </Button>
    </header>
  )
}

ModalHeader.defaultProps = {
  title: 'Title',
  Icon: Plus
}

export default ModalHeader
