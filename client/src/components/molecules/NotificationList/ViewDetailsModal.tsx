import moment from 'moment'
import React, { FC } from 'react'
import { Check, X } from 'react-feather'
import { useRouter } from 'next/router'

import useLeave from '~/hooks/useLeave'
import { INotification } from '~/utils/interfaces'
import Button from '~/components/atoms/Buttons/ButtonAction'
import ModalTemplate from '~/components/templates/ModalTemplate'
import { STATUS_OPTIONS } from '~/utils/constants/notificationFilter'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'
import { User } from '~/utils/types/userTypes'
import { Roles } from '~/utils/constants/roles'
import { NOTIFICATION_TYPE } from '~/utils/constants/notificationTypes'
import useOvertime from '~/hooks/useOvertime'
import useChangeShift from '~/hooks/useChangeShift'

type Props = {
  isOpen: boolean
  row: INotification
  user: User
}

const ViewDetailsModal: FC<Props> = ({ isOpen, row, user }): JSX.Element => {
  const router = useRouter()

  const { handleApproveLeaveMutation, handleApproveUndertimeMutation } = useLeave()
  const approveDisapproveLeaveMutation = handleApproveLeaveMutation()
  const approveDisapproveUndertimeMutation = handleApproveUndertimeMutation()

  const { handleLeaderApproveOvertimeMutation } = useOvertime()
  const approveDisapproveOvertimeMutation = handleLeaderApproveOvertimeMutation()

  const { handleApproveChangeShiftMutation } = useChangeShift()
  const approveDisapproveChangeShiftMutation = handleApproveChangeShiftMutation()

  const handleClose = (): void => {
    void router.replace({
      pathname: '/notifications'
    })
  }

  const handleApproveDisapprove = (isApproved: boolean): void => {
    if (row.type.toLowerCase() === NOTIFICATION_TYPE.LEAVE) {
      approveDisapproveLeaveMutation.mutate(
        {
          userId: user.id,
          notificationId: parseInt(router.query.id as string),
          isApproved
        },
        {
          onSuccess: () => handleClose()
        }
      )
    }

    if (row.type.toLowerCase() === NOTIFICATION_TYPE.UNDERTIME) {
      approveDisapproveUndertimeMutation.mutate(
        {
          userId: user.id,
          notificationId: parseInt(router.query.id as string),
          isApproved
        },
        {
          onSuccess: () => handleClose()
        }
      )
    }

    if (row.type.toLowerCase() === NOTIFICATION_TYPE.OVERTIME) {
      approveDisapproveOvertimeMutation.mutate(
        {
          userId: user.id,
          notificationId: parseInt(router.query.id as string),
          isApproved
        },
        {
          onSuccess: () => handleClose()
        }
      )
    }

    if (row.type.toLowerCase() === NOTIFICATION_TYPE.CHANGE_SHIFT) {
      approveDisapproveChangeShiftMutation.mutate(
        {
          userId: user.id,
          notificationId: parseInt(router.query.id as string),
          isApproved
        },
        {
          onSuccess: () => handleClose()
        }
      )
    }
  }

  return (
    <ModalTemplate
      {...{
        isOpen,
        closeModal: handleClose
      }}
      className="w-full max-w-lg"
    >
      <ModalHeader
        {...{
          title: `${row.name}'s ${row.type.split('_')[0]} request`,
          closeModal: handleClose,
          hasAvatar: true,
          avatar: row.userAvatarLink
        }}
      />
      <main className="px-8 py-4 text-sm  text-slate-700">
        <ul className="flex flex-col space-y-3 divide-y divide-slate-200">
          <li className="inline-flex items-center space-x-3">
            <span className="text-slate-600">Project: </span>
            <span className="flex items-center font-medium">{row.project}</span>
          </li>
          <li className="inline-flex items-center space-x-3 pt-2">
            <span className="text-slate-600">Date: </span>
            <span className="flex items-center font-medium">{row.date}</span>
          </li>
          {(row.type.toLowerCase() === NOTIFICATION_TYPE.OVERTIME ||
            row.type.toLowerCase() === NOTIFICATION_TYPE.UNDERTIME ||
            row.type.toLowerCase() === NOTIFICATION_TYPE.LEAVE ||
            row.type.toLowerCase() === NOTIFICATION_TYPE.OVERTIME_RESOLVED ||
            row.type.toLowerCase() === NOTIFICATION_TYPE.UNDERTIME_RESOLVED ||
            row.type.toLowerCase() === NOTIFICATION_TYPE.LEAVE_RESOLVED) && (
            <li className="inline-flex items-center space-x-3 pt-2">
              <span className="text-slate-600">Duration: </span>
              <span className="flex items-center font-medium">{row.duration}</span>
            </li>
          )}
          {(row.type.toLowerCase() === NOTIFICATION_TYPE.CHANGE_SHIFT ||
            row.type.toLowerCase() === NOTIFICATION_TYPE.CHANGE_SHIFT_RESOLVED) && (
            <>
              <li className="inline-flex items-center space-x-3 pt-2">
                <span className="text-slate-600">Time In: </span>
                <span className="flex items-center font-medium">{row.requestedTimeIn}</span>
              </li>
              <li className="inline-flex items-center space-x-3 pt-2">
                <span className="text-slate-600">Time Out: </span>
                <span className="flex items-center font-medium">{row.requestedTimeOut}</span>
              </li>
            </>
          )}
          <li className="inline-flex items-center space-x-3 pt-2">
            <span className="text-slate-600">Date Filed: </span>
            <span className="flex items-center font-medium">
              {moment(new Date(row.date)).format('MMM DD, YY')} &bull; {``}
              {moment(new Date(row.dateFiled)).fromNow()}
            </span>
          </li>
          <li className="inline-flex items-center space-x-3 pt-2">
            <span className="text-slate-600">Status: </span>
            <span className="flex items-center font-medium">{row.status}</span>
          </li>
          {row.type.toLowerCase() === NOTIFICATION_TYPE.CHANGE_SHIFT ||
          row.type.toLowerCase() === NOTIFICATION_TYPE.CHANGE_SHIFT_RESOLVED ? (
            <li className="inline-flex flex-col space-y-2 pt-2">
              <span className="text-slate-600">Description: </span>
              <span className="font-medium">{row.description}</span>
            </li>
          ) : (
            <li className="inline-flex flex-col space-y-2 pt-2">
              <span className="text-slate-600">Remarks: </span>
              <span className="font-medium">{row.remarks}</span>
            </li>
          )}
        </ul>
      </main>
      {row.status === STATUS_OPTIONS.PENDING && (
        <ModalFooter>
          {user.role.name === Roles.MANAGER &&
          row.type.toLowerCase() === NOTIFICATION_TYPE.OVERTIME ? (
            <Button
              variant="success"
              className="flex items-center space-x-1 py-0.5 px-4 text-slate-500"
              onClick={() => {
                void router.push({
                  pathname: '/overtime-management'
                })
              }}
            >
              <span>View In Overtime Management</span>
            </Button>
          ) : (
            <>
              <Button
                variant="success"
                className="flex items-center space-x-1 py-0.5 px-4 text-slate-500"
                onClick={() => handleApproveDisapprove(true)}
              >
                <Check className="h-4 w-4" />
                <span>Approve</span>
              </Button>
              <Button
                variant="danger-outline"
                className="flex items-center space-x-1 py-0.5 px-2 text-slate-500"
                onClick={() => handleApproveDisapprove(false)}
              >
                <X className="h-4 w-4" />
                <span>Disapprove</span>
              </Button>
            </>
          )}
        </ModalFooter>
      )}
    </ModalTemplate>
  )
}

ViewDetailsModal.defaultProps = {}

export default ViewDetailsModal
