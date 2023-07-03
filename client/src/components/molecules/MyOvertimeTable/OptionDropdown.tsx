import React, { FC, useState } from 'react'

import Text from '~/components/atoms/Text'
import Card from '~/components/atoms/Card'
import GearIcon from '~/utils/icons/GearIcon'
import { IOvertimeManagement } from '~/utils/interfaces'
import Button from '~/components/atoms/Buttons/ButtonAction'
import FilterDropdownTemplate from '~/components/templates/FilterDropdownTemplate'
import SummaryConfirmationModal from './../OvertimeManagementTable/SummaryConfirmationModal'
import { ThumbsDown, ThumbsUp } from 'react-feather'

type Props = {
  data: IOvertimeManagement[] | undefined
}

const OptionDropdown: FC<Props> = ({ data }): JSX.Element => {
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState<boolean>(false)
  const handleConfirmationToggle = (): void => setIsOpenConfirmationModal(!isOpenConfirmationModal)

  const [isApprove, setIsApprove] = useState<boolean>(false)

  return (
    <>
      {/* This will show the Approve Confirmation Modal */}
      <SummaryConfirmationModal
        {...{
          isOpen: isOpenConfirmationModal,
          closeModal: () => handleConfirmationToggle(),
          summary: data,
          state: isApprove
        }}
      />
      <FilterDropdownTemplate btnText="Options" menuItemsStyle="w-56" Icon={GearIcon}>
        <Card shadow-size="xl" rounded="md" className="overflow-visible !bg-white">
          <main className="flex flex-col space-y-3 p-4">
            <Text theme="sm" weight="semibold" className="text-slate-500">
              Options
            </Text>
            <div className="flex flex-col space-y-2 text-sm">
              <Button
                type="button"
                variant="primary"
                className="inline-flex items-center justify-center px-5 py-0.5"
                onClick={() => {
                  handleConfirmationToggle()
                  setIsApprove(true)
                }}
              >
                <ThumbsUp className="absolute left-6 h-4 w-4" />
                <span>Approve All</span>
              </Button>
              <Button
                type="submit"
                variant="danger"
                className="inline-flex items-center justify-center px-5 py-0.5"
                onClick={() => {
                  handleConfirmationToggle()
                  setIsApprove(false)
                }}
              >
                <ThumbsDown className="absolute left-6 h-4 w-4" />
                <span>Disapprove All</span>
              </Button>
            </div>
          </main>
        </Card>
      </FilterDropdownTemplate>
    </>
  )
}

OptionDropdown.defaultProps = {}

export default OptionDropdown
