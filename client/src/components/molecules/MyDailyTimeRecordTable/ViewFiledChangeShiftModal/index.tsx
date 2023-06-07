import React, { FC } from 'react'
import { X } from 'react-feather'
import { BsFileEarmarkText } from 'react-icons/bs'

import useUserQuery from '~/hooks/useUserQuery'
import { Position } from '~/utils/constants/position'
import ChangeShiftDetails from './ChangeShiftDetails'
import ESLChangeShiftDetails from './ESLChangeShiftDetails'
import Button from '~/components/atoms/Buttons/ButtonAction'
import ModalTemplate from '~/components/templates/ModalTemplate'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import { IChangeShift, IEmployeeTimeEntry, IESLChangeShift } from '~/utils/types/timeEntryTypes'

type Props = {
  isOpen: boolean
  closeModal: () => void
  timeEntry: IEmployeeTimeEntry
}

type GetShiftDetailProps = {
  isESLTeacher: boolean
  changeShift: IChangeShift
  eslChangeShift: IESLChangeShift
}

const ViewFiledChangeShiftModal: FC<Props> = (props): JSX.Element => {
  const {
    isOpen,
    closeModal,
    timeEntry: { eslChangeShift, changeShift }
  } = props

  // CURRENT USER QUERY HOOKS
  const { handleUserQuery } = useUserQuery()
  const { data: authUser } = handleUserQuery()

  const isESLTeacher = authUser?.userById?.position.id === Position.ESL_TEACHER

  const getShiftDetails = (shifts: GetShiftDetailProps): JSX.Element => {
    const { isESLTeacher, changeShift, eslChangeShift } = shifts

    if (isESLTeacher && eslChangeShift !== null) {
      return <ESLChangeShiftDetails {...{ eslChangeShift }} />
    }
    if (!isESLTeacher && changeShift !== null) {
      return <ChangeShiftDetails {...{ changeShift }} />
    }
    return <></>
  }

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
          Icon: BsFileEarmarkText
        }}
      />
      <main className="px-8 py-4 text-sm  text-slate-700">
        <ul className="flex flex-col space-y-3 divide-y divide-slate-200">
          {getShiftDetails({ isESLTeacher, changeShift, eslChangeShift })}
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
