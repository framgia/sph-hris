import moment from 'moment'
import Tippy from '@tippyjs/react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Edit, Trash } from 'react-feather'
import React, { useRef, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { BsFileEarmarkText } from 'react-icons/bs'
import { createColumnHelper } from '@tanstack/react-table'

import { Roles } from '~/utils/constants/roles'
import useUserQuery from '~/hooks/useUserQuery'
import ShowRemarksModal from './ShowRemarksModal'
import Button from '~/components/atoms/Buttons/Button'
import CellHeader from '~/components/atoms/CellHeader'
import { IInterruptionTimeEntry } from '~/utils/interfaces'
import useInterruptionType from '~/hooks/useInterruptionType'
import UpdateInterruptionTimeEntriesModal from './UpdateInterruptionTimeEntriesModal'

const columnHelper = createColumnHelper<IInterruptionTimeEntry>()

export const columns = [
  columnHelper.accessor('createdAt', {
    header: () => <CellHeader label="Date" className="!font-medium" />,
    cell: (props) => moment(props.getValue()).format('MMMM DD, YYYY'),
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('timeOut', {
    header: () => <CellHeader label="Time Out" className="!font-medium" />,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('timeIn', {
    header: () => <CellHeader label="Time In" className="!font-medium" />,
    footer: (info) => info.column.id
  }),
  columnHelper.display({
    id: 'action',
    header: () => <span className="font-medium">Actions</span>,
    cell: (props) => {
      const { original: interruptionTimeEntry } = props.row
      const router = useRouter()
      const [isOpenRemark, setIsOpenRemark] = useState<boolean>(false)
      const [isUpdateRemark, setIsUpdateRemark] = useState<boolean>(false)
      const [remarks, setRemarks] = useState<string | undefined>('')
      const deleteButtonRef = useRef<HTMLButtonElement | null>(null)
      const { handleDeleteInterruptionMutation } = useInterruptionType()
      const { handleUserQuery } = useUserQuery()
      const { data: user } = handleUserQuery()
      const deleteInterruption = handleDeleteInterruptionMutation()

      const handleOpenRemark = (remarked?: string | undefined): void => {
        void setIsOpenRemark(!isOpenRemark)
        setRemarks(remarked)
      }

      const handleToggleUpdateRemark = (row?: IInterruptionTimeEntry | undefined): void => {
        setIsUpdateRemark(!isUpdateRemark)
      }

      // Actual Deletion
      const handleYesDeleteRemark = async (
        remarkId: string | number,
        onClose: () => void
      ): Promise<void> => {
        if (deleteButtonRef.current !== null) {
          try {
            deleteButtonRef.current.innerHTML = 'Deleting...'
            await deleteInterruption.mutateAsync({ id: remarkId as number })
          } catch {
            toast.error('Something went wrong')
          } finally {
            if (deleteButtonRef.current !== null) {
              deleteButtonRef.current.innerHTML = 'Yes'
              onClose()
            }
          }
        }
      }

      // Confirmation Dialog
      const handleConfirmDeleteRemark = (remarkId: string | number): void => {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className="rounded-lg border border-slate-200 bg-white px-8 py-6 shadow-xl">
                <h1 className="text-center text-xl font-bold">Are you sure?</h1>
                <p className="mt-2 text-sm font-medium">You want to delete?</p>
                <div className="mt-6 flex items-center justify-center space-x-2 text-white">
                  <button
                    onClick={onClose}
                    className="rounded-lg bg-slate-500 py-1 px-6 transition duration-100 ease-in-out hover:bg-slate-600"
                  >
                    No
                  </button>
                  <button
                    ref={deleteButtonRef}
                    onClick={() => {
                      void handleYesDeleteRemark(remarkId, onClose)
                    }}
                    className="rounded-lg bg-blue-500 py-1 px-6 transition duration-100 ease-in-out hover:bg-blue-600"
                  >
                    Yes
                  </button>
                </div>
              </div>
            )
          }
        })
      }
      const checkStatus =
        user?.userById.role.name !== Roles.HR_ADMIN && !router.pathname.includes('dtr-management')
          ? moment(new Date(interruptionTimeEntry.createdAt)).format('YYYY-MM-DD') !==
              moment(new Date()).format('YYYY-MM-DD') &&
            moment(new Date(interruptionTimeEntry.createdAt)).format('YYYY-MM-DD') !==
              moment(new Date()).add(-1, 'day').format('YYYY-MM-DD')
          : !(user?.userById.role.name === Roles.HR_ADMIN)
      return (
        <div className="inline-flex items-center space-x-1 rounded">
          <Tippy content="View" placement="left" className="!text-xs">
            <Button
              rounded="none"
              className="py-0.5 px-1 text-slate-500"
              onClick={() => handleOpenRemark(interruptionTimeEntry.remarks)}
            >
              <BsFileEarmarkText className="h-4 w-4" />
              {/* This will show the Remarks Modal */}
              {isOpenRemark ? (
                <ShowRemarksModal
                  {...{
                    isOpen: isOpenRemark,
                    closeModal: handleOpenRemark,
                    remarks
                  }}
                />
              ) : null}
            </Button>
          </Tippy>
          <Tippy content="Edit" placement="left" className="!text-xs">
            <Button
              rounded="none"
              className="py-0.5 px-1 text-slate-500"
              disabled={checkStatus}
              onClick={() => handleToggleUpdateRemark(interruptionTimeEntry)}
            >
              <Edit className="h-4 w-4" />
              {isUpdateRemark ? (
                <UpdateInterruptionTimeEntriesModal
                  {...{
                    isOpen: isUpdateRemark,
                    closeModal: handleToggleUpdateRemark,
                    remarks: interruptionTimeEntry
                  }}
                />
              ) : null}
            </Button>
          </Tippy>
          <Tippy content="Delete" placement="right" className="!text-xs">
            <Button
              onClick={() => {
                void handleConfirmDeleteRemark(interruptionTimeEntry.id)
              }}
              disabled={checkStatus}
              rounded="none"
              className="py-0.5 px-1 text-slate-500"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </Tippy>
        </div>
      )
    },
    footer: (info) => info.column.id
  })
]
