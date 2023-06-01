import React, { FC } from 'react'
import classNames from 'classnames'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Calendar, Trash2 } from 'react-feather'
import { confirmAlert } from 'react-confirm-alert'

import Card from '~/components/atoms/Card'
import useUserQuery from '~/hooks/useUserQuery'
import { queryClient } from '~/lib/queryClient'
import Button from '~/components/atoms/Buttons/Button'
import useEmployeeSchedule from '~/hooks/useEmployeeSchedule'
import ButtonAction from '~/components/atoms/Buttons/ButtonAction'
import { IGetAllEmployeeSchedule } from '~/utils/types/employeeScheduleTypes'

type Props = {
  item: IGetAllEmployeeSchedule
  closeModal?: () => void
}

const ScheduleItem: FC<Props> = (props): JSX.Element => {
  const item = props.item
  const closeModal = props.closeModal ?? (() => {})

  const router = useRouter()
  const id = Number(router.query.id)

  // USER QUERY HOOK
  const { handleUserQuery } = useUserQuery()
  const { data: user } = handleUserQuery()

  // EMPLOYEE SCHEDULE HOOK
  const { handleDeleteEmployeeScheduleMutation } = useEmployeeSchedule()
  const deleteEmployeeScheduleMutation = handleDeleteEmployeeScheduleMutation()
  const active = item.id === id

  // FOR CONFIRMATION ONLY
  const handleRemoveConfirmation = (item: IGetAllEmployeeSchedule): void => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Card className="w-full max-w-[350px] px-8 py-6 shadow-none" rounded="lg">
            <h1 className="text-center text-xl font-bold text-rose-500">Confirmation</h1>
            <p className="mt-4 text-sm font-normal text-slate-600">
              Are you sure you want to delete <b className="font-semibold">{item.scheduleName}?</b>
            </p>
            <div className="mt-6 flex items-center justify-center space-x-2 text-white">
              <ButtonAction
                onClick={() => {
                  handleDeleteSchedule(onClose, item.id)
                  return onClose()
                }}
                variant="danger"
                className="w-full py-1 px-4"
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
            </div>
          </Card>
        )
      }
    })
  }

  // THIS WILL MUTATE THE DELETE ACTION
  const handleDeleteSchedule = (onClose: () => void, id: Number): void => {
    deleteEmployeeScheduleMutation.mutate(
      {
        employeeScheduleId: Number(id),
        userId: user?.userById.id as number
      },
      {
        onSuccess: () => {
          void queryClient.invalidateQueries({
            queryKey: ['GET_ALL_EMPLOYEE_SCHEDULE']
          })
          void router.replace({
            pathname: router.pathname
          })
          toast.success('Deleted Successfully!')
        }
      }
    )
    onClose()
  }

  return (
    <li
      className={classNames(
        'group relative flex cursor-pointer select-none items-center',
        'justify-between transition duration-75 ease-in-out hover:bg-amber-50',
        active ? 'bg-amber-50 text-amber-600 hover:text-amber-600' : 'text-slate-600'
      )}
    >
      <div
        onClick={() => {
          void router
            .replace({
              pathname: router.pathname,
              query: {
                id: item.id
              }
            })
            .then(() => closeModal())
        }}
        className={classNames('w-full py-2.5 pr-4 pl-8 hover:bg-amber-50 md:pl-4')}
      >
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 stroke-1" />
          <span className="text-sm md:text-xs">{item.scheduleName}</span>
        </div>
      </div>
      <div
        className={classNames(
          'insert-y-0 absolute right-6 z-50 flex items-center group-hover:opacity-100 md:right-5',
          active ? 'opacity-100' : 'opacity-0 '
        )}
      >
        <Button type="button" onClick={() => handleRemoveConfirmation(item)}>
          <Trash2 className="h-5 w-5 stroke-1" />
        </Button>
      </div>
    </li>
  )
}

export default ScheduleItem
