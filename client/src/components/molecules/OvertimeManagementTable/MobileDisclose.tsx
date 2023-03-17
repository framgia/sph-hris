import moment from 'moment'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import React, { FC, useState } from 'react'
import { Table } from '@tanstack/react-table'
import { Disclosure } from '@headlessui/react'
import { confirmAlert } from 'react-confirm-alert'
import { Check, ChevronRight, Edit, Eye, X } from 'react-feather'

import Chip from './Chip'
import Card from '~/components/atoms/Card'
import useOvertime from '~/hooks/useOvertime'
import Avatar from '~/components/atoms/Avatar'
import { Roles } from '~/utils/constants/roles'
import useUserQuery from '~/hooks/useUserQuery'
import ShowRemarksModal from './ShowRemarksModal'
import Button from '~/components/atoms/Buttons/Button'
import UpdateOvertimeModal from './UpdateOvertimeModal'
import { IOvertimeManagement } from '~/utils/interfaces'
import { variants } from '~/utils/constants/animationVariants'
import ApproveConfirmationModal from './ApproveConfirmationModal'
import ButtonAction from '~/components/atoms/Buttons/ButtonAction'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
import DisclosureTransition from '~/components/templates/DisclosureTransition'

type Props = {
  table: Table<IOvertimeManagement>
  isLoading: boolean
  error: unknown
}

const MobileDisclose: FC<Props> = ({ table, isLoading, error }): JSX.Element => {
  const { handleUserQuery } = useUserQuery()
  const { data: user } = handleUserQuery()

  const { handleManagerApproveOvertimeMutation } = useOvertime()
  const approveOvertimeMutation = handleManagerApproveOvertimeMutation()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false)
  const [isOpenRemarksModal, setIsOpenRemarksModal] = useState<boolean>(false)
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState<boolean>(false)

  const handleToggle = (): void => setIsOpen(!isOpen)
  const handleUpdateToggle = (): void => setIsOpenUpdateModal(!isOpenUpdateModal)
  const handleShowRemarksToggle = (): void => setIsOpenRemarksModal(!isOpenRemarksModal)
  const handleConfirmationToggle = (): void => setIsOpenConfirmationModal(!isOpenConfirmationModal)

  const isManagerRole = user?.userById.role.name === Roles.MANAGER
  const isHrRole = user?.userById.role.name === Roles.HR_ADMIN

  const handleDisapprove = (onClose: () => void, overtimeId: number): void => {
    approveOvertimeMutation.mutate(
      {
        userId: user?.userById.id as number,
        overtimeId,
        approvedMinutes: 0,
        isApproved: false
      },
      {
        onSuccess: () => onClose()
      }
    )
  }

  const handleDisapproveConfirmationToggle = (overtimeId: number): void => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Card className="w-full max-w-xs px-8 py-6" shadow-size="xl" rounded="lg">
            <h1 className="text-center text-xl font-bold">Confirmation</h1>
            <p className="mt-2 text-sm font-medium">
              Are you sure you want to disapprove the request?
            </p>
            <div className="mt-6 flex items-center justify-center space-x-2 text-white">
              <>
                <ButtonAction
                  variant="danger"
                  onClick={() => handleDisapprove(onClose, overtimeId)}
                  className="disabled w-full py-1 px-4"
                >
                  Yes
                </ButtonAction>
                <ButtonAction
                  onClick={onClose}
                  variant="secondary"
                  className="w-full py-1 px-4 text-slate-500"
                >
                  No
                </ButtonAction>
              </>
            </div>
          </Card>
        )
      }
    })
  }

  return (
    <>
      {error === null ? (
        isLoading ? (
          <div className="flex flex-col px-4 py-3">
            {Array.from({ length: 30 }, (_, i) => (
              <LineSkeleton key={i} className="py-1" />
            ))}
          </div>
        ) : (
          <>
            {table.getPageCount() === 0 ? (
              <div className="h-[50vh]">
                <DiscloseMessage message="No Available Data" />
              </div>
            ) : (
              <>
                {table.getRowModel().rows.map((row) => (
                  <Disclosure key={row.id}>
                    {({ open }) => {
                      const { original: overtimeManagement } = row

                      return (
                        <motion.div
                          variants={variants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                        >
                          <Disclosure.Button
                            className={classNames(
                              'w-full border-b border-slate-200 py-2 px-4 hover:bg-white',
                              open ? 'bg-white' : 'hover:shadow-md hover:shadow-slate-200'
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-2">
                                  <Avatar
                                    src={`${overtimeManagement.user.link}`}
                                    size="base"
                                    rounded="full"
                                  />
                                  <div className="flex flex-col items-start">
                                    <h1 className="font-semibold">
                                      {overtimeManagement.user.name}
                                    </h1>
                                    <small className="text-slate-500">
                                      {overtimeManagement.user.role.name}
                                    </small>
                                  </div>
                                </div>
                                <Chip label={overtimeManagement.status} />
                              </div>
                              <ChevronRight
                                className={classNames(
                                  'h-4 w-4 text-slate-600 duration-300',
                                  open ? 'rotate-90' : ''
                                )}
                              />
                            </div>
                          </Disclosure.Button>
                          <DisclosureTransition>
                            <Disclosure.Panel
                              className={classNames(
                                'text-slate-600',
                                open ? 'bg-white shadow-md' : ''
                              )}
                            >
                              <ul className="flex flex-col divide-y divide-slate-200">
                                <li className="flex items-center px-4 py-2.5">
                                  Projects:{' '}
                                  <div className="ml-2 flex flex-wrap items-center space-x-2">
                                    {overtimeManagement.projects.map((project, index) => (
                                      <span
                                        key={index}
                                        className="rounded border border-slate-300 bg-slate-50 px-1.5 font-medium"
                                      >
                                        {project.project_name.label}
                                      </span>
                                    ))}
                                  </div>
                                </li>
                                <li className="px-4 py-2.5">
                                  Date:{' '}
                                  <span className="font-semibold">
                                    {moment(new Date(overtimeManagement.date)).format(
                                      'MMMM DD, YYYY'
                                    )}
                                  </span>
                                </li>
                                <li className="px-4 py-2.5">
                                  Approved minutes:{' '}
                                  <span className="font-semibold">
                                    {overtimeManagement.approvedMinutes}
                                  </span>
                                </li>
                                {isHrRole ? (
                                  <li className="px-4 py-2.5">
                                    Supervisor:{' '}
                                    <span className="font-semibold">
                                      {overtimeManagement.supervisor}
                                    </span>
                                  </li>
                                ) : null}
                                <li className="px-4 py-2.5">
                                  Date Filed:{' '}
                                  <span className="font-semibold">
                                    {moment(new Date(overtimeManagement.dateFiled)).format(
                                      'MMMM DD, YYYY'
                                    )}
                                  </span>
                                </li>
                                <li className="flex flex-col space-y-2 px-4 py-3">
                                  <span> Remarks:</span>
                                  <span className="font-medium leading-relaxed tracking-wide">
                                    {overtimeManagement.remarks}
                                  </span>
                                </li>
                                <li className="flex items-center space-x-2 px-4 py-2">
                                  <span>Actions:</span>
                                  <div className="inline-flex items-center divide-x divide-slate-300 rounded border border-slate-300">
                                    {/* === FOR HR ACTION BUTTONS ==== */}
                                    {isHrRole ? (
                                      <>
                                        <Tippy placement="left" content="Edit" className="!text-xs">
                                          <Button
                                            onClick={handleUpdateToggle}
                                            rounded="none"
                                            className="py-0.5 px-1 text-slate-500"
                                          >
                                            <Edit className="h-4 w-4" />

                                            {/* This will show the Update Overtime Modal */}
                                            {isOpenUpdateModal ? (
                                              <UpdateOvertimeModal
                                                {...{
                                                  isOpen: isOpenUpdateModal,
                                                  closeModal: () => handleUpdateToggle(),
                                                  row: overtimeManagement
                                                }}
                                              />
                                            ) : null}
                                          </Button>
                                        </Tippy>
                                        <Tippy
                                          placement="left"
                                          className="!text-xs"
                                          content="View Remarks"
                                        >
                                          <Button
                                            onClick={handleToggle}
                                            rounded="none"
                                            className="py-0.5 px-1 text-slate-500"
                                          >
                                            <Eye className="h-4 w-4" />

                                            {/* This will show the remarks modal */}
                                            {isOpen ? (
                                              <ShowRemarksModal
                                                {...{
                                                  isOpen,
                                                  closeModal: () => handleToggle(),
                                                  row: overtimeManagement
                                                }}
                                              />
                                            ) : null}
                                          </Button>
                                        </Tippy>
                                      </>
                                    ) : null}

                                    {/* === FOR MANAGER ACTION BUTTONS ==== */}
                                    {isManagerRole ? (
                                      <>
                                        <Tippy
                                          placement="left"
                                          content="Approve"
                                          className="!text-xs"
                                        >
                                          <Button
                                            rounded="none"
                                            onClick={handleConfirmationToggle}
                                            className="py-0.5 px-1 text-slate-500"
                                          >
                                            <Check className="h-4 w-4 stroke-[3px]" />
                                            {/* This will show the Approve Confirmation Modal */}
                                            {isOpenConfirmationModal ? (
                                              <ApproveConfirmationModal
                                                {...{
                                                  isOpen: isOpenConfirmationModal,
                                                  closeModal: () => handleConfirmationToggle(),
                                                  row: overtimeManagement
                                                }}
                                              />
                                            ) : null}
                                          </Button>
                                        </Tippy>
                                        <Tippy
                                          placement="left"
                                          content="Disapprove"
                                          className="!text-xs"
                                        >
                                          <Button
                                            rounded="none"
                                            className="py-0.5 px-1 text-slate-500"
                                            onClick={() =>
                                              handleDisapproveConfirmationToggle(
                                                overtimeManagement.id
                                              )
                                            }
                                          >
                                            <X className="h-4 w-4 stroke-[3px]" />
                                          </Button>
                                        </Tippy>
                                        <Tippy
                                          placement="left"
                                          content="View Remarks"
                                          className="!text-xs"
                                        >
                                          <Button
                                            rounded="none"
                                            onClick={handleShowRemarksToggle}
                                            className="py-0.5 px-1 text-slate-500"
                                          >
                                            <Eye className="h-4 w-4" />

                                            {/* This will show the remarks modal */}
                                            {isOpenRemarksModal ? (
                                              <ShowRemarksModal
                                                {...{
                                                  isOpen: isOpenRemarksModal,
                                                  closeModal: () => handleShowRemarksToggle(),
                                                  row: overtimeManagement
                                                }}
                                              />
                                            ) : null}
                                          </Button>
                                        </Tippy>
                                      </>
                                    ) : null}
                                  </div>
                                </li>
                              </ul>
                            </Disclosure.Panel>
                          </DisclosureTransition>
                        </motion.div>
                      )
                    }}
                  </Disclosure>
                ))}
              </>
            )}
          </>
        )
      ) : (
        <DiscloseMessage message="Something went wrong" type="error" />
      )}
    </>
  )
}

const DiscloseMessage = ({
  message,
  type = 'default'
}: {
  message: string
  type?: string
}): JSX.Element => {
  return (
    <p
      className={classNames(
        'py-2 text-center font-medium',
        type === 'default' && 'text-slate-500',
        type === 'error' && 'bg-rose-50 text-rose-500'
      )}
    >
      {message}
    </p>
  )
}

export default MobileDisclose
