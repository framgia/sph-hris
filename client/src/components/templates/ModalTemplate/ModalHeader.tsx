import React, { FC } from 'react'
import classNames from 'classnames'
import { Plus, X } from 'react-feather'

import Avatar from '~/components/atoms/Avatar'
import Button from '~/components/atoms/Buttons/Button'
import handleImageError from '~/utils/handleImageError'

type Props = {
  title?: string
  Icon?: any
  closeModal: () => void
  hasAvatar?: boolean
  avatar?: string
  className?: string | undefined
  hasBorder?: boolean
}

const ModalHeader: FC<Props> = (props): JSX.Element => {
  const { title, Icon, closeModal, hasAvatar, avatar, className, hasBorder } = props

  return (
    <header
      className={classNames(
        'flex w-full items-center justify-between border-b px-5 py-4 ',
        hasBorder === true ? 'border-slate-200' : 'border-transparent',
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2 text-slate-700">
        {hasAvatar === true ? (
          <Avatar
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              handleImageError(e, '/images/default.png')
            }
            src={avatar}
            size="md"
            rounded="full"
            className="flex-shrink-0"
          />
        ) : (
          <Icon className="h-5 w-5 text-slate-600" />
        )}
        <h1 className="text-base font-medium">{title}</h1>
      </div>
      <Button type="button" onClick={closeModal} className="text-slate-600 hover:text-slate-800">
        <X className="h-5 w-5" />
      </Button>
    </header>
  )
}

ModalHeader.defaultProps = {
  title: 'Title',
  Icon: Plus,
  hasAvatar: false,
  avatar: '',
  className: '',
  hasBorder: true
}

export default ModalHeader
