import React, { FC } from 'react'
import classNames from 'classnames'
import { Menu } from '@headlessui/react'
import { FileText, MoreHorizontal } from 'react-feather'

import FilterDropdownTemplate from '~/components/templates/FilterDropdownTemplate'

type Props = {
  isOpenSummaryTable: boolean
  actions: {
    handleToggleSummaryTable: () => void
  }
}

const SummaryMenuDropdown: FC<Props> = (props): JSX.Element => {
  const {
    isOpenSummaryTable,
    actions: { handleToggleSummaryTable }
  } = props

  const menuItems = classNames(
    'w-52 rounded-md  ring-opacity-5 focus:outline-none top-8 right-0',
    'bg-white py-1 shadow-xl shadow-slate-200 ring-1 ring-black'
  )

  return (
    <FilterDropdownTemplate
      btnText="Filters"
      hideText={true}
      Icon={MoreHorizontal}
      menuItemsStyle={menuItems}
    >
      <Menu.Item>
        <button
          type="button"
          className={classNames(
            'relative flex items-center justify-center space-x-2',
            'w-full px-3 py-2 text-xs hover:text-slate-700'
          )}
          onClick={handleToggleSummaryTable}
        >
          <FileText className="absolute left-3 h-4 w-4 stroke-0.5" aria-hidden="true" />
          {isOpenSummaryTable ? <span>DTR Management</span> : <span>Summary</span>}
        </button>
      </Menu.Item>
    </FilterDropdownTemplate>
  )
}

export default SummaryMenuDropdown
