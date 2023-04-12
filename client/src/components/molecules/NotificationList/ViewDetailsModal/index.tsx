import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { Check, X } from 'react-feather'

import useLeave from '~/hooks/useLeave'
import LeaveDetails from './LeaveDetails'
import OffsetDetails from './OffsetDetails'
import useOvertime from '~/hooks/useOvertime'
import { User } from '~/utils/types/userTypes'
import OvertimeDetails from './OvertimeDetails'
import ResolvedDetails from './ResolvedDetails'
import { Roles } from '~/utils/constants/roles'
import UndertimeDetails from './UndertimeDetails'
import { INotification } from '~/utils/interfaces'
import useChangeShift from '~/hooks/useChangeShift'
import ChangeShiftDetails from './ChangeShiftDetails'
import useOffsetForESL from '~/hooks/useOffsetForESL'
import LeaveResolvedDetails from './LeaveResolvedDetails'
import OffsetScheduleDetails from './OffsetScheduleDetails'
import OffsetResolvedDetails from './OffsetResolvedDetails'
import ESLChangeShiftDetails from './ESLChangeShiftDetails'
import Button from '~/components/atoms/Buttons/ButtonAction'
import ChangeShiftResolvedDetails from './ChangeShiftResolved'
import OvertimeResolvedDetails from './OvertimeResolvedDetails'
import ModalTemplate from '~/components/templates/ModalTemplate'
import UndertimeResolvedDetails from './UndertimeResolvedDetails'
import { STATUS_OPTIONS } from '~/utils/constants/notificationFilter'
import { NOTIFICATION_TYPE } from '~/utils/constants/notificationTypes'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'

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

  const { handleApproveEslOffsetMutation } = useOffsetForESL()
  const approveDisapproveEslOffsetMutation = handleApproveEslOffsetMutation()

  const { handleApproveOffsetMutation } = useOffsetForESL()
  const approveDisapproveOffsetMutation = handleApproveOffsetMutation()

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

    if (row.type.toLowerCase() === NOTIFICATION_TYPE.OFFSET_SCHEDULE) {
      approveDisapproveEslOffsetMutation.mutate(
        {
          teamLeaderId: user.id,
          notificationId: parseInt(router.query.id as string),
          isApproved
        },
        {
          onSuccess: () => handleClose()
        }
      )
    }

    if (row.type.toLowerCase() === NOTIFICATION_TYPE.OFFSET) {
      approveDisapproveOffsetMutation.mutate(
        {
          teamLeaderId: user.id,
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
          title: `${row.name}'s ${row.type.split('_')[0]} ${row.specificType}`,
          closeModal: handleClose,
          hasAvatar: true,
          avatar: row.userAvatarLink
        }}
      />
      <main className="px-8 py-4 text-sm  text-slate-700">
        <ul className="flex flex-col space-y-3 divide-y divide-slate-200">
          {/* DETAILS FOR OVERTIME DATA */}
          {row.type.toLocaleLowerCase() === NOTIFICATION_TYPE.OVERTIME && (
            <OvertimeDetails
              {...{
                notification: row
              }}
            />
          )}
          {/* DETAILS FOR UNDERTIME DATA */}
          {row.type.toLocaleLowerCase() === NOTIFICATION_TYPE.UNDERTIME && (
            <UndertimeDetails
              {...{
                notification: row
              }}
            />
          )}
          {/* DETAILS FOR LEAVE DATA */}
          {row.type.toLocaleLowerCase() === NOTIFICATION_TYPE.LEAVE && (
            <LeaveDetails
              {...{
                notification: row
              }}
            />
          )}
          {/* DETAILS FOR CHANGE SHIFT DATA */}
          {row.type.toLocaleLowerCase() === NOTIFICATION_TYPE.CHANGE_SHIFT && (
            <ChangeShiftDetails
              {...{
                notification: row
              }}
            />
          )}
          {/* DETAILS FOR OVERTIME RESOLVED DATA */}
          {row.type.toLocaleLowerCase() === NOTIFICATION_TYPE.OVERTIME_RESOLVED && (
            <OvertimeResolvedDetails
              {...{
                notification: row
              }}
            />
          )}
          {/* DETAILS FOR UNDERTIME RESOLVED DATA */}
          {row.type.toLocaleLowerCase() === NOTIFICATION_TYPE.UNDERTIME_RESOLVED && (
            <UndertimeResolvedDetails
              {...{
                notification: row
              }}
            />
          )}
          {/* DETAILS FOR LEAVE RESOLVED DATA */}
          {row.type.toLocaleLowerCase() === NOTIFICATION_TYPE.LEAVE_RESOLVED && (
            <LeaveResolvedDetails
              {...{
                notification: row
              }}
            />
          )}
          {/* DETAILS FOR CHANGE SHIFT RESOLVED DATA */}
          {row.type.toLocaleLowerCase() === NOTIFICATION_TYPE.CHANGE_SHIFT_RESOLVED && (
            <ChangeShiftResolvedDetails
              {...{
                notification: row
              }}
            />
          )}
          {/* DETAILS FOR RESOLVED DATA */}
          {row.type.toLocaleLowerCase() === NOTIFICATION_TYPE.RESOLVED && (
            <ResolvedDetails
              {...{
                notification: row
              }}
            />
          )}
          {/* DETAILS FOR OFFSET SCHEDULE DATA */}
          {row.type.toLocaleLowerCase() === NOTIFICATION_TYPE.OFFSET_SCHEDULE && (
            <OffsetScheduleDetails
              {...{
                notification: row
              }}
            />
          )}
          {/* DETAILS FOR OFFSET DATA */}
          {row.type.toLocaleLowerCase() === NOTIFICATION_TYPE.OFFSET && (
            <OffsetDetails
              {...{
                notification: row
              }}
            />
          )}
          {/* DETAILS FOR OFFSET RESOLVED DATA */}
          {row.type.toLocaleLowerCase() === NOTIFICATION_TYPE.OFFSET_RESOLVED && (
            <OffsetResolvedDetails
              {...{
                notification: row
              }}
            />
          )}
          {/* DETAILS FOR ESL CHANGE SHIFT REQUEST */}
          {row.type.toLocaleLowerCase() === NOTIFICATION_TYPE.ESL_CHANGE_SHIFT && (
            <ESLChangeShiftDetails
              {...{
                notification: row
              }}
            />
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
