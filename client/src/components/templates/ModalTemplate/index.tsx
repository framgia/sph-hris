import classNames from 'classnames'
import React, { Fragment, FC, ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'

type Props = {
  isOpen: boolean
  closeModal: () => void
  children: ReactNode
  className?: string
}

const ModalTemplate: FC<Props> = (props): JSX.Element => {
  const { isOpen, closeModal, children, className } = props

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => closeModal()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900 bg-opacity-25" />
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
                  'transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all'
                )}
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
  className: 'w-full max-w-3xl'
}

export default ModalTemplate
