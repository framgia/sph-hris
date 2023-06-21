import React, { FC, useState } from 'react'

import Text from '~/components/atoms/Text'
import GearIcon from '~/utils/icons/GearIcon'
import { IOvertimeManagement } from '~/utils/interfaces'
import Button from '~/components/atoms/Buttons/ButtonAction'
import FilterDropdownTemplate from '~/components/templates/FilterDropdownTemplate'
import SummaryConfirmationModal from '../OvertimeManagementTable/SummaryConfirmationModal'

type Props = {
  data: IOvertimeManagement[]
}

const OptionDropdown: FC<Props> = ({ data }): JSX.Element => {
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState<boolean>(false)
  const handleConfirmationToggle = (): void => setIsOpenConfirmationModal(!isOpenConfirmationModal)

  const [isApprove, setIsApprove] = useState<boolean>(false)

  return (
    <div>
      {/* This will show the Approve Confirmation Modal */}
      <SummaryConfirmationModal
        {...{
          isOpen: isOpenConfirmationModal,
          closeModal: () => handleConfirmationToggle(),
          summary: data,
          state: isApprove
        }}
      />
      <FilterDropdownTemplate
        btnText="Options"
        className="w-52 translate-y-2"
        cardClassName="overflow-visible w-52"
        Icon={GearIcon}
      >
        <main className="flex w-52 flex-col space-y-3  px-5 py-4">
          <Text theme="sm" weight="semibold" className="text-slate-500">
            Options
          </Text>
          <Button
            type="button"
            variant="primary"
            rounded="md"
            className="relative mt-1 flex items-center justify-center space-x-2 px-5 py-0.5 text-sm"
            onClick={() => {
              handleConfirmationToggle()
              setIsApprove(true)
            }}
          >
            Approve all
          </Button>
          <Button
            type="submit"
            variant="danger"
            rounded="md"
            className="relative mt-1 flex items-center justify-center space-x-2 px-5 py-0.5 text-sm"
            onClick={() => {
              handleConfirmationToggle()
              setIsApprove(false)
            }}
          >
            Disapprove all
          </Button>
        </main>
      </FilterDropdownTemplate>
    </div>
  )
}

OptionDropdown.defaultProps = {}

export default OptionDropdown
