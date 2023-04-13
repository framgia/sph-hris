import React, { FC } from 'react'
import { Eye, X } from 'react-feather'

import useUserQuery from '~/hooks/useUserQuery'
import { Position } from '~/utils/constants/position'
import ChangeShiftDetails from './ChangeShiftDetails'
import ESLChangeShiftDetails from './ESLChangeShiftDetails'
import Button from '~/components/atoms/Buttons/ButtonAction'
import ModalTemplate from '~/components/templates/ModalTemplate'
import { IEmployeeTimeEntry } from '~/utils/types/timeEntryTypes'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'

type Props = {
  isOpen: boolean
  closeModal: () => void
  timeEntry: IEmployeeTimeEntry
}

const ViewFiledChangeShiftModal: FC<Props> = ({ isOpen, closeModal, timeEntry }): JSX.Element => {
  // CURRENT USER QUERY HOOKS
  const { handleUserQuery } = useUserQuery()
  const { data: authUser } = handleUserQuery()

  return (
    <ModalTemplate
      {...{
        isOpen,
        closeModal
      }}
      className="w-full max-w-lg"
    >
      <ModalHeader
        {...{
          title: 'Filed Change Shift',
          closeModal,
          Icon: Eye
        }}
      />
      <main className="px-8 py-4 text-sm  text-slate-700">
        <ul className="flex flex-col space-y-3 divide-y divide-slate-200">
          {authUser?.userById?.position.id === Position.ESL_TEACHER ? (
            <>
              {timeEntry?.eslChangeShift !== null && (
                <ESLChangeShiftDetails
                  {...{
                    eslChangeShift: timeEntry?.eslChangeShift
                  }}
                />
              )}
            </>
          ) : (
            <>
              {timeEntry?.changeShift !== null && (
                <ChangeShiftDetails
                  {...{
                    changeShift: timeEntry?.changeShift
                  }}
                />
              )}
            </>
          )}
        </ul>
      </main>
      <ModalFooter>
        <Button
          type="button"
          variant="secondary"
          onClick={closeModal}
          className="flex items-center space-x-2 px-4 py-1 text-sm"
        >
          <X className="h-4 w-4" />
          <span>Close</span>
        </Button>
      </ModalFooter>
    </ModalTemplate>
  )
}

export default ViewFiledChangeShiftModal
