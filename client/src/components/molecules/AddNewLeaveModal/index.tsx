import React, { FC } from 'react'
import classNames from 'classnames'
import { Tab } from '@headlessui/react'

import LeaveTab from './LeaveTab'
import UndertimeTab from './UndertimeTab'
import ModalTemplate from '~/components/templates/ModalTemplate'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const AddNewLeaveModal: FC<Props> = ({ isOpen, closeModal }): JSX.Element => {
  const tabLinks = ['Leave', 'Undertime']

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
          title: 'Add New Leave',
          closeModal
        }}
      />
      <Tab.Group>
        {/* Tab header */}
        <Tab.List className="flex items-center space-x-6 border-b border-slate-200 px-6">
          {tabLinks.map((item, index) => (
            <Tab key={index} className="focus:outline-none">
              {({ selected }) => <TabButton {...{ item, selected }} />}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="overflow-y-auto">
          {/* Leave Tab Form */}
          <LeaveTab
            {...{
              isOpen,
              closeModal
            }}
          />
          {/* Undertime Tab Form */}
          <UndertimeTab
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

const TabButton = ({ item, selected }: { item: string; selected: boolean }): JSX.Element => {
  return (
    <div
      className={classNames(
        'cursor-pointer border-b-[3px] py-1 transition duration-150 ease-in-out',
        selected
          ? 'border-amber-500 text-amber-500'
          : 'border-transparent text-slate-600 hover:border-slate-300'
      )}
    >
      <span className="text-sm">{item}</span>
    </div>
  )
}

AddNewLeaveModal.defaultProps = {
  isOpen: false
}

export default AddNewLeaveModal
