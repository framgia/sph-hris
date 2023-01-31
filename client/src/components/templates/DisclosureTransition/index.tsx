import React, { FC, ReactNode } from 'react'
import { Transition } from '@headlessui/react'

type Props = {
  children: ReactNode
}

const DisclosureTransition: FC<Props> = (props): JSX.Element => {
  return (
    <Transition
      enter="transition duration-500 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-500 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      {props.children}
    </Transition>
  )
}

export default DisclosureTransition
