import classNames from 'classnames'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, FC, ReactNode, useRef } from 'react'

import { RequestStatus } from '~/utils/constants/requestStatus'

type Props = {
  isOpen: boolean
  closeModal: () => void
  children: ReactNode
  className?: string
  status?: string | undefined
}

const ModalTemplate: FC<Props> = (props): JSX.Element => {
  const refDiv = useRef<HTMLDivElement>(null)
  const { isOpen, closeModal, children, className, status } = props

  const getStatusStyle = (status: string): string => {
    switch (status) {
      case RequestStatus.APPROVED:
        return 'shadow-green-200 ring-1 ring-green-300'
      case RequestStatus.DISAPPROVED:
        return 'shadow-rose-200 ring-1 ring-rose-300'
      case RequestStatus.PENDING:
        return 'shadow-amber-200 ring-1 ring-amber-300'
      case RequestStatus.CANCELLED:
        return 'shadow-red-200 ring-1 ring-red-300'
      default:
        return ''
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => closeModal()} initialFocus={refDiv}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900 bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="default-scrollbar fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={classNames(
                  className,
                  'transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all',
                  getStatusStyle(status as string)
                )}
                ref={refDiv}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

ModalTemplate.defaultProps = {
  isOpen: false,
  className: 'w-full max-w-3xl',
  status: ''
}

export default ModalTemplate
